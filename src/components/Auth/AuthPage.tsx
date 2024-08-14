import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);

    try {
      console.log('Simulating authentication request...');
      
      // Simulated response for the test user
      const simulatedResponse = {
        userId: '550e8400-e29b-41d4-a716-446655440000',
        email: 'testuser@example.com'
      };

      console.log('Authentication successful, received data:', simulatedResponse);

      signIn(simulatedResponse.userId, simulatedResponse.email);
      console.log('User signed in, navigating to /chat');
      navigate('/chat');

      // Commented out Lambda call
      /*
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Received response:', response);

      if (!response.ok) {
        console.error('Authentication failed with status:', response.status);
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      console.log('Authentication successful, received data:', data);

      signIn(data.userId, email);
      console.log('User signed in, navigating to /chat');
      navigate('/chat');
      */
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage('Failed to authenticate. Please check your email.');
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center items-center min-h-screen bg-white text-white">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="animate-in flex w-full flex-col justify-center gap-2 text-foreground">
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
            onChange={(e) => {
              console.log('Email input changed:', e.target.value);
              setEmail(e.target.value);
            }}
          />

          <Button 
            type="submit"
            className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white"
          >
            Sign In / Sign Up
          </Button>

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