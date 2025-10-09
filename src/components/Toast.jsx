import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "from-green-500 to-green-600"
      : type === "error"
      ? "from-red-500 to-red-600"
      : "from-yellow-500 to-yellow-600";

  const Icon = type === "success" ? FaCheckCircle : FaExclamationCircle;

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slide-in">
      <div
        className={`bg-gradient-to-r ${bgColor} text-white px-6 py-4 shadow-2xl backdrop-blur-sm border border-white/20 flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
