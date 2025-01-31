import React, { useState } from 'react';
import { Card, CardContent } from './components/shared/card';
import { Button } from './components/shared/button';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import EmailValidation from './components/auth/EmailValidation';

const App = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'verify'>('login');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          {currentView === 'login' ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <LoginForm />
              <Button
                onClick={() => setCurrentView('register')}
                variant="outline"
                className="w-full"
              >
                Need an account? Register
              </Button>
            </div>
          ) : currentView === 'register' ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Register</h1>
              <RegisterForm />
              <Button
                onClick={() => setCurrentView('login')}
                variant="outline"
                className="w-full"
              >
                Already have an account? Login
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Verify Email</h1>
              <EmailValidation />
              <Button
                onClick={() => setCurrentView('login')}
                variant="outline"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;