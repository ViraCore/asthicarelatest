import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Phase = 1 | 2 | 3 | null;

interface PhaseVideo {
  id: number;
  youtubeId: string;
  title: { en: string; hi: string };
}

const phaseVideos: Record<1 | 2 | 3, PhaseVideo[]> = {
  1: [
    {
      id: 1,
      youtubeId: "aUaInS6HIGo",
      title: { en: "Beginner Chair Exercises", hi: "शुरुआती कुर्सी व्यायाम" },
    },
    {
      id: 2,
      youtubeId: "5N1JxDpT-wk",
      title: { en: "Gentle Stretching Routine", hi: "हल्की स्ट्रेचिंग दिनचर्या" },
    },
    {
      id: 3,
      youtubeId: "PFkDJI64zAk",
      title: { en: "Balance Training Basics", hi: "संतुलन प्रशिक्षण की मूल बातें" },
    },
  ],
  2: [
    {
      id: 4,
      youtubeId: "uGEL8lmZFXc",
      title: { en: "Resistance Band Workouts", hi: "रेजिस्टेंस बैंड वर्कआउट" },
    },
    {
      id: 5,
      youtubeId: "GIBXMIoGXWU",
      title: { en: "Core Strengthening Exercises", hi: "कोर स्ट्रेंथनिंग एक्सरसाइज" },
    },
    {
      id: 6,
      youtubeId: "T6Se7kOJdSQ",
      title: { en: "Walking Program Guide", hi: "वॉकिंग प्रोग्राम गाइड" },
    },
  ],
  3: [
    {
      id: 7,
      youtubeId: "4J9G8eWu5Is",
      title: { en: "Weight Training for Bone Health", hi: "हड्डी स्वास्थ्य के लिए वेट ट्रेनिंग" },
    },
    {
      id: 8,
      youtubeId: "RLHdkV8WWQI",
      title: { en: "High-Intensity Interval Training", hi: "हाई-इंटेंसिटी इंटरवल ट्रेनिंग" },
    },
    {
      id: 9,
      youtubeId: "bSvovGB_O44",
      title: { en: "Advanced Balance & Agility", hi: "एडवांस्ड बैलेंस और एजिलिटी" },
    },
  ],
};

const translations = {
  en: {
    title: "Sarcopenia Assessment",
    subtitle: "Assess your muscle health and get personalized training recommendations based on your current condition.",
    measurementInput: "Measurement Input",
    measurementDesc: "Enter your measurements to assess your sarcopenia risk level.",
    gripStrength: "Grip Strength (kg)",
    gripPlaceholder: "e.g., 25.5",
    gripNormal: "Normal: Male >30kg, Female >20kg",
    walkingSpeed: "Walking Speed (m/s)",
    walkingPlaceholder: "e.g., 0.85",
    walkingNormal: "Normal: >0.8 m/s (4-meter walk test)",
    muscleMass: "Muscle Mass Indicator (1-10)",
    massPlaceholder: "e.g., 6",
    massNormal: "Self-assessment: 1 (very low) to 10 (excellent)",
    calculate: "Calculate Assessment",
    result: "Assessment Result",
    completeForm: "Complete the assessment form to see your results and personalized training recommendations.",
    phase1Title: "Phase 1 - Needs Attention",
    phase1Desc: "Your indicators suggest sarcopenia risk. Start with gentle, beginner exercises and consult a healthcare provider.",
    phase2Title: "Phase 2 - Moderate Concern",
    phase2Desc: "Some indicators suggest moderate muscle weakness. Intermediate exercises and consistent training are recommended.",
    phase3Title: "Phase 3 - Good Condition",
    phase3Desc: "Your muscle health indicators are in a good range. Focus on maintaining and building strength with advanced exercises.",
    recommendedVideos: "Recommended Training Videos",
    basedOn: "Based on your",
    tailoredExercises: ", here are exercises tailored for you.",
  },
  hi: {
    title: "सार्कोपेनिया मूल्यांकन",
    subtitle: "अपनी मांसपेशियों के स्वास्थ्य का आकलन करें और अपनी वर्तमान स्थिति के आधार पर व्यक्तिगत प्रशिक्षण सिफारिशें प्राप्त करें।",
    measurementInput: "माप इनपुट",
    measurementDesc: "अपने सार्कोपेनिया जोखिम स्तर का आकलन करने के लिए अपने माप दर्ज करें।",
    gripStrength: "ग्रिप स्ट्रेंथ (किग्रा)",
    gripPlaceholder: "उदा., 25.5",
    gripNormal: "सामान्य: पुरुष >30 किग्रा, महिला >20 किग्रा",
    walkingSpeed: "चलने की गति (मी/से)",
    walkingPlaceholder: "उदा., 0.85",
    walkingNormal: "सामान्य: >0.8 मी/से (4-मीटर वॉक टेस्ट)",
    muscleMass: "मांसपेशी द्रव्यमान संकेतक (1-10)",
    massPlaceholder: "उदा., 6",
    massNormal: "स्व-मूल्यांकन: 1 (बहुत कम) से 10 (उत्कृष्ट)",
    calculate: "मूल्यांकन करें",
    result: "मूल्यांकन परिणाम",
    completeForm: "अपने परिणाम और व्यक्तिगत प्रशिक्षण सिफारिशें देखने के लिए मूल्यांकन फॉर्म भरें।",
    phase1Title: "चरण 1 - ध्यान देने की जरूरत",
    phase1Desc: "आपके संकेतक सार्कोपेनिया जोखिम का सुझाव देते हैं। हल्के, शुरुआती व्यायाम से शुरू करें और स्वास्थ्य सेवा प्रदाता से परामर्श करें।",
    phase2Title: "चरण 2 - मध्यम चिंता",
    phase2Desc: "कुछ संकेतक मध्यम मांसपेशी कमजोरी का सुझाव देते हैं। मध्यवर्ती व्यायाम और लगातार प्रशिक्षण की सिफारिश की जाती है।",
    phase3Title: "चरण 3 - अच्छी स्थिति",
    phase3Desc: "आपके मांसपेशी स्वास्थ्य संकेतक अच्छी श्रेणी में हैं। उन्नत व्यायाम के साथ ताकत बनाए रखने और बढ़ाने पर ध्यान दें।",
    recommendedVideos: "अनुशंसित प्रशिक्षण वीडियो",
    basedOn: "आपके",
    tailoredExercises: "के आधार पर, यहां आपके लिए अनुकूलित व्यायाम हैं।",
  },
};

