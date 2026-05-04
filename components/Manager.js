import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React from 'react'
import Image from 'next/image'

const TeamMember = [
    {
        name: 'Members',
        posts: [
            {
                id: 1,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                role: 'Photographer',
            },
            {
                id: 2,
                name: 'John Smith',
                email: 'john.smith@example.com',
                role: 'Cinematographer',
            },
        ],
    },
]

const Manager = () => {
    return (
        <>
            <div className="flex h-16 w-full items-center justify-center bg-[#0a0027] text-white">
                <h1 className='text-3xl font-bold'>Manger Dashboard</h1>
            </div>
            <div className="flex h-screen w-full justify-center px-4 pt-2">
                <div className="w-full">
                    <TabGroup>
                        <TabList className="flex gap-4 items-center justify-center">
                            <Tab
                                className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                Add Team Member
                            </Tab>
                            <Tab
                                className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                View and Manage Team
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-3">
                            <TabPanel className="rounded-xl bg-white/5 p-3">
                                <div>
                                    <form>
                                        <input type="text" placeholder='Name' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Email' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Role' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <button type="submit" className='w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white'>Add Team Member</button>
                                    </form>
                                </div>
                            </TabPanel>
                            {/* {TeamMember.map((member) => (
                                <TabPanel key={member.name} className="rounded-xl w-lg bg-white/5 p-3">
                                    <ul className="divide-y divide-white/10">
                                        {member.posts.map((post) => (
                                            <li key={post.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                                {post.name}
                                                {post.email}
                                                {post.role}
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                            ))} */}
                            <TabPanel className="rounded-xl flex justify-around w-full ">
                            <span className='w-2xl bg-white/5 p-3'>
                                <ul className="divide-y divide-white/10 ">
                                    <li className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        Jane Doe
                                        jane.doe@example.com
                                        Photographer
                                    </li>
                                    <li className="flex flex-col py-4 sm:flex-row sm:items-center">
                                        John Smith
                                        john.smith@example.com
                                        Cinematographer
                                    </li>
                                </ul>
                                </span>
                                
                            <span className='w-2xl bg-white/5 p-3'>
                                <ul className="divide-y divide-white/10">
                                    <li className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        Jane Doe
                                        jane.doe@example.com
                                        Photographer
                                    </li>
                                    <li className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        John Smith
                                        john.smith@example.com
                                        Cinematographer
                                    </li>
                                </ul>
                                </span>

                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </>
    )
}

export default Manager
