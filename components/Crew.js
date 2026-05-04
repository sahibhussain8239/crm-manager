import React from 'react'

const Crew = () => {
    return (
        <>
            <div>
                <div className="flex h-16 w-full items-center justify-center bg-[#0a0027] text-white">
                    <h1 className='text-3xl font-bold'>Crew Dashboard</h1>
                </div>
            </div>
            <div className="h-screen w-full justify-center px-4 pt-2">
                <div className="w-full text-center">
                    <h2 className='text-2xl font-semibold text-white mb-4'>Assigned Events</h2>
                </div>
                <div className="w-full">
                    <div className="bg-white/5 p-4 rounded-xl">
                        <h3 className='text-xl font-semibold text-white mb-2'>Event 1</h3>
                        <p className='text-gray-300'>Description of the event...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crew
