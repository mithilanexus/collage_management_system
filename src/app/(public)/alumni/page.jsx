import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  Briefcase, 
  Heart,
  Calendar,
  MapPin,
  Star,
  Building,
  TrendingUp,
  Network
} from "lucide-react";

export default function Alumni() {
  const featuredAlumni = [
    {
      name: "Sarah Johnson",
      graduation: "Class of 2015",
      degree: "Computer Science",
      position: "Senior Software Engineer at Google",
      achievement: "Led development of major AI features",
      image: "placeholder"
    },
    {
      name: "Michael Chen", 
      graduation: "Class of 2012",
      degree: "Business Administration",
      position: "CEO & Founder of TechStart Inc.",
      achievement: "Built a $50M startup from scratch",
      image: "placeholder"
    },
    {
      name: "Dr. Emily Rodriguez",
      graduation: "Class of 2010", 
      degree: "Medicine",
      position: "Chief of Cardiology at City Hospital",
      achievement: "Pioneer in minimally invasive heart surgery",
      image: "placeholder"
    }
  ];

  const alumniStats = [
    { icon: Users, label: "Total Alumni", value: "25,000+", color: "text-blue-500" },
    { icon: Building, label: "Companies Founded", value: "500+", color: "text-green-500" },
    { icon: Award, label: "Industry Awards", value: "1,200+", color: "text-purple-500" },
    { icon: TrendingUp, label: "Average Salary Growth", value: "150%", color: "text-orange-500" }
  ];

  const upcomingEvents = [
    {
      title: "Annual Alumni Reunion 2024",
      date: "June 15, 2024",
      location: "Main Campus",
      type: "Reunion",
      attendees: "500+ expected"
    },
    {
      title: "Career Networking Night",
      date: "April 20, 2024", 
      location: "Downtown Convention Center",
      type: "Networking",
      attendees: "200+ professionals"
    },
    {
      title: "Alumni Mentorship Program Launch",
      date: "May 10, 2024",
      location: "Virtual Event",
      type: "Mentorship",
      attendees: "100+ mentors"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Alumni Corner</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome back to your alma mater! Reconnect with fellow graduates, share your journey, 
              and continue to be part of the EduTech College family. Your success inspires our current students.
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {alumniStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Distinguished Alumni</h2>
            <p className="text-muted-foreground">Celebrating the achievements of our graduates</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredAlumni.map((alumni, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Alumni Photo Placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <Users className="h-12 w-12 text-primary/50" />
                    </div>
                    
                    {/* Alumni Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{alumni.name}</h3>
                      <p className="text-sm text-muted-foreground">{alumni.graduation}</p>
                      <p className="text-sm text-primary font-medium">{alumni.degree}</p>
                    </div>

                    {/* Current Position */}
                    <div className="text-center">
                      <p className="font-medium">{alumni.position}</p>
                      <p className="text-sm text-muted-foreground mt-2">{alumni.achievement}</p>
                    </div>

                    {/* Rating/Recognition */}
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Connect Button */}
                    <Button variant="outline" size="sm" className="w-full">
                      <Network className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Alumni Events</h2>
            <p className="text-muted-foreground">Join us for networking, reunions, and special occasions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {event.type}
                      </span>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.attendees}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Alumni Services</h2>
            <p className="text-muted-foreground">Resources and benefits for our graduates</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Network,
                title: "Alumni Directory",
                description: "Connect with fellow graduates worldwide"
              },
              {
                icon: Briefcase,
                title: "Career Services",
                description: "Lifetime access to job placement assistance"
              },
              {
                icon: Heart,
                title: "Mentorship Program",
                description: "Guide current students and recent graduates"
              },
              {
                icon: Award,
                title: "Alumni Awards",
                description: "Recognition for outstanding achievements"
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Update your information, share your achievements, and stay involved with your alma mater
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Update Profile
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
