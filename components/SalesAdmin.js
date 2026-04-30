"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from "next/image";

const SalesAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <div className='w-full h-25 bg-[#cf5b5b] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px] text-white flex items-center justify-center'>
                <h1 className='text-3xl font-bold'>Welcome to Sales Admin Dashboard</h1>
            </div>
            <div className='flex justify-around w-full p-5 flex-wrap'>
                <div className='Event_card bg-amber-600 p-5 rounded-lg w-2xs h-70 flex items-center justify-center flex-col gap-5'>
                    <Image src="/events.svg" alt="Events" width={100} height={100} />
                    <p>Add Event Details</p>
                    <Button type="primary" onClick={showModal}>
                        <Image src="/add.svg" alt="Add Event" width={40} height={40} />
                    </Button>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <form>
                            <div className="space-y-12">
                                <div className="pb-5">
                                    <div className="mt-10">
                                        {/* For Event Name  */}
                                        <div>
                                            <label htmlFor="eventName" className="block text-sm/6 font-medium text-gray-900">Event Name</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md border ">
                                                    <input id="eventName" type="text" name='eventName' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-black-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* For Event Date  */}
                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm/6 font-medium text-gray-900">Event Date</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                    <input id="eventDate" type="date" name='eventDate' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className='Event_card bg-amber-600 p-5 rounded-lg w-2xs h-70 flex items-center justify-center flex-col gap-5'>
                    <Image src="/events.svg" alt="Events" width={100} height={100} />
                    <p>Add Event Details</p>
                    <Button type="primary" onClick={showModal}>
                        <Image src="/add.svg" alt="Add Event" width={40} height={40} />
                    </Button>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <form>
                            <div className="space-y-12">
                                <div className="pb-5">
                                    <div className="mt-10">
                                        {/* For Event Name  */}
                                        <div>
                                            <label htmlFor="eventName" className="block text-sm/6 font-medium text-gray-900">Event Name</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md border ">
                                                    <input id="eventName" type="text" name='eventName' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-black-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* For Event Date  */}
                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm/6 font-medium text-gray-900">Event Date</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                    <input id="eventDate" type="date" name='eventDate' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className='Event_card bg-amber-600 p-5 rounded-lg w-2xs h-70 flex items-center justify-center flex-col gap-5'>
                    <Image src="/events.svg" alt="Events" width={100} height={100} />
                    <p>Add Event Details</p>
                    <Button type="primary" onClick={showModal}>
                        <Image src="/add.svg" alt="Add Event" width={40} height={40} />
                    </Button>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <form>
                            <div className="space-y-12">
                                <div className="pb-5">
                                    <div className="mt-10">
                                        {/* For Event Name  */}
                                        <div>
                                            <label htmlFor="eventName" className="block text-sm/6 font-medium text-gray-900">Event Name</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md border ">
                                                    <input id="eventName" type="text" name='eventName' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-black-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* For Event Date  */}
                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm/6 font-medium text-gray-900">Event Date</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                    <input id="eventDate" type="date" name='eventDate' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className='Event_card bg-amber-600 p-5 rounded-lg w-2xs h-70 flex items-center justify-center flex-col gap-5'>
                    <Image src="/events.svg" alt="Events" width={100} height={100} />
                    <p>Add Event Details</p>
                    <Button type="primary" onClick={showModal}>
                        <Image src="/add.svg" alt="Add Event" width={40} height={40} />
                    </Button>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <form>
                            <div className="space-y-12">
                                <div className="pb-5">
                                    <div className="mt-10">
                                        {/* For Event Name  */}
                                        <div>
                                            <label htmlFor="eventName" className="block text-sm/6 font-medium text-gray-900">Event Name</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md border ">
                                                    <input id="eventName" type="text" name='eventName' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-black-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* For Event Date  */}
                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm/6 font-medium text-gray-900">Event Date</label>
                                            <div className="my-2">
                                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                                    <input id="eventDate" type="date" name='eventDate' className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default SalesAdmin
