import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChatbotUISVG } from '../icons/chatbot-svg';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
        <ChatbotUISVG theme="dark"  scale={.3}/>
      <h1 className="text-4xl font-bold mb-4 mt-2">Welcome to Medea</h1>
      <Button className="bg-slate-800" onClick={() => navigate('/auth')}>Get Started</Button>
    </div>
  );
};

export default WelcomePage;