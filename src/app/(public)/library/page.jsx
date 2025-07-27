import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Clock, 
  MapPin, 
  Wifi, 
  Computer, 
  Coffee,
  Users,
  Download,
  ExternalLink
} from "lucide-react";

export default function LibraryPage() {
  const services = [
    {
      icon: BookOpen,
      title: "Digital Library",
      description: "Access thousands of e-books, journals, and research papers online"
    },
    {
      icon: Computer,
      title: "Computer Lab",
      description: "24/7 access to computers with specialized software and high-speed internet"
    },
    {
      icon: Users,
      title: "Study Rooms",
      description: "Private and group study rooms available for reservation"
    },
    {
      icon: Coffee,
      title: "Quiet Zones",
      description: "Dedicated silent study areas for focused learning"
    }
  ];

  const resources = [
    {
      title: "Research Databases",
      description: "Access to academic databases including JSTOR, IEEE, and more",
      link: "#"
    },
    {
      title: "Citation Tools",
      description: "APA, MLA, and Chicago style citation generators and guides",
      link: "#"
    },
    {
      title: "Thesis Repository",
      description: "Browse and download previous student theses and dissertations",
      link: "#"
    },
    {
      title: "Course Reserves",
      description: "Access textbooks and materials reserved by your professors",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">EduTech Library</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your gateway to knowledge. Explore our vast collection of books, digital resources, and study spaces.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Search Library Catalog</h2>
              <p className="text-muted-foreground">Find books, journals, and digital resources</p>
            </div>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <Input 
                placeholder="Search by title, author, or keyword..." 
                className="flex-1"
              />
              <Button className="px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Library Hours & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Library Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span className="font-medium">7:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">7:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">12:00 PM - 10:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Main Library Building</p>
                  <p className="text-muted-foreground">123 Education Street, Floor 2-4</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">library@edutech.edu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Library Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Digital Resources */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Digital Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Access Resource →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reserve a Book</h3>
              <p className="text-muted-foreground text-sm">Request books and materials for pickup</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book Study Room</h3>
              <p className="text-muted-foreground text-sm">Reserve private or group study spaces</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Library App</h3>
              <p className="text-muted-foreground text-sm">Download our mobile app for easy access</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
