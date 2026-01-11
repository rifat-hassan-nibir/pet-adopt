"use client";

import { authClient } from "@/lib/auth-client";
import { petTypes } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import LoginToolTip from "./ui/ToolTip";

interface CreatePostFormProps {
  onCancel: () => void;
  onSubmit?: () => void;
}

export default function CreatePostForm({
  onCancel,
  onSubmit,
}: CreatePostFormProps) {
  const { data: session, isPending } = authClient.useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    location: "",
    description: "",
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - would submit to backend in real app
    alert("Post created successfully! (Demo only)");
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Authentication Warning Banner */}
      {!isPending && !session?.user && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          {/* Warning Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              Authentication Required
            </h3>
            <p className="text-sm text-amber-800 mb-3">
              You need to create an account or log in before creating an
              adoption post.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <Link href="/login" onClick={onCancel}>
                <button
                  type="button"
                  className="hover:cursor-pointer px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                >
                  Log in
                </button>
              </Link>
              <Link href="/signup" onClick={onCancel}>
                <button
                  type="button"
                  className="hover:cursor-pointer px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                >
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet Photo
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-colors
            ${
              isDragging
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-300 hover:border-emerald-400"
            }
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
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
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Select
          label="Pet Type"
          options={petTypes}
          placeholder="Select type"
          required
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
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <Input
          label="Location"
          placeholder="e.g., New York, NY"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Tell potential adopters about your pet's personality, habits, and any special requirements..."
        required
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="h-24"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <div className="flex-1 relative group">
          <Button
            type="submit"
            className="w-full"
            disabled={!session?.data?.user}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Post
          </Button>
          {/* LoginToolTip for disabled state */}
          {!session?.data?.user && <LoginToolTip />}
        </div>
      </div>
    </form>
  );
}
