import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Target,
  TrendingUp,
  Phone,
  Clock,
  Zap,
  CreditCard
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-background/80 to-background/90"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                #1 Ranked College in Nepal
              </span>
            </div>

            {/* Main Title with 3D Effect */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                  EduTech
                </span>
                <span className="block bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
                  College
                </span>
              </h1>

              <div className="relative">
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                  Where <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Innovation</span> meets
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Excellence</span>
                </p>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
                  Join 5,000+ visionary students in Nepal&apos;s most advanced educational ecosystem.
                  Transform your potential into extraordinary achievements.
                </p>
              </div>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/courses" className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </a>

              <a href="/about" className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-foreground rounded-2xl font-bold text-lg shadow-2xl hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <span>Discover More</span>
                </div>
              </a>
            </div>

            {/* Trust Indicators with Animation */}
            <div className="flex flex-wrap justify-center gap-8 pt-12">
              {[
                { icon: CheckCircle, text: "UGC Approved", color: "text-green-400" },
                { icon: Award, text: "ISO Certified", color: "text-blue-400" },
                { icon: Globe, text: "Global Recognition", color: "text-purple-400" },
                { icon: TrendingUp, text: "97% Success Rate", color: "text-orange-400" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Impact Section - Hero Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Hero-style Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
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
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-bold">
                Impact & Excellence
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">
                  Our Impact
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  in Numbers
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Three decades of transforming lives through world-class education and innovation
              </p>
            </div>

            {/* Stats Cards with Better Contrast */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
              {[
                {
                  icon: Users,
                  number: "5,247",
                  label: "Active Students",
                  sublabel: "+12% this year"
                },
                {
                  icon: BookOpen,
                  number: "85+",
                  label: "Programs",
                  sublabel: "All Levels"
                },
                {
                  icon: GraduationCap,
                  number: "320+",
                  label: "Expert Faculty",
                  sublabel: "PhD & Industry"
                },
                {
                  icon: Award,
                  number: "97%",
                  label: "Success Rate",
                  sublabel: "Employment"
                }
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center gap-4 p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-md">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-3xl font-black text-gray-900">
                        {stat.number}
                      </div>
                      <div className="text-gray-900 font-semibold text-sm">{stat.label}</div>
                      <div className="text-gray-500 text-xs">{stat.sublabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs - Hero Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Hero-style Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50"></div>
          {/* Subtle Floating Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-purple-200/50 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 font-bold">
                World-Class Programs
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">
                  Featured
                </span>
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Programs
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover cutting-edge programs designed by industry experts to prepare you for tomorrow&apos;s challenges
              </p>
            </div>

            {/* Program Cards with Hero Style */}
            <div className="grid lg:grid-cols-3 gap-8 pt-12">
              {[
                {
                  icon: Globe,
                  title: "Computer Science & AI",
                  description: "Master next-generation technologies including Machine Learning, Blockchain, and Quantum Computing",
                  duration: "4 Years",
                  rating: "4.9",
                  students: "1,247",
                  tags: ["AI/ML", "Blockchain", "Quantum", "Cloud"]
                },
                {
                  icon: TrendingUp,
                  title: "Business Innovation",
                  description: "Lead the future of business with entrepreneurship, fintech, and sustainable business models",
                  duration: "4 Years",
                  rating: "4.8",
                  students: "892",
                  tags: ["Fintech", "Startup", "Strategy", "Leadership"]
                },
                {
                  icon: Zap,
                  title: "Future Engineering",
                  description: "Pioneer sustainable engineering solutions with robotics, renewable energy, and smart systems",
                  duration: "4 Years",
                  rating: "4.9",
                  students: "734",
                  tags: ["Robotics", "IoT", "Renewable", "Smart Tech"]
                }
              ].map((program, index) => (
                <div key={index} className="group relative p-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <program.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-6 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">{program.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-gray-900">{program.rating}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {program.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a href="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300">
                      <span>Explore Program</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Programs CTA */}
            <div className="text-center pt-12">
              <a href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                <span>View All Programs</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>


 
      {/* Why Choose Us - Hero Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Hero-style Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-50"></div>
          {/* Subtle Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-full text-sm font-medium shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-bold">
                Excellence Redefined
              </span>
            </div>

            {/* Main Title with Better Contrast */}
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black">
                <span className="block text-gray-900 drop-shadow-sm">
                  Why Choose
                </span>
                <span className="block bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                  EduTech College?
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience transformative education that goes beyond traditional learning
              </p>
            </div>

            {/* Feature Cards with Hero Style */}
            <div className="grid lg:grid-cols-3 gap-8 pt-12">
              {[
                {
                  icon: Target,
                  title: "Future-Ready Curriculum",
                  description: "Industry-designed programs with AI, blockchain, and emerging tech integration. Updated quarterly with market trends.",
                  features: ["AI-Powered Learning", "Industry Partnerships", "Real Projects", "Global Standards"]
                },
                {
                  icon: Users,
                  title: "World-Class Faculty",
                  description: "Learn from PhD holders, industry veterans, and international experts with 15+ years of experience.",
                  features: ["PhD Professors", "Industry Veterans", "Research Leaders", "Global Network"]
                },
                {
                  icon: Award,
                  title: "Career Excellence",
                  description: "97% placement rate with top companies. Comprehensive support from internships to executive roles.",
                  features: ["97% Placement", "Top Companies", "Career Coaching", "Alumni Network"]
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-3">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Final CTA */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main CTA */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Transform Your Future?
              </h2>

              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Join 50,000+ successful graduates who started their extraordinary journey at EduTech College
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Start Your Journey</span>
                </div>
              </a>

              <a href="/courses" className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Programs</span>
                </div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {[
                { text: "No Application Fee", icon: CheckCircle },
                { text: "Scholarship Available", icon: Award },
                { text: "Flexible Payment", icon: CreditCard },
                { text: "24/7 Support", icon: Phone }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-blue-700 rounded-lg">
                  <item.icon className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-100 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
