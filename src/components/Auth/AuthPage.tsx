import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/chat');
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorMessage('Failed to sign in. Please check your credentials.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/credentials');
    } catch (error) {
      console.error('Sign up error:', error);
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  const handleResetPassword = () => {
    // Implement password reset functionality
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center items-center min-h-screen bg-white text-white">
      <div className="w-full max-w-md">
        <form className="animate-in flex w-full flex-col justify-center gap-2 text-foreground">
          <h1 className="text-4xl font-bold mb-4 text-center">Medea</h1>

          <Label className="text-md mt-4" htmlFor="email">
            Email
          </Label>
          <Input
            className="mb-3 rounded-md border bg-inherit px-4 py-2"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white"
            onClick={handleSignIn}
          >
            Login
          </Button>

          <Button
            className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>

          <div className="text-muted-foreground mt-1 flex justify-center text-sm">
            <span className="mr-1">Forgot your password?</span>
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-primary ml-1 underline hover:opacity-80"
            >
              Reset
            </button>
          </div>

          {errorMessage && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;