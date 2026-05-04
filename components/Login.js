import React from "react";

const Login = () => {
    return (
        <div>
            <div className="min-h-[88.5vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px] text-white">
                <h1 className="text-3xl font-bold text-center mt-10">Login Page</h1>
                <p className="text-center text-gray-400">Please fill in the details below to Login with your credentials</p>

                <div className='max-w-2xl mx-auto py-5'>
                    <form >
                        <div className="space-y-12">
                            <div className="pb-5">
                                <div className="mt-10">
                                    {/* For Credential Id  */}
                                    <div>
                                        <label htmlFor="paId" className="block text-sm/6 font-medium text-white">Credential Id</label>
                                        <div className="my-2">
                                            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                <input id="paId" type="text" name='paId' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* For username  */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-white">UserName</label>
                                        <div className="my-2">
                                            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                <input id="name" type="text" name='name' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* for email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                                        <div className="my-2">
                                            <input type="text" name='email' id='email' className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium border border-none rounded-lg text-sm px-4 py-2 text-center leading-5 mt-3 w-full">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;