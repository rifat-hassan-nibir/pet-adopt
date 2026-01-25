export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
              {/* Profile Header Skeleton */}
              <div className="text-center pb-6 border-b border-gray-100 space-y-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto animate-pulse" />
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
                <div className="h-4 w-48 bg-gray-100 rounded mx-auto animate-pulse" />
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-8 w-8 bg-gray-200 rounded mx-auto animate-pulse" />
                    <div className="h-3 w-12 bg-gray-100 rounded mx-auto animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Member Since Skeleton */}
              <div className="pt-2">
                <div className="h-3 w-32 bg-gray-100 rounded mx-auto animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Tabs Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm h-14 animate-pulse" />

            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  <div className="h-40 bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-100 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
