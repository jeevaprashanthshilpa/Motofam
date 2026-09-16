import { Phone, MessageSquare, Scale } from "lucide-react";
import { useCompareStore } from "../../store/useCompareStore";

export default function BikeCard({ bike }) {
  const bikeId = bike.id || bike._id;
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const inCompare = useCompareStore((state) => state.isInCompare(bikeId));

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(bikeId);
    } else if (!addToCompare(bike)) {
      alert("You can compare up to 4 bikes at a time. Remove one to add another.");
    }
  };

  return (
    <div className="bg-surface-card border border-surface-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
      {/* Bike Image & Verification Status Badge */}
      <div className="relative h-48 bg-neutral-800">
        <img 
          src={bike.image || "/assets/images/placeholder-bike.png"} 
          alt={bike.title} 
          className="w-full h-full object-cover" 
        />
        <span className="absolute top-3 left-3 bg-surface-primary text-white text-xs font-bold px-2.5 py-1 rounded shadow">
          {bike.verifiedStatus ? "Admin Verified" : "Pending Approval"}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-surface-text line-clamp-1">{bike.title}</h3>
          <p className="text-xs text-surface-muted mt-1">
            {bike.year} • {bike.mileage} km • {bike.location}
          </p>
          <div className="text-xl font-extrabold text-surface-primary mt-2">
            ₹{bike.price?.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Add to Compare Toggle */}
        <button
          type="button"
          onClick={handleCompareToggle}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold border transition mt-3 cursor-pointer ${
            inCompare
              ? "bg-surface-primary/10 border-surface-primary text-surface-primary"
              : "border-surface-border text-surface-muted hover:border-surface-primary hover:text-surface-primary"
          }`}
        >
          <Scale size={14} />
          {inCompare ? "Added to Compare" : "Add to Compare"}
        </button>

        {/* Communication CTAs: Call & WhatsApp */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-surface-border">
          <a
            href={`tel:${bike.sellerPhone}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 border border-surface-border text-surface-text rounded-md text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Phone size={15} /> Call
          </a>
          <a
            href={`https://wa.me/${bike.sellerWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-primary hover:bg-surface-primaryHover text-white rounded-md text-sm font-semibold transition"
          >
            <MessageSquare size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}