<<<<<<< HEAD
import Link from "next/link";
=======
import Link from 'next/link'
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative z-10">
      <div className="max-w-3xl space-y-8">
<<<<<<< HEAD
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-pulse">
          EventFlow CRM
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          The ultimate SaaS platform for managing events, organizing your crew, and delivering unforgettable experiences.
        </p>
        
=======
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-600 to-indigo-500 animate-pulse">
          CRM Manager
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          Welcome to CRM Manager, your all-in-one solution for managing customer relationships effectively. Our platform offers a comprehensive suite of tools designed to help you streamline your sales, marketing, and customer support processes. With CRM Manager, you can easily track leads, manage contacts, automate workflows, and gain valuable insights into your customer interactions. Whether you're a small business or a large enterprise, CRM Manager is here to help you build stronger relationships with your customers and drive business growth.
        </p>
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Create Organization
          </Link>
<<<<<<< HEAD
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
=======
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
            Member Login
          </Link>
        </div>
      </div>
<<<<<<< HEAD
      
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
=======
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
    </div>
  );
}
