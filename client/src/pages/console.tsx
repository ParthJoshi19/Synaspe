import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Download } from "lucide-react";
import type { QuantumLog } from "@shared/schema";

const initialLogs: QuantumLog[] = [
  { id: '1', timestamp: new Date(), message: 'Quantum Node 3 Initialized', level: 'info' },
  { id: '2', timestamp: new Date(), message: 'Federated NAS Search Running...', level: 'info' },
  { id: '3', timestamp: new Date(), message: 'Similarity Optimization ΔE=0.00412', level: 'success' },
  { id: '4', timestamp: new Date(), message: 'Cross-modal alignment achieved at 98.76%', level: 'success' },
];

const newLogMessages = [
  { message: 'Quantum entanglement verified on Node 5', level: 'success' as const },
  { message: 'Processing multimodal embeddings...', level: 'info' as const },
  { message: 'Neural architecture search iteration 247 complete', level: 'info' as const },
  { message: 'Federated model weights synchronized', level: 'success' as const },
  { message: 'Privacy budget: 98.7% remaining', level: 'info' as const },
  { message: 'Quantum circuit optimization: -2.3% energy', level: 'success' as const },
  { message: 'Cross-modal similarity score: 0.9821', level: 'success' as const },
  { message: 'Data encryption layer active', level: 'info' as const },
];

export default function Console() {
  const [logs, setLogs] = useState<QuantumLog[]>(initialLogs);
  const [isPaused, setIsPaused] = useState(false);
  const [logCount, setLogCount] = useState(0);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomLog = newLogMessages[Math.floor(Math.random() * newLogMessages.length)];
      const newLog: QuantumLog = {
        id: String(Date.now()),
        timestamp: new Date(),
        message: randomLog.message,
        level: randomLog.level,
      };

      setLogs(prev => [...prev, newLog]);
      setLogCount(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success':
        return 'text-accent';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getLevelSymbol = (level: string) => {
    switch (level) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return '›';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold quantum-text-glow mb-2">Quantum Console</h1>
          <p className="text-muted-foreground">
            Real-time system logs and quantum node activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs" data-testid="badge-log-count">
            {logs.length} logs
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            data-testid="button-toggle-pause"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" data-testid="button-download-logs">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="font-mono text-sm">System Terminal</CardTitle>
          <CardDescription>Quantum-federated node activity stream</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-sm h-[500px] overflow-y-auto border border-primary/20">
            <div className="space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 group" data-testid={`log-${log.id}`}>
                  <span className="text-muted-foreground text-xs mt-0.5 opacity-50 group-hover:opacity-100">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className={`${getLevelColor(log.level)} w-4`}>
                    {getLevelSymbol(log.level)}
                  </span>
                  <span className={`flex-1 ${getLevelColor(log.level)}`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={consoleEndRef} />
              {!isPaused && (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs">Streaming quantum logs...</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-card-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">8/8</div>
            <div className="text-sm text-muted-foreground">Active Quantum Nodes</div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent mb-1">0.00412</div>
            <div className="text-sm text-muted-foreground">Energy Optimization ΔE</div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-chart-3 mb-1">127ms</div>
            <div className="text-sm text-muted-foreground">Avg. Node Latency</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
