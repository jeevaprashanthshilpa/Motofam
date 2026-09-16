import { useState } from "react";
import StatsCard from "../../components/dashboard/StatsCard";
import { ShieldCheck, Clock, Users, Bike, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalListings: 124,
    pendingApprovals: 8,
    activeUsers: 450,
    expiringSoon: 12,
  });

  const [pendingListings, setPendingListings] = useState(() => [
    {
      id: 101,
      title: "Yamaha R15 V4",
      year: 2023,
      price: 185000,
      status: "Pending",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: 102,
      title: "Honda CB350 Highness",
      year: 2022,
      price: 195000,
      status: "Pending",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleApprove = (id) => {
    setPendingListings((prev) => prev.filter((item) => (item._id || item.id) !== id));
    setStats((prev) => ({ ...prev, pendingApprovals: Math.max(0, prev.pendingApprovals - 1) }));
  };

  const handleReject = (id) => {
    setPendingListings((prev) => prev.filter((item) => (item._id || item.id) !== id));
    setStats((prev) => ({ ...prev, pendingApprovals: Math.max(0, prev.pendingApprovals - 1) }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <h1 className="text-2xl font-black text-surface-text tracking-tight">Admin Control Panel</h1>
          <p className="text-xs text-surface-muted mt-1">
            Manage listing approvals, monitor marketplace activity, and oversee 30-day verification cycles.
          </p>
        </div>
      </div>

      {/* Metrics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Listings"
          value={stats.totalListings}
          icon={<Bike size={20} />}
          trend="+12% this month"
          description="Active on marketplace"
        />
        <StatsCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={<Clock size={20} />}
          description="Requires admin review"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<Users size={20} />}
          trend="+24 new"
          description="Buyers & registered sellers"
        />
        <StatsCard
          title="30-Day Expiries"
          value={stats.expiringSoon}
          icon={<AlertTriangle size={20} />}
          description="Needs re-verification check"
        />
      </div>

      {/* Pending Approval Moderation Queue */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-surface-primary" />
            <h3 className="text-base font-bold text-surface-text">Pending Listing Approvals</h3>
          </div>
          <span className="text-xs bg-surface-primary/10 text-surface-primary font-bold px-2.5 py-1 rounded-full">
            {pendingListings.length} Awaiting Review
          </span>
        </div>

        {pendingListings.length === 0 ? (
          <div className="text-center py-12 text-surface-muted text-xs">
            All listing moderation queues are clear! No pending submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border text-xs uppercase text-surface-muted">
                  <th className="py-3 px-4 font-bold">Vehicle Details</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Submitted Expiry</th>
                  <th className="py-3 px-4 font-bold text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingListings.map((listing) => (
                  <tr key={listing._id || listing.id} className="border-b border-surface-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-surface-text text-sm">{listing.title}</div>
                      <div className="text-xs text-surface-muted">{listing.year} • ₹{listing.price?.toLocaleString("en-IN")}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Pending Review
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-surface-muted">
                      {new Date(listing.expiresAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(listing._id || listing.id)}
                          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(listing._id || listing.id)}
                          className="flex items-center gap-1 bg-surface-primary hover:bg-surface-primaryHover text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}