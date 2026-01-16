import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
    const { status } = body;

    // Validate status
    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        { error: "Invalid status. Must be APPROVED or REJECTED." },
        { status: 400 }
      );
    }

    // Check if request exists
    const existingRequest = await prisma.adoptionRequest.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            userId: true,
            status: true,
          },
        },
      },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Adoption request not found" },
        { status: 404 }
      );
    }

    // Verify that the user owns the post (only post owner can approve/reject)
    if (existingRequest.post.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized. You can only approve/reject requests on your own posts." },
        { status: 403 }
      );
    }

    // Update adoption request status
    const updatedRequest = await prisma.adoptionRequest.update({
      where: { id },
      data: { status },
    });

    // If approved, mark the post as ADOPTED
    if (status === "APPROVED") {
      await prisma.adoptionPost.update({
        where: { id: existingRequest.postId },
        data: { status: "ADOPTED" },
      });
    }

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    console.error("Error updating adoption request:", error);
    return NextResponse.json(
      { error: "Failed to update request. Please try again." },
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

    // Check if request exists
    const existingRequest = await prisma.adoptionRequest.findUnique({
      where: { id },
      select: {
        id: true,
        requesterId: true,
        status: true,
      },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Adoption request not found" },
        { status: 404 }
      );
    }

    // Verify that the user is the requester (only requester can cancel their own request)
    if (existingRequest.requesterId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized. You can only cancel your own requests." },
        { status: 403 }
      );
    }

    // Only allow cancellation of PENDING requests
    if (existingRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "You can only cancel pending requests." },
        { status: 400 }
      );
    }

    // Delete the adoption request
    await prisma.adoptionRequest.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Request cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error cancelling adoption request:", error);
    return NextResponse.json(
      { error: "Failed to cancel request. Please try again." },
      { status: 500 }
    );
  }
}
