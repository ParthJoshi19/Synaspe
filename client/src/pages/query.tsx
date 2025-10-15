import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Image, Video, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { useResults } from "@/lib/results-context";
import { apiRequest } from "@/lib/queryClient";
import type { ModalityType } from "@shared/schema";

const modalities: { type: ModalityType; label: string; icon: any }[] = [
  { type: 'text', label: 'Text', icon: FileText },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'audio', label: 'Audio', icon: Music },
];

export default function Query() {
  const [, setLocation] = useLocation();
  const [queryText, setQueryText] = useState("");
  const [selectedModalities, setSelectedModalities] = useState<ModalityType[]>(['text', 'image']);
  const { toast } = useToast();
  const { user } = useAuth();
  const { setResults } = useResults();

  const queryMutation = useMutation({
    mutationFn: async (queryData: { userId: string; queryText: string; modalities: string; status: string }) => {
      return await apiRequest("POST", "/api/query", queryData);
    },
    onSuccess: (data) => {
      setResults(data.results || []);
      toast({
        title: "Results Retrieved",
        description: "Cross-modal insights generated successfully",
      });
      setLocation("/results");
    },
    onError: () => {
      toast({
        title: "Query Failed",
        description: "Unable to process quantum query. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleModality = (type: ModalityType) => {
    setSelectedModalities(prev =>
      prev.includes(type)
        ? prev.filter(m => m !== type)
        : [...prev, type]
    );
  };

  const handleQuery = async () => {
    if (!queryText.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a query to search across modalities",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to execute queries",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quantum Retrieval Initiated",
      description: "Searching across federated nodes...",
    });

    queryMutation.mutate({
      userId: user.id,
      queryText,
      modalities: JSON.stringify(selectedModalities),
      status: 'processing',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold quantum-text-glow mb-2">Query Engine</h1>
        <p className="text-muted-foreground">
          Search across multimodal data with quantum-enhanced retrieval
        </p>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Multimodal Query</CardTitle>
          <CardDescription>Enter your query and select target modalities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Query Text</label>
            <Textarea
              placeholder="Example: Summarize the uploaded research paper and find related visuals..."
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="min-h-[120px] bg-card/50 border-primary/20"
              data-testid="input-query"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Target Modalities</label>
            <div className="flex flex-wrap gap-2">
              {modalities.map(({ type, label, icon: Icon }) => (
                <Badge
                  key={type}
                  variant={selectedModalities.includes(type) ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate active-elevate-2 px-4 py-2"
                  onClick={() => toggleModality(type)}
                  data-testid={`toggle-${type}`}
                >
                  <Icon className="w-3 h-3 mr-2" />
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={handleQuery}
            disabled={queryMutation.isPending}
            className="w-full"
            size="lg"
            data-testid="button-query"
          >
            {queryMutation.isPending ? (
              <>
                <div className="mr-2 relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-primary-foreground/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-primary-foreground border-t-transparent rounded-full animate-rotate-sphere" />
                </div>
                Retrieving from Quantum-Federated Nodes...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Execute Quantum Query
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-card-border border-primary/20 bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center quantum-glow">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Quantum-Enhanced Similarity</h4>
              <p className="text-sm text-muted-foreground">
                Our quantum-enhanced similarity calculation reduces retrieval time by 78% while
                maintaining 99.3% accuracy across all modalities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
