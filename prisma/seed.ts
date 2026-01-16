import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("🧹 Cleaning existing data...");
  await prisma.adoptionRequest.deleteMany();
  await prisma.adoptionPost.deleteMany();
  await prisma.user.deleteMany();

  // Create dummy users
  console.log("👥 Creating users...");
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        image: "https://i.pravatar.cc/150?img=47",
      },
    }),
    prisma.user.create({
      data: {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        image: "https://i.pravatar.cc/150?img=12",
      },
    }),
    prisma.user.create({
      data: {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        image: "https://i.pravatar.cc/150?img=45",
      },
    }),
    prisma.user.create({
      data: {
        name: "David Kim",
        email: "david.kim@example.com",
        image: "https://i.pravatar.cc/150?img=33",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jessica Martinez",
        email: "jessica.martinez@example.com",
        image: "https://i.pravatar.cc/150?img=20",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create adoption posts
  console.log("🐾 Creating adoption posts...");
  const adoptionPosts = [
    {
      name: "Buddy",
      description:
        "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other pets. Buddy is fully vaccinated and house-trained. He would make a perfect addition to any loving family looking for a loyal companion.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      category: "Dog",
      age: "2 years",
      location: "New York, NY",
      characteristics: ["Good with kids", "Good with other pets", "Friendly", "Playful", "House-trained"],
      userId: users[0].id,
    },
    {
      name: "Whiskers",
      description:
        "Whiskers is a beautiful tabby cat with striking green eyes. She's playful, affectionate, and loves to curl up on your lap. Whiskers gets along well with other cats and is perfect for apartment living. She's spayed and up to date on all vaccinations.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
      category: "Cat",
      age: "1 year",
      location: "Los Angeles, CA",
      characteristics: ["Friendly", "Calm", "Good with other pets", "Low maintenance"],
      userId: users[1].id,
    },
    {
      name: "Max",
      description:
        "Max is an adorable Beagle puppy full of energy and curiosity. He's very social, loves meeting new people, and enjoys playing with toys. Max is currently being house-trained and would thrive in an active household with plenty of attention and exercise.",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
      category: "Dog",
      age: "6 months",
      location: "Chicago, IL",
      characteristics: ["Playful", "Energetic", "Friendly", "Good with kids"],
      userId: users[2].id,
    },
    {
      name: "Luna",
      description:
        "Luna is a graceful Siamese cat with a gentle personality. She's very affectionate and loves to be around people. Luna is quiet, well-behaved, and perfect for someone looking for a calm companion. She's spayed, vaccinated, and ready for her forever home.",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80",
      category: "Cat",
      age: "3 years",
      location: "San Francisco, CA",
      characteristics: ["Calm", "Friendly", "Low barking", "Low maintenance"],
      userId: users[0].id,
    },
    {
      name: "Charlie",
      description:
        "Charlie is a playful Border Collie mix who loves outdoor activities. He's intelligent, trainable, and would be perfect for an active family. Charlie knows basic commands and is great with children. He needs regular exercise and mental stimulation.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      category: "Dog",
      age: "1.5 years",
      location: "Seattle, WA",
      characteristics: ["Energetic", "Playful", "Basic training", "Good with kids", "Not aggressive"],
      userId: users[3].id,
    },
    {
      name: "Oliver",
      description:
        "Oliver is a fluffy white rabbit with the softest fur. He's calm, easy to handle, and loves to be petted. Oliver would make a great first pet for families with children. He comes with his cage and supplies.",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
      category: "Rabbit",
      age: "1 year",
      location: "Philadelphia, PA",
      characteristics: ["Calm", "Good with kids", "Low maintenance"],
      userId: users[4].id,
    },
    {
      name: "Bella",
      description:
        "Bella is a sweet Beagle with soulful eyes and a wagging tail. She's house-trained, walks well on a leash, and loves belly rubs. Bella is looking for a quiet home where she can be your devoted companion.",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
      category: "Dog",
      age: "5 years",
      location: "San Antonio, TX",
      characteristics: ["Friendly", "Calm", "House-trained", "Low barking", "Not aggressive"],
      userId: users[1].id,
    },
    {
      name: "Mittens",
      description:
        "Mittens is a gorgeous Persian cat with a luxurious white coat. She's calm, independent, and enjoys lounging in sunny spots. Mittens needs regular grooming but rewards her family with endless purrs and cuddles.",
      image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80",
      category: "Cat",
      age: "2 years",
      location: "San Diego, CA",
      characteristics: ["Calm", "Low maintenance", "Needs grooming", "Friendly"],
      userId: users[2].id,
    },
    {
      name: "Rocky",
      description:
        "Rocky is an energetic Boxer who loves to run and play. He's loyal, protective, and great with families. Rocky needs an active home with space to burn off his energy. He's fully vaccinated and ready for adoption.",
      image: "https://images.unsplash.com/photo-1616149776714-9a8037fcc9a3?w=800&q=80",
      category: "Dog",
      age: "1.5 years",
      location: "Dallas, TX",
      characteristics: ["Energetic", "Playful", "Good with kids", "Basic training", "Not aggressive"],
      userId: users[3].id,
    },
    {
      name: "Shadow",
      description:
        "Shadow is a sleek black cat with golden eyes. He's independent yet affectionate, perfect for someone who wants a low-maintenance companion. Shadow is great at keeping himself entertained and loves window watching.",
      image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&q=80",
      category: "Cat",
      age: "4 years",
      location: "Miami, FL",
      characteristics: ["Calm", "Low maintenance", "Independent", "Friendly"],
      userId: users[4].id,
    },
    {
      name: "Daisy",
      description:
        "Daisy is a gentle Labrador Retriever who loves everyone she meets. She's great with children, other dogs, and even cats. Daisy is house-trained, knows basic commands, and would make an excellent family pet.",
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80",
      category: "Dog",
      age: "3 years",
      location: "Boston, MA",
      characteristics: ["Good with kids", "Good with other pets", "Friendly", "House-trained", "Basic training"],
      userId: users[0].id,
    },
    {
      name: "Simba",
      description:
        "Simba is a majestic orange tabby cat with a playful personality. He loves chasing toys, climbing cat trees, and cuddling on the couch. Simba is neutered, vaccinated, and ready to bring joy to his new family.",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80",
      category: "Cat",
      age: "2.5 years",
      location: "Portland, OR",
      characteristics: ["Playful", "Friendly", "Energetic", "Good with kids"],
      userId: users[1].id,
    },
    {
      name: "Coco",
      description:
        "Coco is a beautiful chocolate Labrador with a sweet disposition. She's very social, loves playing fetch, and enjoys swimming. Coco is house-trained, knows many commands, and would be perfect for an active family.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
      category: "Dog",
      age: "2 years",
      location: "Denver, CO",
      characteristics: ["Playful", "Energetic", "Good with kids", "House-trained", "Basic training"],
      userId: users[2].id,
    },
    {
      name: "Pepper",
      description:
        "Pepper is a friendly mixed-breed dog with a lot of personality. She's medium-sized, great with kids, and loves going on adventures. Pepper is house-trained, walks well on a leash, and is looking for her forever home.",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
      category: "Dog",
      age: "4 years",
      location: "Austin, TX",
      characteristics: ["Friendly", "Good with kids", "House-trained", "Calm", "Not aggressive"],
      userId: users[3].id,
    },
    {
      name: "Nala",
      description:
        "Nala is a graceful Siamese mix with striking blue eyes. She's very vocal and loves to 'talk' to her humans. Nala is affectionate, intelligent, and would thrive in a home where she gets plenty of attention.",
      image: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=800&q=80",
      category: "Cat",
      age: "1 year",
      location: "Nashville, TN",
      characteristics: ["Friendly", "Playful", "Low maintenance", "Good with kids"],
      userId: users[4].id,
    },
  ];

  const createdPosts = await Promise.all(
    adoptionPosts.map((post) =>
      prisma.adoptionPost.create({
        data: post,
      })
    )
  );

  console.log(`✅ Created ${createdPosts.length} adoption posts`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
