import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface AchievementAnimationProps {
  isOpen?: boolean;
  onClose?: () => void;
  achievement?: {
    id: string;
    title: string;
    description: string;
    icon: string;
    points: number;
  };
}

const AchievementAnimation = ({
  isOpen = true,
  onClose = () => {},
  achievement = {
    id: "1",
    title: "First Connection",
    description: "You've made your first connection at the event!",
    icon: "🤝",
    points: 50,
  },
}: AchievementAnimationProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset confetti when achievement is shown
      setShowConfetti(true);

      // Auto-hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-yellow-400 max-w-md mx-auto text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-yellow-300">
            Achievement Unlocked!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 relative overflow-hidden bg-background/10 rounded-lg">
          {/* Confetti Animation */}
          <AnimatePresence>
            {showConfetti && (
              <>
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      y: -20,
                      x: Math.random() * 400 - 200,
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{
                      y: 400,
                      x: Math.random() * 400 - 200,
                      opacity: [1, 1, 0],
                      scale: [0, 1, 1],
                      rotate: Math.random() * 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      ease: "easeOut",
                      delay: Math.random() * 0.5,
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: [
                        "#FFD700",
                        "#FF6347",
                        "#4169E1",
                        "#32CD32",
                        "#FF69B4",
                        "#9370DB",
                      ][Math.floor(Math.random() * 6)],
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Achievement Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-6xl mb-4 bg-yellow-400 p-6 rounded-full shadow-lg shadow-yellow-500/50"
          >
            {achievement.icon}
          </motion.div>

          {/* Achievement Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center px-4"
          >
            <h3 className="text-xl font-bold mb-2 text-yellow-300">
              {achievement.title}
            </h3>
            <p className="text-gray-200 mb-4">{achievement.description}</p>
            <div className="bg-yellow-400/20 rounded-full px-4 py-1 inline-block">
              <span className="font-bold text-yellow-300">
                +{achievement.points} points
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          >
            Awesome!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementAnimation;
