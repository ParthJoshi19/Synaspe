import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image as ImageIcon, Video, Music, Eye, RefreshCw, Download } from "lucide-react";
import { useResults } from "@/lib/results-context";

export default function Results() {
  const [activeTab, setActiveTab] = useState('all');
  const { results } = useResults();

  // Group results by modality
  const groupedResults = useMemo(() => {
    const grouped: Record<string, any[]> = {
      text: [],
      image: [],
      video: [],
      audio: [],
    };

    results.forEach(result => {
      const content = JSON.parse(result.content);
      grouped[result.modality]?.push({
        id: result.id,
        ...content,
        confidence: result.confidenceScore,
        entanglement: result.quantumEntanglement,
      });
    });

    return grouped;
  }, [results]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold quantum-text-glow mb-2">Query Results</h1>
          <p className="text-muted-foreground">
            Cross-modal insights with quantum-enhanced confidence scores
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-rerun">
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-run Query
          </Button>
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Link href="/explanation">
            <Button size="sm" data-testid="button-view-insights">
              <Eye className="w-4 h-4 mr-2" />
              View Insights
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-5">
          <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
          <TabsTrigger value="text" data-testid="tab-text">
            <FileText className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="image" data-testid="tab-image">
            <ImageIcon className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="video" data-testid="tab-video">
            <Video className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="audio" data-testid="tab-audio">
            <Music className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Text Results */}
          {groupedResults.text.map((result) => (
            <Card key={result.id} className="border-card-border" data-testid={`result-${result.id}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{result.title}</CardTitle>
                    <CardDescription>PDF Document</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">
                    QE: {result.entanglement}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.snippet}</p>
              </CardContent>
            </Card>
          ))}

          {/* Image Results */}
          {groupedResults.image.map((result) => (
            <Card key={result.id} className="border-card-border" data-testid={`result-${result.id}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{result.title}</CardTitle>
                    <CardDescription>Image</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">
                    QE: {result.entanglement}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{result.caption}</p>
              </CardContent>
            </Card>
          ))}

          {/* Video Results */}
          {groupedResults.video.map((result) => (
            <Card key={result.id} className="border-card-border" data-testid={`result-${result.id}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{result.title}</CardTitle>
                    <CardDescription>Video • {result.timestamp}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">
                    QE: {result.entanglement}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* Audio Results */}
          {groupedResults.audio.map((result) => (
            <Card key={result.id} className="border-card-border" data-testid={`result-${result.id}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{result.title}</CardTitle>
                    <CardDescription>Audio • {result.duration}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {result.confidence}%
                  </Badge>
                  <Badge variant="outline" className="text-xs border-accent text-accent">
                    QE: {result.entanglement}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-muted rounded-md flex items-center justify-center mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full"
                        style={{ height: `${20 + Math.random() * 30}px` }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">{result.transcript}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="text" className="space-y-4 mt-6">
          {groupedResults.text.map((result) => (
            <Card key={result.id} className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{result.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: {result.confidence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      QE: {result.entanglement}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.snippet}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="image" className="space-y-4 mt-6">
          {groupedResults.image.map((result) => (
            <Card key={result.id} className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{result.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: {result.confidence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      QE: {result.entanglement}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{result.caption}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="video" className="space-y-4 mt-6">
          {groupedResults.video.map((result) => (
            <Card key={result.id} className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{result.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: {result.confidence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      QE: {result.entanglement}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audio" className="space-y-4 mt-6">
          {groupedResults.audio.map((result) => (
            <Card key={result.id} className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{result.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: {result.confidence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      QE: {result.entanglement}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-muted rounded-md flex items-center justify-center mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full"
                        style={{ height: `${20 + Math.random() * 30}px` }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">{result.transcript}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
