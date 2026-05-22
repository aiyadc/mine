function BlogSkeleton() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="flex flex-wrap gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-full px-6" />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="h-5 bg-blue-100 rounded px-3" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-5 bg-gray-100 rounded px-3" />
                    <div className="h-5 bg-gray-100 rounded px-3" />
                    <div className="h-5 bg-gray-100 rounded px-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSkeleton;