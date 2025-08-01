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
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Zap,
  Target,
  Filter,
  Search
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Computer Science & IT",
      icon: Computer,
      duration: "4 Years",
      students: "1,247",
      rating: "4.9",
      level: "Bachelor's",
      category: "Technology",
      tuition: "NPR 450,000/year",
      description: "Comprehensive program covering software development, AI, machine learning, and emerging technologies with industry partnerships.",
      subjects: ["Programming", "Data Structures", "AI/ML", "Web Development", "Cybersecurity", "Cloud Computing"],
      highlights: ["Industry Internships", "Research Projects", "International Certifications"],
      careers: ["Software Engineer", "Data Scientist", "AI Specialist", "Cybersecurity Expert"],
      color: "blue"
    },
    {
      id: 2,
      title: "Business Administration",
      icon: Building,
      duration: "4 Years",
      students: "892",
      rating: "4.8",
      level: "Bachelor's",
      category: "Business",
      tuition: "NPR 380,000/year",
      description: "Strategic business education with focus on leadership, entrepreneurship, and global market dynamics.",
      subjects: ["Management", "Finance", "Marketing", "Operations", "Strategy", "International Business"],
      highlights: ["MBA Pathway", "Industry Mentorship", "Startup Incubation"],
      careers: ["Business Manager", "Entrepreneur", "Financial Analyst", "Marketing Director"],
      color: "green"
    },
    {
      id: 3,
      title: "Engineering",
      icon: Wrench,
      duration: "4 Years",
      students: "734",
      rating: "4.9",
      level: "Bachelor's",
      category: "Engineering",
      tuition: "NPR 520,000/year",
      description: "Comprehensive engineering programs in Civil, Mechanical, Electrical, and Software Engineering.",
      subjects: ["Thermodynamics", "Mechanics", "CAD", "Manufacturing", "Robotics", "Automation"],
      highlights: ["Lab Access 24/7", "Industry Projects", "Professional Certification"],
      careers: ["Design Engineer", "Project Manager", "R&D Specialist", "Technical Consultant"],
      color: "purple"
    },
    {
      id: 4,
      title: "Healthcare & Medicine",
      icon: Heart,
      duration: "5 Years",
      students: "456",
      rating: "4.9",
      level: "Bachelor's",
      category: "Healthcare",
      tuition: "NPR 680,000/year",
      description: "Comprehensive medical education with hands-on clinical experience and research opportunities.",
      subjects: ["Anatomy", "Physiology", "Pharmacology", "Clinical Practice", "Research", "Medical Ethics"],
      highlights: ["Hospital Rotations", "Research Labs", "International Exchange"],
      careers: ["Doctor", "Medical Researcher", "Healthcare Administrator", "Specialist"],
      color: "red"
    },
    {
      id: 5,
      title: "Arts & Design",
      icon: Palette,
      duration: "4 Years",
      students: "324",
      rating: "4.7",
      level: "Bachelor's",
      category: "Creative",
      tuition: "NPR 320,000/year",
      description: "Creative arts program fostering innovation, artistic expression, and digital media expertise.",
      subjects: ["Digital Art", "Graphic Design", "Animation", "Fine Arts", "Portfolio", "Media Production"],
      highlights: ["Studio Access", "Exhibition Opportunities", "Industry Collaborations"],
      careers: ["Graphic Designer", "Animator", "Art Director", "Creative Consultant"],
      color: "pink"
    },
    {
      id: 6,
      title: "Mathematics & Statistics",
      icon: Calculator,
      duration: "4 Years",
      students: "287",
      rating: "4.8",
      level: "Bachelor's",
      category: "Science",
      tuition: "NPR 290,000/year",
      description: "Advanced mathematical concepts with real-world applications in data science and analytics.",
      subjects: ["Calculus", "Statistics", "Linear Algebra", "Data Analysis", "Research", "Machine Learning"],
      highlights: ["Research Projects", "Industry Partnerships", "Data Science Labs"],
      careers: ["Data Analyst", "Statistician", "Research Scientist", "Quantitative Analyst"],
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: "from-blue-50/50 to-background", icon: "bg-blue-100", iconColor: "text-blue-600", accent: "text-blue-600" },
      green: { bg: "from-green-50/50 to-background", icon: "bg-green-100", iconColor: "text-green-600", accent: "text-green-600" },
      purple: { bg: "from-purple-50/50 to-background", icon: "bg-purple-100", iconColor: "text-purple-600", accent: "text-purple-600" },
      red: { bg: "from-red-50/50 to-background", icon: "bg-red-100", iconColor: "text-red-600", accent: "text-red-600" },
      pink: { bg: "from-pink-50/50 to-background", icon: "bg-pink-100", iconColor: "text-pink-600", accent: "text-pink-600" },
      orange: { bg: "from-orange-50/50 to-background", icon: "bg-orange-100", iconColor: "text-orange-600", accent: "text-orange-600" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
          {/* Subtle Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <GraduationCap className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-bold">
                85+ World-Class Programs Available
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">Academic</span>
                <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Excellence
                </span>
              </h1>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                  Discover <span className="font-bold text-green-600">Future-Ready Programs</span> designed for
                  <span className="font-bold text-blue-600"> Tomorrow&apos;s Leaders</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Each program combines cutting-edge theoretical knowledge with hands-on practical experience,
                  industry partnerships, and career-focused learning outcomes.
                </p>
              </div>
            </div>

            {/* Feature Badges with Animation */}
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              {[
                { icon: CheckCircle, text: "Industry-Aligned", color: "from-green-400 to-emerald-400" },
                { icon: Users, text: "Expert Faculty", color: "from-blue-400 to-cyan-400" },
                { icon: Award, text: "97% Success Rate", color: "from-purple-400 to-pink-400" },
                { icon: Globe, text: "Global Recognition", color: "from-orange-400 to-red-400" }
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

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-primary">85+</div>
              <div className="text-muted-foreground font-medium">Programs</div>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-primary">5,247</div>
              <div className="text-muted-foreground font-medium">Students</div>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-primary">97%</div>
              <div className="text-muted-foreground font-medium">Success Rate</div>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-primary">320+</div>
              <div className="text-muted-foreground font-medium">Faculty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Featured Programs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our most popular programs designed to meet industry demands and career aspirations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const colorClasses = getColorClasses(course.color);
              return (
                <div key={course.id} className={`group relative p-8 border border-border rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${colorClasses.bg}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${colorClasses.icon} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <course.icon className={`h-8 w-8 ${colorClasses.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span>{course.level}</span>
                      </div>
                      <div className={`font-semibold ${colorClasses.accent}`}>
                        {course.tuition}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Key Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.subjects.slice(0, 4).map((subject, index) => (
                          <span key={index} className="px-3 py-1 bg-background/80 text-muted-foreground rounded-full text-xs font-medium">
                            {subject}
                          </span>
                        ))}
                        {course.subjects.length > 4 && (
                          <span className="px-3 py-1 bg-background/80 text-muted-foreground rounded-full text-xs font-medium">
                            +{course.subjects.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Program Highlights:</h4>
                      <div className="space-y-2">
                        {course.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <Button className="w-full group-hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Our Programs?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience world-class education with features that set us apart from the rest
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Faculty",
                desc: "Learn from PhD holders and industry professionals with 15+ years experience",
                icon: Users,
                color: "blue"
              },
              {
                title: "Hands-on Learning",
                desc: "State-of-the-art labs, practical projects, and real-world case studies",
                icon: Zap,
                color: "green"
              },
              {
                title: "Industry Partnerships",
                desc: "Direct collaborations with 200+ leading companies for internships and jobs",
                icon: Globe,
                color: "purple"
              },
              {
                title: "Career Support",
                desc: "97% placement rate with dedicated career counseling and job assistance",
                icon: Target,
                color: "orange"
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 ${
                  feature.color === 'blue' ? 'bg-blue-100' :
                  feature.color === 'green' ? 'bg-green-100' :
                  feature.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                } rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join 5,000+ students who have launched successful careers through our world-class programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105">
              <GraduationCap className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              No Application Fee
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Scholarship Available
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Flexible Payment Plans
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
