"use client";

import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const noHp = searchParams.get("noHp"); // Mendapatkan noHp dari URL query params

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (password.length < 8) {
            setError("Password harus minimal 8 karakter.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password harus memiliki huruf besar, angka, dan simbol.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        console.log("Password berhasil dibuat untuk nomor HP:", noHp);

        setSuccessMessage("Password berhasil dibuat! Anda akan diarahkan ke halaman login.");

        // Redirect ke halaman login setelah 1,5 detik
        setTimeout(() => {
            router.push("/login"); // Mengarahkan ke halaman login
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white text-black shadow-md rounded-2xl px-8 py-6">
                <h1 className="text-black text-lg font-semibold text-center mb-6">
                    Buat Password
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="text-"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Konfirmasi Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="text"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Konfirmasi password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
                            {successMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-80 transition"
                    >
                        Simpan Password
                    </button>
                </form>
            </div>
        </div>
    );
}
