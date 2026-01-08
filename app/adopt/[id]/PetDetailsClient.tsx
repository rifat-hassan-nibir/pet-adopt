"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdoptionCard from "@/components/AdoptionCard";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { Pet, User } from "@/lib/types";

interface PetDetailsClientProps {
  pet: Pet & { user: User };
  similarPets: Pet[];
}

export default function PetDetailsClient({
  pet,
  similarPets,
}: PetDetailsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/adopt"
              className="text-gray-500 hover:text-emerald-600"
            >
              Adopt
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{pet.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                {pet.category}
              </span>
            </div>
          </div>

          {/* Pet Details */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm grow">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {pet.name}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{pet.age}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-600"
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
                  <span>{pet.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  About this pet
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Characteristics */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Characteristics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pet.characteristics.map((char, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Owner Info Card */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Posted by
                </h3>
                <div className="flex items-center gap-4">
                  {pet.user.image ? (
                    <Image
                      src={pet.user.image}
                      alt={pet.user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold">
                        {pet.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{pet.user.name}</p>
                    <p className="text-sm text-gray-500">Pet Owner</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Request Adoption
                  </span>
                </Button>
                <Button variant="outline" size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Pets Section */}
        {similarPets.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Pets You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarPets.map((similarPet) => (
                <AdoptionCard
                  key={similarPet.id}
                  id={similarPet.id}
                  name={similarPet.name}
                  category={similarPet.category}
                  location={similarPet.location}
                  image={similarPet.image}
                  age={similarPet.age}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Request to adopt ${pet.name}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Message"
            placeholder={`Hi! I'm interested in adopting this pet...`}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
