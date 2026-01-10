/**
 * Enhanced: Added confirmation dialogs for destructive actions
 */
"use client";

import ActionButton from "@/components/ui/ActionButton";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DashboardCard from "@/components/ui/DashboardCard";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import TabNavigation from "@/components/ui/TabNavigation";
import {
  AdoptionRequest,
  UserAdoptionPost,
  adoptionRequests,
  currentUser,
  getPendingRequestsCount,
  userAdoptionPosts,
} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedRequest, setSelectedRequest] =
    useState<AdoptionRequest | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  // Gap Addressed: No confirmation dialog for delete actions
  const [postToDelete, setPostToDelete] = useState<UserAdoptionPost | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const pendingCount = getPendingRequestsCount();

  const handleViewRequest = (request: AdoptionRequest) => {
    setSelectedRequest(request);
    setIsRequestModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRequestModalOpen(false);
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    // UI only - would update request status in real app
    alert(
      `Request from ${selectedRequest?.requesterName} approved! (Demo only)`
    );
    handleCloseModal();
  };
  const handleReject = () => {
    // UI only - would update request status in real app
    alert(
      `Request from ${selectedRequest?.requesterName} rejected! (Demo only)`
    );
    handleCloseModal();
  };

  const handleDeleteClick = (post: UserAdoptionPost) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // UI only - would delete post in real app
    alert(`Post "${postToDelete?.petName}" deleted! (Demo only)`);
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const tabs = [
    {
      id: "posts",
      label: "My Adoption Posts",
      count: userAdoptionPosts.length,
    },
    { id: "requests", label: "Adoption Requests", count: pendingCount },
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-4 xl:col-span-3">
            <DashboardCard className="sticky top-24">
              {/* Profile Header */}
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="relative inline-block mb-4">
                  {currentUser.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-50"
                    />
                  ) : (
                    <Avatar name={currentUser.name} size="xl" />
                  )}
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentUser.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {currentUser.email}
                </p>
                {currentUser.location && (
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-2">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{currentUser.location}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userAdoptionPosts.length}
                  </div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {
                      userAdoptionPosts.filter((p) => p.status === "adopted")
                        .length
                    }
                  </div>
                  <div className="text-xs text-gray-500">Adopted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {pendingCount}
                  </div>
                  <div className="text-xs text-gray-500">Requests</div>
                </div>
              </div>

              {/* Member Since */}
              <div className="pt-6 pb-2">
                <p className="text-xs text-gray-400 text-center">
                  Member since {currentUser.joinedDate}
                </p>
              </div>

              {/* Edit Profile Button */}
              <Button variant="outline" fullWidth className="mt-4">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </Button>
            </DashboardCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Tabs */}
            <DashboardCard padding="none" className="mb-6">
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </DashboardCard>

            {/* Tab Content */}
            {activeTab === "posts" && (
              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Adoption Posts
                  </h3>
                  <Link href="/create">
                    <Button size="sm">
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
                      New Post
                    </Button>
                  </Link>
                </div>

                {/* Posts Grid */}
                {userAdoptionPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {userAdoptionPosts.map((post) => (
                      <DashboardCard key={post.id} padding="none">
                        {/* Post Image */}
                        <div className="relative h-40 overflow-hidden rounded-t-xl">
                          <Image
                            src={post.image}
                            alt={post.petName}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <StatusBadge status={post.status} />
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {post.petName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {post.petType} • {post.location}
                              </p>
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {post.views} views
                            </span>
                            <span className="flex items-center gap-1">
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
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              {post.inquiries} inquiries
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                              {post.createdAt}
                            </span>
                            <div className="flex items-center gap-1">
                              {" "}
                              <ActionButton variant="default" title="Edit post">
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </ActionButton>
                              <ActionButton
                                variant="danger"
                                title="Delete post"
                                onClick={() => handleDeleteClick(post)}
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </ActionButton>
                            </div>
                          </div>
                        </div>
                      </DashboardCard>
                    ))}
                  </div>
                ) : (
                  <DashboardCard>
                    <EmptyState
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      }
                      title="No adoption posts yet"
                      description="Create your first adoption post and help a pet find their forever home."
                      actionLabel="Create Adoption Post"
                      actionHref="/create"
                    />
                  </DashboardCard>
                )}
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Incoming Adoption Requests
                </h3>

                {adoptionRequests.length > 0 ? (
                  <div className="space-y-4">
                    {adoptionRequests.map((request) => (
                      <DashboardCard key={request.id}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Requester Info */}
                          <div className="flex items-start gap-3 flex-1">
                            {request.requesterAvatar ? (
                              <Image
                                src={request.requesterAvatar}
                                alt={request.requesterName}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <Avatar
                                name={request.requesterName}
                                size="lg"
                                className="shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-gray-900">
                                  {request.requesterName}
                                </h4>
                                {request.status === "approved" && (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                    Approved
                                  </span>
                                )}
                                {request.status === "rejected" && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                    Rejected
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {request.requesterEmail}
                              </p>
                              <div className="mt-2 flex items-center gap-2 text-sm">
                                <span className="text-gray-400">For:</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                  {request.petName}
                                </span>
                              </div>
                              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                {request.message}
                              </p>
                              <p className="mt-2 text-xs text-gray-400">
                                {request.createdAt}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col gap-2 sm:justify-start shrink-0">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex-1 sm:flex-none"
                              onClick={() => handleViewRequest(request)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View
                            </Button>
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="flex-1 sm:flex-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Approve
                                </Button>
                                <button className="hover:cursor-pointer flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors inline-flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
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
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </DashboardCard>
                    ))}
                  </div>
                ) : (
                  <DashboardCard>
                    <EmptyState
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      }
                      title="No adoption requests yet"
                      description="When someone is interested in adopting one of your pets, their request will appear here."
                      actionLabel="View Your Posts"
                      onAction={() => setActiveTab("posts")}
                    />
                  </DashboardCard>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Adoption Request Detail Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={handleCloseModal}
        title="Adoption Request Details"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Requester Info Section */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              {selectedRequest.requesterAvatar ? (
                <Image
                  src={selectedRequest.requesterAvatar}
                  alt={selectedRequest.requesterName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
              ) : (
                <Avatar name={selectedRequest.requesterName} size="xl" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedRequest.requesterName}
                </h3>
                <a
                  href={`mailto:${selectedRequest.requesterEmail}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {selectedRequest.requesterEmail}
                </a>
                <div className="mt-2 flex items-center gap-2">
                  {selectedRequest.status === "pending" && (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      Pending Review
                    </span>
                  )}
                  {selectedRequest.status === "approved" && (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      Approved
                    </span>
                  )}
                  {selectedRequest.status === "rejected" && (
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pet Info */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-emerald-600 font-medium">
                  Interested in adopting
                </p>
                <p className="text-lg font-semibold text-emerald-900">
                  {selectedRequest.petName}
                </p>
              </div>
            </div>

            {/* Message Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Message from Requester
              </h4>
              <div className="p-4 bg-white border border-gray-200 rounded-xl">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedRequest.message}
                </p>
              </div>
            </div>

            {/* Request Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Request submitted on {selectedRequest.createdAt}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="flex-1"
              >
                Close
              </Button>
              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={handleReject}
                    className="hover:cursor-pointer flex-1 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
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
                    Reject Request
                  </button>
                  <Button onClick={handleApprove} className="flex-1">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Approve Request
                  </Button>
                </>
              )}{" "}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Adoption Post"
        message={
          <p>
            Are you sure you want to delete the post for{" "}
            <span className="font-semibold">{postToDelete?.petName}</span>? This
            action cannot be undone.
          </p>
        }
        confirmLabel="Delete Post"
        cancelLabel="Keep Post"
        variant="danger"
      />
    </div>
  );
}
