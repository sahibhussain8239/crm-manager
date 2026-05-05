import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative z-10">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-pulse">
          EventFlow CRM
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          The ultimate SaaS platform for managing events, organizing your crew, and delivering unforgettable experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Create Organization
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            Member Login
          </Link>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-2">For Sales Admins</h3>
          <p className="text-gray-400">Easily manage bookings and create event requests.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-2">For Managers</h3>
          <p className="text-gray-400">Assemble your crew and delegate tasks seamlessly.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-2">For the Crew</h3>
          <p className="text-gray-400">Get real-time updates and track your assignments.</p>
        </div>
      </div>
    </div>
  );
}
