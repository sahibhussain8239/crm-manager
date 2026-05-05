"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { toast } from 'react-toastify';

export default function SalesAdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [events, setEvents] = useState([]);
  const [prodAdmins, setProdAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Event Form State
  const [eventData, setEventData] = useState({ eventId: '', clientName: '', eventDate: '', time: '', eventType: '', venues: '' });
  // Admin Form State
  const [adminData, setAdminData] = useState({ name: '', email: '', password: '', role: 'production_admin' });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && session.user.role !== 'sales_admin') router.push('/');
    
    if (status === 'authenticated' && session.user.role === 'sales_admin') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const [eventsRes, adminsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/users?role=production_admin')
      ]);
      const eventsData = await eventsRes.json();
      const adminsData = await adminsRes.json();
      
      const now = new Date();
      const filteredEvents = eventsData.filter(event => {
        if (event.status === 'completed') {
          const completedDate = new Date(event.updatedAt || event.eventDate);
          return (now - completedDate) / (1000 * 60 * 60 * 24) <= 3;
        }
        return true;
      });
      
      setEvents(filteredEvents);
      setProdAdmins(adminsData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setEventData({ eventId: '', clientName: '', eventDate: '', time: '', eventType: '', venues: '' });
      fetchData();
      // Notify production admins via toast if possible (we will build a notification system later)
      fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'production_admin', message: `New event added: ${eventData.eventId} for ${eventData.clientName}` })
      });
    } else {
      toast.error(data.message);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setAdminData({ name: '', email: '', password: '', role: 'production_admin' });
      fetchData();
    } else {
      toast.error(data.message);
    }
  };

  if (loading) return <div className="p-10 text-white text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">Sales Admin Dashboard</h1>
            <p className="text-gray-300">Welcome, {session?.user?.name}</p>
          </div>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors border border-red-500/50">
            Sign Out
          </button>
        </div>

        <TabGroup>
          <TabList className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-6 border border-white/10">
            {['Manage Events', 'Add Production Admin'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all
                  ${selected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 outline-none'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Create New Event</h2>
                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <input type="text" placeholder="Event ID" required value={eventData.eventId} onChange={e => setEventData({...eventData, eventId: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" placeholder="Client Name" required value={eventData.clientName} onChange={e => setEventData({...eventData, clientName: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <div className="flex gap-4">
                      <input type="date" required value={eventData.eventDate} onChange={e => setEventData({...eventData, eventDate: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                      <input type="time" placeholder="9:00 PM" required value={eventData.time} onChange={e => setEventData({...eventData, time: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <input type="text" placeholder="Event Type (e.g. Wedding, Birthday)" required value={eventData.eventType} onChange={e => setEventData({...eventData, eventType: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" placeholder="Venue" required value={eventData.venues} onChange={e => setEventData({...eventData, venues: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">Create & Book Event</button>
                  </form>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Recent Events</h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {events.length === 0 ? <p className="text-gray-400">No events found.</p> : events.map(event => (
                      <div key={event._id} className="p-4 bg-black/40 rounded-lg border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-white">{event.clientName} - {event.eventType}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">{event.status}</span>
                        </div>
                        <p className="text-sm text-gray-400">ID: {event.eventId} | Date: {new Date(event.eventDate).toLocaleDateString()}{event.time ? ` at ${event.time}` : ''}</p>
                        <p className="text-sm text-gray-400">Venue: {event.venues}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Create Production Admin</h2>
                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <input type="text" placeholder="Name" required value={adminData.name} onChange={e => setAdminData({...adminData, name: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <input type="email" placeholder="Email" required value={adminData.email} onChange={e => setAdminData({...adminData, email: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <input type="password" placeholder="Password" required value={adminData.password} onChange={e => setAdminData({...adminData, password: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                    <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">Add Production Admin</button>
                  </form>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Production Admins</h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {prodAdmins.length === 0 ? <p className="text-gray-400">No admins found.</p> : prodAdmins.map(admin => (
                      <div key={admin._id} className="p-4 bg-black/40 rounded-lg border border-white/10">
                        <h3 className="font-semibold text-white">{admin.name}</h3>
                        <p className="text-sm text-gray-400">{admin.email}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
