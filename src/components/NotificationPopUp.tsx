"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";


interface NotificationPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true); // Pastikan elemen dirender
      setIsAnimating(true); // Mulai animasi masuk
      const timer = setTimeout(() => {
        setIsAnimating(false); // Mulai animasi keluar
        const closeTimer = setTimeout(() => {
          setIsRendered(false); // Hapus elemen setelah animasi keluar selesai
          onClose();
        }, 300); // Durasi animasi keluar (sinkron dengan transition)
        return () => clearTimeout(closeTimer);
      }, 1500); // Durasi notifikasi terlihat
      return () => clearTimeout(timer); // Bersihkan timer
    }
  }, [isVisible, onClose]);

  if (!isRendered) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white flex-col p-6 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        <span className="text-gray-800 text-xl font-medium">{message}</span>
        <AiOutlineCheckCircle className="text-green-500 text-6xl my-4" />
      </div>
    </div>,
    document.body
  );
};

export default NotificationPopup;
