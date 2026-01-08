import prisma from "@/lib/prisma";

async function main() {
  // Clear existing data
  await prisma.adoptionRequest.deleteMany();
  await prisma.adoptionPost.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding database...");

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        password: "$2a$10$XQZqHpZxXqZxXqZxXqZxXe", // hashed: password123
        image: "https://i.pravatar.cc/150?img=1",
      },
    }),
    prisma.user.create({
      data: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        password: "$2a$10$XQZqHpZxXqZxXqZxXqZxXe",
        image: "https://i.pravatar.cc/150?img=2",
      },
    }),
    prisma.user.create({
      data: {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        password: "$2a$10$XQZqHpZxXqZxXqZxXqZxXe",
        image: "https://i.pravatar.cc/150?img=3",
      },
    }),
    prisma.user.create({
      data: {
        name: "David Kim",
        email: "david.kim@email.com",
        password: "$2a$10$XQZqHpZxXqZxXqZxXqZxXe",
        image: "https://i.pravatar.cc/150?img=4",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jessica Williams",
        email: "jessica.williams@email.com",
        password: "$2a$10$XQZqHpZxXqZxXqZxXqZxXe",
        image: "https://i.pravatar.cc/150?img=5",
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create Adoption Posts
  const posts = await Promise.all([
    // Sarah's posts
    prisma.adoptionPost.create({
      data: {
        name: "Max - Friendly Golden Retriever",
        description:
          "Max is a 3-year-old golden retriever who loves to play fetch and go on long walks. He is great with kids and other dogs. Fully vaccinated and house-trained.",
        image:
          "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500",
        category: "Dog",
        age: "3 years",
        location: "New York, NY",
        characteristics: [
          "Friendly",
          "Vaccinated",
          "House-trained",
          "Good with kids",
        ],
        status: "AVAILABLE",
        userId: users[0].id,
      },
    }),
    prisma.adoptionPost.create({
      data: {
        name: "Luna - Playful Kitten",
        description:
          "Luna is a 6-month-old playful kitten looking for a loving home. She loves to cuddle and play with toys. Perfect for first-time cat owners.",
        image:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
        category: "Cat",
        age: "6 months",
        location: "Brooklyn, NY",
        characteristics: ["Playful", "Affectionate", "Litter-trained"],
        status: "AVAILABLE",
        userId: users[0].id,
      },
    }),

    // Michael's posts
    prisma.adoptionPost.create({
      data: {
        name: "Buddy - Energetic Labrador",
        description:
          "Buddy is a 2-year-old lab who needs an active family. He loves running, swimming, and playing outdoors. Already neutered and up-to-date on all shots.",
        image:
          "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
        category: "Dog",
        age: "2 years",
        location: "Los Angeles, CA",
        characteristics: [
          "Energetic",
          "Neutered",
          "Vaccinated",
          "Loves outdoors",
        ],
        status: "ADOPTED",
        userId: users[1].id,
      },
    }),
    prisma.adoptionPost.create({
      data: {
        name: "Charlie - Sweet Senior Dog",
        description:
          "Charlie is a gentle 8-year-old mixed breed looking for a quiet retirement home. He is calm, loving, and perfect for seniors or quiet households.",
        image:
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500",
        category: "Dog",
        age: "8 years",
        location: "San Francisco, CA",
        characteristics: [
          "Calm",
          "Senior",
          "House-trained",
          "Good with seniors",
        ],
        status: "AVAILABLE",
        userId: users[1].id,
      },
    }),

    // Emily's posts
    prisma.adoptionPost.create({
      data: {
        name: "Whiskers - Independent Cat",
        description:
          "Whiskers is a 4-year-old cat who enjoys her independence but also loves attention on her terms. Perfect for someone who works from home.",
        image:
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
        category: "Cat",
        age: "4 years",
        location: "Chicago, IL",
        characteristics: ["Independent", "Quiet", "Litter-trained", "Spayed"],
        status: "AVAILABLE",
        userId: users[2].id,
      },
    }),
    prisma.adoptionPost.create({
      data: {
        name: "Rocky - Guard Dog",
        description:
          "Rocky is a 5-year-old German Shepherd. He is loyal, protective, and well-trained. Looking for an experienced dog owner with a secure yard.",
        image:
          "https://images.unsplash.com/photo-1568572933382-74d440642117?w=500",
        category: "Dog",
        age: "5 years",
        location: "Chicago, IL",
        characteristics: ["Loyal", "Protective", "Trained", "Neutered"],
        status: "AVAILABLE",
        userId: users[2].id,
      },
    }),

    // David's posts
    prisma.adoptionPost.create({
      data: {
        name: "Bella - Therapy Dog",
        description:
          "Bella is a certified therapy dog, 4 years old. She is incredibly gentle and has experience with children and elderly people. Very well-behaved.",
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
        category: "Dog",
        age: "4 years",
        location: "Seattle, WA",
        characteristics: [
          "Certified therapy dog",
          "Gentle",
          "Good with kids",
          "Trained",
        ],
        status: "AVAILABLE",
        userId: users[3].id,
      },
    }),

    // Jessica's posts
    prisma.adoptionPost.create({
      data: {
        name: "Mittens - Cuddly Persian Cat",
        description:
          "Mittens is a beautiful 2-year-old Persian cat. She loves to be pampered and requires daily grooming. Very affectionate and loves to nap in sunny spots.",
        image:
          "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500",
        category: "Cat",
        age: "2 years",
        location: "Boston, MA",
        characteristics: [
          "Affectionate",
          "Requires grooming",
          "Indoor cat",
          "Vaccinated",
        ],
        status: "AVAILABLE",
        userId: users[4].id,
      },
    }),
    prisma.adoptionPost.create({
      data: {
        name: "Oliver - Bonded Pair Brother",
        description:
          "Oliver and his sister Olivia (separate listing) are a bonded pair. They are 1-year-old tabby cats who must be adopted together. Very playful and loving.",
        image:
          "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=500",
        category: "Cat",
        age: "1 year",
        location: "Boston, MA",
        characteristics: ["Bonded pair", "Playful", "Young", "Neutered"],
        status: "AVAILABLE",
        userId: users[4].id,
      },
    }),
  ]);

  console.log(`Created ${posts.length} adoption posts`);

  // Create Adoption Requests
  const requests = await Promise.all([
    // Michael requesting Sarah's Max
    prisma.adoptionRequest.create({
      data: {
        message:
          "Hi! I have a large backyard and kids who would love to play with Max. We have experience with Golden Retrievers.",
        status: "PENDING",
        userId: users[1].id,
        postId: posts[0].id,
      },
    }),

    // Emily requesting Sarah's Max
    prisma.adoptionRequest.create({
      data: {
        message:
          "I work from home and can give Max all the attention he needs. I live near a dog park and love taking long walks.",
        status: "PENDING",
        userId: users[2].id,
        postId: posts[0].id,
      },
    }),

    // David requesting Sarah's Luna
    prisma.adoptionRequest.create({
      data: {
        message:
          "Looking for a kitten for my daughter. We have a quiet home and no other pets. Luna would be perfect!",
        status: "APPROVED",
        userId: users[3].id,
        postId: posts[1].id,
      },
    }),

    // Sarah requesting Michael's Charlie
    prisma.adoptionRequest.create({
      data: {
        message:
          "I am looking for a calm senior dog. I have a quiet home and plenty of time to care for Charlie.",
        status: "PENDING",
        userId: users[0].id,
        postId: posts[3].id,
      },
    }),

    // Jessica requesting Emily's Whiskers
    prisma.adoptionRequest.create({
      data: {
        message:
          "I work from home and would love a cat companion. I understand independent cats and will respect her space.",
        status: "REJECTED",
        userId: users[4].id,
        postId: posts[4].id,
      },
    }),

    // David requesting Emily's Rocky
    prisma.adoptionRequest.create({
      data: {
        message:
          "I have experience with German Shepherds and have a large secure yard. Looking for a loyal guard dog.",
        status: "PENDING",
        userId: users[3].id,
        postId: posts[5].id,
      },
    }),

    // Emily requesting David's Bella
    prisma.adoptionRequest.create({
      data: {
        message:
          "I volunteer at a nursing home and think Bella would be perfect to bring along for therapy visits.",
        status: "PENDING",
        userId: users[2].id,
        postId: posts[6].id,
      },
    }),

    // Michael requesting Jessica's Mittens
    prisma.adoptionRequest.create({
      data: {
        message:
          "I love Persian cats and am experienced with grooming. I can provide the care Mittens needs.",
        status: "PENDING",
        userId: users[1].id,
        postId: posts[7].id,
      },
    }),
  ]);

  console.log(`Created ${requests.length} adoption requests`);
  console.log("Database seeded successfully! 🌱");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
