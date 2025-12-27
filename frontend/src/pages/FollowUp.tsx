import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, Calendar, AlertCircle, User, Phone, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";
import { sendSMS, sendEmail } from "@/services/notificationService";

const ReportIssue = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Phase 1: Check-in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  // Phase 2: Dashboard state
  const [notificationPreference, setNotificationPreference] = useState("");
  const [isConfirmingPreference, setIsConfirmingPreference] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [concern, setConcern] = useState("");
  const [isSubmittingConcern, setIsSubmittingConcern] = useState(false);

  // Calculate appointment date (7 days from now)
  const appointmentDate = useMemo(() => addDays(new Date(), 7), []);

  const translations = {
    en: {
      // Phase 1
      checkInTitle: "Patient Check-In",
      checkInSubtitle: "Enter your details to access your personalized dashboard",
      nameLabel: "Patient Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      emailError: "Please enter a valid email address",
      phoneError: "Please enter a valid phone number",
      enterDashboard: "Enter Dashboard",
      
      // Phase 2
      welcomeTitle: "Welcome",
      dashboardSubtitle: "Manage your bone health journey with Asthi Care",
      
      // Next Appointment
      nextAppointmentTitle: "Next Appointment",
      appointmentScheduled: "Your next follow-up appointment is scheduled for",
      appointmentDate: format(addDays(new Date(), 7), "EEEE, MMMM d, yyyy"),
      appointmentTime: "at 10:00 AM",
      appointmentNote: "Please arrive 10 minutes early for check-in. Bring any recent medical reports or test results.",
      daysUntil: "days until your appointment",
      
      // Notification Preferences
      notificationTitle: "Notification Preferences",
      notificationDescription: "Choose how you would like to receive appointment reminders and health updates",
      emailOnly: "Email Only",
      emailOnlyDesc: "Receive notifications via email",
      phoneOnly: "Phone Only", 
      phoneOnlyDesc: "Receive notifications via SMS",
      both: "Both Email and Phone",
      bothDesc: "Receive notifications via both channels",
      confirmPreferences: "Confirm Preferences",
      confirming: "Confirming...",
      preferencesSuccess: "Your notification preferences have been saved successfully!",
      
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
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      emailError: "कृपया एक वैध ईमेल पता दर्ज करें",
      phoneError: "कृपया एक वैध फोन नंबर दर्ज करें",
      enterDashboard: "डैशबोर्ड में प्रवेश करें",
      
      // Phase 2
      welcomeTitle: "स्वागत है",
      dashboardSubtitle: "अस्थि केयर के साथ अपनी हड्डी स्वास्थ्य यात्रा का प्रबंधन करें",
      
      // Next Appointment
      nextAppointmentTitle: "अगली अपॉइंटमेंट",
      appointmentScheduled: "आपकी अगली फॉलो-अप अपॉइंटमेंट निर्धारित है",
      appointmentDate: format(addDays(new Date(), 7), "EEEE, MMMM d, yyyy"),
      appointmentTime: "सुबह 10:00 बजे",
      appointmentNote: "कृपया चेक-इन के लिए 10 मिनट पहले पहुंचें। कोई भी हालिया मेडिकल रिपोर्ट या टेस्ट परिणाम साथ लाएं।",
      daysUntil: "दिन आपकी अपॉइंटमेंट तक",
      
      // Notification Preferences
      notificationTitle: "सूचना प्राथमिकताएं",
      notificationDescription: "चुनें कि आप अपॉइंटमेंट रिमाइंडर और स्वास्थ्य अपडेट कैसे प्राप्त करना चाहते हैं",
      emailOnly: "केवल ईमेल",
      emailOnlyDesc: "ईमेल के माध्यम से सूचनाएं प्राप्त करें",
      phoneOnly: "केवल फोन",
      phoneOnlyDesc: "SMS के माध्यम से सूचनाएं प्राप्त करें",
      both: "ईमेल और फोन दोनों",
      bothDesc: "दोनों चैनलों के माध्यम से सूचनाएं प्राप्त करें",
      confirmPreferences: "प्राथमिकताएं पुष्टि करें",
      confirming: "पुष्टि हो रही है...",
      preferencesSuccess: "आपकी सूचना प्राथमिकताएं सफलतापूर्वक सहेजी गई हैं!",
      
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

  const validatePhone = (phone: string) => {
    // Basic phone validation - accepts numbers with optional + and spaces/dashes
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    if (!validateEmail(patientEmail)) {
      setEmailError(text.emailError);
      hasError = true;
    }
    
    if (!validatePhone(patientPhone)) {
      setPhoneError(text.phoneError);
      hasError = true;
    }
    
    if (hasError) return;
    
    setEmailError("");
    setPhoneError("");
    setIsLoggedIn(true);
  };

  const handleConfirmPreferences = async () => {
    if (!notificationPreference) return;
    
    setIsConfirmingPreference(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: text.preferencesSuccess,
      variant: "default",
    });
    
    setIsConfirmingPreference(false);
  };

  const calculateDaysUntil = () => {
    const today = new Date();
    const appointment = appointmentDate;
    const diffTime = appointment.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="patientPhone" className="text-foreground font-medium">
                        {text.phoneLabel}
                      </Label>
                      <Input
                        id="patientPhone"
                        type="tel"
                        placeholder={text.phonePlaceholder}
                        value={patientPhone}
                        onChange={(e) => {
                          setPatientPhone(e.target.value);
                          setPhoneError("");
                        }}
                        required
                        className={`border-border focus:border-primary ${phoneError ? "border-destructive" : ""}`}
                      />
                      {phoneError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {phoneError}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                      disabled={!patientName || !patientEmail || !patientPhone}
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
                {/* Next Appointment Card */}
                <Card className="shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {text.nextAppointmentTitle}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary/30">
                      <p className="text-muted-foreground mb-3">
                        {text.appointmentScheduled}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <p className="text-lg font-bold text-primary">
                          {text.appointmentDate}
                        </p>
                      </div>
                      <p className="text-md font-semibold text-foreground mb-4">
                        {text.appointmentTime}
                      </p>
                      <div className="bg-primary/10 rounded-md p-4 mb-4">
                        <p className="text-sm text-foreground font-medium text-center">
                          <span className="text-2xl font-bold text-primary">{calculateDaysUntil()}</span> {text.daysUntil}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {text.appointmentNote}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Preferences Card */}
                <Card className="shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {text.notificationTitle}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {text.notificationDescription}
                    </p>
                    
                    <RadioGroup value={notificationPreference} onValueChange={setNotificationPreference}>
                      <div className="space-y-4">
                        {/* Email Only Option */}
                        <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="email" id="email" className="mt-1" />
                          <Label htmlFor="email" className="cursor-pointer flex-1">
                            <div className="font-semibold text-foreground">{text.emailOnly}</div>
                            <div className="text-sm text-muted-foreground">{text.emailOnlyDesc}</div>
                            <div className="text-xs text-muted-foreground mt-1">{patientEmail}</div>
                          </Label>
                        </div>

                        {/* Phone Only Option */}
                        <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="phone" id="phone" className="mt-1" />
                          <Label htmlFor="phone" className="cursor-pointer flex-1">
                            <div className="font-semibold text-foreground">{text.phoneOnly}</div>
                            <div className="text-sm text-muted-foreground">{text.phoneOnlyDesc}</div>
                            <div className="text-xs text-muted-foreground mt-1">{patientPhone}</div>
                          </Label>
                        </div>

                        {/* Both Option */}
                        <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="both" id="both" className="mt-1" />
                          <Label htmlFor="both" className="cursor-pointer flex-1">
                            <div className="font-semibold text-foreground">{text.both}</div>
                            <div className="text-sm text-muted-foreground">{text.bothDesc}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {patientEmail} & {patientPhone}
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    <Button
                      onClick={handleConfirmPreferences}
                      disabled={!notificationPreference || isConfirmingPreference}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {isConfirmingPreference ? text.confirming : text.confirmPreferences}
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
