import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const privacyData = [
  { name: 'Secure', value: 95.7, color: 'hsl(var(--primary))' },
  { name: 'Risk', value: 4.3, color: 'hsl(var(--destructive))' },
];

const performanceData = [
  { name: 'Baseline', value: 245, label: 'Traditional' },
  { name: 'Quantum', value: 54, label: 'Quantum-Enhanced' },
];

export default function Explanation() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold quantum-text-glow mb-2">Cross-Modal Insight Generation</h1>
          <p className="text-muted-foreground">
            Detailed analysis of quantum-federated retrieval results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-rerun">
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-run Query
          </Button>
          <Button variant="outline" size="sm" data-testid="button-export-report">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" data-testid="button-transparency">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Transparency Graph
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="summary" data-testid="tab-summary">Semantic Summary</TabsTrigger>
          <TabsTrigger value="similarity" data-testid="tab-similarity">Quantum Similarity</TabsTrigger>
          <TabsTrigger value="privacy" data-testid="tab-privacy">Privacy Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Semantic Analysis</CardTitle>
              <CardDescription>AI-generated cross-modal summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm leading-relaxed">
                  Detected thematic overlap between uploaded research and visual dataset — semantic alignment score: <span className="font-bold text-primary">0.982</span>
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Key Insights:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Quantum computing principles strongly correlated with neural architecture diagrams (confidence: 96.8%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Federated learning concepts identified across 12 text documents and 8 visual representations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Video content demonstrates practical implementation of discussed theoretical frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Audio transcripts provide expert commentary validating multimodal findings</span>
                  </li>
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="p-4 bg-card border border-card-border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">98.2%</div>
                  <div className="text-sm text-muted-foreground">Cross-Modal Alignment</div>
                </div>
                <div className="p-4 bg-card border border-card-border rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">78%</div>
                  <div className="text-sm text-muted-foreground">Latency Reduction</div>
                </div>
                <div className="p-4 bg-card border border-card-border rounded-lg">
                  <div className="text-2xl font-bold text-chart-3 mb-1">99.3%</div>
                  <div className="text-sm text-muted-foreground">Confidence Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="similarity" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>3D Embedding Visualization</CardTitle>
                <CardDescription>Quantum-enhanced similarity space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simulated 3D visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      {/* Text sphere */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-primary/40 border-2 border-primary flex items-center justify-center quantum-glow">
                        <span className="text-xs font-mono">Text</span>
                      </div>
                      {/* Image sphere */}
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-accent/40 border-2 border-accent flex items-center justify-center quantum-glow">
                        <span className="text-xs font-mono">Image</span>
                      </div>
                      {/* Audio sphere */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-chart-3/40 border-2 border-chart-3 flex items-center justify-center quantum-glow">
                        <span className="text-xs font-mono">Audio</span>
                      </div>
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <line x1="50%" y1="30%" x2="25%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                        <line x1="50%" y1="30%" x2="75%" y2="80%" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.5" />
                        <line x1="25%" y1="80%" x2="75%" y2="80%" stroke="hsl(var(--chart-3))" strokeWidth="1" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Overlapping semantic space showing cross-modal alignment
                </p>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Retrieval Performance</CardTitle>
                <CardDescription>Latency comparison (milliseconds)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  78% reduction in retrieval latency with quantum optimization
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Privacy Score Distribution</CardTitle>
                <CardDescription>Federated security metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={privacyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {privacyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm">Secure: 95.7%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <span className="text-sm">Risk: 4.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Federated Privacy Metrics</CardTitle>
                <CardDescription>Security assessment across nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Anonymization</span>
                      <span className="text-sm text-muted-foreground">98.4%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '98.4%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Encrypted Transport</span>
                      <span className="text-sm text-muted-foreground">99.9%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '99.9%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Access Control</span>
                      <span className="text-sm text-muted-foreground">97.2%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '97.2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Node Isolation</span>
                      <span className="text-sm text-muted-foreground">96.1%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '96.1%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg mt-6">
                  <p className="text-sm">
                    <span className="font-medium">Overall Privacy Score:</span>{' '}
                    <span className="text-accent font-bold">95.7%</span> — Your data remains secure across all federated nodes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
