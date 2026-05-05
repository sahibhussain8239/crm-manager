"use client";

<<<<<<< HEAD
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function NotificationPoller() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) return;
        const data = await res.json();

        if (data && data.length > 0) {
          data.forEach(notification => {
            toast.info(notification.message);
          });

          // Mark as read
          const notificationIds = data.map(n => n._id);
          await fetch('/api/notifications', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationIds }),
          });
        }
      } catch (error) {
        console.error("Failed to fetch notifications");
      }
    };

    // Initial fetch for offline notifications
    fetchNotifications();

    // Poll every 10 seconds for real-time feel
    const intervalId = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId);
  }, [status]);
}
=======
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function NotificationPoller() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") return;

        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/notifications");
                if (!response.ok) return;
                const data = await response.json();

                if (data && data.length > 0) {
                    data.forEach(notification => {
                        toast(notification.message);
                    });

                    // Mark as read
                    const notificationIds = data.map(n => n.id);
                    await fetch("/api/notifications/read", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ notificationIds })
                    });
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        // Initial fetch for offline notifications
        fetchNotifications();

        // Poll every 10 seconds for real-time updates
        const interval = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds

        return () => clearInterval(interval);
    }, [status]);
}
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
