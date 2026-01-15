export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt?: Date;
}

export interface Pet {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  age: string;
  location: string;
  characteristics: string[];
  status: string;
  userId: string;
}

export interface SimilarPet {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  age: string;
  location: string;
  characteristics: string[];
  status: string;
  userId: string;
}

export interface AdoptionPost {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  age: string;
  location: string;
  characteristics: string[];
  status: "AVAILABLE" | "ADOPTED";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

export interface AdoptionCardProps {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  age?: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface UserAdoptionPost {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  age: string;
  location: string;
  characteristics: string[];
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AdoptionRequest {
  id: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
  requesterId: string;
  postId: string;
  requester?: User;
  post?: AdoptionPost & { user?: User };
}

export interface ProfileInfo {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt?: Date;
}
