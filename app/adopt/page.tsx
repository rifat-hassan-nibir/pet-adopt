import { getAllPets } from "@/database/query";
import AdoptPageClient from "./AdoptPageClient";

export default async function AdoptPage() {
  const pets = await getAllPets();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Pet
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Browse through our collection of adorable pets waiting for their
            forever homes. Use the filters below to find your perfect match.
          </p>
        </div>
      </div>
      <AdoptPageClient pets={pets} />;
    </div>
  );
}
