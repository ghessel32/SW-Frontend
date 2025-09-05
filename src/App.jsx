import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Sparkles,
  Copy,
  Wand2,
  Send,
  Check,
  X,
  Info,
  Users,
  Volume2,
  Hash,
} from "lucide-react";
import HeroSection from "./components/Hero";
import FeedbackForm from "./components/FeedForm";
import Header from "./components/Header";
import YtIcon from "../public/images/youtube-svgrepo-com.svg";
import XIcon from "../public/images/11053970_x_logo_twitter_new_brand_icon.svg";
import FbIcon from "../public/images/facebook-svgrepo-com.svg";
import InstaIcon from "../public/images/instagram-svgrepo-com.svg";
import LdIcon from "../public/images/linkedin-svgrepo-com.svg";
import RdIcon from "../public/images/reddit-logo-2436.svg";
import EmIcon from "../public/images/email-7601.svg";
import TiIcon from "../public/images/tiktok-svgrepo-com.svg";

function App() {
  const [formData, setFormData] = useState({
    contentCombo: "",
    prompt: "",
    targetAudience: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const chatEndRef = useRef(null);

  const contentCombos = [
    // YouTube
    {
      id: "yt-script",
      platform: "YouTube",
      type: "Script",
      icon: YtIcon,
      keywords: ["yt", "youtube", "script", "video script"],
      desc: "Full video script with intro, main content, and outro",
    },
    {
      id: "yt-title",
      platform: "YouTube",
      type: "Title",
      icon: YtIcon,
      keywords: ["yt", "youtube", "title", "headline", "video title"],
      desc: "Catchy video titles that get clicks",
    },
    {
      id: "yt-description",
      platform: "YouTube",
      type: "Description",
      icon: YtIcon,
      keywords: ["yt", "youtube", "description", "video description"],
      desc: "Video descriptions with timestamps and links",
    },
    {
      id: "yt-tags",
      platform: "YouTube",
      type: "Tags",
      icon: YtIcon,
      keywords: ["yt", "youtube", "tags", "keywords", "seo"],
      desc: "SEO-optimized tags for better discoverability",
    },

    // Instagram
    {
      id: "ig-caption",
      platform: "Instagram",
      type: "Caption",
      icon: InstaIcon,
      keywords: ["ig", "instagram", "caption", "post"],
      desc: "Engaging captions with hashtags",
    },

    {
      id: "ig-bio",
      platform: "Instagram",
      type: "Bio",
      icon: InstaIcon,
      keywords: ["ig", "instagram", "bio", "profile"],
      desc: "Creative profile bios",
    },

    // TikTok

    {
      id: "tiktok-caption",
      platform: "TikTok",
      type: "Caption",
      icon: TiIcon,
      keywords: ["tiktok", "caption", "description"],
      desc: "Viral TikTok captions",
    },

    // LinkedIn
    {
      id: "linkedin-post",
      platform: "LinkedIn",
      type: "Post",
      icon: LdIcon,
      keywords: ["linkedin", "post", "professional"],
      desc: "Professional posts for networking",
    },
    {
      id: "linkedin-article",
      platform: "LinkedIn",
      type: "Article",
      icon: LdIcon,
      keywords: ["linkedin", "article", "long form"],
      desc: "Long-form professional articles",
    },

    {
      id: "linkedin-bio",
      platform: "LinkedIn",
      type: "Headline",
      icon: LdIcon,
      keywords: ["linkedin", "bio", "headline", "profile"],
      desc: "Professional headlines and summaries",
    },

    // X (Twitter)
    {
      id: "x-tweet",
      platform: "X",
      type: "Tweet",
      icon: XIcon,
      keywords: ["x", "twitter", "tweet", "post"],
      desc: "Engaging tweets within character limit",
    },
    {
      id: "x-thread",
      platform: "X",
      type: "Thread",
      icon: XIcon,
      keywords: ["x", "twitter", "thread", "series"],
      desc: "Multi-tweet threads",
    },
    {
      id: "x-bio",
      platform: "X",
      type: "Bio",
      icon: XIcon,
      keywords: ["x", "twitter", "bio", "profile"],
      desc: "Witty profile bios",
    },

    // Facebook
    {
      id: "fb-post",
      platform: "Facebook",
      type: "Post",
      icon: FbIcon,
      keywords: ["facebook", "fb", "post"],
      desc: "Engaging Facebook posts",
    },

    {
      id: "fb-caption",
      platform: "Facebook",
      type: "Event Description",
      icon: FbIcon,
      keywords: ["facebook", "fb", "event"],
      desc: "Compelling captions for Facebook posts",
    },

    // Reddit
    {
      id: "reddit-post",
      platform: "Reddit",
      type: "Post",
      icon: RdIcon,
      keywords: ["reddit", "post", "submission"],
      desc: "Community-appropriate posts",
    },

    // General
    {
      id: "email-subject",
      platform: "Email",
      type: "email",
      icon: EmIcon,
      keywords: ["email", "subject", "headline"],
      desc: "Compelling email subject lines",
    },
  ];

  // Audience options based on platform
  const getAudienceOptions = (platform) => {
    const baseOptions = [
      { value: "general", label: "General Audience", emoji: "🌍" },
    ];

    switch (platform) {
      case "LinkedIn":
        return [
          ...baseOptions,
          { value: "executives", label: "Executives & Leaders", emoji: "👔" },
          { value: "entrepreneurs", label: "Entrepreneurs", emoji: "🚀" },
          { value: "marketers", label: "Marketing Professionals", emoji: "📈" },
          { value: "developers", label: "Software Developers", emoji: "💻" },
          { value: "sales", label: "Sales Professionals", emoji: "🎯" },
          { value: "hr", label: "HR Professionals", emoji: "👥" },
          { value: "students", label: "Students & Graduates", emoji: "🎓" },
          { value: "consultants", label: "Consultants", emoji: "💼" },
        ];

      case "Reddit":
        return [
          ...baseOptions,
          { value: "r/AskReddit", label: "r/AskReddit", emoji: "❓" },
          { value: "r/technology", label: "r/technology", emoji: "🔧" },
          { value: "r/programming", label: "r/programming", emoji: "💻" },
          { value: "r/entrepreneur", label: "r/entrepreneur", emoji: "🚀" },
          {
            value: "r/personalfinance",
            label: "r/personalfinance",
            emoji: "💰",
          },
          { value: "r/fitness", label: "r/fitness", emoji: "💪" },
          {
            value: "r/explainlikeimfive",
            label: "r/explainlikeimfive",
            emoji: "🧠",
          },
          { value: "r/gaming", label: "r/gaming", emoji: "🎮" },
        ];

      case "YouTube":
        return [
          ...baseOptions,
          { value: "tech-enthusiasts", label: "Tech Enthusiasts", emoji: "🔌" },
          { value: "entrepreneurs", label: "Entrepreneurs", emoji: "🚀" },
          { value: "students", label: "Students", emoji: "📚" },
          { value: "gamers", label: "Gamers", emoji: "🎮" },
          { value: "lifestyle", label: "Lifestyle Viewers", emoji: "✨" },
          {
            value: "educational",
            label: "Educational Content Seekers",
            emoji: "🧠",
          },
          {
            value: "entertainment",
            label: "Entertainment Seekers",
            emoji: "🎭",
          },
        ];

      case "Instagram":
        return [
          ...baseOptions,
          { value: "millennials", label: "Millennials", emoji: "📱" },
          { value: "gen-z", label: "Gen Z", emoji: "🎯" },
          { value: "fitness", label: "Fitness Enthusiasts", emoji: "💪" },
          { value: "fashion", label: "Fashion Lovers", emoji: "👗" },
          { value: "food", label: "Food Enthusiasts", emoji: "🍽️" },
          { value: "travel", label: "Travel Lovers", emoji: "✈️" },
          { value: "entrepreneurs", label: "Entrepreneurs", emoji: "💼" },
        ];

      case "TikTok":
        return [
          ...baseOptions,
          { value: "gen-z", label: "Gen Z", emoji: "🎯" },
          { value: "teens", label: "Teenagers", emoji: "🧑" },
          { value: "young-adults", label: "Young Adults", emoji: "👨‍🎓" },
          { value: "dancers", label: "Dancers", emoji: "💃" },
          { value: "creators", label: "Content Creators", emoji: "🎬" },
          { value: "comedy", label: "Comedy Lovers", emoji: "😂" },
        ];

      case "X":
        return [
          ...baseOptions,
          { value: "tech-twitter", label: "Tech Twitter", emoji: "💻" },
          { value: "crypto", label: "Crypto Community", emoji: "₿" },
          { value: "startups", label: "Startup Community", emoji: "🚀" },
          { value: "news", label: "News Followers", emoji: "📰" },
          { value: "politics", label: "Political Audience", emoji: "🗳️" },
          { value: "finance", label: "Finance Community", emoji: "📊" },
        ];

      case "Facebook":
        return [
          ...baseOptions,
          { value: "local-community", label: "Local Community", emoji: "🏘️" },
          { value: "parents", label: "Parents", emoji: "👨‍👩‍👧‍👦" },
          {
            value: "small-business",
            label: "Small Business Owners",
            emoji: "🏪",
          },
          { value: "hobbyists", label: "Hobbyists", emoji: "🎨" },
          { value: "seniors", label: "Senior Adults", emoji: "👴" },
        ];

      default:
        return [
          ...baseOptions,
          { value: "professionals", label: "Professionals", emoji: "👔" },
          { value: "students", label: "Students", emoji: "📚" },
          { value: "entrepreneurs", label: "Entrepreneurs", emoji: "🚀" },
          { value: "consumers", label: "Consumers", emoji: "🛍️" },
          { value: "tech-savvy", label: "Tech-Savvy Users", emoji: "💻" },
        ];
    }
  };

  const filteredCombos = contentCombos.filter((combo) => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();
    return (
      combo.keywords.some((keyword) => keyword.includes(search)) ||
      combo.platform.toLowerCase().includes(search) ||
      combo.type.toLowerCase().includes(search) ||
      combo.desc.toLowerCase().includes(search)
    );
  });

  const handleComboSelect = (combo) => {
    setFormData((prev) => ({
      ...prev,
      contentCombo: combo.id,
      targetAudience: "", // Reset audience when platform changes
    }));
    setSearchTerm(`${combo.platform} ${combo.type}`);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setIsDropdownOpen(true);
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        contentCombo: "",
        targetAudience: "",
      }));
    }
  };

  const selectedCombo = contentCombos.find(
    (combo) => combo.id === formData.contentCombo
  );

  const audienceOptions = selectedCombo
    ? getAudienceOptions(selectedCombo.platform)
    : [];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAudienceSelect = (audience) => {
    setFormData((prev) => ({ ...prev, targetAudience: audience.value }));
    setIsAudienceDropdownOpen(false);
  };

  const selectedAudience = audienceOptions.find(
    (audience) => audience.value === formData.targetAudience
  );

  // Function to get dynamic placeholder text
  const getPromptPlaceholder = () => {
    if (!selectedCombo) {
      return "Describe what you want to create. Be specific about your topic, target audience, key points, etc.";
    }

    const contentTypeDisplay =
      selectedCombo.platform === "LinkedIn" && selectedCombo.type === "Headline"
        ? "LinkedIn headline"
        : `${selectedCombo.platform.toLowerCase()}-${selectedCombo.type.toLowerCase()}`;

    return `Write a ${contentTypeDisplay} on idea: (e.g., "productivity tips for remote workers")`;
  };

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://sw-backend-4wqo.onrender.com/api";

  // REPLACE your existing handleGenerate function with this:
  const handleGenerate = async () => {
    if (!formData.contentCombo || !formData.prompt) {
      alert("Please select a content type and enter a prompt");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: selectedCombo.type.toLowerCase(),
          platform: selectedCombo.platform,
          targetAudience: selectedAudience?.label || null,
          userPrompt: formData.prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Generation error:", error);
      setErrorMessage(
        error.message || "Failed to generate content. Please try again."
      );
      setShowError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // REPLACE your existing handleChatSubmit function with this:
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    setIsChatLoading(true);
    const currentInput = chatInput;
    setChatInput("");

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: selectedCombo.type.toLowerCase(),
          platform: selectedCombo.platform,
          originalContent: generatedContent,
          editRequest: currentInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process edit request");
      }

      const data = await response.json();
      setGeneratedContent(data.content);

      const aiResponse = {
        type: "ai",
        content:
          "Content updated successfully! Check the generated content above.",
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      setErrorMessage(
        error.message || "Failed to process edit request. Please try again."
      );
      setShowError(true);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setShowFeedbackForm(true); // trigger once "Copied" disappears
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto"> {/* Increased max width from 4xl to 7xl */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wand2 className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Content Generator
              </h1>
            </div>
            <p className="text-gray-600 text-base sm:text-lg">
              Create engaging content for any platform with AI-powered
              assistance
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 border border-purple-100">
            {/* Content Type Search */}
            <div className="space-y-3 mb-8">
              <label className="block text-sm font-semibold text-gray-700">
                What do you want to create?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Try: 'yt script', 'linkedin post', 'ig caption', 'tiktok'..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                    {filteredCombos.length > 0 ? (
                      <div className="p-2">
                        {filteredCombos.map((combo) => (
                          <button
                            key={combo.id}
                            onClick={() => handleComboSelect(combo)}
                            className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl flex-shrink-0 w-9 h-9">
                                <img src={combo.icon} alt={combo.platform} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-purple-700">
                                  {combo.platform} {combo.type}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {combo.desc}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No matching content types found
                      </div>
                    )}
                  </div>
                )}

                {/* Selected combo display */}
                {selectedCombo && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0 w-9 h-9">
                        <img
                          src={selectedCombo.icon}
                          alt={selectedCombo.platform}
                        />
                      </span>
                      <div>
                        <div className="font-medium text-purple-800">
                          {selectedCombo.platform} {selectedCombo.type}
                        </div>
                        <div className="text-sm text-purple-600">
                          {selectedCombo.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Target Audience Selection */}
            {selectedCombo && (
              <div className="mt-8 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  {selectedCombo.platform === "Reddit"
                    ? "Target Community"
                    : "Target Audience"}{" "}
                  (Optional)
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsAudienceDropdownOpen(!isAudienceDropdownOpen)
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white hover:border-purple-300 focus:border-purple-500 transition-all text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {selectedAudience ? (
                        <>
                          <span className="text-lg">
                            {selectedAudience.emoji}
                          </span>
                          <span className="text-gray-700">
                            {selectedAudience.label}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Select{" "}
                          {selectedCombo.platform === "Reddit"
                            ? "community"
                            : "audience"}{" "}
                          (optional)
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isAudienceDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Audience Dropdown */}
                  {isAudienceDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-xl z-40 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        {audienceOptions.map((audience) => (
                          <button
                            key={audience.value}
                            onClick={() => handleAudienceSelect(audience)}
                            className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg flex-shrink-0">
                                {audience.emoji}
                              </span>
                              <span className="font-medium text-gray-900 group-hover:text-purple-700">
                                {audience.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instruction Card - Show only when content type is selected */}
            {selectedCombo && (
              <div className="mt-8 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Pro Tips for Better Content
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Custom Audience
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Specify your own audience if not listed above
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Volume2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Custom Tone
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Request specific tone: casual, professional,
                              funny, etc.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Hash className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Word Limit
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Specify length: "keep it under 100 words"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Card */}
            {showError && (
              <div className="mt-6 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                          <X className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">
                          Something went wrong
                        </h3>
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowError(false)}
                      className="flex-shrink-0 p-2 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Warning Message - Compact Version */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                <span className="font-medium">Tip:</span> Don't start with
                "write a..." - just describe your idea directly.
                <span className="text-gray-500 hidden sm:inline">
                  {" "}e.g., "Blog post about sustainable fashion"
                </span>
              </p>
            </div>

            {/* Prompt Input */}
            <div className="mt-8 space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Content Prompt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) => handleInputChange("prompt", e.target.value)}
                placeholder={getPromptPlaceholder()}
                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                rows="4"
              />
            </div>

            {/* Generate Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={
                  isGenerating || !formData.contentCombo || !formData.prompt
                }
                className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span className="hidden sm:inline">Generate Content</span>
                    <span className="sm:hidden">Generate</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            {generatedContent && (
              <div className="space-y-8 mt-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Generated Content
                    </h3>
                  </div>
                  {/* Responsive Copy Button */}
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isCopied
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Beautiful Content Display */}
                <div className="relative bg-white rounded-3xl p-4 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Decorative header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono hidden sm:block">
                      content.txt
                    </div>
                  </div>

                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100"></div>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10">
                    <pre
                      className="text-gray-700 whitespace-pre-wrap leading-relaxed"
                      style={{
                        fontFamily:
                          "'Inter', 'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
                        fontSize: "15px",
                        lineHeight: "1.7",
                      }}
                    >
                      {generatedContent}
                    </pre>
                  </div>

                  {/* Elegant bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>

                {/* Beautiful Chat Input for Editing - Now Responsive */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 backdrop-blur-sm">
                  <div className="mb-4">
                    <h4 className="text-gray-800 font-bold text-base sm:text-lg flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                        <Wand2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      Ask AI to Edit Content
                    </h4>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base sm:ml-12">
                      Request changes, improvements, or different variations of
                      your content
                    </p>
                  </div>

                  {/* Responsive Chat Layout */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full p-4 pr-12 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-gray-700 placeholder-gray-400 shadow-inner"
                        disabled={isChatLoading}
                        placeholder="e.g., 'Make it shorter', 'Add more emojis', 'Make it more professional'..."
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <button
                      onClick={handleChatSubmit}
                      disabled={!chatInput.trim() || isChatLoading}
                      className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                    >
                      {isChatLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className="hidden sm:inline">Send</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Loading indicator */}
                  {isChatLoading && (
                    <div className="mt-4 flex items-center gap-2 text-gray-500">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Feedback Form Modal - Only show when showFeedbackForm is true */}
          <FeedbackForm
            isVisible={showFeedbackForm}
            onClose={() => setShowFeedbackForm(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
