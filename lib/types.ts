export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
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
