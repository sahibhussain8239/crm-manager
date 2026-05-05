"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { toast } from 'react-toastify';

export default function ProductionAdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [events, setEvents] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin Form State
  const [managerData, setManagerData] = useState({ name: '', email: '', password: '', role: 'manager' });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && session.user.role !== 'production_admin') router.push('/');
    
    if (status === 'authenticated' && session.user.role === 'production_admin') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const [eventsRes, managersRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/users?role=manager')
      ]);
      const eventsData = await eventsRes.json();
      const managersData = await managersRes.json();
      // Filter only booked events (waiting to be assigned)
      setEvents(eventsData.filter(e => e.status === 'booked' || e.status === 'waiting'));
      setManagers(managersData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateManager = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(managerData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setManagerData({ name: '', email: '', password: '', role: 'manager' });
      fetchData();
    } else {
      toast.error(data.message);
    }
  };

  const handleAssignEvent = async (eventId, managerId) => {
    if (!managerId) {
      toast.error("Please select a manager first");
      return;
    }
    const res = await fetch('/api/events/assign', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, managerId }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      fetchData();
      // Send notification to manager
      fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: managerId, message: `You have been assigned a new event.` })
      });
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
            <h1 className="text-3xl font-bold text-white">Production Admin Dashboard</h1>
            <p className="text-gray-300">Welcome, {session?.user?.name}</p>
          </div>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors border border-red-500/50">
            Sign Out
          </button>
        </div>

        <TabGroup>
          <TabList className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-6 border border-white/10">
            {['Assign Events', 'Add Manager'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all
                  ${selected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 outline-none'
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
              <h2 className="text-xl font-semibold mb-4 text-white">Booked Events Awaiting Assignment</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length === 0 ? <p className="text-gray-400">No pending events.</p> : events.map(event => (
                  <div key={event._id} className="p-5 bg-black/40 rounded-xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{event.clientName}</h3>
                      <p className="text-sm text-gray-300 mb-4">{event.eventType} - {new Date(event.eventDate).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-3">
                      <select id={`manager-${event._id}`} className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
                        <option value="">Select Manager</option>
                        {managers.map(m => (
                          <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => handleAssignEvent(event._id, document.getElementById(`manager-${event._id}`).value)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
                      >
                        Assign Manager
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Create Manager</h2>
                  <form onSubmit={handleCreateManager} className="space-y-4">
                    <input type="text" placeholder="Name" required value={managerData.name} onChange={e => setManagerData({...managerData, name: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    <input type="email" placeholder="Email" required value={managerData.email} onChange={e => setManagerData({...managerData, email: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    <input type="password" placeholder="Password" required value={managerData.password} onChange={e => setManagerData({...managerData, password: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">Add Manager</button>
                  </form>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Managers</h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {managers.length === 0 ? <p className="text-gray-400">No managers found.</p> : managers.map(manager => (
                      <div key={manager._id} className="p-4 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{manager.name}</h3>
                          <p className="text-sm text-gray-400">{manager.email}</p>
                        </div>
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
