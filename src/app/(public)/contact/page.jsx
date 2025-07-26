import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Building,
  Users
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with EduTech College. We're here to help with admissions, 
              general inquiries, and any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: "Phone",
                details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
                color: "text-blue-500"
              },
              {
                icon: Mail,
                title: "Email",
                details: ["info@edutech.edu", "admissions@edutech.edu"],
                color: "text-green-500"
              },
              {
                icon: MapPin,
                title: "Address",
                details: ["123 Education Street", "Knowledge City, KC 12345"],
                color: "text-red-500"
              },
              {
                icon: Clock,
                title: "Office Hours",
                details: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
                color: "text-purple-500"
              }
            ].map((contact, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center`}>
                    <contact.icon className={`h-6 w-6 ${contact.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{contact.title}</h3>
                  <div className="space-y-1">
                    {contact.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
