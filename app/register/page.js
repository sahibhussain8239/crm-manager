"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import Organization from "@/models/Organization";

export default function RegistrationPage() {
    const roputer = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        organizationName: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Registration successful! Please log in.");
                roputer.push("/login");
            } else {
                toast.error(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
        setLoading(false);
    };


    return (
        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Create an Account</h2>
                <p className="text-white/70 text-center mb-6">
                    Join our platform to manage your organization's tasks and collaborate with your team.
                    x</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                            placeholder="Mohit Sharma"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                            placeholder="mohit@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="organizationName" className="block text-sm font-medium text-white">Organization Name</label>
                        <input
                            type="text"
                            name="organizationName"
                            id="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                            placeholder="Organization Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30 flex justify-center items-center"
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Register Organization"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
} 