import React, { FC } from 'react';
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SidebarSearch: FC<SidebarSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      placeholder="Search chats..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4"
    />
  );
};

export default SidebarSearch;