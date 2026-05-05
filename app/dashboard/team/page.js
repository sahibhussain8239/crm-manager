"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { toast } from 'react-toastify';

export default function TeamDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && session.user.role !== 'team_member') router.push('/');
    
    if (status === 'authenticated' && session.user.role === 'team_member') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/assignments');
      const data = await res.json();
      
      // Filter out completed assignments older than 3 days
      const now = new Date();
      const filteredAssignments = data.filter(assign => {
        if (assign.status === 'completed') {
          const completedDate = new Date(assign.updatedAt || assign.eventDate);
          return (now - completedDate) / (1000 * 60 * 60 * 24) <= 3;
        }
        return true;
      });
      
      setAssignments(filteredAssignments);
    } catch (error) {
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (assignmentId, newStatus, eventDetails) => {
    try {
      const res = await fetch('/api/assignments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentId, status: newStatus }),
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success(`Marked as ${newStatus}`);
        fetchData();
        
        // Notify managers about the status update
        fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            role: 'manager', 
            message: `${session?.user?.name} has marked ${eventDetails} as ${newStatus}` 
          })
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="p-10 text-white text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">Team Dashboard</h1>
            <p className="text-gray-300">Welcome, {session?.user?.name}</p>
          </div>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors border border-red-500/50">
            Sign Out
          </button>
        </div>

        <TabGroup>
          <TabList className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-6 border border-white/10">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all
                ${selected
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 outline-none'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              My Assignments
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10">
              <h2 className="text-xl font-semibold mb-6 text-white">Your Booked Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.length === 0 ? <p className="text-gray-400">No assignments found.</p> : assignments.map(assign => (
                  <div key={assign._id} className={`p-5 bg-black/40 rounded-xl border border-white/10 flex flex-col justify-between transition-opacity duration-500 ${assign.status === 'completed' ? 'opacity-50 grayscale' : ''}`}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-white">{assign.eventId?.clientName}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-700/50 border border-white/10 rounded-full">{assign.status}</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 p-3 rounded-lg text-sm mb-3 font-medium">
                        "You are booked for this event: {assign.function} as {assign.role}"
                      </div>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p><span className="text-gray-500">Date:</span> {new Date(assign.eventDate).toLocaleDateString()}</p>
                        <p><span className="text-gray-500">Time:</span> {assign.time}</p>
                        <p><span className="text-gray-500">Venue:</span> {assign.venue}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                      <button 
                        onClick={() => updateStatus(assign._id, 'started', `${assign.eventId?.clientName} - ${assign.function}`)}
                        disabled={assign.status === 'started' || assign.status === 'completed'}
                        className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                          assign.status === 'started' || assign.status === 'completed'
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        Mark Started
                      </button>
                      <button 
                        onClick={() => updateStatus(assign._id, 'completed', `${assign.eventId?.clientName} - ${assign.function}`)}
                        disabled={assign.status === 'completed' || assign.status !== 'started'}
                        className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                          assign.status === 'completed' || assign.status !== 'started'
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-500 text-white'
                        }`}
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
