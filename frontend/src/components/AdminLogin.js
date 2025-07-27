import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Shield, Eye, EyeOff, Gamepad2 } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple password check - you can change this password
    const adminPassword = 'kgg2024admin'; // Change this to your desired password

    if (password === adminPassword) {
      // Store login state in sessionStorage (expires when browser closes)
      sessionStorage.setItem('kgg_admin_logged_in', 'true');
      onLogin(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gaming-lighter flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gaming-card border-gaming-border shadow-gaming-lg">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 p-4 bg-gaming-accent-light rounded-full w-fit">
            <Shield className="w-8 h-8 text-gaming-accent" />
          </div>
          <CardTitle className="text-2xl font-bold text-gaming-text">Admin Login</CardTitle>
          <p className="text-gaming-text-secondary">Enter password to access booking management</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-gaming-text-secondary font-medium">
                Admin Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gaming-light border-gaming-border text-gaming-text focus:border-gaming-accent pr-12"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaming-text-muted hover:text-gaming-accent"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gaming-accent hover:bg-gaming-accent-hover text-gaming-light font-semibold py-3 shadow-gaming-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Access Admin Panel
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gaming-accent-light rounded-lg">
            <h4 className="text-sm font-semibold text-gaming-text mb-2">Security Notes:</h4>
            <ul className="text-xs text-gaming-text-secondary space-y-1">
              <li>• Session expires when browser is closed</li>
              <li>• Only authorized personnel should access</li>
              <li>• Contact developer to change password</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;