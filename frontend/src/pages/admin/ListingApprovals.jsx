import { useState } from "react";
import { ShieldCheck, CheckCircle, XCircle, FileText, ExternalLink } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

export default function ListingApprovals() {
  const [approvals, setApprovals] = useState([
    {
      id: 201,
      title: "Royal Enfield Hunter 350",
      sellerName: "Rahul Sharma",
      year: 2023,
      price: 160000,
      mileage: 4500,
      submittedDate: "2026-09-12",
      rcDocument: "#",
      idProof: "#",
    },
    {
      id: 202,
      title: "TVS Apache RTR 160 4V",
      sellerName: "Amit Verma",
      year: 2022,
      price: 120000,
      mileage: 11000,
      submittedDate: "2026-09-13",
      rcDocument: "#",
      idProof: "#",
    },
  ]);

  const handleAction = (id, actionType) => {
    setApprovals((prev) => prev.filter((item) => (item._id || item.id) !== id));
    // In a full implementation, this triggers an API call to update listing status
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-surface-border pb-6">
        <h1 className="text-2xl font-black text-surface-text tracking-tight">Listing Approval Queue</h1>
        <p className="text-xs text-surface-muted mt-1">
          Review vehicle registration certificates (RC) and seller ID proofs before clearing listings for public marketplace view[cite: 1].
        </p>
      </div>

      {/* Approvals Table / Card Stream */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-surface-primary" />
            <h3 className="text-base font-bold text-surface-text">Awaiting Admin Moderation</h3>
          </div>
          <span className="text-xs bg-surface-primary/10 text-surface-primary font-bold px-2.5 py-1 rounded-full">
            {approvals.length} Pending
          </span>
        </div>

        {approvals.length === 0 ? (
          <div className="text-center py-16 text-surface-muted text-xs space-y-2">
            <ShieldCheck size={36} className="mx-auto text-emerald-600 opacity-60" />
            <p className="font-semibold text-sm">All caught up!</p>
            <p>No pending listings require verification review at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvals.map((item) => (
              <div
                key={item._id || item.id}
                className="border border-surface-border rounded-xl p-5 bg-surface-page flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition hover:border-surface-primary/50"
              >
                {/* Bike & Seller Overview */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-surface-text">{item.title}</h4>
                    <StatusBadge status="Pending" />
                  </div>
                  <p className="text-xs text-surface-muted">
                    Seller: <strong className="text-surface-text">{item.sellerName}</strong> • Year: {item.year} • Driven: {item.mileage} km • Price: ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[11px] text-surface-muted">
                    Submitted on: {item.submittedDate}
                  </p>
                </div>

                {/* Verification Document Links (Private Admin View) */}
                <div className="flex items-center gap-3">
                  <a
                    href={item.rcDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-border bg-surface-card text-xs font-bold text-surface-text hover:border-surface-primary transition"
                  >
                    <FileText size={14} className="text-surface-primary" />
                    <span>View RC</span>
                    <ExternalLink size={12} className="text-surface-muted" />
                  </a>

                  <a
                    href={item.idProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-border bg-surface-card text-xs font-bold text-surface-text hover:border-surface-primary transition"
                  >
                    <ShieldCheck size={14} className="text-surface-primary" />
                    <span>View ID Proof</span>
                    <ExternalLink size={12} className="text-surface-muted" />
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-surface-border">
                  <button
                    onClick={() => handleAction(item._id || item.id, "approve")}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(item._id || item.id, "reject")}
                    className="flex items-center gap-1 bg-surface-primary hover:bg-surface-primaryHover text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <XCircle size={14} /> Reject
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