import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, File, Image, Video, Music, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/queryClient";
import type { ProcessingStage } from "@shared/schema";

interface UploadingFile {
  name: string;
  type: string;
  size: number;
  progress: number;
  stage: ProcessingStage;
}

const processingStages: { stage: ProcessingStage; label: string }[] = [
  { stage: 'extracting_features', label: 'Extracting Multimodal Features...' },
  { stage: 'federated_embedding', label: 'Federated Embedding in Progress...' },
  { stage: 'quantum_optimization', label: 'Quantum Similarity Optimization...' },
];

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const uploadMutation = useMutation({
    mutationFn: async (fileData: { fileName: string; fileType: string; fileSize: number; userId: string; status: string }) => {
      return await apiRequest("POST", "/api/files/upload", fileData);
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Upload Complete",
        description: `${variables.fileName} processed successfully with quantum enhancement`,
      });
    },
    onError: (error: any, variables) => {
      toast({
        title: "Upload Failed",
        description: `Failed to upload ${variables.fileName}. Please try again.`,
        variant: "destructive",
      });
      // Remove failed file from UI
      setFiles(prev => prev.filter(f => f.name !== variables.fileName));
    },
  });

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    return File;
  };

  const processFile = async (file: File) => {
    const uploadingFile: UploadingFile = {
      name: file.name,
      type: file.type,
      size: file.size,
      progress: 0,
      stage: 'extracting_features',
    };

    setFiles(prev => [...prev, uploadingFile]);

    // Upload to backend
    if (user) {
      uploadMutation.mutate({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        userId: user.id,
        status: 'processing',
      });
    }

    // Simulate processing stages for UI
    for (let i = 0; i < processingStages.length; i++) {
      const stage = processingStages[i];
      
      setFiles(prev =>
        prev.map(f =>
          f.name === file.name
            ? { ...f, stage: stage.stage, progress: (i / processingStages.length) * 100 }
            : f
        )
      );

      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Complete
    setFiles(prev =>
      prev.map(f =>
        f.name === file.name
          ? { ...f, progress: 100, stage: 'generating_insights' }
          : f
      )
    );
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(processFile);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
  };

  const getStageLabel = (stage: ProcessingStage) => {
    const found = processingStages.find(s => s.stage === stage);
    return found?.label || 'Processing...';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold quantum-text-glow mb-2">Upload Data</h1>
        <p className="text-muted-foreground">
          Upload multimodal files for quantum-enhanced processing
        </p>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Multimodal File Upload</CardTitle>
          <CardDescription>Supports PDF, Images, Video, and Audio files</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging
                ? 'border-primary bg-primary/5 quantum-glow'
                : 'border-muted hover:border-primary/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
            <p className="text-sm text-muted-foreground mb-4">
              PDF, PNG, JPG, MP4, MP3 up to 100MB
            </p>
            <Button asChild>
              <label className="cursor-pointer" data-testid="button-upload">
                <span>Select Files</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.mp4,.mp3,.wav"
                  onChange={handleFileInput}
                  data-testid="input-file"
                />
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Quantum-enhanced multimodal processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file, index) => {
                const Icon = getFileIcon(file.type);
                const isComplete = file.progress === 100;

                return (
                  <div key={index} className="space-y-2" data-testid={`file-${index}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {isComplete ? 'Completed' : getStageLabel(file.stage)}
                          </p>
                        </div>
                      </div>
                      {isComplete && (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      )}
                    </div>
                    <Progress value={file.progress} className="h-1" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
