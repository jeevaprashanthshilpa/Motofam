import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowLeft, ShieldCheck, Check, Plus } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

export default function ComparePage() {
  // Mock comparison bikes state (in a full app, pulled from useCompareStore Zustand store)
  const [comparedBikes, setComparedBikes] = useState([
    {
      id: 1,
      title: "Royal Enfield Classic 350",
      brand: "Royal Enfield",
      year: 2023,
      price: 185000,
      mileage: 6500,
      engine: "349cc",
      power: "20.2 bhp",
      ownership: "1st Owner",
      insurance: "Comprehensive",
      location: "Bengaluru",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      title: "KTM Duke 250",
      brand: "KTM",
      year: 2022,
      price: 210000,
      mileage: 8500,
      engine: "248.8cc",
      power: "29.6 bhp",
      ownership: "1st Owner",
      insurance: "Comprehensive",
      location: "Mumbai",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
    },
  ]);

  const handleRemove = (id) => {
    setComparedBikes((prev) => prev.filter((bike) => bike.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Back Navigation */}
      <div>
        <Link
          to="/bikes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-surface-muted hover:text-surface-primary transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-text tracking-tight">Side-by-Side Comparison</h1>
          <p className="text-xs text-surface-muted mt-1">
            Compare engine specifications, pricing, ownership counts, and mileage across selected two-wheelers[cite: 1].
          </p>
        </div>
      </div>

      {comparedBikes.length === 0 ? (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-16 text-center space-y-4 shadow-sm">
          <p className="text-sm font-bold text-surface-text">No bikes selected for comparison.</p>
          <p className="text-xs text-surface-muted">Browse the marketplace and add up to 4 bikes to compare specs side by side[cite: 1].</p>
          <Link
            to="/bikes"
            className="inline-block bg-surface-primary hover:bg-surface-primaryHover text-white px-6 py-2.5 rounded-lg text-xs font-bold transition shadow-sm"
          >
            Browse Bikes
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-6 pb-4">
            {comparedBikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-6 relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(bike.id)}
                  aria-label="Remove from comparison"
                  className="absolute top-4 right-4 bg-surface-page border border-surface-border text-surface-muted hover:text-surface-primary p-1.5 rounded-full transition cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Bike Card Header */}
                <div className="space-y-3">
                  <div className="h-40 rounded-xl overflow-hidden bg-neutral-800 border border-surface-border">
                    <img src={bike.image} alt={bike.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-surface-muted">
                      {bike.brand}
                    </span>
                    <h3 className="font-bold text-surface-text text-base line-clamp-1">{bike.title}</h3>
                    <div className="text-xl font-black text-surface-primary mt-1">
                      ₹{bike.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="pt-2">
                    <StatusBadge status={bike.status} />
                  </div>
                </div>

                {/* Specs Rows */}
                <div className="space-y-3 text-xs border-t border-surface-border pt-4">
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Model Year</span>
                    <span className="font-bold text-surface-text">{bike.year}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Engine Displacement</span>
                    <span className="font-bold text-surface-text">{bike.engine}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Max Power</span>
                    <span className="font-bold text-surface-text">{bike.power}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Kilometers Driven</span>
                    <span className="font-bold text-surface-text">{bike.mileage} km</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Ownership</span>
                    <span className="font-bold text-surface-text">{bike.ownership}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-border/50">
                    <span className="text-surface-muted">Insurance Status</span>
                    <span className="font-bold text-surface-text">{bike.insurance}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-surface-muted">Location</span>
                    <span className="font-bold text-surface-text">{bike.location}</span>
                  </div>
                </div>

                {/* View Detail Link */}
                <Link
                  to={`/bikes/${bike.id}`}
                  className="w-full bg-surface-page border border-surface-border hover:border-surface-primary text-surface-text py-2.5 rounded-xl text-xs font-bold transition text-center block"
                >
                  View Full Details →
                </Link>
              </div>
            ))}

            {/* Add More Slot (if fewer than 4 bikes) */}
            {comparedBikes.length < 4 && (
              <Link
                to="/bikes"
                className="border-2 border-dashed border-surface-border rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-surface-primary transition bg-surface-page space-y-3 min-h-[400px]"
              >
                <div className="bg-surface-primary/10 text-surface-primary p-3 rounded-full">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-sm text-surface-text">Add Bike to Compare</span>
                <span className="text-xs text-surface-muted max-w-[200px]">
                  Select another vehicle from the catalog to run a side-by-side spec check.
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}