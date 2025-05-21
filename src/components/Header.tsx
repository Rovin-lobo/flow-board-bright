
import React from "react";
import { Moon, Sun, BarChart } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/context/TaskContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { tasks } = useTasks();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold md:text-2xl">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Internship Task Tracker
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BarChart className="h-[1.2rem] w-[1.2rem]" />
                {totalTasks > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {completedTasks}
                  </span>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Task Statistics</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>Total Tasks:</div>
                  <div className="text-right font-medium">{totalTasks}</div>
                  <div>Completed:</div>
                  <div className="text-right font-medium">{completedTasks}</div>
                  <div>Completion Rate:</div>
                  <div className="text-right font-medium">{completionRate}%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
