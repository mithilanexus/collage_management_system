import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Computer, 
  Building, 
  Wrench, 
  Heart, 
  Palette,
  Calculator,
  Download,
  Clock,
  Users,
  Star
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Computer Science & Engineering",
      icon: Computer,
      duration: "4 Years",
      students: "1,200",
      rating: "4.9",
      description: "Comprehensive program covering software development, AI, and emerging technologies.",
      subjects: ["Programming", "Data Structures", "AI/ML", "Web Development", "Cybersecurity"]
    },
    {
      id: 2,
      title: "Business Administration",
      icon: Building,
      duration: "3 Years",
      students: "800",
      rating: "4.8",
      description: "Strategic business education with focus on leadership and entrepreneurship.",
      subjects: ["Management", "Finance", "Marketing", "Operations", "Strategy"]
    },
    {
      id: 3,
      title: "Mechanical Engineering",
      icon: Wrench,
      duration: "4 Years",
      students: "600",
      rating: "4.7",
      description: "Engineering excellence in design, manufacturing, and innovation.",
      subjects: ["Thermodynamics", "Mechanics", "CAD", "Manufacturing", "Robotics"]
    },
    {
      id: 4,
      title: "Healthcare & Medicine",
      icon: Heart,
      duration: "5 Years",
      students: "400",
      rating: "4.9",
      description: "Comprehensive medical education with hands-on clinical experience.",
      subjects: ["Anatomy", "Physiology", "Pharmacology", "Clinical Practice", "Research"]
    },
    {
      id: 5,
      title: "Arts & Design",
      icon: Palette,
      duration: "3 Years",
      students: "300",
      rating: "4.6",
      description: "Creative arts program fostering innovation and artistic expression.",
      subjects: ["Digital Art", "Graphic Design", "Animation", "Fine Arts", "Portfolio"]
    },
    {
      id: 6,
      title: "Mathematics & Statistics",
      icon: Calculator,
      duration: "3 Years",
      students: "250",
      rating: "4.8",
      description: "Advanced mathematical concepts with real-world applications.",
      subjects: ["Calculus", "Statistics", "Linear Algebra", "Data Analysis", "Research"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
 
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of programs designed to prepare you for success 
              in your chosen field. Each course combines theoretical knowledge with practical experience.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Course Header */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <course.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students} students
                      </div>
                    </div>

                    {/* Subjects */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Key Subjects:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.subjects.slice(0, 3).map((subject, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                        {course.subjects.length > 3 && (
                          <span className="px-2 py-1 bg-muted rounded-md text-xs">
                            +{course.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 rounded-lg">
                        Learn More
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-muted-foreground">Features that make our programs stand out</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Expert Faculty", desc: "Learn from industry professionals and academic experts" },
              { title: "Hands-on Learning", desc: "Practical projects and real-world applications" },
              { title: "Industry Partnerships", desc: "Collaborations with leading companies" },
              { title: "Career Support", desc: "Placement assistance and career guidance" }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-primary rounded-full" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have transformed their careers with our programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Download Brochure
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
