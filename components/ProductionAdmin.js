import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const categories = [
    {
        name: 'Events',
        posts: [
            {
                id: 1,
                clientname: 'John Doe',
                date: '23/may/2026',
                eventtype: "Wedding",
                venue: "PS grarden",
                status: "Booked",
            },
            {
                id: 2,
                clientname: 'Jane Smith',
                date: '24/may/2026',
                eventtype: "Birthday",
                venue: "KTVS",
                status: "Pending",
            },
        ],
    },
]
const categories2 = [
    {
        name: 'Managers',
        posts: [
            {
                id: 1,
                name: 'Jane Doe',
                email: 'jan@doe.com',
                role: 'Manager',
            },
            {
                id: 2,
                name: 'John Smith',
                email: 'john@smith.com',
                role: 'Sales Associate',
            },
        ],
    },
]

export default function ProductionAdmin() {
    return (
        <>
            <div className="flex h-16 w-full items-center justify-center bg-[#0a0027] text-white">
                <h1 className='text-3xl font-bold'>Production Admin Dashboard</h1>
            </div>
            <div className="flex h-screen w-full justify-center px-4 pt-2">
                <div className="w-full">
                    <TabGroup>
                        <TabList className="flex gap-4 items-center justify-center">
                            
                                <Tab
                                    
                                    className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                                >
                                    Events
                                </Tab>
                                <Tab
                                    
                                    className="rounded-full px-4 py-2 text-2xl font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                                >
                                    Managers
                                </Tab>
                           
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
        </>
    )
}
