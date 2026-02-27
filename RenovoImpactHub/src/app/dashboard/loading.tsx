export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="h-10 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mb-3">
            <div className="h-4 bg-gray-200 rounded w-40 mb-1" />
            <div className="h-2 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
      <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
