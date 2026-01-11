import { notFound } from "next/navigation";
import PetDetailsClient from "./PetDetailsClient";
import { getPetById, getSimilarPets } from "@/database/query";
import { getUserSession } from "@/database/session";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Server Component - Fetches data with Prisma
export default async function PetDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getUserSession();

  // Fetch pet with owner info using Prisma
  const pet = await getPetById(id);

  if (!pet) {
    notFound();
  }

  // Fetch similar pets (same category, different location)
  const similarPets = await getSimilarPets(pet.category, pet.id);

  // Pass data to Client Component
  return (
    <PetDetailsClient pet={pet} similarPets={similarPets} session={session} />
  );
}
