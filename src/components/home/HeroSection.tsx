import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, BookOpen, Headphones, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-subtle">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
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
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/sarcopenia-assessment">Start Assessment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/education">Watch Tutorials</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
