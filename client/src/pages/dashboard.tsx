import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Upload, Search, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Documents",
    value: "1,248",
    change: "+12.3%",
    icon: Upload,
    color: "text-primary",
  },
  {
    title: "Active Queries",
    value: "342",
    change: "+8.7%",
    icon: Search,
    color: "text-accent",
  },
  {
    title: "Quantum Nodes",
    value: "8",
    change: "100% Online",
    icon: Activity,
    color: "text-chart-3",
  },
  {
    title: "Avg. Confidence",
    value: "96.8%",
    change: "+2.1%",
    icon: BarChart3,
    color: "text-chart-2",
  },
];

const recentActivity = [
  { type: "PDF", name: "Research Paper - Quantum Computing.pdf", time: "2 min ago", status: "completed" },
  { type: "Image", name: "Neural Architecture Diagram.png", time: "5 min ago", status: "completed" },
  { type: "Video", name: "AI Model Training Session.mp4", time: "12 min ago", status: "processing" },
  { type: "Audio", name: "Conference Recording.mp3", time: "18 min ago", status: "completed" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold quantum-text-glow mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your quantum-federated multimodal system performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-card-border" data-testid={`card-stat-${stat.title.toLowerCase().replace(' ', '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest multimodal data processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between" data-testid={`activity-${index}`}>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader>
            <CardTitle>System Insights</CardTitle>
            <CardDescription>Quantum-enhanced performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Neural Architecture Search</span>
                  <span className="text-sm text-muted-foreground">98.2%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '98.2%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Cross-Modal Alignment</span>
                  <span className="text-sm text-muted-foreground">94.7%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '94.7%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Quantum Optimization</span>
                  <span className="text-sm text-muted-foreground">99.3%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '99.3%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
