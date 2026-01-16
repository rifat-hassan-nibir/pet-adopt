"use client";

import { authClient } from "@/lib/auth-client";
import { petTypes } from "@/lib/data";
import { AdoptionPost } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";

interface EditPostFormProps {
  post: AdoptionPost;
  onCancel: () => void;
  onSubmit?: () => void;
}

export default function EditPostForm({
  post,
  onCancel,
  onSubmit,
}: EditPostFormProps) {
  const { data: session } = authClient.useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const [formData, setFormData] = useState({
    name: post.name,
    type: post.category,
    age: post.age,
    location: post.location,
    description: post.description,
    characteristics: post.characteristics || [],
  });

  useEffect(() => {
    setFormData({
      name: post.name,
      type: post.category,
      age: post.age,
      location: post.location,
      description: post.description,
      characteristics: post.characteristics || [],
    });
    setImagePreview(post.image);
  }, [post]);

  const petCharacteristics = [
    "Good with kids",
    "Good with other pets",
    "Only pet preferred",
    "Friendly",
    "Calm",
    "Playful",
    "Energetic",
    "House-trained",
    "Basic training",
    "Low barking",
    "Not aggressive",
    "Low maintenance",
    "High maintenance",
    "Needs grooming",
    "Heavy shedding",
  ];

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCharacteristicChange = (characteristic: string) => {
    setFormData((prev) => {
      const isSelected = prev.characteristics.includes(characteristic);
      return {
        ...prev,
        characteristics: isSelected
          ? prev.characteristics.filter((c) => c !== characteristic)
          : [...prev.characteristics, characteristic],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      alert("Please log in to edit a post");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress("Updating post...");

    try {
      let imageUrl = post.image;

      // If a new file is selected, upload it
      if (selectedFile) {
        setUploadProgress("Uploading image...");
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      setUploadProgress("Updating post...");

      // Update adoption post
      const postData = {
        name: formData.name,
        category: formData.type,
        age: formData.age,
        location: formData.location,
        description: formData.description,
        image: imageUrl,
        characteristics: formData.characteristics,
      };

      const response = await fetch(`/api/adoption-posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update post");
      }

      alert("Post updated successfully! 🎉");
      onSubmit?.();
    } catch (error) {
      console.error("Error updating post:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet Photo *
        </label>
        <div
          onClick={() => !isSubmitting && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl transition-colors
            ${
              isSubmitting
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-emerald-400"
            }
            border-gray-300
            ${imagePreview ? "p-2" : "p-6"}`}
        >
          {imagePreview ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
              {!isSubmitting && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(post.image);
                    setSelectedFile(null);
                  }}
                  className="hover:cursor-pointer absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 text-sm">
                <span className="font-medium text-emerald-600">
                  Click to upload
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isSubmitting}
            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      {/* Pet Name & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Pet Name"
          placeholder="e.g., Buddy"
          required
          disabled={isSubmitting}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Select
          label="Pet Type"
          options={petTypes}
          placeholder="Select type"
          required
          disabled={isSubmitting}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </div>

      {/* Age & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Age"
          placeholder="e.g., 2 years"
          required
          disabled={isSubmitting}
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <Input
          label="Location"
          placeholder="e.g., New York, NY"
          required
          disabled={isSubmitting}
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>

      {/* Characteristics - Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Characteristics
        </label>
        <div className="space-y-2 grid grid-cols-2">
          {petCharacteristics.map((characteristic) => (
            <label
              key={characteristic}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                disabled={isSubmitting}
                checked={formData.characteristics.includes(characteristic)}
                onChange={() => handleCharacteristicChange(characteristic)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{characteristic}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Tell potential adopters about your pet's personality, habits, and any special requirements..."
        required
        disabled={isSubmitting}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="h-24"
      />

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {uploadProgress}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={!session?.user || isSubmitting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {isSubmitting ? "Updating Post..." : "Update Post"}
        </Button>
      </div>
    </form>
  );
}
