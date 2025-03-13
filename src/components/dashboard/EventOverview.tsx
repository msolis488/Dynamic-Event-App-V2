import React from "react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface EventOverviewProps {
  eventName?: string;
  eventDate?: string;
  progress?: number;
  featuredImage?: string;
  daysLeft?: number;
  totalDays?: number;
}

const EventOverview = ({
  eventName = "Tech Conference 2023",
  eventDate = "October 15-18, 2023",
  progress = 65,
  featuredImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  daysLeft = 2,
  totalDays = 4,
}: EventOverviewProps) => {
  return (
    <div className="w-full h-[250px] bg-slate-50 rounded-lg overflow-hidden shadow-md relative">
      {/* Featured Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredImage}
          alt={eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{eventName}</h1>
            <Badge
              variant="outline"
              className="bg-white/20 text-white border-none"
            >
              {eventDate}
            </Badge>
          </div>

          <div className="flex items-center mt-2 text-white/80 text-sm">
            <span>
              Day {totalDays - daysLeft} of {totalDays}
            </span>
            <span className="mx-2">•</span>
            <span>
              {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Event Progress</span>
            <span className="text-white font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />

          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-white text-sm">
                Live Now: Keynote Speech
              </span>
            </div>
            <button className="px-4 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverview;
