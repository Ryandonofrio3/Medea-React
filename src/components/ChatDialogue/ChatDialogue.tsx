import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
}

interface ChatDialogueProps {
  messages: Message[];
}

const ChatDialogue: React.FC<ChatDialogueProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div
          key={message.id}
          className={`p-2 rounded-lg ${
            message.sender === 'user' ? 'bg-slate-200 ml-auto' : 'bg-slate-300'
          } max-w-[70%]`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatDialogue;