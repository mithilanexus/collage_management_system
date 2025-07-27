export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to EduTech College</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering minds, shaping futures. Join our community of learners and innovators 
              in a journey towards excellence and discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/courses" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Explore Courses
              </a>
              <a href="/about" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5,000+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Faculty</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Programs</h2>
            <p className="text-muted-foreground">Discover our most popular courses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Computer Science</h3>
              <p className="text-muted-foreground mb-4">Learn programming, algorithms, and software development</p>
              <div className="text-sm text-muted-foreground">4 Years • Bachelors</div>
            </div>
            
            <div className="p-6 border border-border rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Business Administration</h3>
              <p className="text-muted-foreground mb-4">Master business strategy, management, and entrepreneurship</p>
              <div className="text-sm text-muted-foreground">4 Years • Bachelors</div>
            </div>
            
            <div className="p-6 border border-border rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Engineering</h3>
              <p className="text-muted-foreground mb-4">Mechanical, Electrical, and Civil Engineering programs</p>
              <div className="text-sm text-muted-foreground">4 Years • Bachelors</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
