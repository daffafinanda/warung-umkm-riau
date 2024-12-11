"use client";

import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BiodataPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const noHp = searchParams.get("noHp");  // Mendapatkan noHp dari URL query params

    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Dummy data untuk penyimpanan pendaftaran
    const dummyUsers: { noHp: string, nama: string, password: string }[] = [];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!nama.trim() || password.length < 8) {
            setError("Nama harus diisi dan password minimal 8 karakter.");
            return;
        }

        // Menyimpan data pengguna sebagai dummy
        dummyUsers.push({ noHp: noHp || "", nama, password });
        console.log("Data Pendaftaran:", { nama, password, noHp });

        setSuccessMessage("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.");

        // Redirect ke halaman login setelah 1,5 detik
        setTimeout(() => {
            router.push("/login");  // Mengarahkan ke halaman login
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white text-black shadow-md rounded-2xl px-8 py-6">
                <h1 className="text-2xl font-bold text-center mb-4">Lengkapi Biodata</h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Lengkapi data untuk melanjutkan pendaftaran.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nama"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nama
                        </label>
                        <input
                            id="nama"
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
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
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
}
