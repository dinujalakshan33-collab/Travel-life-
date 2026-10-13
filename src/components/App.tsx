// Inside src/App.tsx
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { UserProfileView } from "./components/UserProfileView";

// Add state inside TravelLifeMain:
// const [activeTab, setActiveTab] = useState<"explore" | "planner" | "budgets" | "profile">("explore");
// const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

// Header User Button:
{user ? (
  <button
    onClick={() => setActiveTab("profile")}
    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-xs font-bold text-slate-800"
  >
    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px]">
      {user.name.charAt(0).toUpperCase()}
    </span>
    <span className="hidden sm:inline">{user.name}</span>
  </button>
) : (
  <button
    onClick={() => setIsAuthModalOpen(true)}
    className="px-4 py-2 bg-[#3370eb] hover:bg-[#255bd1] text-white rounded-xl text-xs font-bold shadow-sm transition"
  >
    Sign In
  </button>
)}

// In main body:
{activeTab === "profile" && (
  <UserProfileView
    onBackToExplore={() => setActiveTab("explore")}
    onOpenDest={(id) => {
      const d = DESTINATIONS.find((item) => item.id === id);
      if (d) setActiveModalDest(d);
    }}
  />
)}

// Render the modal:
<AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
