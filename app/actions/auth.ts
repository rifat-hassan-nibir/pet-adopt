"use server";

import { auth } from "@/lib/auth";
import { SignUpFormData } from "@/lib/types";

export const signUpWithEmailPassword = async (formData: SignUpFormData) => {
  const { name, email, password, confirmPassword } = formData;

  // Validation
  if (!name || name.length < 2) {
    return { success: false, error: "Name must be at least 2 characters" };
  }

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email" };
  }

  if (!password || password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  try {
    // Signup user
    const response = await auth.api.signUpEmail({
      body: {
        name: name,
        email: email,
        password: password,
      },
    });

    if (!response.user) {
      return { success: false, error: "Failed to create account" };
    }

    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("already exists")) {
      return { success: false, error: "Email already exists" };
    }
    return {
      success: false,
      error: error.message || "Signup failed. Please try again.",
    };
  }
};
