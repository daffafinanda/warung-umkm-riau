"use client";
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Dummy data for validation
    const dummyPhoneNumber = '081234567890';
    const dummyPassword = 'password123';

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (phoneNumber.length < 11 || phoneNumber.length > 13) {
            setError('Nomor HP Tidak Valid.');
            return;
        }

        if (phoneNumber === dummyPhoneNumber && password === dummyPassword) {
            alert('Login berhasil!')
            window.location.href = '/';
        } else {
            setError('Nomor HP atau sandi salah.');
        }
    };

    return (
        <div className="min-h-screen bg-primary2 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-black">Login</h1>
                        <p className="text-sm text-gray-600">Masuk ke akun anda</p>
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
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        <Link href="/forgot-password" className="text-primary text-sm font-medium hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Belum Punya Akun?{' '}
                            <Link href="/register" className="text-primary font-medium hover:underline">
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
