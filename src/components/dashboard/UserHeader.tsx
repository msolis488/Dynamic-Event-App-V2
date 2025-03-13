import React from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserHeaderProps {
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  notificationCount?: number;
  onLogout?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
}

const UserHeader = ({
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  userRole = "Attendee",
  notificationCount = 3,
  onLogout = () => {},
  onSettings = () => {},
  onNotifications = () => {},
}: UserHeaderProps) => {
  return (
    <div className="w-full bg-white shadow-sm py-3 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Event Dashboard</h1>
        <Badge variant="outline" className="ml-2">
          {userRole}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onNotifications}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
              variant="destructive"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="icon" onClick={onSettings}>
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserHeader;
