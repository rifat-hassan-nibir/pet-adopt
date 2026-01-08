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
