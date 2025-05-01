// src/components/Header.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseOnlineStatus } from "../../hooks/UseOnlineStatus";

const Header = () => {
  const navigate = useNavigate();
  const isOnline = UseOnlineStatus();
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      else if (hour < 18) return "Good Afternoon";
      else return "Good Evening";
    };

    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full px-4 py-3 bg-blue-600 text-white shadow-md flex justify-between items-center">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="text-xl font-bold">WandaBooks</h1>
      </div>

      <div className="flex items-center space-x-4 text-sm sm:text-base">
        <div className="text-right hidden sm:block">
          <p className="font-medium">{greeting}</p>
          <p>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="Profile"
          className="rounded-full w-10 h-10 border-2 border-white"
        />
      </div>
    </header>
  );
};

export default Header;
