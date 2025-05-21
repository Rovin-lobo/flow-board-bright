
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold md:text-2xl">Internship Task Tracker</h1>
        </div>

        <div className="flex items-center gap-2">
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
