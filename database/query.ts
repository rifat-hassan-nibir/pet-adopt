"use server";

import prisma from "@/lib/prisma";

// Get all pets available for adoption
export const getAllPets = async (number?: number) => {
  if (number) {
    return await prisma.adoptionPost.findMany({
      where: { status: "AVAILABLE" },
      take: number,
    });
  }
  return await prisma.adoptionPost.findMany({
    where: { status: "AVAILABLE" },
  });
};

// Get a specific pet by ID
export const getPetById = async (id: string) => {
  return await prisma.adoptionPost.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};

// Get similar pets by category excluding a specific pet ID
export const getSimilarPets = async (category: string, petId: string) => {
  return await prisma.adoptionPost.findMany({
    where: {
      category: category,
      id: { not: petId },
      status: "AVAILABLE",
    },
    take: 4,
  });
};

// Get user data by user ID
export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// Get user adoption posts by user ID
export const getUserAdoptionPosts = async (userId: string) => {
  return await prisma.adoptionPost.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });
};

// Get adoption requests sent by a user
export const getAdoptionRequestsSent = async (userId: string) => {
  return await prisma.adoptionRequest.findMany({
    where: { requesterId: userId },
    include: {
      post: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get adoption requests received on user's posts
export const getAdoptionRequestsReceived = async (userId: string) => {
  return await prisma.adoptionRequest.findMany({
    where: {
      post: {
        userId: userId,
      },
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
    orderBy: { createdAt: "desc" },
  });
};

// Get profile data with related info
export const getProfileInfo = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });
};

// Update user adoption post by ID
export const updateUserAdoptionPost = async (id: string, data: any) => {
  return await prisma.adoptionPost.update({
    where: { id },
    data,
  });
};

// Delete user adoption post by ID
export const deleteUserAdoptionPost = async (id: string) => {
  return await prisma.adoptionPost.delete({
    where: { id },
  });
};

// Update adoption request status
export const updateAdoptionRequestStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  return await prisma.adoptionRequest.update({
    where: { id },
    data: { status },
  });
};

// Get adoption request by ID
export const getAdoptionRequestById = async (id: string) => {
  return await prisma.adoptionRequest.findUnique({
    where: { id },
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
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
};