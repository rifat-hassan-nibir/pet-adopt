import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { postId, message } = await request.json();

    // Validate required fields
    if (!postId || !message) {
      return NextResponse.json(
        { error: "Post ID and message are required" },
        { status: 400 }
      );
    }

    // Check if the post exists and get the owner
    const post = await prisma.adoptionPost.findUnique({
      where: { id: postId },
      select: { id: true, userId: true, name: true, status: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Adoption post not found" },
        { status: 404 }
      );
    }

    // Prevent users from requesting their own posts
    if (post.userId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot request to adopt your own post" },
        { status: 400 }
      );
    }

    // Check if post is still available
    if (post.status === "ADOPTED") {
      return NextResponse.json(
        { error: "This pet has already been adopted" },
        { status: 400 }
      );
    }

    // Check for existing request using the unique constraint
    const requestExists = await prisma.adoptionRequest.findUnique({
      where: {
        requesterId_postId: {
          requesterId: session.user.id,
          postId: postId,
        },
      },
    });

    if (requestExists) {
      return NextResponse.json(
        {
          error:
            "You have already sent a request for this pet. Please wait for a response.",
        },
        { status: 409 } // 409 Conflict is more appropriate for duplicate
      );
    }

    // Create adoption request
    const adoptionRequest = await prisma.adoptionRequest.create({
      data: {
        message: message,
        postId: postId,
        requesterId: session.user.id,
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Your adoption request for ${post.name} has been sent successfully!`,
        data: adoptionRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating adoption request:", error);
    return NextResponse.json(
      { error: "Failed to send adoption request. Please try again." },
      { status: 500 }
    );
  }
}
