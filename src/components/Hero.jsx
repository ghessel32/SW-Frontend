export default function HeroSection() {
  return (
    <div className="relative bg-white text-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147,51,234,0.05) 0%, transparent 25%), 
                           radial-gradient(circle at 75% 75%, rgba(79,70,229,0.03) 0%, transparent 25%)`,
          }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-15">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Think. Generate. Share.
            </span>
            <br />
            <span className="text-gray-900 text-4xl md:text-5xl">
              That's it— for free.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Turn your raw ideas into platform-ready content in seconds. No
            prompts.{" "}
            <span className="text-gray-900 font-semibold">
              No editing. No friction.{" "}
            </span>
            Just instant results — and it’s completely free.
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce">
          💡
        </div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-pulse">
          🎨
        </div>
        <div
          className="absolute top-40 right-20 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          📱
        </div>
      </div>
    </div>
  );
}
