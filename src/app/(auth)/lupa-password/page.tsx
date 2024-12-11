"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LupaPassword() {
    const router = useRouter(); // Initialize router
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State untuk mengatur popup

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Only allow digits
        setPhoneNumber(value);
    };

    const handleRequestOtp = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (phoneNumber.length < 11 || phoneNumber.length > 13) {
            setError("Nomor HP Tidak Valid.");
            return;
        }

        // Simulate OTP sending
        setTimeout(() => {
            setMessage(`Kode OTP telah dikirim ke nomor ${phoneNumber}.`);
            setShowPopup(true); // Show popup setelah OTP terkirim
        }, 1000);
    };

    // Fungsi untuk menutup popup dan melakukan navigasi ke halaman OTP
    const handleGoToOtp = () => {
        setShowPopup(false);
        router.push("/lupa-password/verifikasi-otp");
    };

    return (
        <div className="min-h-screen bg-primary2 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-sm sm:max-w-md">
                <form onSubmit={handleRequestOtp} className="bg-white shadow-md rounded-2xl px-6 sm:px-8 pt-6 pb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-black">Lupa Password</h1>
                        <p className="text-sm text-gray-600">Masukkan nomor HP Anda untuk menerima kode OTP</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                            NO HP
                        </label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Contoh: 081234567890"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="w-full px-3 py-2 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    {error && <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">{error}</div>}
                    {message && <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">{message}</div>}

                    <div className="flex items-center justify-between mb-6">
                        <button type="submit" className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90">
                            Kirim OTP
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/login" className="text-primary text-sm font-medium hover:underline">
                            Kembali ke Login
                        </Link>
                    </div>
                </form>
            </div>

            {/* Notifikasi Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                        <h3 className="text-lg font-bold text-black mb-4">OTP Terkirim</h3>
                        <p className="text-sm text-gray-600 mb-4">Kode OTP telah dikirim ke nomor {phoneNumber}. Silakan cek pesan Anda.</p>
                        <button
                            onClick={handleGoToOtp}
                            className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90"
                        >
                            Ke Halaman Verifikasi OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
