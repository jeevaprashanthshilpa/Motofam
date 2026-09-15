import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bike, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import StepBasicInfo from "../../components/forms/StepBasicInfo";
import StepCondition from "../../components/forms/StepCondition";
import StepImageUpload from "../../components/forms/StepImageUpload";
import StepDocVerification from "../../components/forms/StepDocVerification";

export default function AddBikePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    year: "",
    price: "",
    mileage: "",
    ownership: "",
    insurance: "",
    tyreCondition: "",
    serviceHistory: "",
    images: [],
    rcDocument: null,
    idProof: null,
  });

  const updateFormData = (updatedFields) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate backend submission for admin review
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Bike listing submitted successfully! Pending admin approval[cite: 1].");
        navigate("/seller/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
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
        <h1 className="text-2xl font-black text-surface-text tracking-tight">List a New Two-Wheeler</h1>
        <p className="text-xs text-surface-muted">
          Complete the steps below to submit your vehicle for administrative verification and marketplace publication[cite: 1].
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: 1, label: "Basic Info" },
          { num: 2, label: "Condition" },
          { num: 3, label: "Photos" },
          { num: 4, label: "Documents" },
        ].map((step) => (
          <div
            key={step.num}
            className={`flex flex-col items-center sm:items-start p-3 rounded-xl border transition ${
              currentStep === step.num
                ? "bg-surface-primary/10 border-surface-primary text-surface-primary"
                : currentStep > step.num
                ? "bg-surface-card border-surface-border text-emerald-600 dark:text-emerald-400"
                : "bg-surface-card border-surface-border text-surface-muted opacity-60"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <span>Step {step.num}</span>
              {currentStep > step.num && <CheckCircle2 size={14} />}
            </div>
            <span className="text-[11px] font-medium hidden sm:block mt-0.5">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Form Card Container */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 shadow-sm">
        {currentStep === 1 && (
          <StepBasicInfo formData={formData} updateFormData={updateFormData} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <StepCondition
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {currentStep === 3 && (
          <StepImageUpload
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {currentStep === 4 && (
          <StepDocVerification
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleFinalSubmit}
            onPrev={handlePrev}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}