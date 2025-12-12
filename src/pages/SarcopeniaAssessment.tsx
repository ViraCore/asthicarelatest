import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, AlertCircle, CheckCircle, Info } from "lucide-react";

type Phase = 1 | 2 | 3 | null;

interface AssessmentResult {
  phase: Phase;
  title: string;
  description: string;
  color: string;
}

const phaseVideos = {
  1: [
    {
      id: 1,
      title: "Beginner Chair Exercises",
      duration: "10:30",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    },
    {
      id: 2,
      title: "Gentle Stretching Routine",
      duration: "8:15",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    },
    {
      id: 3,
      title: "Balance Training Basics",
      duration: "12:00",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop",
    },
  ],
  2: [
    {
      id: 4,
      title: "Resistance Band Workouts",
      duration: "15:45",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    },
    {
      id: 5,
      title: "Core Strengthening Exercises",
      duration: "14:20",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    },
    {
      id: 6,
      title: "Walking Program Guide",
      duration: "11:30",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop",
    },
  ],
  3: [
    {
      id: 7,
      title: "Weight Training for Bone Health",
      duration: "20:00",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    },
    {
      id: 8,
      title: "High-Intensity Interval Training",
      duration: "18:30",
      thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    },
    {
      id: 9,
      title: "Advanced Balance & Agility",
      duration: "16:45",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop",
    },
  ],
};

function calculatePhase(gripStrength: number, walkingSpeed: number, muscleMass: number): AssessmentResult {
  // Basic scoring logic
  // Phase 1 (Severe): Low grip, slow walk, low muscle
  // Phase 2 (Moderate): Medium values
  // Phase 3 (Mild/Good): Good values

  let score = 0;

  // Grip strength scoring (normal: male >30kg, female >20kg, using average)
  if (gripStrength >= 28) score += 3;
  else if (gripStrength >= 20) score += 2;
  else score += 1;

  // Walking speed scoring (normal: >0.8 m/s)
  if (walkingSpeed >= 0.8) score += 3;
  else if (walkingSpeed >= 0.6) score += 2;
  else score += 1;

  // Muscle mass indicator scoring (1-10 scale)
  if (muscleMass >= 7) score += 3;
  else if (muscleMass >= 4) score += 2;
  else score += 1;

  // Determine phase based on total score
  if (score >= 8) {
    return {
      phase: 3,
      title: "Phase 3 - Good Condition",
      description: "Your muscle health indicators are in a good range. Focus on maintaining and building strength with advanced exercises.",
      color: "text-success",
    };
  } else if (score >= 5) {
    return {
      phase: 2,
      title: "Phase 2 - Moderate Concern",
      description: "Some indicators suggest moderate muscle weakness. Intermediate exercises and consistent training are recommended.",
      color: "text-warning",
    };
  } else {
    return {
      phase: 1,
      title: "Phase 1 - Needs Attention",
      description: "Your indicators suggest sarcopenia risk. Start with gentle, beginner exercises and consult a healthcare provider.",
      color: "text-destructive",
    };
  }
}

const SarcopeniaAssessment = () => {
  const [gripStrength, setGripStrength] = useState("");
  const [walkingSpeed, setWalkingSpeed] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);

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
              Sarcopenia Assessment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Assess your muscle health and get personalized training recommendations 
              based on your current condition.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Assessment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Measurement Input
                </CardTitle>
                <CardDescription>
                  Enter your measurements to assess your sarcopenia risk level.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="gripStrength">Grip Strength (kg)</Label>
                    <Input
                      id="gripStrength"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 25.5"
                      value={gripStrength}
                      onChange={(e) => setGripStrength(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Normal: Male &gt;30kg, Female &gt;20kg
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walkingSpeed">Walking Speed (m/s)</Label>
                    <Input
                      id="walkingSpeed"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 0.85"
                      value={walkingSpeed}
                      onChange={(e) => setWalkingSpeed(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Normal: &gt;0.8 m/s (4-meter walk test)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="muscleMass">Muscle Mass Indicator (1-10)</Label>
                    <Input
                      id="muscleMass"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="e.g., 6"
                      value={muscleMass}
                      onChange={(e) => setMuscleMass(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Self-assessment: 1 (very low) to 10 (excellent)
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Calculate Assessment
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
                  Assessment Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className={`text-xl font-bold ${result.color}`}>
                      {result.title}
                    </div>
                    <p className="text-muted-foreground">{result.description}</p>
                    
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
                      <span>Phase 1</span>
                      <span>Phase 2</span>
                      <span>Phase 3</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Complete the assessment form to see your results and personalized 
                    training recommendations.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Training Videos */}
          {result && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                Recommended Training Videos
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Based on your {result.title.toLowerCase()}, here are exercises tailored for you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {videos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-soft transition-all duration-300 group cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 rounded text-xs text-background font-medium">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {video.title}
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
    </div>
  );
};

export default SarcopeniaAssessment;
