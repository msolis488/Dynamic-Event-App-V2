import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-react";
import ActivityCard from "./ActivityCard";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export interface Activity {
  id: string;
  title: string;
  type: "networking" | "physical" | "breakout" | "panel";
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  points: number;
  isRegistered: boolean;
}

export interface ActivityCategoriesProps {
  activities?: Activity[];
  onRegister?: (id: string) => void;
}

const ActivityCategories = ({
  activities = [
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
  ],
  onRegister = () => {},
}: ActivityCategoriesProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    registered: false,
    available: false,
    highPoints: false,
  });

  // Filter activities based on active tab, search query, and filters
  const filteredActivities = activities.filter((activity) => {
    // Filter by tab
    if (activeTab !== "all" && activity.type !== activeTab) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !activity.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply additional filters
    if (filters.registered && !activity.isRegistered) {
      return false;
    }
    if (
      filters.available &&
      activity.participants >= activity.maxParticipants
    ) {
      return false;
    }
    if (filters.highPoints && activity.points < 40) {
      return false;
    }

    return true;
  });

  const handleRegister = (id: string) => {
    onRegister(id);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Activities</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search activities..."
              className="pl-8 h-9 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="registered"
                    checked={filters.registered}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, registered: checked === true })
                    }
                  />
                  <Label htmlFor="registered">Registered only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available"
                    checked={filters.available}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, available: checked === true })
                    }
                  />
                  <Label htmlFor="available">Available spots</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highPoints"
                    checked={filters.highPoints}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, highPoints: checked === true })
                    }
                  />
                  <Label htmlFor="highPoints">High point value (40+)</Label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="breakout">Breakout</TabsTrigger>
          <TabsTrigger value="panel">Panels</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[350px] p-1">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                title={activity.title}
                type={activity.type}
                time={activity.time}
                location={activity.location}
                participants={activity.participants}
                maxParticipants={activity.maxParticipants}
                points={activity.points}
                isRegistered={activity.isRegistered}
                onRegister={handleRegister}
              />
            ))}
            {filteredActivities.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No activities match your filters
              </div>
            )}
          </div>
        </TabsContent>

        {["networking", "physical", "breakout", "panel"].map((type) => (
          <TabsContent key={type} value={type} className="m-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[350px] p-1">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  type={activity.type}
                  time={activity.time}
                  location={activity.location}
                  participants={activity.participants}
                  maxParticipants={activity.maxParticipants}
                  points={activity.points}
                  isRegistered={activity.isRegistered}
                  onRegister={handleRegister}
                />
              ))}
              {filteredActivities.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No activities match your filters
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ActivityCategories;