interface AssessmentResult {
  phase: Phase;
  titleKey: "phase1Title" | "phase2Title" | "phase3Title";
  descKey: "phase1Desc" | "phase2Desc" | "phase3Desc";
  color: string;
}

function calculatePhase(gripStrength: number, walkingSpeed: number, muscleMass: number): AssessmentResult {
  let score = 0;

  if (gripStrength >= 28) score += 3;
  else if (gripStrength >= 20) score += 2;
  else score += 1;

  if (walkingSpeed >= 0.8) score += 3;
  else if (walkingSpeed >= 0.6) score += 2;
  else score += 1;

  if (muscleMass >= 7) score += 3;
  else if (muscleMass >= 4) score += 2;
  else score += 1;

  if (score >= 8) {
    return {
      phase: 3,
      titleKey: "phase3Title",
      descKey: "phase3Desc",
      color: "text-success",
    };
  } else if (score >= 5) {
    return {
      phase: 2,
      titleKey: "phase2Title",
      descKey: "phase2Desc",
      color: "text-warning",
    };
  } else {
    return {
      phase: 1,
      titleKey: "phase1Title",
      descKey: "phase1Desc",
      color: "text-destructive",
    };
  }
}

const SarcopeniaAssessment = () => {
  const [gripStrength, setGripStrength] = useState("");
  const [walkingSpeed, setWalkingSpeed] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PhaseVideo | null>(null);
  const { language } = useLanguage();

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phase = calculatePhase(
      parseFloat(gripStrength) || 0,
      parseFloat(walkingSpeed) || 0,
      parseFloat(muscleMass) || 0
    );
    setResult(phase);
  };

  const videos = result?.phase ? phaseVideos[result.phase] : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Assessment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {t.measurementInput}
                </CardTitle>
                <CardDescription>
                  {t.measurementDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="gripStrength">{t.gripStrength}</Label>
                    <Input
                      id="gripStrength"
                      type="number"
                      step="0.1"
                      placeholder={t.gripPlaceholder}
                      value={gripStrength}
                      onChange={(e) => setGripStrength(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.gripNormal}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walkingSpeed">{t.walkingSpeed}</Label>
                    <Input
                      id="walkingSpeed"
                      type="number"
                      step="0.01"
                      placeholder={t.walkingPlaceholder}
                      value={walkingSpeed}
                      onChange={(e) => setWalkingSpeed(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.walkingNormal}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="muscleMass">{t.muscleMass}</Label>
                    <Input
                      id="muscleMass"
                      type="number"
                      min="1"
                      max="10"
                      placeholder={t.massPlaceholder}
                      value={muscleMass}
                      onChange={(e) => setMuscleMass(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.massNormal}
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    {t.calculate}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className={result ? "" : "opacity-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result ? (
                    result.phase === 3 ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className={`w-5 h-5 ${result.color}`} />
                    )
                  ) : (
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                  {t.result}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className={`text-xl font-bold ${result.color}`}>
                      {t[result.titleKey]}
                    </div>
                    <p className="text-muted-foreground">{t[result.descKey]}</p>
                    
                    {/* Phase Indicator */}
                    <div className="flex gap-2 mt-4">
                      {[1, 2, 3].map((phase) => (
                        <div
                          key={phase}
                          className={`flex-1 h-2 rounded-full ${
                            phase === result.phase
                              ? phase === 1
                                ? "bg-destructive"
                                : phase === 2
                                ? "bg-warning"
                                : "bg-success"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{language === "en" ? "Phase 1" : "चरण 1"}</span>
                      <span>{language === "en" ? "Phase 2" : "चरण 2"}</span>
                      <span>{language === "en" ? "Phase 3" : "चरण 3"}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {t.completeForm}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Training Videos */}
          {result && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                {t.recommendedVideos}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {t.basedOn} {t[result.titleKey].toLowerCase()}{t.tailoredExercises}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {videos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-soft transition-all duration-300 group cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title[language]}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {video.title[language]}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="pr-8">
              {selectedVideo?.title[language]}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title[language]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SarcopeniaAssessment;
