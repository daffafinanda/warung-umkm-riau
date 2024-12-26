import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
    // Pembelian
    nama: string;
    alamat: string;
    no_hp: string;
    jenis_kelamin: string;

    // Produk Pembelian
    jenis_produk: string;
    ukuran: string;
    harga: number;
    jumlah: number;

    // Bukti Bayar
    tanggal: string;
    bukti: File | null;
}

const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        alamat: '',
        no_hp: '',
        jenis_kelamin: '',
        jenis_produk: '',
        ukuran: '',
        harga: 0,
        jumlah: 0,
        tanggal: new Date().toISOString().split('T')[0],
        bukti: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prevData => ({
                ...prevData,
                bukti: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (currentStep === 1) {
                // Map jenis_kelamin to "L" or "P"
                const genderCode = formData.jenis_kelamin === 'Laki-Laki' ? 'L' : 'P';
                const formattedDate = new Date().toLocaleDateString('en-CA');
                const pembelianData = {
                    tanggal_transaksi: formattedDate,
                    jenis_pembayaran: 'CASH',
                    nama: formData.nama,
                    alamat: formData.alamat,
                    no_hp: formData.no_hp,
                    jenis_kelamin: genderCode, // Send the mapped value
                };
                console.log('Data Pembelian:', pembelianData);

                const pembelianResponse = await axios.post('https://backend-umkm-riau.vercel.app/api/pembelian/CASH', pembelianData);

                const { id } = pembelianResponse.data;
                setFormData(prevData => ({ ...prevData, id_pembelian: id }));
                setCurrentStep(2);
            } else if (currentStep === 2) {
                const produkData = {
                    id_pembelian: formData.id_pembelian,
                    jenis_produk: formData.jenis_produk,
                    ukuran: formData.ukuran,
                    harga: formData.harga,
                    jumlah: formData.jumlah,
                };
                console.log('Data Produk:', produkData);

                await axios.post('https://backend-umkm-riau.vercel.app/api/produk', produkData);
                setCurrentStep(3);
            } else if (currentStep === 3) {
                const formDataToSend = new FormData();
                formDataToSend.append('id_pembelian', formData.id_pembelian!.toString());
                formDataToSend.append('tanggal', formData.tanggal);
                if (formData.bukti) {
                    formDataToSend.append('bukti', formData.bukti);
                }
                formDataToSend.append('jumlah', (formData.harga * formData.jumlah).toString());

                console.log('Data Bukti Pembayaran:', {
                    id_pembelian: formData.id_pembelian,
                    tanggal: formData.tanggal,
                    jumlah: formData.harga * formData.jumlah,
                    bukti: formData.bukti,
                });

                await axios.post('https://backend-umkm-riau.vercel.app/api/bukti', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                alert('Form submitted successfully!');
                setCurrentStep(1);
                setFormData({
                    nama: '',
                    alamat: '',
                    no_hp: '',
                    jenis_kelamin: '',
                    jenis_produk: '',
                    ukuran: '',
                    harga: 0,
                    jumlah: 0,
                    tanggal: new Date().toISOString().split('T')[0],
                    bukti: null,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-primary">
                {currentStep === 1 ? 'Step 1: Pembelian' :
                    currentStep === 2 ? 'Step 2: Produk Pembelian' :
                        'Step 3: Bukti Bayar'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {currentStep === 1 && (
                    <>
                        <div>
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                className="mt-1 text-black p-1 block w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                            <textarea
                                id="alamat"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleChange}
                                className="mt-1 p-1 text-black block w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="no_hp" className="block text-sm font-medium text-gray-700">No HP</label>
                            <input
                                type="text"
                                id="no_hp"
                                name="no_hp"
                                value={formData.no_hp}
                                onChange={handleChange}
                                className="mt-1 p-1 block text-black w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                            <select
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin}
                                onChange={handleChange}
                                className="mt-1 p-1 block text-black w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <div>
                            <label htmlFor="jenis_produk" className="block text-sm font-medium text-gray-700">Jenis Produk</label>
                            <select
                                id="jenis_produk"
                                name="jenis_produk"
                                value={formData.jenis_produk}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full text-black rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            >
                                <option value="">Pilih Jenis Produk</option>
                                <option value="MEJA">MEJA</option>
                                <option value="ETALASE">ETALASE</option>
                                <option value="GEROBAK">GEROBAK</option>
                                <option value="KURSI">KURSI</option>
                                <option value="BOOTH">BOOTH</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ukuran" className="block text-sm font-medium text-gray-700">Ukuran</label>
                            <input
                                type="text"
                                id="ukuran"
                                name="ukuran"
                                value={formData.ukuran}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full text-black rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
                            <input
                                type="number"
                                id="harga"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                className="mt-1 p-1 block w-full text-black rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">Jumlah</label>
                            <input
                                type="number"
                                id="jumlah"
                                name="jumlah"
                                value={formData.jumlah}
                                onChange={handleChange}
                                className="mt-1 p-1 block text-black w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <p className="text-lg font-semibold text-black">Subtotal: {formData.harga * formData.jumlah}</p>
                    </>
                )}
                {currentStep === 3 && (
                    <>
                        <div>
                            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
                            <input
                                type="date"
                                id="tanggal"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleChange}
                                className="mt-1 p-1 block text-black w-full rounded-md border border-grey-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="bukti" className="block text-sm font-medium text-gray-700">Bukti Pembayaran</label>
                            <input
                                type="file"
                                id="bukti"
                                name="bukti"
                                onChange={handleFileChange}
                                className="mt-1  block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                                required
                            />
                        </div>
                        <p className="text-lg font-semibold text-black">Jumlah Total yang Dibayarkan: {formData.harga * formData.jumlah}</p>
                    </>
                )}
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {currentStep === 3 ? 'Submit' : 'Next'}
                </button>
            </form>
        </div>
    );
};

export default MultiStepForm;

