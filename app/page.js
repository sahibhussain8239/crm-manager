import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="h-screen w-12/12 bg-amber-600 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-amber-200">CRM Manager</h1>
      </div>
      <div className="h-svh w-12/12 text-center flex items-center justify-center bg-fuchsia-400">
        <p className="text-lg">
          Welcome to CRM Manager, your all-in-one solution for managing customer relationships effectively. Our platform offers a comprehensive suite of tools designed to help you streamline your sales, marketing, and customer support processes. With CRM Manager, you can easily track leads, manage contacts, automate workflows, and gain valuable insights into your customer interactions. Whether you're a small business or a large enterprise, CRM Manager is here to help you build stronger relationships with your customers and drive business growth.
        </p>
      </div>
      <div className="h-svh w-12/12 text-center flex items-center justify-center bg-cyan-500 gap-4 flex-col">
        <h1>Make your Oraganization Here</h1>
        <Link rel="stylesheet" href="/registration" >
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
        </Link>
      </div>
      <div className="h-svh w-12/12 text-center flex items-center justify-center bg-cyan-500 gap-4 flex-col">
        <h1>Login to An Organization</h1>
        <Link rel="stylesheet" href="/login" >
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        </Link>
      </div>
    </div>
  );
}
