"use client";
import React, { useEffect } from 'react';
import { MdErrorOutline } from "react-icons/md";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}


const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <MdErrorOutline className='text-6xl text-red-600 mx-auto' />
        <h2 className="text-xl font-bold mb-4 text-red-600 text-center">Gagal</h2>
        <p className="text-gray-700 text-center">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;

