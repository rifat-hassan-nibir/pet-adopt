import {
  getAdoptionRequestsReceived,
  getAdoptionRequestsSent,
  getProfileInfo,
  getUserAdoptionPosts,
} from "@/database/query";
import ProfilePageClient from "./ProfilePageClient";
import { getUserSession } from "@/database/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();
  if (!session?.user?.id) {
    return redirect("/login");
  }

  const [
    profileInfo,
    adoptionPosts,
    adoptionRequestsSent,
    adoptionRequestsReceived,
  ] = await Promise.all([
    getProfileInfo(session.user.id),
    getUserAdoptionPosts(session.user.id),
    getAdoptionRequestsSent(session.user.id),
    getAdoptionRequestsReceived(session.user.id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your adoption posts and requests
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <ProfilePageClient
        profileInfo={profileInfo}
        adoptionPosts={adoptionPosts}
        adoptionRequestsSent={adoptionRequestsSent}
        adoptionRequestsReceived={adoptionRequestsReceived}
      />
    </div>
  );
}
