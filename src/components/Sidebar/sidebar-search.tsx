import { FC } from 'react';
import { Input } from "@/components/ui/input";

interface ChatListSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ChatListSearch: FC<ChatListSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      placeholder="Search chats..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 h-16"
    />
  );
};

export default ChatListSearch;