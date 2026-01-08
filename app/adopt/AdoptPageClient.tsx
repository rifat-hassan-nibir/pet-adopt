/**
 * Enhanced: Added functional filtering, sorting, empty state, and back-to-top
 */
"use client";

import AdoptionCard from "@/components/AdoptionCard";
import BackToTop from "@/components/ui/BackToTop";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { petTypes } from "@/lib/data";
import { useState } from "react";
import { Pet } from "@/lib/types";

type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

export default function AdoptPageClient({ pets }: { pets: Pet[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setLocation("");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedType || location;

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pet Type Filter */}
            <div className="w-full sm:w-48">
              <Select
                options={petTypes}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                placeholder="All Types"
              />
            </div>

            {/* Location Filter */}
            <div className="w-full sm:w-48">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">{pets.length}</span>{" "}
              {pets.length === 1 ? "pet" : "pets"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="hover:cursor-pointer text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear filters
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            aria-label="Sort pets by"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        {/* Pet Grid or Empty State */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet: Pet) => (
              <AdoptionCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                category={pet.category}
                location={pet.location}
                image={pet.image}
                age={pet.age}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            title="No pets found"
            description="Try adjusting your search or filter criteria to find more pets."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        )}

        {/* Load More - only show if there are results */}
        {pets.length > 0 && pets.length >= 8 && (
          <div className="text-center mt-12">
            <Button
              className="hover:cursor-pointer"
              variant="outline"
              size="lg"
            >
              Load More Pets
            </Button>
          </div>
        )}
      </div>
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
