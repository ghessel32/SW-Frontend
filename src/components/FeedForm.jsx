import { useState, useEffect } from "react";
import { Send, X } from "lucide-react";

export default function FeedbackForm({ onClose, isVisible }) {
  const [rating, setRating] = useState("");
  const [usefulness, setUsefulness] = useState("");
  const [improvements, setImprovements] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please provide a rating before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xrbaapjl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, usefulness, improvements }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setRating("");
          setUsefulness("");
          setImprovements("");
          onClose?.();
        }, 3000);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setRating("");
    setUsefulness("");
    setImprovements("");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 overflow-y-auto">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md z-10 max-h-[95vh] overflow-y-scroll no-scrollbar">
        <button
          onClick={onClose}
          className="absolute cursor-pointer -top-0 -right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20 m-4"
        >
          <X size={16} className="text-gray-600" />
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Feedback Form
              </h2>
            </div>

            <div className="space-y-6">
              {/* Rating Section */}
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  How would you rate your experience?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer"
                >
                  <option value="">Select a rating</option>
                  <option value="1">1 - Very Poor</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
                {rating && (
                  <p className="text-sm text-gray-500 mt-2">
                    {rating === "1" &&
                      "We're sorry to hear that. We'll work to improve."}
                    {rating === "2" &&
                      "Thank you for your feedback. We'll do better."}
                    {rating === "3" &&
                      "Thank you! We appreciate your feedback."}
                    {rating === "4" &&
                      "Great! We're glad you had a good experience."}
                    {rating === "5" &&
                      "Excellent! We're thrilled you loved it!"}
                  </p>
                )}
              </div>

              {/* Usefulness Section */}
              <div>
                <label
                  htmlFor="usefulness"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  How was this useful to you?
                </label>
                <textarea
                  id="usefulness"
                  value={usefulness}
                  onChange={(e) => setUsefulness(e.target.value)}
                  placeholder="Tell us how this helped you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  rows={3}
                />
              </div>

              {/* Improvements Section */}
              <div>
                <label
                  htmlFor="improvements"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What improvements would you suggest?
                </label>
                <textarea
                  id="improvements"
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  placeholder="Share your ideas..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Your feedback helps us improve our service
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
