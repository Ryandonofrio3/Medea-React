import React, { useState, useRef, useEffect } from 'react';
import { TextareaAutosize } from "@/components/ui/textarea-autosizing";
import { IconSend, IconPlayerStopFilled } from "@tabler/icons-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
  onStopMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isGenerating, onStopMessage }) => {
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isTyping && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8">
      <div className="relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2 border-input">
        <TextareaAutosize
          textareaRef={chatInputRef}
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-3 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Ask anything. Type @ / # !"
          onValueChange={setUserInput}
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
              className={`bg-primary text-secondary rounded p-1 ${!userInput && "cursor-not-allowed opacity-50"}`}
              onClick={handleSendMessage}
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;