export default function StepBasicInfo({ formData, updateFormData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h3 className="text-lg font-bold text-surface-text">Step 1: Basic Information</h3>
        <p className="text-xs text-surface-muted mt-1">
          Provide the foundational details of the two-wheeler you want to list.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Brand */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Brand *
          </label>
          <select
            required
            value={formData.brand || ""}
            onChange={(e) => updateFormData({ brand: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          >
            <option value="">Select Brand</option>
            <option value="Royal Enfield">Royal Enfield</option>
            <option value="KTM">KTM</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Honda">Honda</option>
            <option value="Bajaj">Bajaj</option>
            <option value="TVS">TVS</option>
          </select>
        </div>

        {/* Model Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Model Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Classic 350, Duke 250"
            value={formData.title || ""}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          />
        </div>

        {/* Model Year */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Manufacturing Year *
          </label>
          <input
            type="number"
            required
            min="2000"
            max="2026"
            placeholder="e.g. 2022"
            value={formData.year || ""}
            onChange={(e) => updateFormData({ year: Number(e.target.value) })}
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
            required
            min="10000"
            step="1000"
            placeholder="e.g. 175000"
            value={formData.price || ""}
            onChange={(e) => updateFormData({ price: Number(e.target.value) })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          />
        </div>

        {/* Mileage */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Kilometers Driven (Km) *
          </label>
          <input
            type="number"
            required
            min="0"
            placeholder="e.g. 12500"
            value={formData.mileage || ""}
            onChange={(e) => updateFormData({ mileage: Number(e.target.value) })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-4 border-t border-surface-border">
        <button
          type="submit"
          className="bg-surface-primary hover:bg-surface-primaryHover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}