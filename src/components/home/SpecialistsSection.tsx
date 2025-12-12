import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, Calendar, MapPin } from "lucide-react";

const specialists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Orthopedic Surgeon",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 234,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Rheumatologist",
    location: "Delhi, NCR",
    rating: 4.8,
    reviews: 189,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Dr. Anjali Desai",
    specialty: "Endocrinologist",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    reviews: 312,
    available: false,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    specialty: "Physical Medicine",
    location: "Chennai, Tamil Nadu",
    rating: 4.7,
    reviews: 156,
    available: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
  },
];

export function SpecialistsSection() {
  return (
    <section id="specialists" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find a Specialist
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with top-rated bone health specialists near you. Get expert 
            consultations and personalized treatment plans.
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
                      Available
                    </span>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-primary">{doctor.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {doctor.location}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Book
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
