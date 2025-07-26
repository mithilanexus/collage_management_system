import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Award, 
  BookOpen, 
  Mail,
  Star,
  GraduationCap,
  Users,
  Trophy
} from "lucide-react";

export default function Faculty() {
  const departments = [
    {
      name: "Computer Science",
      faculty: [
        { name: "Dr. John Smith", position: "Professor & Head", specialization: "Artificial Intelligence", awards: 3 },
        { name: "Dr. Emily Chen", position: "Associate Professor", specialization: "Cybersecurity", awards: 2 },
        { name: "Prof. Michael Brown", position: "Assistant Professor", specialization: "Web Development", awards: 1 }
      ]
    },
    {
      name: "Business Administration", 
      faculty: [
        { name: "Dr. Sarah Wilson", position: "Professor", specialization: "Strategic Management", awards: 4 },
        { name: "Dr. David Lee", position: "Associate Professor", specialization: "Finance", awards: 2 },
        { name: "Prof. Lisa Garcia", position: "Assistant Professor", specialization: "Marketing", awards: 1 }
      ]
    },
    {
      name: "Engineering",
      faculty: [
        { name: "Dr. Robert Taylor", position: "Professor", specialization: "Mechanical Design", awards: 3 },
        { name: "Dr. Maria Rodriguez", position: "Associate Professor", specialization: "Robotics", awards: 2 },
        { name: "Prof. James Anderson", position: "Assistant Professor", specialization: "Manufacturing", awards: 1 }
      ]
    }
  ];

  const featuredFaculty = [
    {
      name: "Dr. Sarah Wilson",
      position: "Professor of Business Administration",
      specialization: "Strategic Management & Leadership",
      awards: 4,
      description: "Leading expert in strategic management with 20+ years of industry experience.",
      achievements: ["Best Teacher Award 2023", "Research Excellence Award", "Industry Partnership Award"]
    },
    {
      name: "Dr. John Smith", 
      position: "Professor & Head of Computer Science",
      specialization: "Artificial Intelligence & Machine Learning",
      awards: 3,
      description: "Pioneer in AI research with numerous publications in top-tier journals.",
      achievements: ["AI Innovation Award", "Best Research Paper 2022", "Teaching Excellence Award"]
    },
    {
      name: "Dr. Robert Taylor",
      position: "Professor of Mechanical Engineering", 
      specialization: "Mechanical Design & Innovation",
      awards: 3,
      description: "Renowned for breakthrough innovations in mechanical design and manufacturing.",
      achievements: ["Innovation Award 2023", "Industry Collaboration Award", "Patent Excellence Award"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Our Faculty</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our distinguished faculty members who bring expertise, passion, and innovation 
              to every classroom. Our educators are leaders in their fields.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Faculty Members", value: "200+" },
              { icon: Award, label: "PhD Holders", value: "85%" },
              { icon: Trophy, label: "Awards Won", value: "150+" },
              { icon: BookOpen, label: "Research Papers", value: "500+" }
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

      {/* Featured Faculty */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Award-Winning Faculty</h2>
            <p className="text-muted-foreground">Celebrating excellence in teaching and research</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredFaculty.map((faculty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Faculty Image Placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <User className="h-12 w-12 text-primary/50" />
                    </div>
                    
                    {/* Faculty Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{faculty.name}</h3>
                      <p className="text-sm text-muted-foreground">{faculty.position}</p>
                      <p className="text-sm text-primary font-medium">{faculty.specialization}</p>
                    </div>

                    {/* Awards */}
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(faculty.awards)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">{faculty.awards} Awards</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground text-center">
                      {faculty.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recent Achievements:</h4>
                      <div className="space-y-1">
                        {faculty.achievements.slice(0, 2).map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Award className="h-3 w-3 text-primary" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty by Department */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Faculty by Department</h2>
            <p className="text-muted-foreground">Explore our faculty across different departments</p>
          </div>
          
          <div className="space-y-8">
            {departments.map((dept, deptIndex) => (
              <Card key={deptIndex}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    {dept.name} Department
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {dept.faculty.map((faculty, facultyIndex) => (
                      <div key={facultyIndex} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{faculty.name}</h4>
                          <p className="text-sm text-muted-foreground">{faculty.position}</p>
                          <p className="text-xs text-primary">{faculty.specialization}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(faculty.awards)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Academic Community</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Interested in joining our faculty or collaborating on research?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-xl">
              Faculty Positions
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              Research Collaboration
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
