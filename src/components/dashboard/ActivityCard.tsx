import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, MapPin, Users } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ActivityCardProps {
  id?: string;
  title?: string;
  type?: "networking" | "physical" | "breakout" | "panel";
  time?: string;
  location?: string;
  participants?: number;
  maxParticipants?: number;
  points?: number;
  isRegistered?: boolean;
  onRegister?: (id: string) => void;
}

const ActivityCard = ({
  id = "1",
  title = "Introduction to AI",
  type = "panel",
  time = "10:00 AM - 11:30 AM",
  location = "Main Hall",
  participants = 45,
  maxParticipants = 100,
  points = 50,
  isRegistered = false,
  onRegister = () => {},
}: ActivityCardProps) => {
  const typeColors = {
    networking: "bg-blue-100 text-blue-800",
    physical: "bg-green-100 text-green-800",
    breakout: "bg-purple-100 text-purple-800",
    panel: "bg-amber-100 text-amber-800",
  };

  const handleRegister = () => {
    onRegister(id);
  };

  return (
    <Card className="w-full h-[180px] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-3 pb-0 flex-shrink-0">
        <div className="flex justify-between items-start">
          <Badge className={cn(typeColors[type], "font-normal")}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {points} pts
          </Badge>
        </div>
        <h3 className="font-semibold text-sm mt-1 line-clamp-1">{title}</h3>
      </CardHeader>
      <CardContent className="p-3 pt-1 text-xs text-gray-600 flex-grow">
        <div className="flex items-center gap-1 mb-1">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>
            {participants}/{maxParticipants} participants
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex-shrink-0">
        <Button
          variant={isRegistered ? "outline" : "default"}
          size="sm"
          className="w-full text-xs"
          onClick={handleRegister}
        >
          {isRegistered ? "Registered" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
