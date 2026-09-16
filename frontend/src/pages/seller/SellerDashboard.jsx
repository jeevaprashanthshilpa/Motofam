import { useState } from "react";
import { Link } from "react-router-dom";
import { Bike, Plus, Clock, AlertTriangle, Edit, Trash2, RefreshCw } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";
import StatusBadge from "../../components/common/StatusBadge";

export default function SellerDashboard() {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Royal Enfield Classic 350",
      year: 2023,
      price: 175000,
      status: "Verified",
      expiresInDays: 14,
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      title: "KTM Duke 250",
      year: 2022,
      price: 210000,
      status: "Pending",
      expiresInDays: 30,
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
    },
  ]);

  const handleReverify = (id) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expiresInDays: 30, status: "Verified" } : item
      )
    );
    alert("Listing re-verified successfully for another 30 days!");
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <h1 className="text-2xl font-black text-surface-text tracking-tight">Seller Dashboard</h1>
          <p className="text-xs text-surface-muted mt-1">
            Manage your active listings, track 30-day verification lifecycles, and submit new bikes.
          </p>
        </div>
        <Link
          to="/seller/add-bike"
          className="bg-surface-primary hover:bg-surface-primaryHover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>List New Bike</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Active Listings"
          value={listings.filter((l) => l.status === "Verified").length}
          icon={<Bike size={20} />}
          description="Live on marketplace"
        />
        <StatsCard
          title="Pending Moderation"
          value={listings.filter((l) => l.status === "Pending").length}
          icon={<Clock size={20} />}
          description="Awaiting admin approval"
        />
        <StatsCard
          title="Expiring Soon"
          value={listings.filter((l) => l.expiresInDays <= 15).length}
          icon={<AlertTriangle size={20} />}
          description="Requires re-verification"
        />
      </div>

      {/* Listings Management Table / Cards */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <h3 className="text-base font-bold text-surface-text">Your Vehicle Listings</h3>
          <span className="text-xs bg-surface-primary/10 text-surface-primary font-bold px-2.5 py-1 rounded-full">
            {listings.length} Total
          </span>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12 text-surface-muted text-xs space-y-3">
            <Bike size={32} className="mx-auto opacity-40 text-surface-primary" />
            <p className="font-semibold">No listings found.</p>
            <Link
              to="/seller/add-bike"
              className="inline-block bg-surface-primary text-white px-4 py-2 rounded-lg font-bold text-xs"
            >
              List Your First Bike
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((item) => (
              <div
                key={item.id}
                className="border border-surface-border rounded-xl p-4 bg-surface-page flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-surface-primary/50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-16 object-cover rounded-lg border border-surface-border"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-surface-text">{item.title}</h4>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-surface-muted">
                      {item.year} • ₹{item.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <Clock size={12} />
                      <span>Verification expires in {item.expiresInDays} days</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-surface-border">
                  <button
                    onClick={() => handleReverify(item.id)}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <RefreshCw size={14} /> Re-verify
                  </button>
                  <Link
                    to={`/seller/edit-bike/${item.id}`}
                    className="flex items-center gap-1 bg-surface-card border border-surface-border hover:border-surface-primary text-surface-text px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 bg-surface-primary hover:bg-surface-primaryHover text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}