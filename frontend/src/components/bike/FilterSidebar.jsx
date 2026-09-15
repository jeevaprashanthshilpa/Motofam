import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

export default function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    brand: "",
    maxPrice: 300000,
    minYear: 2018,
    verifiedOnly: false,
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleReset = () => {
    const resetValues = { brand: "", maxPrice: 300000, minYear: 2018, verifiedOnly: false };
    setFilters(resetValues);
    if (onFilterChange) onFilterChange(resetValues);
  };

  return (
    <aside className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-sm w-full lg:w-72 shrink-0 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div className="flex items-center gap-2 text-surface-text font-bold">
          <Filter size={18} className="text-surface-primary" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-surface-muted hover:text-surface-primary flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
          Brand
        </label>
        <select
          value={filters.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
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
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-surface-muted">
          <span>Max Price</span>
          <span className="text-surface-primary font-extrabold">₹{filters.maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min="50000"
          max="500000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
          className="w-full accent-surface-primary cursor-pointer"
        />
      </div>

      {/* Minimum Year Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
          Minimum Model Year
        </label>
        <input
          type="number"
          min="2010"
          max="2026"
          value={filters.minYear}
          onChange={(e) => handleChange("minYear", Number(e.target.value))}
          className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
        />
      </div>

      {/* Admin Verified Toggle */}
      <div className="pt-2 border-t border-surface-border">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => handleChange("verifiedOnly", e.target.checked)}
            className="w-4 h-4 accent-surface-primary rounded border-surface-border cursor-pointer"
          />
          <span className="text-sm font-semibold text-surface-text">Admin Verified Only</span>
        </label>
      </div>
    </aside>
  );
}