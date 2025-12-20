import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import drSanjayImage from "@/assets/dr-sanjay-bhadada.png";
import drSameerImage from "@/assets/dr-sameer-aggarwal.png";
import drVijayImage from "@/assets/dr-vijay-goni.png";

const specialists = [
  {
    id: 1,
    name: "Dr. Sanjay Kumar Bhadada",
    specialty: { en: "Endocrinologist", hi: "एंडोक्राइनोलॉजिस्ट" },
    location: { en: "PGIMER, Chandigarh", hi: "पीजीआईएमईआर, चंडीगढ़" },
    rating: 4.9,
    reviews: 312,
    available: true,
    image: drSanjayImage,
  },
  {
    id: 2,
    name: "Dr. Sameer Aggarwal",
    specialty: { en: "Orthopaedics", hi: "आर्थोपेडिक्स" },
    location: { en: "PGIMER, Chandigarh", hi: "पीजीआईएमईआर, चंडीगढ़" },
    rating: 4.8,
    reviews: 245,
    available: true,
    image: drSameerImage,
  },
  {
    id: 3,
    name: "Dr. Vijay Goni",
    specialty: { en: "Orthopaedics", hi: "आर्थोपेडिक्स" },
    location: { en: "PGIMER, Chandigarh", hi: "पीजीआईएमईआर, चंडीगढ़" },
    rating: 4.9,
    reviews: 278,
    available: true,
    image: drVijayImage,
  },
];

export function SpecialistsSection() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Find a Specialist",
      subtitle: "Connect with top-rated bone health specialists near you. Get expert consultations and personalized treatment plans.",
      available: "Available",
      reviews: "reviews",
      call: "Call",
      book: "Book",
    },
    hi: {
      title: "विशेषज्ञ खोजें",
      subtitle: "अपने पास के शीर्ष-रेटेड हड्डी स्वास्थ्य विशेषज्ञों से जुड़ें। विशेषज्ञ परामर्श और व्यक्तिगत उपचार योजनाएं प्राप्त करें।",
      available: "उपलब्ध",
      reviews: "समीक्षाएं",
      call: "कॉल",
      book: "बुक",
    },
  };

  const text = translations[language];

  return (
    <section id="specialists" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((doctor, index) => (
            <Card 
              key={doctor.id} 
              className="overflow-hidden hover:shadow-soft transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Doctor Image */}
                <div className="relative mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-background shadow-card"
                  />
                  {doctor.available && (
                    <span className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1 px-2 py-0.5 text-xs font-medium bg-success text-success-foreground rounded-full">
                      {text.available}
                    </span>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-primary">{doctor.specialty[language]}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {doctor.location[language]}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviews} {text.reviews})
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    {text.call}
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {text.book}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
