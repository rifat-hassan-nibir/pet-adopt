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

    // Create adoption post
    const adoptionPost = await prisma.adoptionPost.create({
      data: {
        name,
        category,
        age,
        location,
        description,
        image,
        characteristics,
        userId: session.user.id,
      },
    });

    return NextResponse.json(adoptionPost, { status: 201 });
  } catch (error) {
    console.error("Error creating adoption post:", error);
    return NextResponse.json(
      { error: "Failed to create post. Please try again." },
      { status: 500 }
    );
  }
}
