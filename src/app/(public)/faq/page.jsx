import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ChevronDown, 
  HelpCircle,
  GraduationCap,
  DollarSign,
  Home,
  BookOpen,
  Users
} from "lucide-react";

export default function FAQ() {
  const categories = [
    { name: "All", icon: HelpCircle, count: 24 },
    { name: "Admissions", icon: GraduationCap, count: 8 },
    { name: "Fees & Financial Aid", icon: DollarSign, count: 6 },
    { name: "Hostel & Accommodation", icon: Home, count: 5 },
    { name: "Academic Programs", icon: BookOpen, count: 5 }
  ];

  const faqs = [
    {
      category: "Admissions",
      question: "What are the admission requirements for undergraduate programs?",
      answer: "Admission requirements vary by program. Generally, you need to have completed high school with a minimum GPA of 3.0, submit standardized test scores (SAT/ACT), provide letters of recommendation, and write a personal statement. Specific requirements for each program can be found on our admissions page."
    },
    {
      category: "Admissions", 
      question: "When is the application deadline?",
      answer: "Application deadlines vary by program and semester. For Fall semester, the priority deadline is March 1st, and the final deadline is May 1st. Spring semester applications are due by November 1st. We recommend applying early for the best chance of admission and financial aid consideration."
    },
    {
      category: "Fees & Financial Aid",
      question: "What is the tuition fee structure?",
      answer: "Tuition fees vary by program and student status. For the 2024-25 academic year, undergraduate tuition is $15,000 per year for in-state students and $25,000 for out-of-state students. Graduate program fees range from $18,000 to $30,000 depending on the program. Additional fees for housing, meals, and activities apply."
    },
    {
      category: "Fees & Financial Aid",
      question: "What financial aid options are available?",
      answer: "We offer various financial aid options including merit-based scholarships, need-based grants, work-study programs, and student loans. Over 80% of our students receive some form of financial assistance. To apply for aid, complete the FAFSA and our institutional aid application by the priority deadline."
    },
    {
      category: "Hostel & Accommodation",
      question: "Is on-campus housing guaranteed for all students?",
      answer: "On-campus housing is guaranteed for first-year students who apply by the housing deadline. Upper-class students are accommodated based on availability and application date. We have various housing options including traditional residence halls, apartment-style living, and themed communities."
    },
    {
      category: "Hostel & Accommodation",
      question: "What amenities are included in the hostel facilities?",
      answer: "Our residence halls include furnished rooms, high-speed internet, laundry facilities, common areas, study spaces, and 24/7 security. Most halls have dining facilities or are close to campus dining options. Each room includes basic furniture, and utilities are included in the housing fee."
    },
    {
      category: "Academic Programs",
      question: "Can I change my major after enrollment?",
      answer: "Yes, students can change their major, typically after completing their first year. The process involves meeting with an academic advisor, ensuring you meet the prerequisites for your new major, and submitting a change of major form. Some competitive programs may have additional requirements."
    },
    {
      category: "Academic Programs",
      question: "Are online courses available?",
      answer: "Yes, we offer a variety of online and hybrid courses. Some programs are available entirely online, while others combine online and in-person instruction. Online courses maintain the same academic rigor and are taught by the same faculty as on-campus courses."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
     
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about admissions, academics, campus life, 
              and more. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for answers..." 
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className="rounded-full h-auto p-4 flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
                <span className="ml-2 text-xs bg-background/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-left group-hover:text-primary transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="pl-20">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Most Popular Questions</h2>
            <p className="text-muted-foreground">Quick answers to our most frequently asked questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { question: "How do I apply?", answer: "Visit our admissions page and complete the online application." },
              { question: "What's the acceptance rate?", answer: "Our current acceptance rate is approximately 65%." },
              { question: "When do classes start?", answer: "Fall semester begins in late August, Spring in January." },
              { question: "Is financial aid available?", answer: "Yes, we offer various scholarships and financial aid options." },
              { question: "Can I visit the campus?", answer: "Absolutely! Schedule a campus tour through our admissions office." },
              { question: "What's student life like?", answer: "We have 100+ clubs, sports teams, and activities for all interests." }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3">
                  <HelpCircle className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our admissions team is here to help you with any questions not covered here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Contact Admissions
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
