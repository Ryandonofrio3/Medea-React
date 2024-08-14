import React, { useState } from 'react';
import { Chat, Message } from '../../types/types';
import ChatInput from '../ChatInput/ChatInput';
import ChatDialogue from './ChatDialogue';
import { ChatbotUISVG } from '../icons/chatbot-svg';

interface ChatWindowProps {
  chat: Chat | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
  onStopMessage: () => void;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  onCommand: (command: string) => void;
  isSidebarCollapsed?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  messages,
  onSendMessage,
  isGenerating,
  onStopMessage,
  isLoading,
  isSending,
  error,
  onCommand,
  isSidebarCollapsed = false
}) => {
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

  const handleFollowUpClick = (question: string) => {
    onSendMessage(question);
  };

  const handleSendMessage = (message: string) => {
    onSendMessage(message);
    setFollowUpQuestions([]);
  };



  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <ChatbotUISVG theme="light" scale={0.5} />
        <div className="text-center text-3xl font-bold">Medea</div>
        <div className="text-center">Select a chat or start a new one</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
      isSidebarCollapsed ? 'max-w-full px-4' : 'max-w-3xl mx-auto'
    } w-full`}>
      <div className="flex-grow overflow-y-auto">
        <ChatDialogue
          messages={messages}
          isAiTyping={isGenerating}
          onFollowUpClick={handleFollowUpClick}
        />
        {isLoading && <div className="p-4 text-center">Loading...</div>}
        {error && <div className="p-4 text-red-500 text-center">{error}</div>}
      </div>
      <div className="flex-shrink-0">
        <ChatInput 
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onStopMessage={onStopMessage}
          isSending={isSending}
          onCommand={onCommand}
          followUpQuestions={followUpQuestions}
        />
      </div>
    </div>
  );
};

export default ChatWindow;