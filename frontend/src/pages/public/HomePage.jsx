import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Bike, ArrowRight, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/bikes?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/bikes");
    }
  };

  const featuredBikes = [
    {
      id: 1,
      title: "Royal Enfield Classic 350 Signals",
      year: 2023,
      price: 185000,
      mileage: 6500,
      location: "Bengaluru",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
      sellerPhone: "+919876543210",
      sellerWhatsApp: "919876543210",
    },
    {
      id: 2,
      title: "KTM Duke 250",
      year: 2022,
      price: 210000,
      mileage: 8500,
      location: "Mumbai",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
      sellerPhone: "+919876543211",
      sellerWhatsApp: "919876543211",
    },
    {
      id: 3,
      title: "Yamaha MT-15 V2",
      year: 2023,
      price: 155000,
      mileage: 4200,
      location: "Delhi",
      status: "Verified",
      image: "https://images.unsplash.com/photo-1609630875172-2e3fb652324a?auto=format&fit=crop&q=80&w=600",
      sellerPhone: "+919876543212",
      sellerWhatsApp: "919876543212",
    },
  ];

  const topBrands = [
    { name: "Royal Enfield", count: "42+ Bikes", logo: "🏍️" },
    { name: "KTM", count: "28+ Bikes", logo: "⚡" },
    { name: "Yamaha", count: "35+ Bikes", logo: "🏁" },
    { name: "Honda", count: "50+ Bikes", logo: "🛵" },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-surface-header text-surface-headerText px-6 py-20 border-b border-surface-border text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-surface-primary/10 text-surface-primary border border-surface-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <ShieldCheck size={14} />
            <span>India&apos;s Most Trusted Verified Two-Wheeler Marketplace[cite: 1]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Find & Buy <span className="text-surface-primary">Admin-Verified</span> Bikes with Confidence[cite: 1]
          </h1>

          <p className="text-xs sm:text-sm text-surface-muted max-w-2xl mx-auto leading-relaxed">
            Eliminate classified risks. Every listing on THEMOTOFAM undergoes strict document moderation and an active 30-day re-verification cycle[cite: 1].
          </p>

          {/* Hero Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-surface-card border border-surface-border rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center flex-1 px-3 gap-2">
              <Search size={18} className="text-surface-muted shrink-0" />
              <input
                type="text"
                placeholder="Search by brand, model, or city (e.g. Classic 350, Bengaluru)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-surface-text text-xs sm:text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-surface-primary hover:bg-surface-primaryHover text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer shrink-0"
            >
              Search Bikes
            </button>
          </form>
        </div>
      </section>

      {/* Top Brands Quick Browse */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-surface-text tracking-tight">Explore Top Brands</h2>
            <p className="text-xs text-surface-muted mt-0.5">Browse verified pre-owned and new motorcycles by manufacturer.</p>
          </div>
          <Link to="/bikes" className="text-xs font-bold text-surface-primary hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topBrands.map((brand, idx) => (
            <Link
              key={idx}
              to={`/bikes?brand=${encodeURIComponent(brand.name)}`}
              className="bg-surface-card border border-surface-border rounded-2xl p-5 hover:border-surface-primary transition text-center space-y-2 shadow-sm group cursor-pointer block"
            >
              <div className="text-3xl">{brand.logo}</div>
              <h3 className="font-bold text-sm text-surface-text group-hover:text-surface-primary transition">{brand.name}</h3>
              <p className="text-xs text-surface-muted">{brand.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Verified Bikes Feed */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-surface-text tracking-tight">Recently Verified Inventory</h2>
            <p className="text-xs text-surface-muted mt-0.5">Listings cleared by admin moderation within the past week[cite: 1].</p>
          </div>
          <Link to="/bikes" className="text-xs font-bold text-surface-primary hover:underline flex items-center gap-1">
            <span>Explore Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredBikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-neutral-800">
                <img
                  src={bike.image}
                  alt={bike.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={bike.status} />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-surface-text text-base line-clamp-1">{bike.title}</h3>
                  <p className="text-xs text-surface-muted mt-1">
                    {bike.year} • {bike.mileage} km • {bike.location}
                  </p>
                  <div className="text-xl font-black text-surface-primary mt-2">
                    ₹{bike.price.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-surface-border">
                  <a
                    href={`tel:${bike.sellerPhone}`}
                    className="flex items-center justify-center gap-1 py-2 px-3 border border-surface-border text-surface-text rounded-xl text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={`https://wa.me/${bike.sellerWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="bg-surface-primary/10 text-surface-primary p-3 rounded-2xl w-fit">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-base text-surface-text">Strict Admin Approvals</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Every vehicle registration certificate (RC) and seller identity is verified before publication to ensure total peace of mind[cite: 1].
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-surface-primary/10 text-surface-primary p-3 rounded-2xl w-fit">
              <Bike size={24} />
            </div>
            <h3 className="font-bold text-base text-surface-text">30-Day Re-Verification</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Listings expire and require seller re-confirmation every 30 days, completely eliminating ghost ads and sold-out inventory[cite: 1].
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-surface-primary/10 text-surface-primary p-3 rounded-2xl w-fit">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-bold text-base text-surface-text">Direct & Secure Deals</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Connect directly with verified owners via phone or WhatsApp without hidden intermediary brokerage fees[cite: 1].
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}