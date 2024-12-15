// src/app/register/page.tsx

"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [noHp, setNoHp] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error

        // Validasi nomor HP
        if (noHp.length < 11 || noHp.length > 13) {
            setError("Nomor HP harus antara 11 dan 13 digit.");
            return;
        }

        // Redirect ke halaman OTP
        router.push(`/register/password`);
    };

    const handleGoBackToLogin = () => {
        // Redirect ke halaman login
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white text-black shadow-md rounded-2xl px-8 py-6">
                <h1 className="text-2xl font-bold text-primary text-center mb-2">Register</h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Masukkan nomor telepon Anda untuk melanjutkan.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="noHp"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nomor HP
                        </label>
                        <input
                            id="noHp"
                            type="tel"
                            placeholder="Contoh: 081234567890"
                            value={noHp}
                            onChange={(e) => setNoHp(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-80 transition"
                    >
                        Lanjutkan
                    </button>
                </form>

                {/* Tombol kembali ke login */}
                <div className="mt-2    text-center">
                    <button
                        onClick={handleGoBackToLogin}
                        className="text-primary hover:text-opacity-80 text-sm"
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        </div>
    );
}
