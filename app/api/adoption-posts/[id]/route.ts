import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      name,
      category,
      age,
      location,
      description,
      image,
      characteristics,
    } = body;

    // Validate required fields
    if (!name || !category || !age || !location || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if post exists and belongs to user
    const existingPost = await prisma.adoptionPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    if (existingPost.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized. You can only edit your own posts." },
        { status: 403 }
      );
    }

    // Update adoption post
    const adoptionPost = await prisma.adoptionPost.update({
      where: { id },
      data: {
        name,
        category,
        age,
        location,
        description,
        image,
        characteristics,
      },
    });

    return NextResponse.json(adoptionPost, { status: 200 });
  } catch (error) {
    console.error("Error updating adoption post:", error);
    return NextResponse.json(
      { error: "Failed to update post. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Check if post exists and belongs to user
    const existingPost = await prisma.adoptionPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    if (existingPost.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized. You can only delete your own posts." },
        { status: 403 }
      );
    }

    // Delete adoption post
    await prisma.adoptionPost.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting adoption post:", error);
    return NextResponse.json(
      { error: "Failed to delete post. Please try again." },
      { status: 500 }
    );
  }
}
