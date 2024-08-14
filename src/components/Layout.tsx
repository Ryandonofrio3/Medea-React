import React, { useState, useEffect, ReactElement } from 'react';
import ChatList from './Sidebar/sidebar';
import { Chat } from '../types/types';

interface LayoutProps {
  children: ReactElement;
  chats: Chat[];
  currentChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
  isLoading: boolean;
  onDeleteChat: (chatId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  chats,
  currentChat,
  onSelectChat,
  onNewChat,
  isLoading,
  onDeleteChat
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'S') {
        event.preventDefault();
        setIsSidebarCollapsed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? '-ml-64' : 'ml-0'
        }`}
      >
        <ChatList
          chats={chats}
          currentChat={currentChat}
          onSelectChat={onSelectChat}
          onNewChat={onNewChat}
          isLoading={isLoading}
          onDeleteChat={onDeleteChat}
        />
      </div>
      <main className="flex-1 flex flex-col justify-end h-screen">
        {!isSidebarCollapsed && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 text-sm text-gray-500">
            <span>Shift</span>
            <span>S to collapse sidebar</span>
          </div>
        )}
        {React.cloneElement(children, { isSidebarCollapsed })}
      </main>
    </div>
  );
};

export default Layout;