<<<<<<< HEAD
"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Logged in successfully!');
      // Fetch session to determine role and redirect
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      
      if (session?.user?.role) {
        if (session.user.role === 'sales_admin') router.push('/dashboard/sales');
        else if (session.user.role === 'production_admin') router.push('/dashboard/production');
        else if (session.user.role === 'manager') router.push('/dashboard/manager');
        else router.push('/dashboard/team');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
        <p className="text-center text-white/70 mb-6">Log in to access your dashboard</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/30 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an organization yet?{' '}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
=======
"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Logged in successfully!');
            // Fetch session to determine role and redirect
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();

            if (session?.user?.role) {
                if (session.user.role === 'sales_admin') router.push('/dashboard/sales');
                else if (session.user.role === 'production_admin') router.push('/dashboard/production');
                else if (session.user.role === 'manager') router.push('/dashboard/manager');
                else router.push('/dashboard/team');
            } else {
                router.push('/');
            }
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center p-4 relative z-10'>
            <div className='w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl'>
                <h2 className='text-3xl font-bold mb-6 text-center text-white'>Welcome Back</h2>
                <p className='text-white/70 text-center mb-6'>
                    Log in to manage your organization's tasks and collaborate with your team.
                </p>
                <form className='space-y-6' onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            required
                            className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all'
                            placeholder='mohit@example.com'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            required
                            className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all'
                            placeholder='********'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors'
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Log In"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an organization yet?{' '}
                    <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    )
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
}