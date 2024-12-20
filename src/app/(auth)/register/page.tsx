"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export default function RegisterPage() {
    const [noHp, setNoHp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Used for validation and backend error messages
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const router = useRouter();

    // Validate password (uppercase, number, special character)
    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        setSuccessMessage("");

        // Validate phone number length
        if (noHp.length < 11 || noHp.length > 13) {
            setError("Nomor HP harus antara 11 dan 13 digit.");
            return;
        }

        // Validate password length and requirements
        if (password.length < 8) {
            setError("Password harus minimal 8 karakter.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password harus memiliki huruf besar, angka, dan simbol.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        // Register via API (Axios)
        try {
            const response = await axios.post(
                "https://backend-umkm-riau.vercel.app/api/akun/register",
                { no_hp: noHp, password: password }
            );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    router.push("/login"); // Redirect to login page
                }, 1500);
            } else {
                setError(response.data.message); // Display backend error message
            }
        } catch (error) {
            setError("Terjadi kesalahan saat registrasi."); // Display network error
            
        }
    };

    const handleGoBackToLogin = () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white text-black shadow-md rounded-2xl px-8 py-6">
                <h1 className="text-2xl font-bold text-primary text-center mb-2">Register</h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Masukkan nomor telepon dan buat password Anda untuk melanjutkan.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Phone number input */}
                    <div className="mb-4">
                        <label htmlFor="noHp" className="block text-gray-700 text-sm font-bold mb-2">
                            Nomor HP
                        </label>
                        <input
                            id="noHp"
                            type="tel"
                            placeholder="Contoh: 081234567890"
                            value={noHp}
                            maxLength={13}
                            onChange={(e) => setNoHp(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password input */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                        </button>
                    </div>

                    {/* Confirm password input */}
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Konfirmasi Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Konfirmasi password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                        </button>
                    </div>

                    {/* Error or success message */}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    {successMessage && <p className="text-green-500 text-xs mt-1">{successMessage}</p>}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-80 transition"
                    >
                        Lanjutkan
                    </button>
                </form>

                {/* Back to login button */}
                <div className="mt-2 text-center">
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
