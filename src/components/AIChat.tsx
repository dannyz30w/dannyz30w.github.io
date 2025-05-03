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
  const [recentResponses, setRecentResponses] = useState<string[]>([]);
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
  
  // Helper function to check for repeated responses
  const isRepetitiveResponse = (response: string) => {
    return recentResponses.includes(response);
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
    
    // First, determine the message category
    let responseCategory = 'general';
    
    if (lowerCaseMsg.includes("symptom") || lowerCaseMsg.includes("feel") || lowerCaseMsg.includes("sick")) {
      responseCategory = 'symptoms';
    } else if (lowerCaseMsg.includes("emergency") || lowerCaseMsg.includes("urgent") || lowerCaseMsg.includes("pain")) {
      responseCategory = 'emergency';
    } else if (lowerCaseMsg.includes("how") || lowerCaseMsg.includes("use") || lowerCaseMsg.includes("help")) {
      responseCategory = 'usage';
    } else if (lowerCaseMsg.includes("thank") || lowerCaseMsg.includes("appreciate")) {
      responseCategory = 'thanks';
    } else if (lowerCaseMsg.includes("missing") || lowerCaseMsg.includes("required") || lowerCaseMsg.includes("error")) {
      responseCategory = 'errors';
    } else if (lowerCaseMsg.includes("news") || lowerCaseMsg.includes("research") || lowerCaseMsg.includes("article")) {
      responseCategory = 'news';
    } else if (lowerCaseMsg.includes("family") || lowerCaseMsg.includes("history") || lowerCaseMsg.includes("genetic")) {
      responseCategory = 'family';
    }
    
    // Multiple response options for each category
    const responseOptions: Record<string, string[]> = {
      general: [
        "I'm here to help answer your health-related questions. What specific information are you looking for today?",
        "How can I assist with your health questions? I can help with symptom analysis, health information, or guide you through using Health Compass.",
        "I'm your Health Compass assistant. Feel free to ask about symptoms, conditions, or how to use our tools.",
        "Welcome to Health Compass. I can provide general health information and help you navigate our symptom checker. What would you like to know?"
      ],
      symptoms: [
        "It sounds like you're concerned about some symptoms. You can use our symptom checker above to help understand what might be causing them. Be sure to select all your symptoms for accurate results.",
        "To analyze your symptoms, please use the symptom checker tool. Select your symptoms from the dropdown, provide your age and gender (required), and click 'Analyze Symptoms'.",
        "For symptom analysis, I recommend using our main symptom checker tool. You'll need to enter your age, gender, and select at least one symptom to get results.",
        "I notice you're mentioning symptoms. The most accurate way to check them is through our symptom checker tool. Remember that age and gender are required fields for accurate analysis."
      ],
      emergency: [
        "⚠️ For any medical emergency, please call emergency services immediately (911 in the US). Don't delay seeking professional help if you're experiencing severe symptoms.",
        "This sounds serious. Please contact emergency services (911) immediately if you're experiencing severe pain or life-threatening symptoms.",
        "Medical emergencies require immediate professional attention. Please call 911 or your local emergency number right away.",
        "Your symptoms sound urgent. Please seek immediate medical care through emergency services rather than continuing this conversation."
      ],
      usage: [
        "To use Health Compass effectively:\n1. Select your symptoms from the dropdown\n2. Enter your age and gender (required)\n3. Add more details if available\n4. Click 'Analyze Symptoms' for results",
        "Using our symptom checker is simple:\n- Enter age and gender (required)\n- Select symptoms you're experiencing\n- Add additional information like duration \n- Click the analyze button to see possible matches",
        "I can guide you through using Health Compass. First, you'll need to enter required information (age, gender) and select at least one symptom. Other fields like family history are optional but improve results.",
        "To get the most from Health Compass:\n1. Be specific with symptom selection\n2. Always include age and gender\n3. Add medical history if relevant\n4. Review multiple possible matches in results"
      ],
      errors: [
        "The symptom checker requires age, gender, and at least one symptom to be selected. Please make sure you've filled in those required fields to get results.",
        "If you're seeing an error, check that you've included all required information: age, gender, and at least one symptom selection are mandatory for analysis.",
        "Missing information? The system needs your age, gender, and at least one symptom to generate results. Other fields are helpful but optional.",
        "Error messages typically appear when required fields are missing. For the symptom checker, you must provide age, gender, and select at least one symptom before analysis."
      ],
      news: [
        "You can explore health news in our dedicated section. Simply scroll down to the news area or use the search function to find articles on specific health topics.",
        "Our news section features the latest health research and updates. You can search for specific topics or browse through recent articles.",
        "Health Compass includes a news section where you can search for articles on specific conditions or browse general health news.",
        "To find health news, scroll down to the news section. You can search for specific health topics or conditions of interest."
      ],
      family: [
        "Family history is helpful for understanding your risk factors. In the symptom checker, you can add relevant family conditions. This information is optional but improves accuracy.",
        "When adding family history, focus on conditions with known genetic components. This optional information helps provide more personalized results.",
        "The family history section is optional but valuable. Include conditions that run in your family, especially those with genetic links, for more personalized analysis.",
        "While providing family history is optional, it can significantly improve the accuracy of your results by identifying potential genetic risk factors."
      ],
      thanks: [
        "You're welcome! I'm glad I could help. Feel free to ask if you have any other questions about Health Compass.",
        "Happy to assist! If you need anything else while using Health Compass, just let me know.",
        "My pleasure! Don't hesitate to reach out if you have more questions as you explore Health Compass.",
        "You're welcome! I'm here to help make your experience with Health Compass as smooth as possible."
      ]
    };
    
    // Select a response from the appropriate category
    const availableResponses = responseOptions[responseCategory];
    
    // Filter out recently used responses if possible
    const filteredResponses = availableResponses.filter(response => !isRepetitiveResponse(response));
    
    // If all responses have been recently used, reset and use all options
    let aiResponse: string;
    if (filteredResponses.length === 0) {
      // Reset recent responses and pick a random one
      setRecentResponses([]);
      aiResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
    } else {
      // Pick a non-repetitive response
      aiResponse = filteredResponses[Math.floor(Math.random() * filteredResponses.length)];
    }
    
    // Keep track of recent responses (limit to last 3)
    setRecentResponses(prev => {
      const updated = [...prev, aiResponse];
      return updated.length > 3 ? updated.slice(-3) : updated;
    });
    
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
