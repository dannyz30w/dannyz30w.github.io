
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to show chat widget
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
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
    
    // Process message to determine response
    const lowerCaseMsg = message.toLowerCase();
    let aiResponse = "I'm here to help answer your health-related questions. While I can provide general information, remember that I'm not a substitute for professional medical advice.";
    
    // More varied and helpful responses
    if (lowerCaseMsg.includes("symptom") || lowerCaseMsg.includes("feel")) {
      aiResponse = "It sounds like you might be concerned about some symptoms. You can use the symptom checker above to help understand what might be causing them. Be sure to select all your symptoms and fill in your age and gender, which are required for accurate results.";
    } else if (lowerCaseMsg.includes("emergency") || lowerCaseMsg.includes("urgent") || lowerCaseMsg.includes("severe pain")) {
      aiResponse = "⚠️ For any medical emergency, please call emergency services immediately (911 in the US). Don't delay seeking professional help if you're experiencing severe symptoms.";
    } else if (lowerCaseMsg.includes("how do i use") || lowerCaseMsg.includes("how to")) {
      aiResponse = "To use the Health Compass tool effectively:\n\n1. Select your symptoms from the list provided\n2. Fill in your age and gender (required fields)\n3. Add additional details like duration of symptoms\n4. Optionally add family history for more personalized results\n5. Click 'Analyze Symptoms' to see potential matches";
    } else if (lowerCaseMsg.includes("required") || lowerCaseMsg.includes("missing")) {
      aiResponse = "The symptom checker requires age, gender, and at least one symptom to be selected. Please make sure you've filled in those required fields. Other fields like family history and medications are optional but help provide more accurate results.";
    } else if (lowerCaseMsg.includes("family history") || lowerCaseMsg.includes("genetic")) {
      aiResponse = "Family history is important for understanding your risk factors. In the symptom checker, you can add conditions that run in your family. This information is optional but can improve the accuracy of your results.";
    } else if (lowerCaseMsg.includes("news") || lowerCaseMsg.includes("research")) {
      aiResponse = "You can view the latest health news by clicking on 'Recent News' next to a condition in your results. You can also search for specific health topics in the news section.";
    } else if (lowerCaseMsg.includes("thank")) {
      aiResponse = "You're welcome! I'm glad I could help. If you have any other questions about using Health Compass, feel free to ask.";
    }
    
    // Add slight delay for natural feel
    setTimeout(() => {
      const assistantMessage: Message = {
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Show toast when chat is minimized
      if (!isOpen) {
        toast({
          title: "New message from Health Assistant",
          description: aiResponse.substring(0, 60) + "...",
          duration: 5000,
        });
      }
    }, 800);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </div>
      
      {/* Chat widget */}
      <div 
        id="ai-chat-widget"
        className={`fixed bottom-20 right-4 z-50 w-80 md:w-96 transition-all duration-300 shadow-xl rounded-lg ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
      >
        <Card className="overflow-hidden border-2 border-primary">
          {/* Header */}
          <div className="bg-primary p-3 flex justify-between items-center">
            <h3 className="text-white font-semibold">AI Health Assistant</h3>
            <button 
              onClick={toggleChat}
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
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
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
    </>
  );
};

export default AIChat;
