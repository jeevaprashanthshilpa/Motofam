import { Link } from "react-router-dom";
import { X, ArrowRight, Scale } from "lucide-react";
import { useCompareStore } from "../../store/useCompareStore";

export default function CompareDrawer() {
  // Ensure comparedBikes defaults to an empty array even if store is empty/loading
  const comparedBikes = useCompareStore((state) => state.comparedBikes) || [];
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const clearCompare = useCompareStore((state) => state.clearCompare);

  if (comparedBikes.length === 0) {
    return null; // Hide drawer if nothing is selected for comparison
  }

  return (
    <aside aria-label="Comparison Tray" className="fixed bottom-0 left-0 right-0 z-50 bg-surface-card border-t border-surface-border shadow-2xl p-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Tray Header info */}
        <div className="flex items-center gap-3">
          <div className="bg-surface-primary/10 text-surface-primary p-2.5 rounded-xl">
            <Scale size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-surface-text">
              Compare Bikes ({comparedBikes.length}/4)
            </h4>
            <p className="text-xs text-surface-muted">
              Select up to 4 bikes to run a side-by-side spec check.
            </p>
          </div>
        </div>

        {/* Selected Bikes Thumbnails Preview */}
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {comparedBikes.map((bike) => (
            <div
              key={bike.id || bike._id}
              className="relative flex items-center gap-2 bg-surface-page border border-surface-border rounded-xl p-2 pr-3 shrink-0"
            >
              <img
                src={bike.image || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=200"}
                alt={bike.title}
                className="w-10 h-10 object-cover rounded-lg border border-surface-border"
              />
              <div className="text-left max-w-[120px]">
                <div className="font-bold text-xs text-surface-text truncate">{bike.title}</div>
                <div className="text-[10px] text-surface-primary font-bold">₹{bike.price?.toLocaleString("en-IN")}</div>
              </div>
              <button
                onClick={() => removeFromCompare(bike.id || bike._id)}
                aria-label="Remove bike from comparison"
                className="text-surface-muted hover:text-surface-primary transition p-1 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-surface-muted hover:text-surface-text px-3 py-2 font-semibold transition cursor-pointer"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className="bg-surface-primary hover:bg-surface-primaryHover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </aside>
  );
}