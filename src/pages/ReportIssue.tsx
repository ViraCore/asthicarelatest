import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Mail, Bell, User, Calendar, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Phase 1: Check-in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  // Phase 2: Dashboard state
  const [frequency, setFrequency] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [concern, setConcern] = useState("");
  const [isSubmittingConcern, setIsSubmittingConcern] = useState(false);

  const translations = {
    en: {
      // Phase 1
      checkInTitle: "Patient Check-In",
      checkInSubtitle: "Enter your details to access your personalized dashboard",
      nameLabel: "Patient Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      emailError: "Please enter a valid email address",
      enterDashboard: "Enter Dashboard",
      
      // Phase 2
      welcomeTitle: "Welcome",
      dashboardSubtitle: "Manage your bone health journey with Asthi Care",
      
      // Follow-up Subscriptions
      followUpTitle: "Follow-up Subscriptions",
      followUpDescription: "Regular checkups are essential for monitoring your bone health. Subscribe to receive timely reminders for your follow-up appointments and health tips.",
      frequencyLabel: "Reminder Frequency",
      frequencyPlaceholder: "Select frequency",
      weekly: "Weekly",
      monthly: "Monthly",
      activateAlerts: "Activate Email Alerts",
      activating: "Activating...",
      successTitle: "Success!",
      successMessage: "A confirmation email has been sent to",
      checkInbox: "Check your inbox.",
      
      // Report Concern
      concernTitle: "Report a Concern",
      concernDescription: "Share any health concerns or issues you're experiencing",
      concernPlaceholder: "Describe your concern or issue in detail...",
      submitConcern: "Submit Concern",
      submitting: "Submitting...",
      concernSuccess: "Your concern has been submitted successfully!",
      
      // Medical Reports
      uploadTitle: "Medical Reports",
      uploadDescription: "Upload your DEXA scan, X-ray, or other bone health reports",
      uploadButton: "Choose File",
      uploadHint: "Supported formats: PDF, JPG, PNG (Max 10MB)",
      noFile: "No file selected",
    },
    hi: {
      // Phase 1
      checkInTitle: "मरीज चेक-इन",
      checkInSubtitle: "अपना व्यक्तिगत डैशबोर्ड एक्सेस करने के लिए अपना विवरण दर्ज करें",
      nameLabel: "मरीज का नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल पता दर्ज करें",
      emailError: "कृपया एक वैध ईमेल पता दर्ज करें",
      enterDashboard: "डैशबोर्ड में प्रवेश करें",
      
      // Phase 2
      welcomeTitle: "स्वागत है",
      dashboardSubtitle: "अस्थि केयर के साथ अपनी हड्डी स्वास्थ्य यात्रा का प्रबंधन करें",
      
      // Follow-up Subscriptions
      followUpTitle: "फॉलो-अप सब्सक्रिप्शन",
      followUpDescription: "आपके हड्डी स्वास्थ्य की निगरानी के लिए नियमित जांच आवश्यक है। अपने फॉलो-अप अपॉइंटमेंट और स्वास्थ्य टिप्स के लिए समय पर रिमाइंडर प्राप्त करने के लिए सब्सक्राइब करें।",
      frequencyLabel: "रिमाइंडर आवृत्ति",
      frequencyPlaceholder: "आवृत्ति चुनें",
      weekly: "साप्ताहिक",
      monthly: "मासिक",
      activateAlerts: "ईमेल अलर्ट सक्रिय करें",
      activating: "सक्रिय हो रहा है...",
      successTitle: "सफलता!",
      successMessage: "एक पुष्टिकरण ईमेल भेजा गया है",
      checkInbox: "अपना इनबॉक्स देखें।",
      
      // Report Concern
      concernTitle: "चिंता बताएं",
      concernDescription: "कोई भी स्वास्थ्य संबंधी चिंता या समस्या साझा करें",
      concernPlaceholder: "अपनी चिंता या समस्या का विस्तार से वर्णन करें...",
      submitConcern: "चिंता जमा करें",
      submitting: "जमा हो रहा है...",
      concernSuccess: "आपकी चिंता सफलतापूर्वक जमा हो गई है!",
      
      // Medical Reports
      uploadTitle: "मेडिकल रिपोर्ट",
      uploadDescription: "अपना DEXA स्कैन, एक्स-रे, या अन्य हड्डी स्वास्थ्य रिपोर्ट अपलोड करें",
      uploadButton: "फाइल चुनें",
      uploadHint: "समर्थित प्रारूप: PDF, JPG, PNG (अधिकतम 10MB)",
      noFile: "कोई फाइल नहीं चुनी गई",
    },
  };

  const text = translations[language as keyof typeof translations];

  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".");
  };

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(patientEmail)) {
      setEmailError(text.emailError);
      return;
    }
    
    setEmailError("");
    setIsLoggedIn(true);
  };

  // Mock email sending function (simulates EmailJS)
  const sendConfirmationEmail = (name: string, email: string, freq: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email sent to ${email}: Dear ${name}, your ${freq} alerts for Asthi Care are now active.`);
        resolve();
      }, 1500);
    });
  };

  const handleActivateAlerts = async () => {
    if (!frequency) return;
    
    setIsActivating(true);
    
    try {
      await sendConfirmationEmail(patientName, patientEmail, frequency);
      
      toast({
        title: text.successTitle,
        description: `${text.successMessage} ${patientEmail}. ${text.checkInbox}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate alerts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitConcern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concern.trim()) return;
    
    setIsSubmittingConcern(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: text.successTitle,
      description: text.concernSuccess,
    });
    
    setConcern("");
    setIsSubmittingConcern(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {!isLoggedIn ? (
          // Phase 1: Patient Check-In
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
              <Card className="w-full max-w-md shadow-xl border-primary/20">
                <CardHeader className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {text.checkInTitle}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {text.checkInSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckIn} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientName" className="text-foreground font-medium">
                        {text.nameLabel}
                      </Label>
                      <Input
                        id="patientName"
                        type="text"
                        placeholder={text.namePlaceholder}
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="patientEmail" className="text-foreground font-medium">
                        {text.emailLabel}
                      </Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        placeholder={text.emailPlaceholder}
                        value={patientEmail}
                        onChange={(e) => {
                          setPatientEmail(e.target.value);
                          setEmailError("");
                        }}
                        required
                        className={`border-border focus:border-primary ${emailError ? "border-destructive" : ""}`}
                      />
                      {emailError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {emailError}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                      disabled={!patientName || !patientEmail}
                    >
                      {text.enterDashboard}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          // Phase 2: Dashboard View
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              {/* Welcome Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {text.welcomeTitle}, <span className="text-primary">{patientName}</span>!
                </h1>
                <p className="text-muted-foreground text-lg">
                  {text.dashboardSubtitle}
                </p>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Follow-up Subscriptions Card */}
                <Card className="shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bell className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {text.followUpTitle}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {text.followUpDescription}
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="frequency" className="text-foreground font-medium">
                        {text.frequencyLabel}
                      </Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder={text.frequencyPlaceholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="weekly">{text.weekly}</SelectItem>
                          <SelectItem value="monthly">{text.monthly}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      onClick={handleActivateAlerts}
                      disabled={!frequency || isActivating}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      {isActivating ? text.activating : text.activateAlerts}
                    </Button>
                  </CardContent>
                </Card>

                {/* Medical Reports Upload Card */}
                <Card className="shadow-lg border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {text.uploadTitle}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {text.uploadDescription}
                    </p>
                    
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-muted/30">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block">
                          {text.uploadButton}
                        </span>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-4">
                        {text.uploadHint}
                      </p>
                    </div>
                    
                    {fileName && (
                      <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">{fileName}</span>
                      </div>
                    )}
                    
                    {!fileName && (
                      <p className="text-sm text-muted-foreground text-center">
                        {text.noFile}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Report a Concern Card */}
              <Card className="shadow-lg border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {text.concernTitle}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {text.concernDescription}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitConcern} className="space-y-4">
                    <Textarea
                      placeholder={text.concernPlaceholder}
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      rows={4}
                      className="border-border focus:border-primary resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={!concern.trim() || isSubmittingConcern}
                      className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold"
                    >
                      {isSubmittingConcern ? text.submitting : text.submitConcern}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportIssue;
