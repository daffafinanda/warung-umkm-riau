import React from "react";

type ImageModalProps = {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <img
          src={imageSrc}
          alt="Gambar"
          className="max-w-full max-h-screen rounded shadow-lg"
        />
        <button
          className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
