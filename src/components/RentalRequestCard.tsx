"use client";

import React from "react";
import { FiCalendar, FiPhone } from "react-icons/fi"; // Import ikon
import { BsPersonDown } from "react-icons/bs";

interface RentalRequestCardProps {
  name: string;
  tanggalPermintaan: string;
  noHp: string;
  onDetailClick?: () => void;
}

const RentalRequestCard: React.FC<RentalRequestCardProps> = ({
  name,
  tanggalPermintaan,
  noHp,
  onDetailClick,
}) => {
  return (
    <div className="max-w-sm p-4 border w-full rounded-lg shadow-md bg-white">
      <div className="flex flex-row items-center space-x-3"> 
        <BsPersonDown className="text-primary text-6xl h-auto mr-2" />
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          </div>
          <div className="mt-2">
            <p className="flex items-center text-base text-gray-600">
              <FiCalendar className="mr-2 text-gray-500" />
              {tanggalPermintaan}
            </p>
            <p className="flex items-center text-base text-gray-600">
              <FiPhone className="mr-2 text-gray-500" />
              {noHp}
            </p>
          </div>
        </div>
      </div> 
      <button
        onClick={onDetailClick}
        className="mt-4 w-full px-4 py-2 text-base font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white"
      >
        Detail
      </button>
    </div>
  );
};

export default RentalRequestCard;
