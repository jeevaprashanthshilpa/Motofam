import BikeCard from "./BikeCard";

export default function BikeGrid({ bikes = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div 
            key={n} 
            className="bg-surface-card border border-surface-border rounded-xl h-80 animate-pulse flex flex-col justify-between p-4"
          >
            <div className="bg-neutral-700/20 h-48 rounded-lg w-full mb-4"></div>
            <div className="space-y-2">
              <div className="bg-neutral-700/20 h-5 rounded w-3/4"></div>
              <div className="bg-neutral-700/20 h-4 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!bikes || bikes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-surface-card border border-surface-border rounded-full p-6 mb-4 text-surface-muted">
          🏍️
        </div>
        <h3 className="text-lg font-bold text-surface-text">No bikes found</h3>
        <p className="text-sm text-surface-muted mt-1 max-w-md">
          Try adjusting your search filters or check back later for newly verified inventory listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {bikes.map((bike) => (
        <BikeCard key={bike._id || bike.id} bike={bike} />
      ))}
    </div>
  );
}