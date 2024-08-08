import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { StepContainer } from './step-container';
import { v4 as uuidv4 } from 'uuid';
import { ProfileStep } from './profile-step';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CredentialsPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [username] = useState(uuidv4());
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const { setAwsCredentials } = useAuth();
  const navigate = useNavigate();

  const handleShouldProceed = (shouldProceed: boolean) => {
    if (shouldProceed) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        handleSubmit();
      }
    } else {
      setCurrentStep(1);
    }
  };

  const handleSubmit = () => {
    setAwsCredentials({ accessKeyId, secretAccessKey });
    navigate('/chat');
  };

  const renderStep = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return (
          <StepContainer
            stepDescription="Please confirm your username."
            stepNum={1}
            stepTitle="Username Confirmation"
            onShouldProceed={handleShouldProceed}
            showBackButton={false}
          >
            <ProfileStep username={username} />
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer
            stepDescription="Enter your AWS credentials."
            stepNum={2}
            stepTitle="AWS Credentials"
            onShouldProceed={handleShouldProceed}
            showBackButton={true}
          >
            <Label htmlFor="accessKeyId">Access Key ID</Label>
            <Input
              id="accessKeyId"
              type="text"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              className="mb-4"
            />
            <Label htmlFor="secretAccessKey">Secret Access Key</Label>
            <Input
              id="secretAccessKey"
              type="password"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              className="mb-4"
            />
          </StepContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {renderStep(currentStep)}
    </div>
  );
};

export default CredentialsPage;