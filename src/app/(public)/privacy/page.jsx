import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Mail, Phone } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal identification information (name, email, phone number, address)",
        "Academic records and educational history",
        "Financial information for tuition and fee processing",
        "Technical data including IP addresses and browser information",
        "Communication records and correspondence"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide educational services and support",
        "Process applications and enrollment",
        "Communicate important academic information",
        "Improve our services and user experience",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell personal information to third parties",
        "Information may be shared with educational partners",
        "Required disclosures to government agencies when legally mandated",
        "Service providers who assist in our operations under strict confidentiality",
        "Emergency situations where disclosure is necessary for safety"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers with regular security updates",
        "Access controls and authentication measures",
        "Regular security audits and assessments",
        "Staff training on data protection practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: December 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-muted-foreground leading-relaxed">
              EduTech College ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard 
              your information when you use our services, visit our website, or interact with our institution.
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

        {/* Your Rights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Access and Correction</h4>
                <p className="text-muted-foreground text-sm">
                  You have the right to access and correct your personal information. 
                  Contact our registrar's office to review or update your records.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Data Portability</h4>
                <p className="text-muted-foreground text-sm">
                  You can request a copy of your academic records and personal information 
                  in a commonly used format.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Communication Preferences</h4>
                <p className="text-muted-foreground text-sm">
                  You can opt out of non-essential communications while still receiving 
                  important academic and administrative notices.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Account Deletion</h4>
                <p className="text-muted-foreground text-sm">
                  Upon graduation or withdrawal, you may request deletion of certain 
                  personal information, subject to legal retention requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to enhance your experience on our website and services:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Essential Cookies:</span>
                  <span className="text-muted-foreground ml-2">Required for basic website functionality</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Analytics Cookies:</span>
                  <span className="text-muted-foreground ml-2">Help us understand how you use our services</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Preference Cookies:</span>
                  <span className="text-muted-foreground ml-2">Remember your settings and preferences</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">privacy@edutech.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Privacy Officer:</strong> EduTech College, 123 Education Street, College City, ST 12345
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on our website and updating the "Last updated" date. Your continued 
              use of our services after such modifications constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
