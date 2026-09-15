import { useState } from "react";
import { ShieldCheck, Upload, FileText } from "lucide-react";

export default function StepDocVerification({ formData, updateFormData, onSubmit, onPrev, isSubmitting }) {
  const [rcFile, setRcFile] = useState(formData.rcDocument || null);
  const [idFile, setIdFile] = useState(formData.idProof || null);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (field === "rcDocument") {
        setRcFile(file);
        updateFormData({ rcDocument: file });
      } else if (field === "idProof") {
        setIdFile(file);
        updateFormData({ idProof: file });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h3 className="text-lg font-bold text-surface-text">Step 4: Document Verification</h3>
        <p className="text-xs text-surface-muted mt-1">
          Upload your vehicle Registration Certificate (RC) and a masked ID proof for strict administrator review[cite: 1]. These documents remain private and secure.
        </p>
      </div>

      <div className="space-y-4">
        {/* RC Copy Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted flex items-center gap-1.5">
            <FileText size={14} className="text-surface-primary" />
            <span>RC Copy (Registration Certificate) *</span>
          </label>
          <div className="border-2 border-dashed border-surface-border rounded-xl p-4 text-center hover:border-surface-primary transition bg-surface-page">
            <input
              type="file"
              required={!rcFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "rcDocument")}
              className="w-full text-xs text-surface-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-surface-primary file:text-white hover:file:bg-surface-primaryHover cursor-pointer"
            />
            {rcFile && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                Selected: {rcFile.name || "RC Document Uploaded"}
              </p>
            )}
          </div>
        </div>

        {/* Masked ID Proof Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-surface-primary" />
            <span>Seller ID Proof (Masked Aadhaar / PAN) *</span>
          </label>
          <div className="border-2 border-dashed border-surface-border rounded-xl p-4 text-center hover:border-surface-primary transition bg-surface-page">
            <input
              type="file"
              required={!idFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, "idProof")}
              className="w-full text-xs text-surface-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-surface-primary file:text-white hover:file:bg-surface-primaryHover cursor-pointer"
            />
            {idFile && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                Selected: {idFile.name || "ID Proof Uploaded"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="bg-surface-primary/5 border border-surface-primary/20 rounded-lg p-3 text-xs text-surface-muted leading-relaxed flex items-start gap-2">
        <ShieldCheck size={16} className="text-surface-primary shrink-0 mt-0.5" />
        <span>
          <strong>Privacy Guarantee:</strong> RC documents and personal IDs are visible only to platform administrators for verification purposes and are never exposed publicly[cite: 1].
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-surface-border">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="bg-neutral-200 dark:bg-neutral-800 text-surface-text hover:bg-neutral-300 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-surface-primary hover:bg-surface-primaryHover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? "Submitting Listing..." : "Submit for Admin Review →"}
        </button>
      </div>
    </form>
  );
}