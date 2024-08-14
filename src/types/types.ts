export interface User {
    id: string;
    email: string;
  }
  
  export interface Chat {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Message {
    id: string;
    chatId: string;
    userId: string;
    sender: 'user' | 'assistant';
    content: string;
    createdAt: string;
  }
  
  export interface AuthResponse {
    userId: string;
    email: string;
  }

export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
}