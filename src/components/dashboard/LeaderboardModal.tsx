import React from "react";
import { Trophy, Medal, Award, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar?: string;
  achievements: string[];
  isCurrentUser?: boolean;
}

interface LeaderboardModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  currentUserId?: string;
  leaderboardData?: LeaderboardUser[];
}

const defaultLeaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    points: 1250,
    rank: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    achievements: ["Networking Pro", "Panel Expert", "Early Bird"],
    isCurrentUser: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    points: 1180,
    rank: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    achievements: ["Activity Master", "Social Butterfly"],
  },
  {
    id: "3",
    name: "Jessica Williams",
    points: 1050,
    rank: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    achievements: ["Breakout Champion", "Question Asker"],
  },
  {
    id: "4",
    name: "David Rodriguez",
    points: 980,
    rank: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    achievements: ["Panel Participant"],
  },
  {
    id: "5",
    name: "Emily Patel",
    points: 920,
    rank: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    achievements: ["Networking Novice"],
  },
  {
    id: "6",
    name: "James Wilson",
    points: 850,
    rank: 6,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    achievements: ["Event Explorer"],
  },
  {
    id: "7",
    name: "Olivia Martinez",
    points: 780,
    rank: 7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    achievements: ["Session Attendee"],
  },
  {
    id: "8",
    name: "Daniel Kim",
    points: 720,
    rank: 8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
    achievements: ["Event Participant"],
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="text-sm font-medium">{rank}</span>;
  }
};

const LeaderboardModal = ({
  isOpen = false,
  onOpenChange,
  currentUserId = "1",
  leaderboardData = defaultLeaderboardData,
}: LeaderboardModalProps) => {
  // Find current user in leaderboard
  const currentUser =
    leaderboardData.find((user) => user.id === currentUserId) ||
    leaderboardData[0];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Event Leaderboard
          </DialogTitle>
        </DialogHeader>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 py-8 bg-gradient-to-b from-blue-50 to-white">
          {leaderboardData.slice(0, 3).map((user, index) => {
            const podiumHeight = ["h-28", "h-24", "h-20"];
            const podiumPosition = ["order-2", "order-1", "order-3"];

            return (
              <motion.div
                key={user.id}
                className={`flex flex-col items-center ${podiumPosition[index]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Avatar
                  className={`w-16 h-16 border-4 ${index === 0 ? "border-yellow-500" : index === 1 ? "border-gray-300" : "border-amber-700"} mb-2`}
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-sm text-gray-600">{user.points} pts</p>
                <div
                  className={`${podiumHeight[index]} w-20 mt-2 rounded-t-lg bg-gradient-to-t ${index === 0 ? "from-yellow-400 to-yellow-300" : index === 1 ? "from-gray-300 to-gray-200" : "from-amber-600 to-amber-500"} flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <h3 className="text-lg font-semibold mb-3 px-2 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Full Rankings
          </h3>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <motion.div
                key={user.id}
                className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="ml-3 h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <p className="font-medium">{user.name}</p>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.achievements.slice(0, 2).map((achievement, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs bg-white"
                      >
                        {achievement}
                      </Badge>
                    ))}
                    {user.achievements.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-white">
                        +{user.achievements.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{user.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current User Stats */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 border-2 border-blue-500">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-semibold">Your Ranking</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-600">
                    Rank #{currentUser.rank}
                  </p>
                  <span className="text-sm text-gray-400">•</span>
                  <p className="text-sm text-gray-600">
                    {currentUser.points} points
                  </p>
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <span>Close</span>
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;
