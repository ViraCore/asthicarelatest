import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Headphones, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-subtle">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full mb-8">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Trusted by 50,000+ patients
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            Empowering Your{" "}
            <span className="text-primary">Bone</span>
            <br />
            <span className="text-primary">Health</span> Journey
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Get personalized guidance, expert resources, and 24/7 AI support to
            understand and improve your bone health. Start your journey today.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Expert Videos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">AI Support</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="px-10 py-6 text-base rounded-xl" asChild>
              <Link to="/sarcopenia-assessment">Start Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-6 text-base rounded-xl" asChild>
              <Link to="/education">Watch Tutorials</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
