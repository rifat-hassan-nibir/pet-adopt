# 🐾 PetAdopt

A modern pet adoption platform built with Next.js, Prisma, and Neon Database. Connect pet owners with loving adopters in a seamless, user-friendly experience.

**Live Demo:** [https://pet-adopt-nibir.vercel.app](https://pet-adopt-nibir.vercel.app)

**Project Link:** [https://github.com/rifat-hassan-nibir/pet-adopt](https://github.com/rifat-hassan-nibir/pet-adopt)

## ✨ Features

- 🔐 **Authentication System**

  - Email/Password authentication
  - Google OAuth integration
  - Secure session management with Better Auth

- 🐕 **Adoption Posts**

  - Create and manage pet adoption listings
  - Upload pet photos
  - Add detailed descriptions and characteristics
  - Filter pets by category, age, and location
  - View similar pets recommendations

- 📩 **Adoption Requests**

  - Send adoption requests to pet owners
  - Manage incoming requests on your posts
  - Approve or reject adoption applications
  - Track request status (Pending, Approved, Rejected)

- 👤 **User Dashboard**

  - View and edit your adoption posts
  - Manage received adoption requests
  - Track sent adoption requests
  - User profile management

- 📱 **Responsive Design**
  - Mobile-first approach
  - Beautiful UI with Tailwind CSS
  - Smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Neon (Serverless PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Better Auth
- **Image Upload:** Cloudinary
- **Deployment:** Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn/pnpm
- A Neon account ([neon.tech](https://neon.tech))
- A Google Cloud Console account (for OAuth)
- A Cloudinary account (for image uploads)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rifat-hassan-nibir/pet-adopt
cd pet-adopt
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
pet-adopt/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── adopt/             # Adoption listing pages
│   ├── api/               # API routes
│   ├── profile/           # User profile pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── database/             # Database queries and utilities
├── lib/                  # Utility functions and configurations
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
├── public/               # Static assets
```

## 🗄️ Database Schema

### Key Models

- **User**: User accounts and profiles
- **AdoptionPost**: Pet adoption listings
- **AdoptionRequest**: Adoption applications
- **Session**: User sessions
- **Account**: OAuth accounts

See `prisma/schema.prisma` for the complete schema.

## 🔑 Environment Variables

| Variable                            | Description                                  | Required |
| ----------------------------------- | -------------------------------------------- | -------- |
| `DATABASE_URL`                      | Neon PostgreSQL connection string            | ✅       |
| `BETTER_AUTH_SECRET`                | Secret key for authentication (min 32 chars) | ✅       |
| `BETTER_AUTH_URL`                   | Base URL of your application                 | ✅       |
| `GOOGLE_CLIENT_ID`                  | Google OAuth client ID                       | ✅       |
| `GOOGLE_CLIENT_SECRET`              | Google OAuth client secret                   | ✅       |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                        | ⚠️       |
| `CLOUDINARY_API_KEY`                | Cloudinary API key                           | ⚠️       |
| `CLOUDINARY_API_SECRET`             | Cloudinary API secret                        | ⚠️       |

⚠️ = Optional but recommended

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build the application
npm run build
```

## 📝 API Routes

### Authentication

- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-in` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### Adoption Posts

- `POST /api/adoption-post` - Create adoption post
- `GET /api/adoption-post/:id` - Get post details
- `PUT /api/adoption-post/:id` - Update post
- `DELETE /api/adoption-post/:id` - Delete post

### Adoption Requests

- `POST /api/adoption-request` - Send adoption request
- `GET /api/adoption-request` - Get user's requests
- `PUT /api/adoption-request/:id` - Update request status

Made with ❤️ for pets and their future families
