import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    description: "",
  });

  const translations = {
    en: {
      pageTitle: "Upload Report & Report Issue",
      pageSubtitle: "Submit your medical reports for review or report any issues you're experiencing",
      uploadTitle: "Upload Medical Report",
      uploadDescription: "Upload your DEXA scan, X-ray, or other bone health reports for expert review",
      uploadButton: "Choose File",
      uploadHint: "Supported formats: PDF, JPG, PNG (Max 10MB)",
      noFile: "No file selected",
      issueTitle: "Report an Issue",
      issueDescription: "Describe any health concerns or issues you're experiencing",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      issueTypeLabel: "Issue Type",
      issueTypePlaceholder: "Select issue type",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Describe your issue or concern in detail...",
      submitButton: "Submit Report",
      submitting: "Submitting...",
      successMessage: "Your report has been submitted successfully!",
      issueTypes: {
        pain: "Bone/Joint Pain",
        fracture: "Recent Fracture",
        mobility: "Mobility Issues",
        medication: "Medication Side Effects",
        other: "Other Concerns",
      },
    },
    hi: {
      pageTitle: "रिपोर्ट अपलोड करें और समस्या बताएं",
      pageSubtitle: "समीक्षा के लिए अपनी चिकित्सा रिपोर्ट जमा करें या कोई समस्या बताएं",
      uploadTitle: "मेडिकल रिपोर्ट अपलोड करें",
      uploadDescription: "विशेषज्ञ समीक्षा के लिए अपना DEXA स्कैन, एक्स-रे, या अन्य हड्डी स्वास्थ्य रिपोर्ट अपलोड करें",
      uploadButton: "फाइल चुनें",
      uploadHint: "समर्थित प्रारूप: PDF, JPG, PNG (अधिकतम 10MB)",
      noFile: "कोई फाइल नहीं चुनी गई",
      issueTitle: "समस्या बताएं",
      issueDescription: "कोई भी स्वास्थ्य संबंधी चिंता या समस्या बताएं जो आप अनुभव कर रहे हैं",
      nameLabel: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      issueTypeLabel: "समस्या का प्रकार",
      issueTypePlaceholder: "समस्या का प्रकार चुनें",
      descriptionLabel: "विवरण",
      descriptionPlaceholder: "अपनी समस्या या चिंता का विस्तार से वर्णन करें...",
      submitButton: "रिपोर्ट जमा करें",
      submitting: "जमा हो रहा है...",
      successMessage: "आपकी रिपोर्ट सफलतापूर्वक जमा हो गई है!",
      issueTypes: {
        pain: "हड्डी/जोड़ों का दर्द",
        fracture: "हाल का फ्रैक्चर",
        mobility: "गतिशीलता की समस्याएं",
        medication: "दवा के दुष्प्रभाव",
        other: "अन्य चिंताएं",
      },
    },
  };

  const text = translations[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: language === "en" ? "Success" : "सफलता",
      description: text.successMessage,
    });
    
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", issueType: "", description: "" });
    setFileName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {text.pageTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {text.pageSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Upload Report Card */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  {text.uploadTitle}
                </CardTitle>
                <CardDescription>{text.uploadDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <Button type="button" variant="outline" className="mb-2">
                      {text.uploadButton}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {text.uploadHint}
                    </p>
                  </label>
                </div>
                {fileName && (
                  <div className="mt-4 p-3 bg-accent rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium">{fileName}</span>
                  </div>
                )}
                {!fileName && (
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    {text.noFile}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Report Issue Card */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  {text.issueTitle}
                </CardTitle>
                <CardDescription>{text.issueDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{text.nameLabel}</Label>
                    <Input
                      id="name"
                      placeholder={text.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{text.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={text.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{text.phoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={text.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueType">{text.issueTypeLabel}</Label>
                    <select
                      id="issueType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.issueType}
                      onChange={(e) =>
                        setFormData({ ...formData, issueType: e.target.value })
                      }
                      required
                    >
                      <option value="">{text.issueTypePlaceholder}</option>
                      {Object.entries(text.issueTypes).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description">{text.descriptionLabel}</Label>
                    <Textarea
                      id="description"
                      placeholder={text.descriptionPlaceholder}
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? text.submitting : text.submitButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportIssue;