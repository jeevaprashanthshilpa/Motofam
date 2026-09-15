import { AlertCircle, RefreshCw } from "lucide-react";

export default function ReVerificationCard({ listing, onReVerify }) {
  // Calculate remaining days out of the 30-day cycle
  const expiresAt = new Date(listing.expiresAt || Date.now() + 30 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const diffTime = expiresAt - today;
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const isUrgent = daysRemaining <= 5;

  return (
    <div className={`border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
      isUrgent 
        ? "bg-surface-primary/5 border-surface-primary/30" 
        : "bg-surface-card border-surface-border"
    }`}>
      {/* Listing Summary & Countdown Info */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-full ${isUrgent ? "bg-surface-primary text-white" : "bg-neutral-800 text-surface-muted"}`}>
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-surface-text">{listing.title}</h4>
          <p className="text-xs text-surface-muted mt-0.5">
            {daysRemaining > 0 ? (
              <span>Verification expires in <strong className={isUrgent ? "text-surface-primary font-bold" : "text-surface-text"}>{daysRemaining} days</strong></span>
            ) : (
              <span className="text-surface-primary font-bold">Verification expired. Listing deactivated.</span>
            )}
          </p>
        </div>
      </div>

      {/* Instant Action CTA */}
      <button
        onClick={() => onReVerify(listing._id || listing.id)}
        className="flex items-center gap-1.5 bg-surface-primary hover:bg-surface-primaryHover text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
      >
        <RefreshCw size={14} />
        <span>Confirm Availability</span>
      </button>
    </div>
  );
}