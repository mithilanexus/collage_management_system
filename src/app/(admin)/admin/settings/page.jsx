"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings,
  Save,
  Upload,
  School,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  Bell,
  Shield,
  Database,
  Palette
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // College Information
    collegeName: "Shree Saraswati Multiple Campus",
    collegeCode: "SSMC",
    establishedYear: "1995",
    affiliation: "Tribhuvan University",
    address: "Kathmandu-10, Bagbazar",
    district: "Kathmandu",
    province: "Bagmati Province",
    phone: "01-4567890",
    email: "info@ssmc.edu.np",
    website: "www.ssmc.edu.np",
    
    // Academic Settings
    academicYear: "2023-2024",
    currentSemester: "First Semester",
    semesterStartDate: "2024-01-15",
    semesterEndDate: "2024-05-15",
    examStartDate: "2024-05-20",
    resultPublishDate: "2024-06-15",
    
    // System Settings
    defaultLanguage: "English",
    timeZone: "Asia/Kathmandu",
    dateFormat: "YYYY-MM-DD",
    currency: "NPR",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    
    // Security Settings
    passwordMinLength: 8,
    sessionTimeout: 30,
    twoFactorAuth: false,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: "Daily",
    backupRetention: 30,
    
    // Theme Settings
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    darkMode: false
  });

  const [activeTab, setActiveTab] = useState("college");

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleLogoUpload = () => {
    alert("Logo upload functionality would be implemented here");
  };

  const tabs = [
    { id: "college", label: "College Info", icon: School },
    { id: "academic", label: "Academic", icon: Calendar },
    { id: "system", label: "System", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "backup", label: "Backup", icon: Database },
    { id: "theme", label: "Theme", icon: Palette }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure college and system settings</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                        activeTab === tab.id ? "bg-primary/10 text-primary border-r-2 border-primary" : ""
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* College Information */}
          {activeTab === "college" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5" />
                  College Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collegeName">College Name *</Label>
                    <Input
                      id="collegeName"
                      value={settings.collegeName}
                      onChange={(e) => handleInputChange("collegeName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="collegeCode">College Code *</Label>
                    <Input
                      id="collegeCode"
                      value={settings.collegeCode}
                      onChange={(e) => handleInputChange("collegeCode", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      value={settings.establishedYear}
                      onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="affiliation">Affiliation</Label>
                    <Input
                      id="affiliation"
                      value={settings.affiliation}
                      onChange={(e) => handleInputChange("affiliation", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      value={settings.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Input
                      id="province"
                      value={settings.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={settings.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>College Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <School className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" onClick={handleLogoUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Academic Settings */}
          {activeTab === "academic" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Academic Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="academicYear">Academic Year *</Label>
                    <Input
                      id="academicYear"
                      value={settings.academicYear}
                      onChange={(e) => handleInputChange("academicYear", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentSemester">Current Semester *</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.currentSemester}
                      onChange={(e) => handleInputChange("currentSemester", e.target.value)}
                    >
                      <option value="First Semester">First Semester</option>
                      <option value="Second Semester">Second Semester</option>
                      <option value="Third Semester">Third Semester</option>
                      <option value="Fourth Semester">Fourth Semester</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semesterStartDate">Semester Start Date</Label>
                    <Input
                      id="semesterStartDate"
                      type="date"
                      value={settings.semesterStartDate}
                      onChange={(e) => handleInputChange("semesterStartDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="semesterEndDate">Semester End Date</Label>
                    <Input
                      id="semesterEndDate"
                      type="date"
                      value={settings.semesterEndDate}
                      onChange={(e) => handleInputChange("semesterEndDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="examStartDate">Exam Start Date</Label>
                    <Input
                      id="examStartDate"
                      type="date"
                      value={settings.examStartDate}
                      onChange={(e) => handleInputChange("examStartDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resultPublishDate">Result Publish Date</Label>
                    <Input
                      id="resultPublishDate"
                      type="date"
                      value={settings.resultPublishDate}
                      onChange={(e) => handleInputChange("resultPublishDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.defaultLanguage}
                      onChange={(e) => handleInputChange("defaultLanguage", e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Nepali">Nepali</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="timeZone">Time Zone</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.timeZone}
                      onChange={(e) => handleInputChange("timeZone", e.target.value)}
                    >
                      <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.dateFormat}
                      onChange={(e) => handleInputChange("dateFormat", e.target.value)}
                    >
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.currency}
                      onChange={(e) => handleInputChange("currency", e.target.value)}
                    >
                      <option value="NPR">NPR (Nepali Rupee)</option>
                      <option value="USD">USD (US Dollar)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleInputChange("pushNotifications", e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleInputChange("passwordMinLength", parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Enable two-factor authentication for admin accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleInputChange("twoFactorAuth", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Enable automatic database backups</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleInputChange("autoBackup", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md"
                      value={settings.backupFrequency}
                      onChange={(e) => handleInputChange("backupFrequency", e.target.value)}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                    <Input
                      id="backupRetention"
                      type="number"
                      value={settings.backupRetention}
                      onChange={(e) => handleInputChange("backupRetention", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Theme Settings */}
          {activeTab === "theme" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleInputChange("darkMode", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
