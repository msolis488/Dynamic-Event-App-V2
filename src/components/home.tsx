import React, { useState } from "react";
import EventOverview from "./dashboard/EventOverview";
import PointsAchievements from "./dashboard/PointsAchievements";
import ActivityCategories from "./dashboard/ActivityCategories";
import UpcomingSchedule from "./dashboard/UpcomingSchedule";
import LeaderboardModal from "./dashboard/LeaderboardModal";
import AchievementAnimation from "./dashboard/AchievementAnimation";
import UserHeader from "./dashboard/UserHeader";

// Define Activity type locally instead of importing it
interface Activity {
  id: string;
  title: string;
  type: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  points: number;
  isRegistered: boolean;
}

import { useUser } from "../hooks/useUser";

const Home = () => {
  const { user, loading, error } = useUser();
  const [showAchievement, setShowAchievement] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Introduction to AI",
      type: "panel",
      time: "10:00 AM - 11:30 AM",
      location: "Main Hall",
      participants: 45,
      maxParticipants: 100,
      points: 50,
      isRegistered: false,
    },
    {
      id: "2",
      title: "Networking Breakfast",
      type: "networking",
      time: "8:30 AM - 9:30 AM",
      location: "Dining Area",
      participants: 28,
      maxParticipants: 50,
      points: 30,
      isRegistered: true,
    },
    {
      id: "3",
      title: "Morning Yoga",
      type: "physical",
      time: "7:00 AM - 8:00 AM",
      location: "Garden Terrace",
      participants: 15,
      maxParticipants: 25,
      points: 40,
      isRegistered: false,
    },
    {
      id: "4",
      title: "Product Design Workshop",
      type: "breakout",
      time: "1:00 PM - 3:00 PM",
      location: "Workshop Room B",
      participants: 32,
      maxParticipants: 40,
      points: 60,
      isRegistered: false,
    },
    {
      id: "5",
      title: "Future of Tech Panel",
      type: "panel",
      time: "4:00 PM - 5:30 PM",
      location: "Main Stage",
      participants: 120,
      maxParticipants: 200,
      points: 50,
      isRegistered: false,
    },
    {
      id: "6",
      title: "Speed Networking",
      type: "networking",
      time: "6:00 PM - 7:00 PM",
      location: "Networking Lounge",
      participants: 40,
      maxParticipants: 60,
      points: 45,
      isRegistered: false,
    },
  ]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);

  // Handle activity registration
  const handleRegisterActivity = (id: string) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === id) {
          // If registering for a new activity, show achievement and add points
          if (!activity.isRegistered) {
            setUserPoints((prev) => prev + activity.points);
            // Show achievement animation for first registration
            if (!prevActivities.some((a) => a.isRegistered)) {
              setShowAchievement(true);
            }
          }
          return { ...activity, isRegistered: !activity.isRegistered };
        }
        return activity;
      }),
    );
  };

  // Handle canceling an activity
  const handleCancelActivity = (id: string) => {
    // Find the activity in the activities list
    const activity = activities.find((a) => a.id === id);
    if (activity && activity.isRegistered) {
      // Update the activity to not be registered
      setActivities((prevActivities) =>
        prevActivities.map((a) =>
          a.id === id ? { ...a, isRegistered: false } : a,
        ),
      );
      // Deduct points if the activity was registered
      setUserPoints((prev) => Math.max(0, prev - activity.points / 2)); // Deduct half points for cancellation
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* User Header */}
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="w-full h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <UserHeader
          userName={user?.name || "Guest"}
          userAvatar={user?.avatar_url}
          userRole={user?.role || "Attendee"}
          notificationCount={3}
          onLogout={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
          onSettings={() => console.log("Settings clicked")}
          onNotifications={() => console.log("Notifications clicked")}
        />
      )}

      <div className="p-6">
        {/* Achievement Animation */}
        <AchievementAnimation
          isOpen={showAchievement}
          onClose={() => setShowAchievement(false)}
          achievement={{
            id: "1",
            title: "First Registration",
            description: "You've registered for your first activity!",
            icon: "🎯",
            points: 50,
          }}
        />

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Event Overview */}
          <EventOverview
            eventName="Tech Innovation Summit 2023"
            eventDate="October 15-18, 2023"
            progress={65}
            daysLeft={2}
            totalDays={4}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Points & Achievements */}
            <div className="h-[578px]">
              <PointsAchievements
                totalPoints={user?.points || 0}
                recentPoints={75}
                level={user?.level || 1}
                leaderboardPosition={user?.leaderboard_position || 0}
                achievements={user?.achievements || []}
                onViewLeaderboard={() => setIsLeaderboardOpen(true)}
              />
            </div>

            {/* Middle Column - Upcoming Schedule (now more prominent) */}
            <div className="md:col-span-2 h-[575px]">
              <UpcomingSchedule
                onCancelActivity={handleCancelActivity}
                onRescheduleActivity={(id) => console.log("Reschedule", id)}
              />
            </div>

            {/* Activity Categories - Full Width */}
            <div className="md:col-span-3">
              <ActivityCategories
                activities={activities}
                onRegister={handleRegisterActivity}
              />
            </div>
          </div>

          {/* Leaderboard Modal */}
          <LeaderboardModal
            isOpen={isLeaderboardOpen}
            onOpenChange={setIsLeaderboardOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
