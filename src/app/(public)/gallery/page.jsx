import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Play, 
  Heart,
  Share,
  Download,
  Eye,
  Calendar,
  MapPin
} from "lucide-react";

export default function Gallery() {
  const categories = [
    { name: "Campus Life", count: 45, active: true },
    { name: "Events", count: 32 },
    { name: "Graduation", count: 28 },
    { name: "Sports", count: 24 },
    { name: "Facilities", count: 18 },
    { name: "Student Activities", count: 35 }
  ];

  const galleryItems = [
    {
      id: 1,
      type: "image",
      title: "Annual Sports Day 2024",
      category: "Sports",
      date: "March 15, 2024",
      location: "Sports Complex",
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      type: "video",
      title: "Graduation Ceremony Highlights",
      category: "Graduation", 
      date: "May 20, 2024",
      location: "Main Auditorium",
      views: 2100,
      likes: 156
    },
    {
      id: 3,
      type: "image",
      title: "New Library Opening",
      category: "Facilities",
      date: "January 10, 2024",
      location: "Central Library",
      views: 890,
      likes: 67
    },
    {
      id: 4,
      type: "image",
      title: "Cultural Festival 2024",
      category: "Events",
      date: "February 28, 2024",
      location: "Campus Grounds",
      views: 1580,
      likes: 123
    },
    {
      id: 5,
      type: "video",
      title: "Student Life Documentary",
      category: "Campus Life",
      date: "April 5, 2024",
      location: "Various Locations",
      views: 3200,
      likes: 245
    },
    {
      id: 6,
      type: "image",
      title: "Science Exhibition",
      category: "Student Activities",
      date: "March 22, 2024",
      location: "Science Block",
      views: 1100,
      likes: 78
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Campus Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the vibrant life at EduTech College through our collection of photos and videos. 
              Witness the memories, achievements, and moments that define our community.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Camera, label: "Photos", value: "2,500+" },
              { icon: Play, label: "Videos", value: "150+" },
              { icon: Eye, label: "Total Views", value: "50K+" },
              { icon: Heart, label: "Likes", value: "5K+" }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                className="rounded-full"
              >
                {category.name}
                <span className="ml-2 text-xs bg-background/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  {/* Media Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                    {item.type === "video" ? (
                      <div className="relative">
                        <Play className="h-16 w-16 text-primary/50" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-full" />
                      </div>
                    ) : (
                      <Camera className="h-16 w-16 text-primary/50" />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full flex items-center gap-1">
                        {item.type === "video" ? <Play className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Title and Category */}
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {item.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {item.likes}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground">Highlights from our most memorable moments</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Play className="h-20 w-20 text-primary/50" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Annual Day Celebration 2024</h3>
                <p className="text-muted-foreground mb-4">
                  A spectacular showcase of talent, culture, and achievements from our students and faculty.
                </p>
                <Button className="w-full">View Collection</Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                <Camera className="h-20 w-20 text-primary/50" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Campus Architecture</h3>
                <p className="text-muted-foreground mb-4">
                  Explore the beautiful architecture and modern facilities that make our campus unique.
                </p>
                <Button className="w-full">View Collection</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Share Your Moments</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Have photos or videos from college events? Share them with our community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Upload Media
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Submit Event Photos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
