export default function PetDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Image Skeleton */}
          <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />

          {/* Details Content Skeleton */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm grow space-y-6">
              <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse" />

              <div className="flex gap-4">
                <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="h-12 flex-1 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 w-12 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Pets Skeleton Header */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden h-64 animate-pulse"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
