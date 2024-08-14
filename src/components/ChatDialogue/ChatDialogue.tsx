import React, { useEffect, useRef } from 'react';
import { Message } from '../../types/types';
import { parseXMLContent } from '../../utils/xmlParser';

interface ChatDialogueProps {
  messages: Message[];
  isAiTyping: boolean;
  onFollowUpClick: (question: string) => void;
}

const ChatDialogue: React.FC<ChatDialogueProps> = ({ messages, isAiTyping, onFollowUpClick }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const renderContent = (content: string) => {
    const parsedContent = parseXMLContent(content);
    return (
      <>
        {parsedContent.text.split('\n').map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
        {parsedContent.thinking && (
          <p className="italic text-gray-500 mt-2">{parsedContent.thinking}</p>
        )}
        {parsedContent.followUpQuestions.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Follow-up questions:</p>
            {parsedContent.followUpQuestions.map((question, index) => (
              <button
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 hover:bg-blue-200 transition-colors"
                onClick={() => onFollowUpClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      {messages.map(message => (
        <div
          key={message.id}
          className={`p-4 rounded-xl ${
            message.sender === 'user' ? 'bg-blue-100 text-blue-900 ml-auto' : 'bg-gray-100 text-gray-900'
          } max-w-[70%]`}
        >
          {message.sender === 'user' ? message.content : renderContent(message.content)}
        </div>
      ))}
      {isAiTyping && (
        <div className="bg-gray-100 p-4 rounded-xl max-w-[70%] animate-pulse">
          <span className="text-gray-700">AI is typing</span>
          <span className="dots">...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatDialogue;