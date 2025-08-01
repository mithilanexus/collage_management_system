import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  BookOpen,
  Calendar,
  Globe,
  Lightbulb,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
  Building,
  GraduationCap,
  Zap
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          {/* Subtle Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-bold">
                Established 1995 • 29 Years of Excellence
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">About</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  EduTech College
                </span>
              </h1>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                  Pioneering <span className="font-bold text-blue-600">Educational Excellence</span> for
                  <span className="font-bold text-purple-600"> Three Decades</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Transforming 50,000+ lives through world-class education, cutting-edge research,
                  and unwavering commitment to shaping tomorrow&apos;s leaders and innovators.
                </p>
              </div>
            </div>

            {/* Accreditation Badges with Animation */}
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              {[
                { icon: CheckCircle, text: "UGC Approved", color: "from-green-400 to-emerald-400" },
                { icon: Award, text: "ISO 9001:2015", color: "from-blue-400 to-cyan-400" },
                { icon: Globe, text: "AACSB Member", color: "from-purple-400 to-pink-400" },
                { icon: Star, text: "#1 in Nepal", color: "from-yellow-400 to-orange-400" }
              ].map((badge, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                    <div className={`p-2 bg-gradient-to-r ${badge.color} rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                      <badge.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">{badge.text}</span>
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
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

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Founded in 1995 with a vision to democratize quality education in Nepal, EduTech College
                  began as a small institution with just 50 students and 5 faculty members. Today, we stand
                  as one of Nepal's premier educational institutions.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our journey has been marked by continuous innovation, academic excellence, and an unwavering
                  commitment to student success. We've evolved from a local college to a nationally recognized
                  institution with international partnerships and accreditations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-1">50,000+</div>
                  <div className="text-sm text-muted-foreground">Alumni Worldwide</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-1">29</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building className="w-24 h-24 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold">Modern Campus</h3>
                  <p className="text-muted-foreground">State-of-the-art facilities across 25 acres</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Foundation</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built on strong principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide transformative education that empowers students to become innovative leaders,
                critical thinkers, and responsible global citizens who drive positive change in society.
              </p>
            </div>

            <div className="group text-center p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a globally recognized institution that transforms lives through excellence in education,
                cutting-edge research, and meaningful community engagement that shapes a better tomorrow.
              </p>
            </div>

            <div className="group text-center p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrity, Excellence, Innovation, Diversity, Sustainability, and Collaboration
                form the cornerstone of our educational philosophy and institutional culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Sets Us Apart</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl hover:bg-muted/30 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                Cutting-edge teaching methods and technology integration
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:bg-muted/30 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground text-sm">
                Rigorous academic standards and continuous improvement
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:bg-muted/30 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Global Perspective</h3>
              <p className="text-muted-foreground text-sm">
                International partnerships and diverse learning environment
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:bg-muted/30 transition-colors">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Impact</h3>
              <p className="text-muted-foreground text-sm">
                Creating positive change in communities and industries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Message from the Principal</h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p className="relative pl-6 border-l-4 border-primary">
                    "Welcome to EduTech College, where dreams take flight and futures are forged.
                    For nearly three decades, we have been committed to providing an educational
                    experience that transcends traditional boundaries and prepares students for global success."
                  </p>
                  <p>
                    "Our world-class faculty, cutting-edge facilities, and industry-aligned curriculum
                    ensure that every student receives not just education, but transformation. We believe
                    in nurturing not just academic excellence, but also character, leadership, and social responsibility."
                  </p>
                  <p>
                    "As we look towards the future, we remain committed to innovation, sustainability,
                    and creating leaders who will shape tomorrow's world. Join us in this extraordinary
                    journey of discovery, growth, and meaningful impact."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-background rounded-2xl border border-border">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg">Dr. Rajesh Kumar Sharma</p>
                  <p className="text-muted-foreground">Principal & CEO</p>
                  <p className="text-sm text-muted-foreground">PhD in Education, Harvard University</p>
                </div>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex flex-col justify-end">
                  <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">29 Years of Leadership</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leading educational transformation and student success across Nepal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Achievements</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50/50 to-background border border-border rounded-3xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence in Education Award</h3>
              <p className="text-muted-foreground mb-4">
                Recognized by the Ministry of Education for outstanding contribution to higher education in Nepal
              </p>
              <div className="text-sm text-blue-600 font-medium">2023</div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50/50 to-background border border-border rounded-3xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Top 10 Colleges in Nepal</h3>
              <p className="text-muted-foreground mb-4">
                Ranked among the top 10 colleges in Nepal for academic excellence and student satisfaction
              </p>
              <div className="text-sm text-green-600 font-medium">2024</div>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50/50 to-background border border-border rounded-3xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">International Accreditation</h3>
              <p className="text-muted-foreground mb-4">
                ISO 9001:2015 certified and AACSB member institution with global recognition
              </p>
              <div className="text-sm text-purple-600 font-medium">2022</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join Our Legacy?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Become part of a community that has been shaping leaders for nearly three decades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
              <Users className="w-5 h-5" />
              Visit Campus
            </a>
            <a href="/courses" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
              <BookOpen className="w-5 h-5" />
              Explore Programs
            </a>
          </div>
        </div>
      </section> 

    </div>
  );
}
