"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function ResetPassword() {
    const router = useRouter(); // Initialize router
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "newPassword") setNewPassword(value);
        else if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleResetPassword = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password harus lebih dari 6 karakter.");
            return;
        }

        // Simulate password reset
        setTimeout(() => {
            setMessage("Password berhasil direset.");
            router.push("/login"); // Navigate back to login page
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-primary2 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-sm sm:max-w-md">
                <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded-2xl px-6 sm:px-8 pt-6 pb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-black">Reset Password</h1>
                        <p className="text-sm text-gray-600">Masukkan password baru Anda</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Password Baru
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Masukkan password baru"
                            className="w-full px-3 py-2 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Konfirmasi Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Konfirmasi password baru"
                            className="w-full px-3 py-2 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    {error && <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">{error}</div>}
                    {message && <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">{message}</div>}

                    <div className="flex items-center justify-between mb-6">
                        <button type="submit" className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90">
                            Reset Password
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/login" className="text-primary text-sm font-medium hover:underline">
                            Kembali ke Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
