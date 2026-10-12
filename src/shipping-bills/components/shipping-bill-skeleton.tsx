export function ShippingBillSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" role="status" aria-label="Loading Shipping Bill Form">
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-96 bg-gray-200 rounded" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-lg border border-gray-200 bg-gray-50 p-3" />
        ))}
      </div>

      <div className="h-10 w-72 bg-gray-200 rounded-lg" />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-14 bg-gray-100 rounded-lg" />
          <div className="h-14 bg-gray-100 rounded-lg" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="h-14 bg-gray-100 rounded-lg" />
          <div className="h-14 bg-gray-100 rounded-lg" />
          <div className="h-14 bg-gray-100 rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading Shipping Bill data from service...</span>
    </div>
  )
}
