import { Home, Upload, Search, LineChart, Terminal, Cpu } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Upload Data", url: "/upload", icon: Upload },
  { title: "Query Engine", url: "/query", icon: Search },
  { title: "Results", url: "/results", icon: LineChart },
  { title: "Quantum Console", url: "/console", icon: Terminal },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="gap-6">
        <SidebarGroup>
          <div className="flex items-center gap-3 px-4 py-6">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center quantum-glow">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-semibold quantum-text-glow">Quantum RAG</h2>
              <p className="text-xs text-muted-foreground">Federated AI System</p>
            </div>
          </div>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
