import StatusBadge from "../common/StatusBadge";
import { Edit, Trash2, Eye } from "lucide-react";

export default function ListingTableRow({ listing, onEdit, onDelete, onView }) {
  return (
    <tr className="border-b border-surface-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
      {/* Bike Info */}
      <td className="py-3 px-4 flex items-center gap-3">
        <img
          src={listing.image || "/assets/images/placeholder-bike.png"}
          alt={listing.title}
          className="w-12 h-10 object-cover rounded-lg border border-surface-border"
        />
        <div>
          <div className="font-bold text-surface-text text-sm truncate max-w-xs">
            {listing.title}
          </div>
          <div className="text-xs text-surface-muted">
            {listing.year} • ₹{listing.price?.toLocaleString("en-IN")}
          </div>
        </div>
      </td>

      {/* Verification Status */}
      <td className="py-3 px-4">
        <StatusBadge status={listing.status || "Pending"} />
      </td>

      {/* 30-Day Expiry / Audit Info */}
      <td className="py-3 px-4 text-xs text-surface-muted">
        {listing.expiresAt ? new Date(listing.expiresAt).toLocaleDateString("en-IN") : "Active"}
      </td>

      {/* Action Buttons */}
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {onView && (
            <button
              onClick={() => onView(listing)}
              aria-label="View Details"
              className="p-1.5 rounded-lg border border-surface-border hover:bg-neutral-200 dark:hover:bg-neutral-700 text-surface-text transition cursor-pointer"
            >
              <Eye size={16} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(listing)}
              aria-label="Edit Listing"
              className="p-1.5 rounded-lg border border-surface-border hover:bg-neutral-200 dark:hover:bg-neutral-700 text-surface-text transition cursor-pointer"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(listing._id || listing.id)}
              aria-label="Delete Listing"
              className="p-1.5 rounded-lg border border-surface-border hover:bg-surface-primary/20 text-surface-primary transition cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}