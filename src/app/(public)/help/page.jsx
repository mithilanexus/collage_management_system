import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen,
  Users,
  Settings,
  CreditCard,
  GraduationCap,
  Clock
} from "lucide-react";

export default function HelpCenter() {
  const categories = [
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account settings and personal information",
      articles: 12
    },
    {
      icon: GraduationCap,
      title: "Academic Support",
      description: "Course registration, grades, and academic policies",
      articles: 18
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Tuition fees, payment methods, and financial aid",
      articles: 8
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Login issues, password reset, and system problems",
      articles: 15
    },
    {
      icon: BookOpen,
      title: "Library & Resources",
      description: "Access to books, databases, and study materials",
      articles: 10
    },
    {
      icon: MessageSquare,
      title: "Campus Life",
      description: "Events, facilities, and student services",
      articles: 14
    }
  ];

  const popularArticles = [
    "How to reset your password",
    "Course registration process",
    "Accessing online library resources",
    "Payment methods and deadlines",
    "How to view your grades",
    "Campus WiFi connection guide"
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to your questions and get the support you need.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
              <p className="text-muted-foreground">Search our knowledge base for quick answers</p>
            </div>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <Input 
                placeholder="Search for help articles..." 
                className="flex-1"
              />
              <Button className="px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                      <p className="text-xs text-primary font-medium">{category.articles} articles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{article}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Student Support</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Support</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>24/7 Online Support</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Support</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Options */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-4">Chat with our support team in real-time</p>
                <Button className="w-full">Start Chat</Button>
              </div>
              
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Call us for immediate assistance</p>
                <Button variant="outline" className="w-full">+1 (555) 123-4567</Button>
              </div>
              
              <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Send us a detailed message</p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
