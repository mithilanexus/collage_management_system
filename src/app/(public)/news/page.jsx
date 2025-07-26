import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Bookmark, Share } from "lucide-react";

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "EduTech College Wins National Excellence Award 2024",
      excerpt: "Our institution has been recognized for outstanding contributions to higher education and student development.",
      date: "March 15, 2024",
      author: "Admin",
      readTime: "3 min read",
      category: "Achievement",
      featured: true
    },
    {
      id: 2,
      title: "New Research Center for AI and Machine Learning Opens",
      excerpt: "State-of-the-art facility will advance research in artificial intelligence and provide hands-on learning opportunities.",
      date: "March 10, 2024", 
      author: "Dr. John Smith",
      readTime: "5 min read",
      category: "Research"
    },
    {
      id: 3,
      title: "Annual Cultural Festival Dates Announced",
      excerpt: "Join us for three days of music, dance, art, and cultural celebrations from April 15-17, 2024.",
      date: "March 8, 2024",
      author: "Student Council",
      readTime: "2 min read",
      category: "Events"
    },
    {
      id: 4,
      title: "Scholarship Program for Underprivileged Students Launched",
      excerpt: "New initiative aims to provide quality education access to deserving students from economically disadvantaged backgrounds.",
      date: "March 5, 2024",
      author: "Admin",
      readTime: "4 min read",
      category: "Announcement"
    },
    {
      id: 5,
      title: "Industry Partnership with Tech Giants Established",
      excerpt: "Collaborations with leading technology companies will provide internship and placement opportunities for students.",
      date: "March 1, 2024",
      author: "Placement Cell",
      readTime: "3 min read",
      category: "Partnership"
    }
  ];

  const categories = ["All", "Achievement", "Research", "Events", "Announcement", "Partnership"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">News & Updates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest news, announcements, and updates from EduTech College. 
              Discover what's happening in our vibrant academic community.
            </p>
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
                variant={index === 0 ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      {newsItems.filter(item => item.featured).map((item) => (
        <section key={item.id} className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/10 to-secondary/10" />
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="text-muted-foreground text-lg">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.readTime}
                      </span>
                    </div>
                    <Button className="w-fit">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      ))}

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.filter(item => !item.featured).map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10" />
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {item.category}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.readTime}
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter and never miss important updates from EduTech College
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
            />
            <Button className="rounded-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
