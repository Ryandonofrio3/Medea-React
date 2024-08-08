import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SidebarSearch from './sidebar-search';

interface Chat {
  id: string;
  name: string;
}

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, currentChatId, onNewChat, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 bg-white p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Medea</h2>
      <Button onClick={onNewChat} className="mb-4 flex items-center">
        <PlusCircle className="mr-2 h-4 w-4" /> New Chat
      </Button>
      <SidebarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex-grow overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded cursor-pointer mb-2 ${
                chat.id === currentChatId ? 'bg-gray-200' : 'hover:bg-gray-300'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              {chat.name}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 italic text-lg mt-5">No Chats</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;