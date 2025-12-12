import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Play, Clock, Star, Eye } from "lucide-react";

const categories = [
  "All",
  "Nutrition",
  "Exercise",
  "Rehabilitation",
  "Fall Prevention",
  "Understanding BMD",
];

const videos = [
  {
    id: 1,
    title: "Understanding Your T-Score Results",
    category: "Understanding BMD",
    duration: "8:24",
    views: 12500,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "Essential Calcium-Rich Foods for Strong Bones",
    category: "Nutrition",
    duration: "12:30",
    views: 8900,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "Safe Weight-Bearing Exercises at Home",
    category: "Exercise",
    duration: "15:45",
    views: 15200,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    title: "Post-Fracture Rehabilitation Guide",
    category: "Rehabilitation",
    duration: "20:10",
    views: 6700,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop",
  },
  {
    id: 5,
    title: "Home Safety Tips to Prevent Falls",
    category: "Fall Prevention",
    duration: "10:15",
    views: 9300,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=225&fit=crop",
  },
  {
    id: 6,
    title: "Vitamin D: Why It Matters for Bones",
    category: "Nutrition",
    duration: "9:42",
    views: 11000,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=225&fit=crop",
  },
  {
    id: 7,
    title: "Balance Training for Seniors",
    category: "Exercise",
    duration: "14:20",
    views: 7800,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
  },
  {
    id: 8,
    title: "Reading Your DEXA Scan Report",
    category: "Understanding BMD",
    duration: "11:35",
    views: 14500,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=225&fit=crop",
  },
  {
    id: 9,
    title: "Physical Therapy After Hip Surgery",
    category: "Rehabilitation",
    duration: "18:50",
    views: 5200,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
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

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
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
              Education Center
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our library of expert-curated videos on bone health, nutrition, 
              exercise, and rehabilitation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
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
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 rounded text-xs text-background font-medium">
                    {video.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Category Badge */}
                  <span className="text-xs px-2 py-1 bg-accent rounded text-accent-foreground">
                    {video.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatViews(video.views)} views
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
              <p className="text-muted-foreground">No videos found matching your search.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Education;
