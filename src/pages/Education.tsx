import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Play, Star, Eye, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Video {
  id: number;
  youtubeId: string;
  title: { en: string; hi: string };
  category: string;
  views: number;
  rating: number;
}

const videos: Video[] = [
  {
    id: 1,
    youtubeId: "T6Se7kOJdSQ",
    title: {
      en: "Understanding Osteoporosis - Bone Health Explained",
      hi: "ऑस्टियोपोरोसिस को समझना - हड्डियों का स्वास्थ्य",
    },
    category: "Understanding BMD",
    views: 125000,
    rating: 4.9,
  },
  {
    id: 2,
    youtubeId: "4J9G8eWu5Is",
    title: {
      en: "Calcium Rich Foods for Strong Bones",
      hi: "मजबूत हड्डियों के लिए कैल्शियम युक्त आहार",
    },
    category: "Nutrition",
    views: 89000,
    rating: 4.8,
  },
  {
    id: 3,
    youtubeId: "aUaInS6HIGo",
    title: {
      en: "Best Exercises for Bone Health - Senior Friendly",
      hi: "हड्डियों के स्वास्थ्य के लिए सर्वोत्तम व्यायाम",
    },
    category: "Exercise",
    views: 152000,
    rating: 4.9,
  },
  {
    id: 4,
    youtubeId: "uGEL8lmZFXc",
    title: {
      en: "Physiotherapy for Bone Recovery",
      hi: "हड्डी की रिकवरी के लिए फिजियोथेरेपी",
    },
    category: "Rehabilitation",
    views: 67000,
    rating: 4.7,
  },
  {
    id: 5,
    youtubeId: "PFkDJI64zAk",
    title: {
      en: "Fall Prevention Tips for Elderly",
      hi: "बुजुर्गों के लिए गिरने से बचाव के टिप्स",
    },
    category: "Fall Prevention",
    views: 93000,
    rating: 4.8,
  },
  {
    id: 6,
    youtubeId: "RLHdkV8WWQI",
    title: {
      en: "Vitamin D and Bone Health Connection",
      hi: "विटामिन डी और हड्डियों के स्वास्थ्य का संबंध",
    },
    category: "Nutrition",
    views: 110000,
    rating: 4.9,
  },
  {
    id: 7,
    youtubeId: "5N1JxDpT-wk",
    title: {
      en: "Yoga Exercises for Strong Bones",
      hi: "मजबूत हड्डियों के लिए योग व्यायाम",
    },
    category: "Exercise",
    views: 78000,
    rating: 4.6,
  },
  {
    id: 8,
    youtubeId: "bSvovGB_O44",
    title: {
      en: "How to Read Your DEXA Scan Report",
      hi: "अपनी DEXA स्कैन रिपोर्ट कैसे पढ़ें",
    },
    category: "Understanding BMD",
    views: 145000,
    rating: 4.9,
  },
  {
    id: 9,
    youtubeId: "GIBXMIoGXWU",
    title: {
      en: "Post Surgery Rehabilitation Exercises",
      hi: "सर्जरी के बाद पुनर्वास व्यायाम",
    },
    category: "Rehabilitation",
    views: 52000,
    rating: 4.7,
  },
];

function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`;
  }
  return views.toString();
}

const Education = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { language, t } = useLanguage();

  const categories = [
    { key: "All", label: t("category.all") },
    { key: "Nutrition", label: t("category.nutrition") },
    { key: "Exercise", label: t("category.exercise") },
    { key: "Rehabilitation", label: t("category.rehabilitation") },
    { key: "Fall Prevention", label: t("category.fallPrevention") },
    { key: "Understanding BMD", label: t("category.understandingBMD") },
  ];

  const filteredVideos = videos.filter((video) => {
    const title = video.title[language];
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("education.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("education.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("education.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="overflow-hidden hover:shadow-soft transition-all duration-300 group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail */}
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
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Category Badge */}
                  <span className="text-xs px-2 py-1 bg-accent rounded text-accent-foreground">
                    {categories.find((c) => c.key === video.category)?.label}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title[language]}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatViews(video.views)} {t("education.views")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      {video.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t("education.noResults")}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                {t("education.clearFilters")}
              </Button>
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

export default Education;
