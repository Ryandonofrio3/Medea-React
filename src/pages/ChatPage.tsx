import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar/sidebar';
import ChatDialogue from '../components/ChatDialogue/ChatDialogue';
import ChatInput from '../components/ChatInput/ChatInput';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotUISVG } from '@/components/icons/chatbot-svg';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

const ChatPage: React.FC = () => {
  const { user_uuid } = useParams<{ user_uuid: string }>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      name: 'New Chat',
      messages: [],
    };
    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const addMessageToCurrentChat = (text: string, sender: 'user' | 'assistant') => {
    if (currentChatId) {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === currentChatId) {
          const newMessages = [...chat.messages, { id: Date.now(), text, sender }];
          const newName = sender === 'user' && chat.messages.length === 0
            ? text.substring(0, 20)
            : chat.name;
          return {
            ...chat,
            messages: newMessages,
            name: newName,
          };
        }
        return chat;
      }));
    }
  };

  const handleSendMessage = (message: string) => {
    if (!currentChatId) {
      createNewChat();
    }
    addMessageToCurrentChat(message, 'user');
    setIsGenerating(true);
    // Mock API call
    setTimeout(() => {
      addMessageToCurrentChat(`Echo: ${message}`, 'assistant');
      setIsGenerating(false);
    }, 1000);
  };

  const onStopMessage = () => {
    setIsGenerating(false);
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const hasMessages = currentChat && currentChat.messages.length > 0;

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
      />
      <div className="flex flex-col flex-grow">
        {currentChat ? (
          <>
            {hasMessages ? (
              <ChatDialogue messages={currentChat.messages} />
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center">
                <ChatbotUISVG theme="light" scale={0.4} />
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold mt-2">Medea</h1>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center">
            <ChatbotUISVG theme="light" scale={0.4} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mt-2">Medea</h1>
            </div>
          </div>
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onStopMessage={onStopMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;