import React, { useState, useRef, useEffect } from 'react';
import { TextareaAutosize } from "@/components/ui/textarea-autosizing";
import { IconSend, IconPlayerStopFilled } from "@tabler/icons-react";
import { CommandBar } from './CommandBar';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
  onStopMessage: () => void;
  isSending: boolean;
  onCommand: (command: string) => void;
  followUpQuestions: string[];
}

const COMMANDS = ['/patients', '/clear', '/load', '/help'];

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isGenerating,
  onStopMessage,
  isSending,
  onCommand,
  followUpQuestions,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, []);

  const handleSendMessage = (message: string = userInput) => {
    if (message.trim() && !isSending) {
      if (message.startsWith('/')) {
        onCommand(message.trim());
      } else {
        onSendMessage(message);
      }
      setUserInput('');
      setShowCommands(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isTyping && event.key === "Enter" && !event.shiftKey && !isSending) {
      event.preventDefault();
      handleSendMessage();
    } else if (event.key === '/') {
      setShowCommands(true);
    }
  };

  const handleCommandSelect = (command: string) => {
    setUserInput(command + ' ');
    setShowCommands(false);
    chatInputRef.current?.focus();
  };

  return (
    <div className="mt-3">
      {followUpQuestions.length > 0 && (
        <div className="mb-2 flex flex-wrap">
          {followUpQuestions.map((question, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 hover:bg-blue-200 transition-colors"
              onClick={() => handleSendMessage(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
      <div className="relative flex min-h-[60px] w-full items-center justify-center rounded-xl border-2 border-input">
        {showCommands && (
          <CommandBar
            commands={COMMANDS}
            filter={userInput}
            onSelect={handleCommandSelect}
          />
        )}
        <TextareaAutosize
          textareaRef={chatInputRef}
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Ask anything. Or Type / for commands "
          onValueChange={(value) => {
            setUserInput(value);
            setShowCommands(value.startsWith('/'));
          }}
          value={userInput}
          minRows={1}
          maxRows={18}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
        />
        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
          {isGenerating ? (
            <IconPlayerStopFilled
              className="hover:bg-background animate-pulse rounded bg-transparent p-1"
              onClick={onStopMessage}
              size={30}
            />
          ) : (
            <IconSend
              className={`bg-primary text-secondary rounded p-1 ${(!userInput || isSending) && "cursor-not-allowed opacity-50"}`}
              onClick={() => handleSendMessage()}
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;