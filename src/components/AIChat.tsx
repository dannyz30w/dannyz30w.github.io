
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Loader2 } from 'lucide-react';

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your Health Compass AI assistant. How can I help you with your health questions today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // Determine response based on user message
      let aiResponse = "I'm here to help answer your health-related questions. While I can provide general information, remember that I'm not a substitute for professional medical advice.";
      
      const lowerCaseMsg = message.toLowerCase();
      if (lowerCaseMsg.includes('symptom') || lowerCaseMsg.includes('feel')) {
        aiResponse = "It sounds like you might be concerned about some symptoms. Our symptom checker can help you understand what might be causing them. You can use it above to input your symptoms and get potential matches.";
      } else if (lowerCaseMsg.includes('emergency') || lowerCaseMsg.includes('urgent')) {
        aiResponse = "For any medical emergency, please call emergency services immediately (911 in the US). Don't delay seeking professional help.";
      } else if (lowerCaseMsg.includes('how do i use')) {
        aiResponse = "To use the Health Compass tool, select your symptoms from the list provided, add your personal details and family history for more accurate results, then click 'Analyze Symptoms' to see potential matches.";
      }
      
      const assistantMessage: Message = {
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div 
      id="ai-chat-widget"
      className={`fixed bottom-4 right-4 z-50 w-80 md:w-96 hidden transition-all duration-300 shadow-xl rounded-lg`}
    >
      <Card className="overflow-hidden border-2 border-primary">
        {/* Header */}
        <div className="bg-primary p-3 flex justify-between items-center">
          <h3 className="text-white font-semibold">AI Health Assistant</h3>
          <button 
            onClick={() => {
              const chatWidget = document.querySelector('#ai-chat-widget') as HTMLElement;
              if (chatWidget) chatWidget.classList.add('hidden');
            }}
            className="text-white hover:bg-primary-foreground/20 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Message area */}
        <div className="bg-white h-80 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <form onSubmit={handleSendMessage} className="bg-gray-50 p-3 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AIChat;
