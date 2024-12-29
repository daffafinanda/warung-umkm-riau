// app/components/AddBayarSewaModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useModal } from "@/components/ModalContext";

interface AddBayarSewaModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Pembelian {
  id: number;
  nama: string;
  tenor: number;
}

interface BayarSewa {
  id_sewa: string;
  tanggal: string;
  jumlah: number | null;
  bukti: File | null;
}

const AddBayarSewaModal: React.FC<AddBayarSewaModalProps> = ({ isOpen, onClose }) => {
  const getFormattedDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
  };
  const { showError, showNotification } = useModal();
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [dropdownOptions, setDropdownOptions] = useState<{ id: number; nama: string; tenor: number }[]>([]);
  const [isLunas, setIsLunas] = useState(false);

  useEffect(() => {
    const fetchPembelianData = async () => {
        try {
            const response = await axios.get('https://backend-umkm-riau.vercel.app/api/pembelian/CREDIT');
            const pembelianData = response.data.data;
            setDropdownOptions(pembelianData.map((item: Pembelian) => ({
                id: item.id,
                nama: item.nama,
                tenor: item.tenor,
            })));
        } catch (error) {
            console.error('Error fetching pembelian data:', error);
        }
    };

    fetchPembelianData();
}, []);

  useEffect(() => {
    const fetchBuktiData = async () => {
        if (!selectedId) return;

        try {
            const response = await axios.get(`https://backend-umkm-riau.vercel.app/api/bukti/${selectedId}`);
            const buktiCount = response.data.data.length;
            const selectedOption = dropdownOptions.find(option => option.id === selectedId);

            if (selectedOption) {
                setIsLunas(buktiCount === selectedOption.tenor);
            }
        } catch (error) {
            console.error('Error fetching bukti data:', error);
        }
    };

    fetchBuktiData();
}, [selectedId, dropdownOptions]);


  const [formData, setFormData] = useState<BayarSewa>({
    id_sewa: '',
    tanggal: getFormattedDate(), // Tanggal hari ini
    jumlah: 0 || null,
    bukti: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'jumlah' ? Number(value) : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, bukti: file });
  };

  const handleSubmit = async () => {
    if (!formData.id_sewa || !formData.jumlah || !formData.bukti) {
      showError('ID Sewa, Jumlah, dan Bukti harus diisi.');
      return;
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append('id_sewa', formData.id_sewa);
    form.append('tanggal', formData.tanggal);
    form.append('jumlah', formData.jumlah.toString());
    form.append('bukti', formData.bukti);

    console.log('Data yang dikirim:', {
      id_sewa: formData.id_sewa,
      tanggal: formData.tanggal,
      jumlah: formData.jumlah,
      bukti: formData.bukti,
    });

    try {
      const response = await axios.post(
        'https://backend-umkm-riau.vercel.app/api/sewa/add',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Memeriksa status response dan success dari data yang diterima
      if (response.data.success) {
        showNotification('Data berhasil ditambahkan!');
        onClose();
      } else {
        // Jika 'success' di response data false atau tidak ada
        showError('Terjadi kesalahan: ' + (response.data.message || 'Coba lagi!'));
      }
    } catch (error) {
      console.error('Error adding bayar sewa:', error);
      showError('Terjadi kesalahan, coba lagi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center text-black justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Tambah Riwayat Bayar Sewa</h2>
        <div className="mb-4">
          <label htmlFor="id_sewa" className="block text-sm font-medium mb-1">
            ID Sewa
          </label>
          <select
                        name="id_pembelian"
                        value={selectedId}
                        onChange={(e) => setSelectedId(Number(e.target.value))}
                        className="mt-1 p-1 text-black block w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                        required
                    >
                        <option value="">Pilih ID</option>
                        {dropdownOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.id} - {option.nama} ({isLunas ? 'LUNAS' : 'BELUM LUNAS'})
                            </option>
                        ))}
                    </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tanggal" className="block text-sm font-medium mb-1">
            Tanggal
          </label>
          <input
            type="text"
            id="tanggal"
            name="tanggal"
            value={formData.tanggal}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="jumlah" className="block text-sm font-medium mb-1">
            Jumlah
          </label>
          <input
            type="number"
            id="jumlah"
            name="jumlah"
            value={formData.jumlah || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bukti" className="block text-sm font-medium mb-1">
            Bukti Pembayaran
          </label>
          <input
            type="file"
            id="bukti"
            name="bukti"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan...' : 'Konfirmasi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBayarSewaModal;
