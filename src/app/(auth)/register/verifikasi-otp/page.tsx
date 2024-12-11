"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationPopup from "@/components/NotificationPopUp"; // Import NotificationPopup

export default function VerifikasiOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isNotificationVisible, setNotificationVisible] = useState(false);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, ""); // Hanya angka
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleVerifyOtp = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (otp.join("").length !== 6) {
            setError("Kode OTP harus 6 digit.");
            return;
        }

        if (otp.join("") === "123456") {
            setMessage("Verifikasi berhasil! Anda dapat melanjutkan ke tahap berikutnya.");
            setNotificationVisible(true);
            setTimeout(() => {
                router.push("/register/biodata"); // Path untuk tahap berikutnya
            }, 1500);
        } else {
            setError("Kode OTP salah.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                <form onSubmit={handleVerifyOtp} className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-black">Verifikasi OTP</h1>
                        <p className="text-sm text-gray-600">Masukkan kode OTP yang telah dikirim ke nomor Anda</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                            Kode OTP
                        </label>
                        <div className="flex space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    className="w-1/6 p-3 text-center border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    inputMode="numeric"
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
                            {message}
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90"
                        >
                            Verifikasi
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/register" className="text-primary text-sm font-medium hover:underline">
                            Kembali ke Halaman Registrasi
                        </Link>
                    </div>
                </form>
            </div>

            {/* Notifikasi */}
            <NotificationPopup
                message="Verifikasi Berhasil!"
                isVisible={isNotificationVisible}
                onClose={() => setNotificationVisible(false)}
            />
        </div>
    );
}
