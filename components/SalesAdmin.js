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
            <div className="flex h-screen w-full justify-center px-4 pt-2">
                <div className="w-full">
                    <TabGroup>
                        <TabList className="flex gap-4 items-center justify-center">
                            {categories.map(({ name }) => (
                                <Tab
                                    key={name}
                                    className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                            {categories.map(({ name, posts }) => (
                                <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                                    <ul>
                                        {posts.map((post) => (
                                            <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                                                <a href="#" className="font-semibold text-white">
                                                    <span className="absolute inset-0" />
                                                    {post.eventtype} - {post.clientname}
                                                </a>
                                                <ul className="flex gap-2 text-white/50" aria-hidden="true">
                                                    <li>{post.date}</li>
                                                    <li aria-hidden="true">&middot;</li>
                                                    <li>{post.venue} </li>
                                                    <li aria-hidden="true">&middot;</li>
                                                    <li>{post.status}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                            ))}
                            {categories.map(({ name, posts }) => (
                                <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                                    <ul>
                                        {posts.map((post) => (
                                            <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                                                <a href="#" className="font-semibold text-white">
                                                    <span className="absolute inset-0" />
                                                    {post.name}
                                                </a>
                                                <ul className="flex gap-2 text-white/50" aria-hidden="true">
                                                    <li>{post.email}</li>
                                                    <li aria-hidden="true">&middot;</li>
                                                    <li>{post.role}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    )
}

export default SalesAdmin
