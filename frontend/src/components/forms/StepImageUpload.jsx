import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function StepImageUpload({ formData, updateFormData, onNext, onPrev }) {
  const [images, setImages] = useState(formData.images || []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create temporary object URLs for preview
    const newImagePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImagePreviews].slice(0, 8); // Max 8 photos
    setImages(updatedImages);
    updateFormData({ images: updatedImages.map((img) => img.file || img.url) });
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    updateFormData({ images: updatedImages.map((img) => img.file || img.url) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h3 className="text-lg font-bold text-surface-text">Step 3: Upload Photos</h3>
        <p className="text-xs text-surface-muted mt-1">
          Upload clear photos of your two-wheeler from multiple angles (up to 8 images). High-quality photos get faster admin approval.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-surface-border rounded-xl p-6 text-center hover:border-surface-primary transition bg-surface-page">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="bike-photos-upload"
        />
        <label htmlFor="bike-photos-upload" className="cursor-pointer flex flex-col items-center space-y-2">
          <div className="bg-surface-primary/10 p-3 rounded-full text-surface-primary">
            <Upload size={24} />
          </div>
          <span className="text-sm font-bold text-surface-text">Click to upload photos</span>
          <span className="text-xs text-surface-muted">PNG, JPG, or JPEG (Max 8 photos)</span>
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
            Uploaded Photos ({images.length}/8)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative h-28 rounded-lg overflow-hidden border border-surface-border bg-surface-card group">
                <img
                  src={img.url || img}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label="Remove photo"
                  className="absolute top-1.5 right-1.5 bg-neutral-900/80 hover:bg-surface-primary text-white p-1 rounded-full transition cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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