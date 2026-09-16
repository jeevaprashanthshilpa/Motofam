import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // buyer or seller
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate backend registration request
    setTimeout(() => {
      try {
        const mockUser = {
          name,
          email,
          role,
        };
        const mockToken = "mock-jwt-token-motofam-2026-reg";

        login(mockUser, mockToken);

        // Redirect based on role
        if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          navigate("/bikes");
        }
      } catch {
        setError("Registration failed. Please try again with valid details.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block text-2xl font-black tracking-tight text-surface-text">
            THEMOTO<span className="text-surface-primary">FAM</span>
          </Link>
          <p className="text-xs text-surface-muted">
            Create an account to buy or list verified two-wheelers.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-surface-page p-1 rounded-xl border border-surface-border text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`py-2.5 rounded-lg transition cursor-pointer ${role === "buyer" ? "bg-surface-primary text-white shadow-sm" : "text-surface-muted hover:text-surface-text"}`}
          >
            Register as Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`py-2.5 rounded-lg transition cursor-pointer ${role === "seller" ? "bg-surface-primary text-white shadow-sm" : "text-surface-muted hover:text-surface-text"}`}
          >
            Register as Seller
          </button>
        </div>

        {error && (
          <div className="bg-surface-primary/10 border border-surface-primary/20 text-surface-primary text-xs p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3 text-surface-muted" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-surface-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-surface-muted" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-surface-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-surface-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-surface-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-surface-primary hover:bg-surface-primaryHover text-white py-3 rounded-lg text-sm font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? "Creating Account..." : `Create ${role === "seller" ? "Seller" : "Buyer"} Account`}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-surface-border text-xs text-surface-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-surface-primary font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}