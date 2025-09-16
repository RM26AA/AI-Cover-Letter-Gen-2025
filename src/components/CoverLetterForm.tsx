import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, Settings, User, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  
  // Job Information
  jobTitle: string;
  companyName: string;
  companyDescription: string;
  jobDescription: string;
  
  // User Background
  currentJobTitle: string;
  currentCompany: string;
  experience: string;
  skills: string;
  education: string;
  
  // Style & Tone
  tone: string;
  length: string;
  
  // Optional
  achievements: string;
  keywords: string;
  additionalNotes: string;
}

interface CoverLetterFormProps {
  onGenerate: (letter: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const CoverLetterForm = ({ onGenerate, isGenerating, setIsGenerating }: CoverLetterFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    jobTitle: "",
    companyName: "",
    companyDescription: "",
    jobDescription: "",
    currentJobTitle: "",
    currentCompany: "",
    experience: "",
    skills: "",
    education: "",
    tone: "professional",
    length: "detailed",
    achievements: "",
    keywords: "",
    additionalNotes: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    const GEMINI_API_KEY = "AIzaSyDllQp6ryj1tAfopWyEMPrxua0SnQ3FJf0";

    if (!formData.fullName || !formData.jobTitle || !formData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name, job title, and company name.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    const prompt = `Generate a professional cover letter with the following information:

Personal Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- LinkedIn: ${formData.linkedIn}

Job Information:
- Position: ${formData.jobTitle}
- Company: ${formData.companyName}
- Company Description: ${formData.companyDescription}
- Job Description: ${formData.jobDescription}

Background:
- Current Position: ${formData.currentJobTitle} at ${formData.currentCompany}
- Experience: ${formData.experience}
- Skills: ${formData.skills}
- Education: ${formData.education}

Style Requirements:
- Tone: ${formData.tone}
- Length: ${formData.length === 'short' ? '150-200 words' : '300-400 words'}

Additional Information:
- Achievements: ${formData.achievements}
- Keywords: ${formData.keywords}
- Additional Notes: ${formData.additionalNotes}

Please create a well-structured, professional cover letter that is tailored to this specific job and company. Include proper formatting with paragraphs and make it compelling and relevant.`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        onGenerate(generatedText);
        toast({
          title: "Cover Letter Generated!",
          description: "Your cover letter has been created successfully.",
        });
      } else {
        throw new Error("No content generated");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn/Portfolio</Label>
              <Input
                id="linkedIn"
                placeholder="linkedin.com/in/johndoe"
                value={formData.linkedIn}
                onChange={(e) => updateFormData("linkedIn", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => updateFormData("jobTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Tech Corp"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            <Textarea
              id="companyDescription"
              placeholder="Brief description of the company and its values..."
              value={formData.companyDescription}
              onChange={(e) => updateFormData("companyDescription", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description or key requirements..."
              value={formData.jobDescription}
              onChange={(e) => updateFormData("jobDescription", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Background */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Your Background
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentJobTitle">Current Job Title</Label>
              <Input
                id="currentJobTitle"
                placeholder="Senior Developer"
                value={formData.currentJobTitle}
                onChange={(e) => updateFormData("currentJobTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentCompany">Current Company</Label>
              <Input
                id="currentCompany"
                placeholder="Current Corp"
                value={formData.currentCompany}
                onChange={(e) => updateFormData("currentCompany", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Professional Experience</Label>
            <Textarea
              id="experience"
              placeholder="Brief summary of your work experience, key responsibilities..."
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills & Expertise</Label>
            <Textarea
              id="skills"
              placeholder="List your relevant skills, technologies, soft skills..."
              value={formData.skills}
              onChange={(e) => updateFormData("skills", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input
              id="education"
              placeholder="Degree, Institution, Year"
              value={formData.education}
              onChange={(e) => updateFormData("education", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Style & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Style & Tone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => updateFormData("tone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Length</Label>
              <Select value={formData.length} onValueChange={(value) => updateFormData("length", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (150-200 words)</SelectItem>
                  <SelectItem value="detailed">Detailed (300-400 words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="achievements">Notable Achievements</Label>
            <Textarea
              id="achievements"
              placeholder="Key accomplishments, metrics, awards..."
              value={formData.achievements}
              onChange={(e) => updateFormData("achievements", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords from Job Posting</Label>
            <Input
              id="keywords"
              placeholder="React, TypeScript, Agile, Team Leadership..."
              value={formData.keywords}
              onChange={(e) => updateFormData("keywords", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Anything else you'd like to include..."
              value={formData.additionalNotes}
              onChange={(e) => updateFormData("additionalNotes", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Button 
        onClick={generateCoverLetter} 
        disabled={isGenerating}
        className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Cover Letter...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Generate Cover Letter
          </>
        )}
      </Button>
    </div>
  );
};