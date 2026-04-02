import { useState } from "react";
import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";

import Dashboard from "@/pages/Dashboard";
import DiabetesForm from "@/pages/DiabetesForm";
import HeartForm from "@/pages/HeartForm";
import ParkinsonsForm from "@/pages/ParkinsonsForm";

// On GitHub Pages (static hosting) use hash-based routing so that
// page refreshes and direct links work without a server rewrite rule.
const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === "true";

function AppRoutes({ onLogout }: { onLogout: () => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Dashboard onLogout={onLogout} />} />
      <Route path="/diabetes" component={DiabetesForm} />
      <Route path="/heart" component={HeartForm} />
      <Route path="/parkinsons" component={ParkinsonsForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("medpredict_auth") === "true"
  );

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("medpredict_auth");
    setIsAuthenticated(false);
  };

  const content = isAuthenticated ? (
    <AppRoutes onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isGitHubPages ? (
          <Router hook={useHashLocation}>{content}</Router>
        ) : (
          content
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
