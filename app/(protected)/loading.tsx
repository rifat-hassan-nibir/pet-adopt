export default function ProtectedLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
              <div className="text-center pb-6 border-b border-gray-100 space-y-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto animate-pulse" />
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
                <div className="h-4 w-48 bg-gray-100 rounded mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-8 w-8 bg-gray-200 rounded mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm h-14 animate-pulse" />
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-64 shadow-sm animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
