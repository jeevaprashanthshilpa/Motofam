import { useState } from "react";
import { Search, SlidersHorizontal, Bike } from "lucide-react";
import { useListings } from "../../hooks/useListings";
import { useDebounce } from "../../hooks/useDebounce";
import StatusBadge from "../../components/common/StatusBadge";
import { Link } from "react-router-dom";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const { bikes, isLoading } = useListings({
    brand: selectedBrand,
    maxPrice,
    verifiedOnly,
  });

  const filteredBikes = bikes.filter((bike) =>
    bike.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-surface-border pb-6 space-y-2">
        <h1 className="text-2xl font-black text-surface-text tracking-tight">Browse Verified Two-Wheelers</h1>
        <p className="text-xs text-surface-muted">
          Explore admin-verified new and pre-owned bikes across India with transparent pricing and active 30-day verification[cite: 1].
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar (Span 1) */}
        <aside className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-surface-text">
              <SlidersHorizontal size={16} className="text-surface-primary" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedBrand("");
                setMaxPrice(300000);
                setVerifiedOnly(false);
                setSearchQuery("");
              }}
              className="text-xs text-surface-primary hover:underline font-semibold cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-xs focus:outline-none focus:border-surface-primary"
            >
              <option value="">All Brands</option>
              <option value="Royal Enfield">Royal Enfield</option>
              <option value="KTM">KTM</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Honda">Honda</option>
              <option value="Bajaj">Bajaj</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-surface-muted">
              <span>Max Budget</span>
              <span className="text-surface-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="500000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-surface-primary cursor-pointer"
            />
          </div>

          {/* Verified Only Checkbox */}
          <div className="pt-2 border-t border-surface-border">
            <label className="flex items-center gap-2 text-xs font-medium text-surface-text cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="accent-surface-primary w-4 h-4 rounded cursor-pointer"
              />
              <span>Admin Verified Only</span>
            </label>
          </div>
        </aside>

        {/* Main Listing Area (Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar Bar */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-surface-muted" />
            <input
              type="text"
              placeholder="Search by bike model, e.g. Classic 350, Duke..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-card border border-surface-border text-surface-text rounded-xl pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:border-surface-primary"
            />
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="text-center py-20 text-surface-muted text-xs">
              Loading verified listings...
            </div>
          ) : filteredBikes.length === 0 ? (
            <div className="text-center py-20 text-surface-muted text-xs space-y-2 bg-surface-card border border-surface-border rounded-2xl">
              <Bike size={32} className="mx-auto opacity-50 text-surface-primary" />
              <p className="font-bold text-surface-text text-sm">No bikes found</p>
              <p>Try adjusting your search query or filter options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredBikes.map((bike) => (
                <div
                  key={bike.id || bike._id}
                  className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-neutral-800">
                    <img
                      src={bike.image || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600"}
                      alt={bike.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <StatusBadge status={bike.verifiedStatus ? "Verified" : "Pending"} />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-surface-text text-base line-clamp-1">{bike.title}</h3>
                      <p className="text-xs text-surface-muted mt-1">
                        {bike.year} • {bike.mileage} km • {bike.location || "India"}
                      </p>
                      <div className="text-xl font-black text-surface-primary mt-2">
                        ₹{bike.price?.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <Link
                      to={`/bikes/${bike.id || bike._id}`}
                      className="w-full bg-surface-page border border-surface-border hover:border-surface-primary text-surface-text py-2.5 rounded-xl text-xs font-bold transition text-center block"
                    >
                      View Specifications & Contact →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}