import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, BookOpen, Headphones, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden gradient-subtle">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full mb-8">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("hero.badge")}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            {t("hero.title1")}{" "}
            <span className="text-primary">{t("hero.title2")}</span>
            <br />
            <span className="text-primary">{t("hero.title3")}</span> {t("hero.title4")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">{t("hero.satisfaction")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">{t("hero.videos")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">{t("hero.support")}</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="px-10 py-6 text-base rounded-xl" asChild>
              <Link to="/sarcopenia-assessment">{t("hero.startAssessment")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-6 text-base rounded-xl" asChild>
              <Link to="/education">{t("hero.watchTutorials")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
