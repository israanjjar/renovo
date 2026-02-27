export default function ProjectDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
      <div className="h-10 bg-gray-200 rounded w-80 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-48 mb-4" />
      <div className="flex gap-2 mb-6">
        <div className="h-6 bg-gray-200 rounded-full w-24" />
        <div className="h-6 bg-gray-200 rounded-full w-24" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
