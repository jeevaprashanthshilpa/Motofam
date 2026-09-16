import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EditBikePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    year: 2023,
    price: 175000,
    mileage: 12000,
    ownership: "1st Owner",
    insurance: "Comprehensive",
    tyreCondition: "Good (70-90%)",
    serviceHistory: "Authorized Service Center",
  });

  useEffect(() => {
    // In a full implementation, fetch existing bike details by ID using Axios
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate backend update request
    setTimeout(() => {
      try {
        setIsSubmitting(false);
        alert("Bike listing updated successfully!");
        navigate("/seller/dashboard");
      } catch (error) {
        console.error("Update failed", error);
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* Back Navigation */}
      <div>
        <button
          onClick={() => navigate("/seller/dashboard")}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-surface-muted hover:text-surface-primary transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Seller Dashboard</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="border-b border-surface-border pb-6 space-y-1">
        <h1 className="text-2xl font-black text-surface-text tracking-tight">Edit Bike Listing #{id}</h1>
        <p className="text-xs text-surface-muted">
          Update your vehicle details, pricing, or specification status.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Listing Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Expected Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
            />
          </div>

          {/* Mileage */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Kilometers Driven (Km) *
            </label>
            <input
              type="number"
              name="mileage"
              required
              value={formData.mileage}
              onChange={handleChange}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
            />
          </div>

          {/* Insurance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Insurance Status *
            </label>
            <select
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
            >
              <option value="Comprehensive">Comprehensive</option>
              <option value="Third Party">Third Party</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Ownership */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Ownership *
            </label>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
            >
              <option value="1st Owner">1st Owner</option>
              <option value="2nd Owner">2nd Owner</option>
              <option value="3rd+ Owner">3rd+ Owner</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
          <button
            type="button"
            onClick={() => navigate("/seller/dashboard")}
            className="bg-neutral-200 dark:bg-neutral-800 text-surface-text hover:bg-neutral-300 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-surface-primary hover:bg-surface-primaryHover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}