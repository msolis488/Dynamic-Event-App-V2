import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Clock, MapPin, Calendar, X, RefreshCw } from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  type: "networking" | "physical" | "breakout" | "panel";
  progress?: number;
}

interface UpcomingScheduleProps {
  scheduleItems?: ScheduleItem[];
  onCancelActivity?: (id: string) => void;
  onRescheduleActivity?: (id: string) => void;
}

const UpcomingSchedule: React.FC<UpcomingScheduleProps> = ({
  scheduleItems = [
    {
      id: "1",
      title: "Networking Breakfast",
      time: "8:00 AM - 9:30 AM",
      date: "Today",
      location: "Main Hall",
      type: "networking",
      progress: 0,
    },
    {
      id: "2",
      title: "Keynote: Future of Tech",
      time: "10:00 AM - 11:30 AM",
      date: "Today",
      location: "Auditorium A",
      type: "panel",
      progress: 0,
    },
    {
      id: "3",
      title: "Yoga Session",
      time: "12:00 PM - 1:00 PM",
      date: "Today",
      location: "Wellness Zone",
      type: "physical",
      progress: 0,
    },
    {
      id: "4",
      title: "Product Workshop",
      time: "2:00 PM - 4:00 PM",
      date: "Today",
      location: "Room 203",
      type: "breakout",
      progress: 0,
    },
    {
      id: "5",
      title: "Networking Reception",
      time: "5:00 PM - 7:00 PM",
      date: "Today",
      location: "Rooftop Garden",
      type: "networking",
      progress: 0,
    },
    {
      id: "6",
      title: "Industry Panel Discussion",
      time: "9:00 AM - 10:30 AM",
      date: "Tomorrow",
      location: "Auditorium B",
      type: "panel",
      progress: 0,
    },
  ],
  onCancelActivity = () => {},
  onRescheduleActivity = () => {},
}) => {
  // Group schedule items by date
  const groupedSchedule = scheduleItems.reduce<Record<string, ScheduleItem[]>>(
    (groups, item) => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    },
    {},
  );

  // Get activity type color
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "networking":
        return "bg-blue-500";
      case "physical":
        return "bg-green-500";
      case "breakout":
        return "bg-purple-500";
      case "panel":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Schedule</h2>
        <div className="text-sm text-gray-500">
          {scheduleItems.length} activities
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4 max-h-[600px]">
        {Object.entries(groupedSchedule).map(([date, items]) => (
          <div key={date} className="mb-6">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <h3 className="font-semibold text-gray-700">{date}</h3>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${getActivityTypeColor(item.type)} mr-2`}
                        ></div>
                        <h4 className="font-medium">{item.title}</h4>
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1.5" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {item.progress !== undefined && item.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onRescheduleActivity(item.id)}
                      >
                        <RefreshCw className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onCancelActivity(item.id)}
                      >
                        <X className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default UpcomingSchedule;
