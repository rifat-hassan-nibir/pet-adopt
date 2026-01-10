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
