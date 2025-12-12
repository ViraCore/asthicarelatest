import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, BookOpen, Headphones, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-subtle">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                Trusted by 50,000+ patients
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Empowering Your{" "}
              <span className="text-primary">Bone Health</span> Journey
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Get personalized guidance, expert resources, and 24/7 AI support to 
              understand and improve your bone health. Start your journey today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">95%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">200+</p>
                  <p className="text-xs text-muted-foreground">Expert Videos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">AI Support</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/sarcopenia-assessment">Start Assessment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/education">Watch Tutorials</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Bone Health Score Card */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Bone Health Score</h3>
                <span className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
                  Interactive
                </span>
              </div>
              
              {/* Score Display */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">75</span>
                  <span className="text-sm text-muted-foreground">Good</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">T-Score Analysis</span>
                  <span className="text-foreground font-medium">Normal</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fracture Risk</span>
                  <span className="text-success font-medium">Low</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recommendations</span>
                  <span className="text-primary font-medium">3 Available</span>
                </div>
              </div>

              <Button className="w-full mt-6" asChild>
                <Link to="/sarcopenia-assessment">Get Your Score</Link>
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
