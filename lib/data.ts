export interface Pet {
  id: string;
  name: string;
  type: string;
  age: string;
  location: string;
  description: string;
  image: string;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
}

export const pets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    age: "2 years",
    location: "New York, NY",
    description:
      "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other pets. Buddy is fully vaccinated and house-trained. He would make a perfect addition to any loving family looking for a loyal companion.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    owner: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
    },
  },
  {
    id: "2",
    name: "Whiskers",
    type: "Cat",
    age: "1 year",
    location: "Los Angeles, CA",
    description:
      "Whiskers is a beautiful tabby cat with striking green eyes. She's playful, affectionate, and loves to curl up on your lap. Whiskers gets along well with other cats and is perfect for apartment living. She's spayed and up to date on all vaccinations.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    owner: {
      name: "Emily Johnson",
      email: "emily.j@email.com",
      phone: "(555) 234-5678",
    },
  },
  {
    id: "3",
    name: "Max",
    type: "Dog",
    age: "3 years",
    location: "Chicago, IL",
    description:
      "Max is a gentle German Shepherd with a calm demeanor. He's well-trained, knows basic commands, and is great as a family protector. Max is looking for a home with a yard where he can run and play. He's neutered and microchipped.",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80",
    owner: {
      name: "Michael Brown",
      email: "m.brown@email.com",
      phone: "(555) 345-6789",
    },
  },
  {
    id: "4",
    name: "Luna",
    type: "Cat",
    age: "6 months",
    location: "Houston, TX",
    description:
      "Luna is an adorable black kitten with a playful personality. She loves chasing toys and exploring every corner of the house. Luna would do best in a home where someone is around frequently to keep her company. She's been spayed and is current on shots.",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
    owner: {
      name: "Sarah Davis",
      email: "sarah.d@email.com",
      phone: "(555) 456-7890",
    },
  },
  {
    id: "5",
    name: "Charlie",
    type: "Dog",
    age: "4 years",
    location: "Phoenix, AZ",
    description:
      "Charlie is a lovable Labrador mix who enjoys swimming and outdoor adventures. He's excellent with kids and has a gentle temperament. Charlie would thrive in an active household that can give him plenty of exercise and attention.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    owner: {
      name: "David Wilson",
      email: "d.wilson@email.com",
      phone: "(555) 567-8901",
    },
  },
  {
    id: "6",
    name: "Oliver",
    type: "Rabbit",
    age: "1 year",
    location: "Philadelphia, PA",
    description:
      "Oliver is a fluffy white rabbit with the softest fur. He's calm, easy to handle, and loves to be petted. Oliver would make a great first pet for families with children. He comes with his cage and supplies.",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
    owner: {
      name: "Lisa Anderson",
      email: "l.anderson@email.com",
      phone: "(555) 678-9012",
    },
  },
  {
    id: "7",
    name: "Bella",
    type: "Dog",
    age: "5 years",
    location: "San Antonio, TX",
    description:
      "Bella is a sweet Beagle with soulful eyes and a wagging tail. She's house-trained, walks well on a leash, and loves belly rubs. Bella is looking for a quiet home where she can be your devoted companion.",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
    owner: {
      name: "Robert Martinez",
      email: "r.martinez@email.com",
      phone: "(555) 789-0123",
    },
  },
  {
    id: "8",
    name: "Mittens",
    type: "Cat",
    age: "2 years",
    location: "San Diego, CA",
    description:
      "Mittens is a gorgeous Persian cat with a luxurious white coat. She's calm, independent, and enjoys lounging in sunny spots. Mittens needs regular grooming but rewards her family with endless purrs and cuddles.",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80",
    owner: {
      name: "Jennifer Taylor",
      email: "j.taylor@email.com",
      phone: "(555) 890-1234",
    },
  },
  {
    id: "9",
    name: "Rocky",
    type: "Dog",
    age: "1.5 years",
    location: "Dallas, TX",
    description:
      "Rocky is an energetic Boxer who loves to run and play. He's loyal, protective, and great with families. Rocky needs an active home with space to burn off his energy. He's fully vaccinated and ready for adoption.",
    image:
      "https://images.unsplash.com/photo-1616149776714-9a8037fcc9a3?w=800&q=80",
    owner: {
      name: "Chris Lee",
      email: "c.lee@email.com",
      phone: "(555) 901-2345",
    },
  },
];

