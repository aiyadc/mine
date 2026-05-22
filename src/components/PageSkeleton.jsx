function PageSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="flex space-x-8">
              <div className="h-4 bg-gray-200 rounded w-10" />
              <div className="h-4 bg-gray-200 rounded w-10" />
              <div className="h-4 bg-gray-200 rounded w-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[rgba(255,179,255,0.2)] to-[#f7f8fa]">
        <div className="min-h-[369px] flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="flex justify-start items-end pb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full mr-4" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-40" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 space-y-4 shadow-sm">
                    <div className="h-48 bg-gray-200 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;