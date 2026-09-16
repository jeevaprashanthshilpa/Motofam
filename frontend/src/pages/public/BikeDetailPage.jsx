import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, MessageSquare, ShieldCheck, Calendar, Gauge, MapPin, ArrowLeft, Scale } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";
import { useCompareStore } from "../../store/useCompareStore";

export default function BikeDetailPage() {
  const { id } = useParams();

  // Mock bike detail state (in a full implementation, fetched via ID using Axios)
  const [bike] = useState({
    id: id || 1,
    title: "Royal Enfield Classic 350 Signals Edition",
    brand: "Royal Enfield",
    year: 2023,
    price: 185000,
    mileage: 6500,
    location: "Bengaluru, Karnataka",
    status: "Verified",
    ownership: "1st Owner",
    insurance: "Comprehensive (Valid till Aug 2027)",
    tyreCondition: "Good (80% tread remaining)",
    serviceHistory: "Authorized Service Center",
    sellerName: "Vikram Malhotra",
    sellerPhone: "+919876543210",
    sellerWhatsApp: "919876543210",
    expiresAt: "2026-10-15",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1609630875172-2e3fb652324a?auto=format&fit=crop&q=80&w=1000"
    ],
  });

  const [activeImage, setActiveImage] = useState(bike.images[0]);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Overview (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Display Image */}
          <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-sm h-80 sm:h-[420px] relative">
            <img
              src={activeImage}
              alt={bike.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <StatusBadge status={bike.status} />
            </div>
          </div>

          {/* Thumbnail Selector */}
          <div className="grid grid-cols-3 gap-4">
            {bike.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImage === img ? "border-surface-primary" : "border-surface-border opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Detailed Specifications Card */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-surface-text border-b border-surface-border pb-3">
              Vehicle Specifications & Condition
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-page border border-surface-border">
                <span className="text-surface-muted">Ownership</span>
                <span className="font-bold text-surface-text">{bike.ownership}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-page border border-surface-border">
                <span className="text-surface-muted">Insurance Status</span>
                <span className="font-bold text-surface-text">{bike.insurance}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-page border border-surface-border">
                <span className="text-surface-muted">Tyre Condition</span>
                <span className="font-bold text-surface-text">{bike.tyreCondition}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-page border border-surface-border">
                <span className="text-surface-muted">Service Record</span>
                <span className="font-bold text-surface-text">{bike.serviceHistory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Verification, & CTAs (Span 1) */}
        <div className="space-y-6">
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
            {/* Title & Price */}
            <div className="space-y-2 border-b border-surface-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted">
                {bike.brand}
              </span>
              <h1 className="text-xl font-black text-surface-text leading-snug">
                {bike.title}
              </h1>
              <div className="text-3xl font-black text-surface-primary pt-2">
                ₹{bike.price.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-page border border-surface-border">
                <Calendar size={16} className="text-surface-primary" />
                <div>
                  <div className="text-surface-muted">Year</div>
                  <div className="font-bold text-surface-text">{bike.year}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-page border border-surface-border">
                <Gauge size={16} className="text-surface-primary" />
                <div>
                  <div className="text-surface-muted">Driven</div>
                  <div className="font-bold text-surface-text">{bike.mileage} km</div>
                </div>
              </div>
            </div>

            {/* Location & Trust Badge */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-surface-muted">
                <MapPin size={16} className="text-surface-primary shrink-0" />
                <span>{bike.location}</span>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">Admin Verified Listing</div>
                  <p className="text-surface-muted">RC and seller identity checked. 30-day active verification cycle enforced.</p>
                </div>
              </div>
            </div>

            {/* Contact Action Buttons (Click-to-Call & WhatsApp) */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${bike.sellerWhatsApp}?text=Hi,%20I%20am%20interested%20in%20your%20verified%20${encodeURIComponent(bike.title)}%20listed%20on%20THEMOTOFAM.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${bike.sellerPhone}`}
                className="w-full bg-surface-primary hover:bg-surface-primaryHover text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Phone size={16} />
                <span>Call Seller Directly</span>
              </a>

              <button
                type="button"
                onClick={handleCompareToggle}
                className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
                  inCompare
                    ? "bg-surface-primary/10 border-surface-primary text-surface-primary"
                    : "border-surface-border text-surface-text hover:border-surface-primary hover:text-surface-primary"
                }`}
              >
                <Scale size={16} />
                <span>{inCompare ? "Added to Compare" : "Add to Compare"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}