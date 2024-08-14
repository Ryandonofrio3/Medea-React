import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Chat, Message, Patient } from '../types/types';
import Layout from '../components/Layout';
import ChatWindow from '../components/ChatDialogue/ChatWindow';
import { v4 as uuidv4 } from 'uuid';
import * as patientStore from '../data/patientStore';


const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);


  const handleCommand = async (command: string) => {
    const newMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'user', content: command, createdAt: new Date().toISOString(), userId: user?.id || '' };
    setMessages(prev => [...prev, newMessage]);
    
    switch (command) {
      case '/patients':
        const patientList = await patientStore.getPatients() as Patient[];
        const patientTable = `
  | ID | First Name | Last Name |
  |----|------------|-----------|
  ${patientList.map(p => `| ${p.id || 'N/A'} | ${p.firstName} | ${p.lastName} |`).join('\n')}
  `; 
        const responseMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'assistant', content: `Available patients:\n${patientTable}`, createdAt: new Date().toISOString(), userId: user?.id || '' };
        setMessages(prev => [...prev, responseMessage]);
        break;
      case '/clear':
        setMessages([]);
        break;
      case '/help':
        const helpMessage = `
  Available commands:
  /patients - List all available patients
  /load [patientId] - Load a specific patient
  /clear - Clear the chat history
  /help - Display this help message
  
  This app allows you to chat with an AI assistant about patient information. 
  Use the commands to manage patients and chat history.
        `;
        const helpResponseMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'assistant', content: helpMessage, createdAt: new Date().toISOString(), userId: user?.id || '' };
        setMessages(prev => [...prev, helpResponseMessage]);
        break;
      default:
        if (command.startsWith('/load ')) {
          const patientId = command.split(' ')[1];
          const patient = await patientStore.getPatientById(patientId);
          if (patient) {
            const loadMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'assistant', content: `Loaded patient: ${patient.firstName} ${patient.lastName}`, createdAt: new Date().toISOString(), userId: user?.id || '' };
            setMessages(prev => [...prev, loadMessage]);
          } else {
            const errorMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'assistant', content: `Patient with ID ${patientId} not found.`, createdAt: new Date().toISOString(), userId: user?.id || '' };
            setMessages(prev => [...prev, errorMessage]);
          }
        } else {
          const unknownCommandMessage: Message = { id: uuidv4(), chatId: currentChat?.id || '', sender: 'assistant', content: `Unknown command: ${command}. Type /help for available commands.`, createdAt: new Date().toISOString(), userId: user?.id || '' };
          setMessages(prev => [...prev, unknownCommandMessage]);
        }
    }
  };


  const fetchChats = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/fetchchats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      if (!response.ok) throw new Error('Failed to fetch chats');
      const data = await response.json();
      const chatsWithNames = await Promise.all(data.map(async (chat: Chat) => {
        try {
          const messagesResponse = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/fetchmessages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: chat.id, userId: user.id })
          });
          if (!messagesResponse.ok) throw new Error('Failed to fetch messages');
          const messages = await messagesResponse.json();
          const firstUserMessage = messages.find((msg: Message) => msg.sender === 'user');
          return {
            ...chat,
            name: firstUserMessage ? firstUserMessage.content.slice(0, 25) + '...' : 'New Chat'
          };
        } catch (error) {
          console.error('Error fetching messages for chat:', chat.id, error);
          return { ...chat, name: 'New Chat' };
        }
      }));
      setChats(chatsWithNames);
    } catch (error) {
      setError('Failed to load chats. Please try again.');
      console.error('Error fetching chats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchChats();
  }, [user, fetchChats]);

  const createNewChat = useCallback(async () => {
    if (!user) return;
    const optimisticChat: Chat = { id: uuidv4(), name: 'New Chat', userId: user.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    setChats(prevChats => [...prevChats, optimisticChat]);
    setCurrentChat(optimisticChat);
    setMessages([]);
    try {
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/createchat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'New Chat', userId: user.id }),
      });
      if (!response.ok) throw new Error('Failed to create new chat');
      const newChat = await response.json();
      setChats(prevChats => prevChats.map(chat => 
        chat.id === optimisticChat.id ? { ...newChat, name: 'New Chat' } : chat
      ));
      setCurrentChat({ ...newChat, name: 'New Chat' });
    } catch (error) {
      setError('Failed to create new chat. Please try again.');
      console.error('Error creating new chat:', error);
      setChats(prevChats => prevChats.filter(chat => chat.id !== optimisticChat.id));
      setCurrentChat(null);
    }
  }, [user]);

  const selectChat = useCallback(async (chat: Chat) => {
    setCurrentChat(chat);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/fetchmessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: chat.id, userId: user?.id })
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError('Failed to load messages. Please try again.');
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const sendMessage = useCallback(async (text: string) => {
    if (!currentChat || !user) return;
    setIsSending(true);
    setIsGenerating(true);
    const optimisticMessage: Message = {
      id: uuidv4(),
      chatId: currentChat.id,
      sender: 'user',
      content: text,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    setMessages(prevMessages => [...prevMessages, optimisticMessage]);
    try {
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: currentChat.id,
          userId: user.id,
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      const assistantMessage: Message = {
        id: uuidv4(),
        chatId: currentChat.id,
        sender: 'assistant',
        content: data.response,
        createdAt: new Date().toISOString(),
        userId: user.id,
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      if (messages.length === 0) {
        const updatedChat = { ...currentChat, name: text.slice(0, 25) + '...' };
        setCurrentChat(updatedChat);
        setChats(prevChats => prevChats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== optimisticMessage.id));
    } finally {
      setIsSending(false);
      setIsGenerating(false);
    }
  }, [currentChat, user, messages]);

  const onStopMessage = useCallback(() => {
    // Implement stop message functionality here
    setIsGenerating(false);
  }, []);

  if (!user) {
    return <div>Please sign in to access the chat.</div>;
  }

  const deleteChat = useCallback(async (chatId: string) => {
    if (!user) return;
    try {
      const response = await fetch('https://rsd-chat-app.sandbox.maxird.com/api/deletechats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, userId: user.id }),
      });
      if (!response.ok) throw new Error('Failed to delete chat');
      setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (error) {
      setError('Failed to delete chat. Please try again.');
      console.error('Error deleting chat:', error);
      setTimeout(() => {
        setError(null);
      }, 2000); // Dismiss error after 2 seconds
    }
  }, [user, currentChat]);
  
  return (
    <div className="">
      <Layout 
        
        chats={chats} 
        currentChat={currentChat} 
        onSelectChat={selectChat} 
        onNewChat={createNewChat}
        isLoading={isLoading}
        onDeleteChat={deleteChat}
      >
      <ChatWindow 
        chat={currentChat}
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        isSending={isSending}
        error={error}
        isGenerating={isGenerating}
        onStopMessage={onStopMessage}
        onCommand={handleCommand}
      />
      </Layout>
    </div>
  );
};

export default ChatPage;