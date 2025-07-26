import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">About EduTech College</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Established in 1985, we have been at the forefront of educational excellence, 
              nurturing minds and shaping the leaders of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide world-class education that empowers students to become 
                  innovative leaders and responsible global citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be a globally recognized institution that transforms lives through 
                  excellence in education, research, and community service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Values</h3>
                <p className="text-muted-foreground">
                  Integrity, Excellence, Innovation, Diversity, and Sustainability 
                  guide everything we do in our educational journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Message from the Principal</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  "Welcome to EduTech College, where dreams take flight and futures are forged. 
                  For nearly four decades, we have been committed to providing an educational 
                  experience that goes beyond textbooks and classrooms."
                </p>
                <p>
                  "Our dedicated faculty, state-of-the-art facilities, and innovative curriculum 
                  ensure that every student receives the tools they need to succeed in an 
                  ever-evolving world."
                </p>
                <p>
                  "Join us in this journey of discovery, growth, and transformation."
                </p>
              </div>
              <div className="pt-4">
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Principal, EduTech College</p>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <Users className="h-24 w-24 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College History */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">Milestones that shaped our institution</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: "1985", title: "Foundation", desc: "College established with 100 students" },
              { year: "1995", title: "Expansion", desc: "Added engineering and business programs" },
              { year: "2005", title: "Recognition", desc: "Received national accreditation" },
              { year: "2020", title: "Innovation", desc: "Launched digital learning initiatives" }
            ].map((milestone, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-primary">{milestone.year}</div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-muted-foreground">Recognition and awards that make us proud</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Excellence in Education", desc: "National Education Award 2023" },
              { icon: BookOpen, title: "Research Excellence", desc: "Top 10 Research Institution" },
              { icon: Users, title: "Student Success", desc: "95% Graduate Employment Rate" }
            ].map((achievement, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the opportunities that await you at EduTech College
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
