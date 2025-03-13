import React from "react";
import { Trophy, Star, Award, Users, TrendingUp } from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  unlocked: boolean;
  icon: React.ReactNode;
}

interface PointsAchievementsProps {
  totalPoints?: number;
  recentPoints?: number;
  level?: number;
  leaderboardPosition?: number;
  achievements?: Achievement[];
  nextLevelPoints?: number;
  onViewLeaderboard?: () => void;
}

const PointsAchievements = ({
  totalPoints = 1250,
  recentPoints = 75,
  level = 4,
  leaderboardPosition = 12,
  achievements = [
    {
      id: "1",
      name: "Networking Pro",
      description: "Connect with 10 attendees",
      progress: 70,
      unlocked: false,
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "2",
      name: "Session Master",
      description: "Attend 5 sessions",
      progress: 100,
      unlocked: true,
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: "3",
      name: "Early Bird",
      description: "Check in to 3 morning events",
      progress: 66,
      unlocked: false,
      icon: <Award className="h-5 w-5 text-purple-500" />,
    },
  ],
  nextLevelPoints = 1500,
  onViewLeaderboard = () => {},
}: PointsAchievementsProps) => {
  const levelProgress = Math.min(100, (totalPoints / nextLevelPoints) * 100);

  return (
    <Card className="h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Points & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Points Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{totalPoints} pts</h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +{recentPoints} pts
            </Badge>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {nextLevelPoints - totalPoints} points to next level
            </p>
          </div>
        </div>

        {/* Leaderboard Position */}
        <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Leaderboard Position</span>
          </div>
          <span className="text-lg font-bold">#{leaderboardPosition}</span>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="font-semibold">Achievements</h3>
          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border ${achievement.unlocked ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${achievement.unlocked ? "bg-green-100" : "bg-slate-100"}`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{achievement.name}</h4>
                      {achievement.unlocked && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                    {!achievement.unlocked && (
                      <div className="mt-2 space-y-1">
                        <Progress
                          value={achievement.progress}
                          className="h-1.5"
                        />
                        <p className="text-xs text-right">
                          {achievement.progress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onViewLeaderboard}
        >
          <Trophy className="h-4 w-4" />
          <span>View Leaderboard</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PointsAchievements;
