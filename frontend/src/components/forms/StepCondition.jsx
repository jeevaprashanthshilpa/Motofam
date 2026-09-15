export default function StepCondition({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h3 className="text-lg font-bold text-surface-text">Step 2: Condition & Specs</h3>
        <p className="text-xs text-surface-muted mt-1">
          Specify the vehicle condition details, insurance validity, and ownership history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ownership Count */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Ownership *
          </label>
          <select
            required
            value={formData.ownership || ""}
            onChange={(e) => updateFormData({ ownership: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          >
            <option value="">Select Ownership</option>
            <option value="1st Owner">1st Owner</option>
            <option value="2nd Owner">2nd Owner</option>
            <option value="3rd+ Owner">3rd+ Owner</option>
          </select>
        </div>

        {/* Insurance Validity */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Insurance Status *
          </label>
          <select
            required
            value={formData.insurance || ""}
            onChange={(e) => updateFormData({ insurance: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          >
            <option value="">Select Insurance Status</option>
            <option value="Comprehensive">Comprehensive</option>
            <option value="Third Party">Third Party</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Tyre Condition */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Tyre Condition *
          </label>
          <select
            required
            value={formData.tyreCondition || ""}
            onChange={(e) => updateFormData({ tyreCondition: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          >
            <option value="">Select Tyre Condition</option>
            <option value="Brand New">Brand New</option>
            <option value="Good (70-90%)">Good (70-90%)</option>
            <option value="Worn Out (&lt;50%)">Worn Out (&lt;50%)</option>
          </select>
        </div>

        {/* Service History */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Service History *
          </label>
          <select
            required
            value={formData.serviceHistory || ""}
            onChange={(e) => updateFormData({ serviceHistory: e.target.value })}
            className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg p-2.5 text-sm focus:outline-none focus:border-surface-primary"
          >
            <option value="">Select Service Record</option>
            <option value="Authorized Service Center">Authorized Service Center</option>
            <option value="Local Mechanic">Local Mechanic</option>
            <option value="Unserviced / Partial">Unserviced / Partial</option>
          </select>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-surface-border">
        <button
          type="button"
          onClick={onPrev}
          className="bg-neutral-200 dark:bg-neutral-800 text-surface-text hover:bg-neutral-300 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer"
        >
          ← Back
        </button>
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