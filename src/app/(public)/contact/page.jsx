import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  Users,
  CheckCircle,
  Globe,
  Calendar,
  ArrowRight,
  Star,
  Headphones
} from "lucide-react";
import { Zap } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50"></div>
          {/* Subtle Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-emerald-200/50 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600 font-bold">
                We&apos;re Here to Help 24/7
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">Get in</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Touch
                </span>
              </h1>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                  Ready to <span className="font-bold text-emerald-600">Transform Your Future?</span>
                  <span className="font-bold text-blue-600"> We&apos;re Here to Guide You</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Our dedicated admissions team and support staff are ready to provide personalized assistance
                  for your educational journey. Reach out today and take the first step towards excellence.
                </p>
              </div>
            </div>

            {/* Support Features with Animation */}
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              {[
                { icon: Headphones, text: "24/7 Support", color: "from-emerald-400 to-green-400" },
                { icon: Zap, text: "Quick Response", color: "from-blue-400 to-cyan-400" },
                { icon: Users, text: "Expert Guidance", color: "from-purple-400 to-pink-400" },
                { icon: CheckCircle, text: "Personalized Help", color: "from-orange-400 to-red-400" }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                    <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">{feature.text}</span>
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Multiple Ways to Reach Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                details: ["+977-1-4567890", "+977-1-4567891"],
                color: "blue",
                bgColor: "bg-blue-100",
                iconColor: "text-blue-600",
                description: "Speak directly with our admissions team"
              },
              {
                icon: Mail,
                title: "Email Us",
                details: ["info@edutech.edu.np", "admissions@edutech.edu.np"],
                color: "green",
                bgColor: "bg-green-100",
                iconColor: "text-green-600",
                description: "Get detailed responses to your queries"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                details: ["Kathmandu, Nepal", "New Baneshwor, Ward 10"],
                color: "red",
                bgColor: "bg-red-100",
                iconColor: "text-red-600",
                description: "Tour our beautiful campus facilities"
              },
              {
                icon: Clock,
                title: "Office Hours",
                details: ["Sun-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
                color: "purple",
                bgColor: "bg-purple-100",
                iconColor: "text-purple-600",
                description: "We're here when you need us"
              }
            ].map((contact, index) => (
              <div key={index} className="group text-center p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className={`w-16 h-16 mx-auto ${contact.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <contact.icon className={`h-8 w-8 ${contact.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{contact.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                <div className="space-y-2">
                  {contact.details.map((detail, i) => (
                    <p key={i} className="text-sm font-medium text-foreground">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <select id="subject" className="w-full px-3 py-2 border border-border rounded-md bg-background">
                        <option>General Inquiry</option>
                        <option>Admissions</option>
                        <option>Academic Programs</option>
                        <option>Financial Aid</option>
                        <option>Campus Visit</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message" 
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                      />
                    </div>

                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 mx-auto text-primary/50" />
                      <p className="text-muted-foreground">Interactive Campus Map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Contacts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Department Contacts
                  </h3>
                  <div className="space-y-3">
                    {[
                      { dept: "Admissions Office", contact: "admissions@edutech.edu" },
                      { dept: "Academic Affairs", contact: "academics@edutech.edu" },
                      { dept: "Student Services", contact: "students@edutech.edu" },
                      { dept: "Financial Aid", contact: "finaid@edutech.edu" }
                    ].map((dept, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="font-medium">{dept.dept}</span>
                        <span className="text-sm text-muted-foreground">{dept.contact}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Live Chat</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Schedule Visit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Check out our frequently asked questions for quick answers
          </p>
          <Button size="lg" variant="outline" className="rounded-xl">
            View FAQ
          </Button>
        </div>
      </section>
    </div>
  );
}
