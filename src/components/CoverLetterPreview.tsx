import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, FileText, Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoverLetterPreviewProps {
  content: string;
  isGenerating: boolean;
}

export const CoverLetterPreview = ({ content, isGenerating }: CoverLetterPreviewProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const copyToClipboard = async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Cover letter copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadAsText = () => {
    if (!content) return;
    
    setIsDownloading(true);
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cover-letter.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Cover letter saved as cover-letter.txt",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the cover letter.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsWord = () => {
    if (!content) return;
    
    setIsDownloading(true);
    try {
      // Create a simple HTML document that Word can open
      const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Cover Letter</title>
            <style>
              body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; margin: 1in; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            ${content.split('\n').map(paragraph => paragraph.trim() ? `<p>${paragraph}</p>` : '<br>').join('')}
          </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cover-letter.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Cover letter saved as cover-letter.doc",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the cover letter.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isGenerating) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Generating your cover letter...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!content) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <div>
                <p className="text-muted-foreground font-medium">No cover letter yet</p>
                <p className="text-sm text-muted-foreground/70">Fill out the form and click generate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex-1 min-w-[100px]"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsText}
            disabled={isDownloading}
            className="flex-1 min-w-[100px]"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            TXT
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsWord}
            disabled={isDownloading}
            className="flex-1 min-w-[100px]"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            DOC
          </Button>
        </div>

        <Separator />

        {/* Content Preview */}
        <div className="bg-muted/30 rounded-lg p-6 max-h-[600px] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            {content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="mb-4 text-sm leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            ))}
          </div>
        </div>

        {/* Word Count */}
        <div className="text-xs text-muted-foreground text-right">
          {content.split(' ').filter(word => word.length > 0).length} words
        </div>
      </CardContent>
    </Card>
  );
};