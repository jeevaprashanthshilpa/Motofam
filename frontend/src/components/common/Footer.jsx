import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-header text-surface-headerText border-t border-surface-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-xl font-black tracking-tight text-white">
              THEMOTO<span className="text-surface-primary">FAM</span>
            </span>
            <p className="text-xs text-surface-muted leading-relaxed">
              India&apos;s trusted platform for verified two-wheeler listings. Buy and sell new, used, and pre-owned bikes with complete transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Marketplace</h4>
            <ul className="space-y-2 text-xs text-surface-muted">
              <li>
                <a href="/bikes" className="hover:text-surface-primary transition">Browse Bikes</a>
              </li>
              <li>
                <a href="/compare" className="hover:text-surface-primary transition">Compare Specs</a>
              </li>
              <li>
                <a href="/seller/add-bike" className="hover:text-surface-primary transition">Sell Your Bike</a>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Trust & Safety</h4>
            <ul className="space-y-2 text-xs text-surface-muted">
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-surface-primary" />
                <span>Admin Verified Listings</span>
              </li>
              <li>
                <span className="text-surface-muted">30-Day Active Re-Verification</span>
              </li>
              <li>
                <span className="text-surface-muted">Secure Seller Contacts</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Notice</h4>
            <p className="text-[11px] text-surface-muted leading-relaxed">
              The platform operates as a discovery marketplace. Transport, payments, and RTO ownership transfers are coordinated directly between buyers and sellers.
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-surface-muted gap-4">
          <p>© {new Date().getFullYear()} THEMOTOFAM. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-surface-primary fill-surface-primary" /> for riders across India.
          </p>
        </div>
      </div>
    </footer>
  );
}