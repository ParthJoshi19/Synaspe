import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { StatusBar } from "@/components/status-bar";
import { QuantumBackground } from "@/components/quantum-background";
import { AuthProvider } from "@/lib/auth-context";
import { ResultsProvider } from "@/lib/results-context";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Upload from "@/pages/upload";
import Query from "@/pages/query";
import Results from "@/pages/results";
import Explanation from "@/pages/explanation";
import Console from "@/pages/console";
import type { SystemStatus } from "@shared/schema";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/upload" component={Upload} />
      <Route path="/query" component={Query} />
      <Route path="/results" component={Results} />
      <Route path="/explanation" component={Explanation} />
      <Route path="/console" component={Console} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isLoginPage = location === '/';
  
  const [systemStatus] = useState<SystemStatus>({
    offlineIntelligence: 'active',
    quantumEngine: 'ready',
    privacyScore: 98.7,
  });

  // Update quantum engine status based on location
  useEffect(() => {
    if (location === '/query') {
      // Simulate processing when on query page
    }
  }, [location]);

  if (isLoginPage) {
    return (
      <div className="relative">
        <Router />
      </div>
    );
  }

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full relative">
        <QuantumBackground />
        <AppSidebar />
        <div className="flex flex-col flex-1 relative z-10">
          <StatusBar status={systemStatus} />
          <main className="flex-1 overflow-auto">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ResultsProvider>
            <AppContent />
            <Toaster />
          </ResultsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
