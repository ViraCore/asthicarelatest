import { Link } from "react-router-dom";
import { Activity, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Asthi Care</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.education")}
                </Link>
              </li>
              <li>
                <Link to="/sarcopenia-assessment" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.assessment")}
                </Link>
              </li>
              <li>
                <a href="#specialists" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.findSpecialist")}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.faqs")}
                </a>
              </li>
              <li>
                <Link to="/report-issue" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.reportIssue")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                support@asthicare.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +91 1800-123-4567
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Asthi Care. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
