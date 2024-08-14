import React from 'react';

interface CommandBarProps {
  commands: string[];
  filter: string;
  onSelect: (command: string) => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({ commands, filter, onSelect }) => {
  const filteredCommands = commands.filter(cmd => cmd.startsWith(filter));

  return (
    <div className="absolute bottom-full left-0 w-full bg-white border border-gray-300 rounded-t-md shadow-lg">
      {filteredCommands.map((cmd) => (
        <div
          key={cmd}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(cmd)}
        >
          {cmd}
        </div>
      ))}
    </div>
  );
};