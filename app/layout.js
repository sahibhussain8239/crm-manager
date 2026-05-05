import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
<<<<<<< HEAD
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
import NotificationPoller from "@/components/NotificationPoller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRM Manager",
<<<<<<< HEAD
  description: "Event Management CRM",
=======
  description: "CRM Manager is a comprehensive customer relationship management platform designed to help businesses streamline their sales, marketing, and customer support processes. With CRM Manager, you can easily track leads, manage contacts, automate workflows, and gain valuable insights into your customer interactions. Whether you're a small business or a large enterprise, CRM Manager is here to help you build stronger relationships with your customers and drive business growth.",
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
<<<<<<< HEAD
        <AuthProvider>
          <NotificationPoller />
          <div className="min-h-[88.5vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px] text-white">
            {children}
          </div>
          <ToastContainer position="top-right" autoClose={5000} theme="dark" />
        </AuthProvider>
=======
          <AuthProvider>
            <NotificationPoller />
            <div className="min-h-[88.5vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px] text-white">
              {children}
            </div>
            <ToastContainer position="top-right" autoClose={5000} theme="dark"/>
          </AuthProvider>
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
      </body>
    </html>
  );
}
