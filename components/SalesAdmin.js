import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React from 'react'
import Image from 'next/image'

const categories2 = [
    {
        name: 'Managers',
        posts: [
            {
                id: 1,
                name: 'Jane Doe',
                eventType: 'Wedding',
                date: '01/june/2026',
                location: 'PS Garden',
            },
            {
                id: 2,
                name: 'John Smith',
                eventType: 'Haldi',
                date: '01/july/2026',
                location: 'kTVS',
            },
        ],
    },
]

export default function Example() {
    return (
        <>
            <div className="flex h-16 w-full items-center justify-center bg-[#0a0027] text-white">
                <h1 className='text-3xl font-bold'>Sales Admin Dashboard</h1>
            </div>
            <div className="flex h-screen w-full justify-center px-4 pt-2">
                <div className="w-full">
                    <TabGroup>
                        <TabList className="flex gap-4 items-center justify-center">

                            <Tab

                                className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                Add an Event
                            </Tab>
                            <Tab

                                className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                View and manage Events
                            </Tab>
                            <Tab

                                className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                Add Manager
                            </Tab>

                        </TabList>
                        <TabPanels className="mt-3">
                            <TabPanel className="rounded-xl bg-white/5 p-3">
                                <div>
                                    <form>
                                        <input type="text" placeholder='Client Name' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Event Type' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Event Date' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Event Location' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <button type="submit" className='w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white'>Add Event</button>
                                    </form>
                                </div>
                            </TabPanel>
                            {categories2.map(({ name, posts }) => (
                                <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                                    <ul>
                                        {posts.map((post) => (
                                            <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                                                <a href="#" className="font-semibold text-white">
                                                    <span className="absolute inset-0" />
                                                    {post.name}
                                                </a>
                                                <ul className="flex gap-2 text-white/50" aria-hidden="true">
                                                    <li>{post.eventType}</li>
                                                    
                                                    <li aria-hidden="true">&middot;</li>
                                                    <li>{post.date}</li>
                                                    <li aria-hidden="true">&middot;</li>
                                                    <li>{post.location}</li>
                                                    <li><span><Image src="/assign.svg" alt="Event Image" width={50} height={50} /></span></li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </TabPanel>
                            ))}
                            <TabPanel className="rounded-xl bg-white/5 p-3">
                                <div>
                                    <form>
                                        <input type="text" placeholder='Manager Name' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Manager Email' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <input type="text" placeholder='Manager Role' className='w-full rounded-md border-0 bg-white/5 px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white focus-visible:outline-none focus-visible:ring-white data-invalid:ring-rose-500 sm:leading-6 mb-4' />
                                        <button type="submit" className='w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white'>Add Event</button>
                                    </form>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </>
    )
}
