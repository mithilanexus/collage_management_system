import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle, Users, BookOpen } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing and using EduTech College services, you agree to be bound by these Terms of Service",
        "These terms apply to all students, faculty, staff, and visitors using our services",
        "If you do not agree to these terms, you may not use our services",
        "We reserve the right to modify these terms at any time with notice"
      ]
    },
    {
      title: "Academic Integrity",
      icon: BookOpen,
      content: [
        "Students must maintain the highest standards of academic honesty",
        "Plagiarism, cheating, and academic dishonesty are strictly prohibited",
        "All work submitted must be original unless properly cited",
        "Violations may result in disciplinary action including suspension or expulsion"
      ]
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: [
        "Maintain the confidentiality of your account credentials",
        "Use services only for legitimate educational purposes",
        "Respect the rights and privacy of other users",
        "Report any security vulnerabilities or inappropriate behavior",
        "Comply with all applicable laws and regulations"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: [
        "Harassment, discrimination, or threatening behavior",
        "Unauthorized access to systems or data",
        "Distribution of malicious software or spam",
        "Violation of intellectual property rights",
        "Any illegal or unethical activities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: December 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of EduTech College's educational services, 
              website, and digital platforms. By enrolling as a student, working as faculty or staff, 
              or using our services in any capacity, you agree to comply with these terms and conditions.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Financial Terms */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              Financial Obligations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Tuition and Fees</h4>
                <p className="text-muted-foreground text-sm">
                  Students are responsible for paying all tuition, fees, and other charges by the specified deadlines. 
                  Failure to pay may result in registration holds, transcript holds, or dismissal from the institution.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Refund Policy</h4>
                <p className="text-muted-foreground text-sm">
                  Refunds are governed by our published refund policy and may vary based on the timing of withdrawal 
                  and the type of program. Please refer to the student handbook for detailed refund schedules.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Financial Aid</h4>
                <p className="text-muted-foreground text-sm">
                  Financial aid recipients must maintain satisfactory academic progress and comply with all 
                  federal and institutional requirements to continue receiving aid.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              Technology and Digital Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Acceptable Use</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Use technology resources for educational and research purposes only
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Respect network bandwidth and storage limitations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Protect your account credentials and report security incidents
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prohibited Uses</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    Accessing or attempting to access unauthorized systems or data
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    Installing or distributing malicious software
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    Using resources for commercial purposes without authorization
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              EduTech College provides educational services "as is" and makes no warranties regarding:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                Uninterrupted access to services or facilities
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                Specific educational or career outcomes
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                Third-party services or content
              </li>
            </ul>
            <p className="text-muted-foreground text-sm">
              Our liability is limited to the extent permitted by law, and we are not responsible for 
              indirect, incidental, or consequential damages arising from your use of our services.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Governing Law and Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Applicable Law</h4>
                <p className="text-muted-foreground text-sm">
                  These Terms are governed by the laws of the state where EduTech College is located, 
                  without regard to conflict of law principles.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                <p className="text-muted-foreground text-sm">
                  Any disputes arising from these Terms will be resolved through binding arbitration 
                  in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Questions About These Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms of Service, please contact:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Legal Affairs Office</strong><br />
                EduTech College<br />
                123 Education Street<br />
                College City, ST 12345<br />
                Email: legal@edutech.edu<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
