import React, { useState } from "react";
import FormData from "@/components/FormData";
import ConfirmationPopup from "@/components/ConfirmationPopUp";

interface RentalRequest {
  id: number;
  nama: string;
  tanggalPermintaan: string;
  noHp: string;
  nik: string;
  jenisKelamin: string;
  alamatDomisili: string;
  alamatKTP: string;
  fotoKTP: string;
  awalPenyewaan: string;
  akhirPenyewaan: string;
  lokasiBooth: string;
}

interface PengajuanSewaModalProps {
  request: RentalRequest | null;
  onClose: () => void;
  onSave: (id: number, selectedBooth: string) => void;
  onDelete: (id: number) => void;
}

const PengajuanSewaModal: React.FC<PengajuanSewaModalProps> = ({
  request,
  onClose,
  onDelete,
  onSave,
}) => {
  const [showBoothSelector, setShowBoothSelector] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showBoothConfirmPopup, setShowBoothConfirmPopup] = useState(false); // New state for booth confirmation popup

  if (!request) return null;

  const handleDelete = () => {
    onDelete(request.id);
    setShowDeletePopup(false);
    onClose();
  };

  const handleBoothSelectionConfirm = () => {
    // Handle booth selection
    if (request && selectedBooth) {
      onSave(request.id, selectedBooth);  // Call onSave to save the selected booth
    }
    
    // Close the confirmation popup and booth selector
    setShowBoothConfirmPopup(false);
    setShowBoothSelector(false);
    onClose();  // Close the modal after saving the booth selection
};

  return (
    <div className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      {/* Modal Container */}
      <div className="relative max-w-3xl h-full w-full bg-white p-6 rounded-lg shadow-2xl overflow-auto">
        {/* Modal Header */}
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Permintaan Sewa {request.nama}
        </h1>

        {/* Modal Body */}
        <form className="space-y-4">
          <FormData formData={request} />
        </form>

        {/* Modal Footer */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowDeletePopup(true)}
            className="py-2 bg-red-600 text-white rounded-xl hover:bg-opacity-75"
          >
            Tolak pengajuan
          </button>
          <button
            onClick={() => setShowBoothSelector(true)}
            className="py-2 bg-primary text-white rounded-xl hover:bg-opacity-75"
          >
            Lanjut ke pemilihan booth
          </button>
        </div>

        <div className="mt-4 text-end border-t-2 pt-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Pop-up kedua untuk memilih booth */}
      {showBoothSelector && (
        <div className="fixed top-0 inset-0 z-60 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl text-primary font-bold mb-4">Pilih Booth</h2>
            <select
              value={selectedBooth}
              onChange={(e) => setSelectedBooth(e.target.value)}
              className="w-full p-2 border text-gray-800 border-gray-300 rounded-lg"
            >
              <option value="">Pilih Booth</option>
              <option value="Booth A">Booth 1</option>
              <option value="Booth B">Booth 2</option>
              <option value="Booth C">Booth 3</option>
            </select>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowBoothSelector(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => setShowBoothConfirmPopup(true)} // Show confirmation popup
                className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-lime-800"
                disabled={!selectedBooth}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation popup */}
      {showDeletePopup && (
        <ConfirmationPopup
          title="Konfirmasi Penolakan"
          message="Apakah Anda yakin ingin menolak pengajuan ini?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {/* Booth selection confirmation popup */}
      {showBoothConfirmPopup && (
        <ConfirmationPopup
          title="Konfirmasi Pemilihan Booth"
          message={`Apakah Anda yakin ingin memilih ${selectedBooth}?`}  
          onConfirm={handleBoothSelectionConfirm}
          onCancel={() => setShowBoothConfirmPopup(false)}
        />
      )}
    </div>
  );
};

export default PengajuanSewaModal;