export const petTypes = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
  { value: "other", label: "Other" },
];

export function getPetById(id: string): Pet | undefined {
  return pets.find((pet) => pet.id === id);
}

export function getFeaturedPets(): Pet[] {
  return pets.slice(0, 4);
}

// User Profile Data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  avatar?: string;
  joinedDate: string;
}

export const currentUser: UserProfile = {
  id: "user-1",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  location: "San Francisco, CA",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  joinedDate: "January 2024",
};

// User's Adoption Posts
export interface UserAdoptionPost {
  id: string;
  petName: string;
  petType: string;
  location: string;
  image: string;
  status: "available" | "adopted" | "pending";
  createdAt: string;
  views: number;
  inquiries: number;
}

export const userAdoptionPosts: UserAdoptionPost[] = [
  {
    id: "post-1",
    petName: "Luna",
    petType: "Cat",
    location: "San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
    status: "available",
    createdAt: "Dec 15, 2024",
    views: 234,
    inquiries: 12,
  },
  {
    id: "post-2",
    petName: "Rocky",
    petType: "Dog",
    location: "San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    status: "pending",
    createdAt: "Dec 10, 2024",
    views: 567,
    inquiries: 23,
  },
  {
    id: "post-3",
    petName: "Mittens",
    petType: "Cat",
    location: "Oakland, CA",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80",
    status: "adopted",
    createdAt: "Nov 28, 2024",
    views: 892,
    inquiries: 45,
  },
];

// Adoption Requests
export interface AdoptionRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  requesterAvatar?: string;
  message: string;
  petName: string;
  petId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const adoptionRequests: AdoptionRequest[] = [
  {
    id: "req-1",
    requesterName: "Michael Chen",
    requesterEmail: "m.chen@email.com",
    requesterAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    message:
      "Hi! I'm very interested in adopting Luna. I have a spacious apartment with a cat-friendly setup and have been looking for a companion for the past few months. Would love to schedule a meet!",
    petName: "Luna",
    petId: "post-1",
    status: "pending",
    createdAt: "Dec 28, 2024",
  },
  {
    id: "req-2",
    requesterName: "Emily Rodriguez",
    requesterEmail: "emily.r@email.com",
    message:
      "Hello! Rocky caught my eye immediately. I'm an active person who loves hiking and running, and I think Rocky would be a perfect companion for my outdoor adventures. I have a house with a large backyard.",
    petName: "Rocky",
    petId: "post-2",
    status: "pending",
    createdAt: "Dec 27, 2024",
  },
  {
    id: "req-3",
    requesterName: "David Kim",
    requesterEmail: "d.kim@email.com",
    requesterAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    message:
      "I'd love to give Luna a forever home! I work from home so she'll have company all day.",
    petName: "Luna",
    petId: "post-1",
    status: "pending",
    createdAt: "Dec 26, 2024",
  },
  {
    id: "req-4",
    requesterName: "Jessica Taylor",
    requesterEmail: "j.taylor@email.com",
    message:
      "Rocky seems like such a sweet boy! My family would love to meet him.",
    petName: "Rocky",
    petId: "post-2",
    status: "approved",
    createdAt: "Dec 20, 2024",
  },
];

export function getUserPosts(): UserAdoptionPost[] {
  return userAdoptionPosts;
}

export function getAdoptionRequests(): AdoptionRequest[] {
  return adoptionRequests;
}

export function getPendingRequestsCount(): number {
  return adoptionRequests.filter((r) => r.status === "pending").length;
}

export function getSimilarPets(
  currentId: string,
  type: string,
  location: string,
  maxResults: number = 4
): Pet[] {
  return pets
    .filter(
      (pet) =>
        pet.id !== currentId && (pet.type === type || pet.location === location)
    )
    .slice(0, maxResults);
}
