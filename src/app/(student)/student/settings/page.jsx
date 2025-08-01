"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      grades: true,
      assignments: true,
      announcements: true,
      events: false
    },
    privacy: {
      profileVisibility: "students",
      showEmail: false,
      showPhone: false
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "Asia/Kathmandu"
    },
    security: {
      twoFactor: false,
      loginAlerts: true
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('studentSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    setSettings(newSettings);
    localStorage.setItem('studentSettings', JSON.stringify(newSettings));
  };

  const handleSave = () => {
    localStorage.setItem('studentSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwords.new.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
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
                  checked={settings.notifications.sms}
                  onChange={(e) => updateSetting('notifications', 'sms', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => updateSetting('notifications', 'push', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Notification Types</h4>
              <div className="space-y-2">
                {['grades', 'assignments', 'announcements', 'events'].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <Label className="capitalize">{type}</Label>
                    <input
                      type="checkbox"
                      checked={settings.notifications[type]}
                      onChange={(e) => updateSetting('notifications', type, e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Profile Visibility</Label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                className="w-full mt-1 p-2 border border-border rounded-md"
              >
                <option value="public">Public</option>
                <option value="students">Students Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Email Address</Label>
                <p className="text-sm text-muted-foreground">Make email visible to others</p>
              </div>
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => updateSetting('privacy', 'showEmail', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">Make phone visible to others</p>
              </div>
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => updateSetting('privacy', 'showPhone', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Theme</Label>
              <select
                value={settings.preferences.theme}
                onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                className="w-full mt-1 p-2 border border-border rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <Label>Language</Label>
              <select
                value={settings.preferences.language}
                onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                className="w-full mt-1 p-2 border border-border rounded-md"
              >
                <option value="en">English</option>
                <option value="ne">नेपाली</option>
              </select>
            </div>
            
            <div>
              <Label>Timezone</Label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                className="w-full mt-1 p-2 border border-border rounded-md"
              >
                <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) => updateSetting('security', 'twoFactor', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.loginAlerts}
                onChange={(e) => updateSetting('security', 'loginAlerts', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Change Password</h4>
              <div className="space-y-3">
                <div>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handlePasswordChange} className="w-full">
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Contact Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Preferred Contact Method</Label>
              <select className="w-full mt-1 p-2 border border-border rounded-md">
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
            <div>
              <Label>Emergency Contact Updates</Label>
              <select className="w-full mt-1 p-2 border border-border rounded-md">
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
