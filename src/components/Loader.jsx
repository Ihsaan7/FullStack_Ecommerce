import React from "react";

const Loader = ({ fullScreen = false, message = "Loading..." }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated spinner */}
      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 dark:border-t-blue-400 dark:border-r-blue-400 animate-spin"></div>

        {/* Middle rotating ring (slower) */}
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-slate-800 border-l-slate-800 dark:border-b-slate-300 dark:border-l-slate-300"
          style={{
            animation: "spin 3s linear infinite reverse",
          }}
        ></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-slate-700 dark:from-blue-400 dark:to-slate-300 animate-pulse"></div>
      </div>

      {/* Loading text with animation */}
      <div className="text-center">
        <p className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {message}
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-2">
          <span
            className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
            style={{
              animation: "bounce 1.4s infinite",
            }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
            style={{
              animation: "bounce 1.4s infinite 0.2s",
            }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
            style={{
              animation: "bounce 1.4s infinite 0.4s",
            }}
          ></span>
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">
      {loaderContent}
    </div>
  );
};

export default Loader;
