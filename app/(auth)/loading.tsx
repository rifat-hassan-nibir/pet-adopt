export default function AuthLoading() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-3">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        <div className="h-4 w-64 bg-gray-100 rounded mx-auto animate-pulse" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-100 border border-gray-200 rounded-xl animate-pulse" />
          </div>
        ))}

        {/* Button Skeleton */}
        <div className="h-12 w-full bg-emerald-100 rounded-xl animate-pulse pt-2" />

        {/* Footer Link Skeleton */}
        <div className="h-4 w-40 bg-gray-100 rounded mx-auto animate-pulse" />
      </div>

      {/* Social Login Divider Skeleton */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      {/* Social Button Skeleton */}
      <div className="h-12 w-full bg-gray-50 border border-gray-200 rounded-xl animate-pulse" />
    </div>
  );
}
