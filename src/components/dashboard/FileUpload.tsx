
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          {...getRootProps()}
          className={cn(
            "relative group cursor-pointer border-2 border-dashed transition-all duration-300 p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]",
            isDragActive ? "border-accent bg-accent/5 scale-[1.02]" : "border-muted-foreground/20 hover:border-accent/50 hover:bg-accent/5",
            file ? "border-solid border-accent/50 bg-accent/5" : ""
          )}
        >
          <input {...getInputProps()} />

          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="p-6 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-accent animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Upload Case Documentation
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Drag and drop your legal documents here, or click to browse.
                    Supported formats: PDF, DOCX, TXT.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center text-center space-y-6 w-full"
              >
                <div className="relative">
                  <div className="p-6 rounded-2xl bg-accent/10">
                    <File className="w-16 h-16 text-accent" />
                  </div>
                  <button
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-medium truncate max-w-[300px]">
                    {file.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    size="lg"
                    className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Analyze Case
                    <CheckCircle2 className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover effect highlight */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Card>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-center items-center gap-8 text-muted-foreground text-sm"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span>Secure SSL Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span>Confidential Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span>Judicial Standards Compliant</span>
        </div>
      </motion.div>
    </div>
  );
}
