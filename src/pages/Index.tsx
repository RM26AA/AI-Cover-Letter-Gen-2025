import { useState } from "react";
import { CoverLetterForm } from "@/components/CoverLetterForm";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";
import { FileText, Sparkles } from "lucide-react";

const Index = () => {
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cover Letter Generator</h1>
              <p className="text-muted-foreground">Create professional cover letters with AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Tell us about yourself</h2>
              </div>
              <CoverLetterForm 
                onGenerate={setGeneratedLetter}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <CoverLetterPreview 
              content={generatedLetter}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;