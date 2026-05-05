"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { toast } from 'react-toastify';

export default function ManagerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teamData, setTeamData] = useState({ name: '', email: '', password: '', role: 'team_member' });
  const [assignData, setAssignData] = useState({ eventId: '', userId: '', role: 'Photographer', functionName: '', time: '', venue: '', eventDate: '' });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && session.user.role !== 'manager') router.push('/');
    
    if (status === 'authenticated' && session.user.role === 'manager') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const [eventsRes, teamRes, assignsRes] = await Promise.all([
        fetch('/api/events/manager'),
        fetch('/api/users?role=team_member'),
        fetch('/api/assignments')
      ]);
      
      const now = new Date();
      const filteredEvents = (await eventsRes.json()).filter(event => {
        if (event.status === 'completed') {
          const completedDate = new Date(event.updatedAt || event.eventDate);
          return (now - completedDate) / (1000 * 60 * 60 * 24) <= 3;
        }
        return true;
      });
      setEvents(filteredEvents);
      
      setTeamMembers(await teamRes.json());
      
      const filteredAssigns = (await assignsRes.json()).filter(assign => {
        if (assign.status === 'completed') {
          const completedDate = new Date(assign.updatedAt || assign.eventDate);
          return (now - completedDate) / (1000 * 60 * 60 * 24) <= 3;
        }
        return true;
      });
      setAssignments(filteredAssigns);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeamMember = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setTeamData({ name: '', email: '', password: '', role: 'team_member' });
      fetchData();
    } else {
      toast.error(data.message);
    }
  };

  const handleEventChange = (e) => {
    const selectedEventId = e.target.value;
    const selectedEvent = events.find(ev => ev._id === selectedEventId);
    if (selectedEvent) {
      const formattedDate = selectedEvent.eventDate ? new Date(selectedEvent.eventDate).toISOString().split('T')[0] : '';
      setAssignData({...assignData, eventId: selectedEventId, venue: selectedEvent.venues || '', eventDate: formattedDate});
    } else {
      setAssignData({...assignData, eventId: selectedEventId});
    }
  };

  const handleAssignTeam = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setAssignData({ eventId: '', userId: '', role: 'Photographer', functionName: '', time: '', venue: '', eventDate: '' });
      fetchData();
      
      // Notify team member
      const eventInfo = events.find(ev => ev._id === assignData.eventId);
      fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: assignData.userId, message: `You are booked for an event: ${eventInfo?.clientName} - ${assignData.functionName}` })
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
            <h1 className="text-3xl font-bold text-white">Manager Dashboard</h1>
            <p className="text-gray-300">Welcome, {session?.user?.name}</p>
          </div>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors border border-red-500/50">
            Sign Out
          </button>
        </div>

        <TabGroup>
          <TabList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rounded-xl bg-white/5 p-1 mb-6 border border-white/10">
            {['Assigned Events', 'Manage Team', 'Assign Work'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all
                  ${selected
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 outline-none'
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
              <h2 className="text-xl font-semibold mb-4 text-white">Events Assigned To You</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length === 0 ? <p className="text-gray-400">No events assigned.</p> : events.map(event => (
                  <div key={event._id} className={`p-5 bg-black/40 rounded-xl border border-white/10 transition-opacity duration-500 ${event.status === 'completed' ? 'opacity-50 grayscale' : ''}`}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-white mb-1">{event.clientName}</h3>
                      {event.status === 'completed' && <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/20">Completed</span>}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{event.eventType} - {new Date(event.eventDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">Venue: {event.venues}</p>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Create Team Member</h2>
                  <form onSubmit={handleCreateTeamMember} className="space-y-4">
                    <input type="text" placeholder="Name" required value={teamData.name} onChange={e => setTeamData({...teamData, name: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                    <input type="email" placeholder="Email" required value={teamData.email} onChange={e => setTeamData({...teamData, email: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                    <input type="password" placeholder="Password" required value={teamData.password} onChange={e => setTeamData({...teamData, password: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">Add Team Member</button>
                  </form>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Team Members</h2>
<<<<<<< HEAD
                  <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
=======
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
                    {teamMembers.length === 0 ? <p className="text-gray-400">No members found.</p> : teamMembers.map(member => (
                      <div key={member._id} className="p-4 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{member.name}</h3>
                          <p className="text-sm text-gray-400">{member.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Assign Work</h2>
                  <form onSubmit={handleAssignTeam} className="space-y-4">
                    <select required value={assignData.eventId} onChange={handleEventChange} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="">Select Event</option>
                      {events.map(e => <option key={e._id} value={e._id}>{e.clientName} - {e.eventType}</option>)}
                    </select>
                    
                    <select required value={assignData.userId} onChange={e => setAssignData({...assignData, userId: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="">Select Team Member</option>
                      {teamMembers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                    </select>

                    <select required value={assignData.role} onChange={e => setAssignData({...assignData, role: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="Photographer">Photographer</option>
                      <option value="Cinematographer">Cinematographer</option>
                      <option value="Drone Operator">Drone Operator</option>
                      <option value="Editor">Editor</option>
                    </select>

                    <input type="text" placeholder="Function (e.g., Haldi, Mehndi)" required value={assignData.functionName} onChange={e => setAssignData({...assignData, functionName: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                    
                    <div className="flex gap-4">
                        <input type="date" required value={assignData.eventDate} onChange={e => setAssignData({...assignData, eventDate: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                        <input type="time" required value={assignData.time} onChange={e => setAssignData({...assignData, time: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                    </div>

                    <input type="text" placeholder="Venue Location" required value={assignData.venue} onChange={e => setAssignData({...assignData, venue: e.target.value})} className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500" />

                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">Assign Work</button>
                  </form>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Current Assignments</h2>
<<<<<<< HEAD
                  <div className="space-y-3 max-h-125 overflow-y-auto pr-2">
=======
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
                    {assignments.length === 0 ? <p className="text-gray-400">No assignments created.</p> : assignments.map(assign => (
                      <div key={assign._id} className={`p-4 bg-black/40 rounded-lg border border-white/10 transition-opacity duration-500 ${assign.status === 'completed' ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex justify-between">
                            <h3 className="font-semibold text-white">{assign.userId?.name} ({assign.role})</h3>
                            <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">{assign.status}</span>
                        </div>
                        <p className="text-sm text-emerald-300 mt-1">{assign.eventId?.clientName} - {assign.function}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(assign.eventDate).toLocaleDateString()} at {assign.time} | {assign.venue}
                        </p>
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
