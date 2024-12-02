import React, { useEffect } from "react";
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
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 1500); 
      return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white flex-col p-6 rounded-lg shadow-lg flex items-center space-x-3">
        
        <span className="text-gray-800 text-xl font-medium">{message}</span>
        <AiOutlineCheckCircle className="text-green-500 text-6xl my-4" />
      </div>
    </div>,
    document.body
  );
};

export default NotificationPopup;
