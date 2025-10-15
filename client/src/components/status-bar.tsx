import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Lock } from "lucide-react";
import type { SystemStatus } from "@shared/schema";

interface StatusBarProps {
  status: SystemStatus;
}

export function StatusBar({ status }: StatusBarProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Offline Intelligence:</span>
        <Badge 
          variant={status.offlineIntelligence === 'active' ? 'default' : 'secondary'}
          className="text-xs"
          data-testid="badge-offline-intelligence"
        >
          {status.offlineIntelligence === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">Quantum Engine:</span>
        <Badge 
          variant={status.quantumEngine === 'ready' ? 'default' : 'secondary'}
          className="text-xs"
          data-testid="badge-quantum-engine"
        >
          {status.quantumEngine === 'ready' ? 'Ready' : status.quantumEngine === 'processing' ? 'Processing' : 'Offline'}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">Privacy:</span>
        <Badge 
          variant="outline" 
          className="text-xs border-accent text-accent"
          data-testid="badge-privacy-score"
        >
          {status.privacyScore.toFixed(1)}% Secure
        </Badge>
      </div>
    </div>
  );
}
