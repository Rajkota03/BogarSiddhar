"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Refresh router to sync server components with the new cookie
            router.refresh();
            router.replace("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2C241B] z-50 relative">
            <div className="w-full max-w-md bg-white text-black p-8 rounded-lg shadow-2xl">
                <h1 className="text-2xl font-serif font-bold text-center mb-6">Admin Access</h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#B87333] text-white py-2 rounded hover:bg-[#A6652C] transition-colors font-medium disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Enter Sanctuary"}
                    </button>
                </form>
            </div>
        </div>
    );
}
