import React, { useState, useMemo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Chat } from '../../types/types';
import ChatListSearch from './sidebar-search';

interface ChatListProps {
  chats: Chat[];
  currentChat: Chat | null;
  onNewChat: () => void;
  onSelectChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
  isLoading: boolean;
}

const ChatList: React.FC<ChatListProps> = React.memo(({ chats, currentChat, onNewChat, onSelectChat, onDeleteChat, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = useMemo(() => 
    chats.filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [chats, searchTerm]
  );

  const handleDeleteChat = useCallback((e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    onDeleteChat(chatId);
  }, [onDeleteChat]);

  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Medea Demo</h2>
      <Button onClick={onNewChat} className="mb-4 flex items-center">
        <PlusCircle className="mr-2 h-4 w-4" /> New Chat
      </Button>
      <ChatListSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-gray-500 italic text-lg mt-5">Loading chats...</div>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <div
                className={`group p-2 rounded cursor-pointer mb-2 flex items-center justify-between ${
                  chat.id === currentChat?.id ? 'bg-gray-200' : 'hover:bg-gray-300'
                }`}
                onClick={() => onSelectChat(chat)}
              >
                <span className="truncate flex-grow">{chat.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-red-400 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {index < filteredChats.length - 1 && <hr className="my-2 border-gray-300" />}
            </React.Fragment>
          ))
        ) : (
          <div className="text-center text-gray-500 italic text-lg mt-5">No Chats</div>
        )}
      </div>
    </div>
  );
});

export default ChatList;