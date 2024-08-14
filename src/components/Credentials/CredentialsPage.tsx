import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { StepContainer } from './step-container';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CredentialsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('Form submitted with email:', email);

    try {
      console.log('Sending authentication request...');
      const response = await fetch('YOUR_AUTH_LAMBDA_ENDPOINT', {
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
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <StepContainer
        stepDescription="Please enter your email to sign in or sign up."
        stepTitle="Authentication"
        onShouldProceed={handleSubmit}
        showBackButton={false}
      >
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            console.log('Email input changed:', e.target.value);
            setEmail(e.target.value);
          }}
          className="mb-4"
        />
      </StepContainer>
    </div>
  );
};

export default CredentialsPage;