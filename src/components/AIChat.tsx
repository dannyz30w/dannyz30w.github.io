
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your Health Compass AI assistant. I can provide information about health conditions, treatments, wellness tips, and answer medical questions to the best of my knowledge. How can I assist you today?",
      role: 'assistant',
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
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Get previous messages for context (up to 5 most recent)
      const recentMessages = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Append the new user message
      recentMessages.push({ 
        role: 'user',
        content: userMessage.content
      });

      // Create a system message for context
      const systemMessage = {
        role: 'system',
        content: `You are a helpful, knowledgeable medical AI assistant named Health Compass. 
        Provide accurate, evidence-based health information and respond in a conversational, helpful tone.
        When discussing medical topics, emphasize the importance of consulting healthcare professionals for diagnosis and treatment.
        Keep responses concise but informative. If you don't know something, admit it rather than providing potentially incorrect information.
        Format responses using markdown where helpful.`
      };
      
      // Simulate API call to get chatbot response
      setTimeout(async () => {
        try {
          // In a real app, this would be an API call to an AI service
          // For this example, we'll generate a response based on the user's query
          const assistantResponse = await generateAIResponse(userMessage.content, recentMessages);
          
          const assistantMessage: Message = {
            content: assistantResponse,
            role: 'assistant',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          
          // Show toast when chat is minimized
          if (!isOpen) {
            toast({
              title: "New message from Health Assistant",
              description: assistantResponse.substring(0, 60) + "...",
              duration: 5000,
            });
          }
        } catch (error) {
          console.error('Error generating AI response:', error);
          
          // Add error message
          const errorMessage: Message = {
            content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
            role: 'assistant',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsLoading(false);
    }
  };
  
  // Function to generate AI responses based on patterns in the user's message
  const generateAIResponse = async (userQuery: string, conversationHistory: any[]): Promise<string> => {
    const query = userQuery.toLowerCase();
    
    // Common health topics and responses
    if (query.includes('headache') || query.includes('head pain') || query.includes('migraine')) {
      return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or underlying medical conditions. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you experience severe, persistent, or unusual headaches, it's important to consult a healthcare professional for proper evaluation.\n\nSome general recommendations:\n- Stay hydrated\n- Maintain regular sleep patterns\n- Practice stress reduction techniques\n- Avoid known triggers (certain foods, alcohol, etc.)\n\nRemember, this information is not a substitute for professional medical advice.";
    } 
    
    if (query.includes('cold') || query.includes('flu') || query.includes('fever')) {
      return "Common colds and flu are viral infections that affect the respiratory system. Symptoms typically include fever, cough, sore throat, runny nose, body aches, and fatigue.\n\nFor management:\n- Rest and stay hydrated\n- Over-the-counter medications can help relieve symptoms\n- Use a humidifier to ease congestion\n- Wash hands frequently to prevent spread\n\nIf symptoms are severe or persistent, especially with high fever, difficulty breathing, or chest pain, please seek medical attention promptly.";
    }
    
    if (query.includes('diet') || query.includes('nutrition') || query.includes('healthy eating')) {
      return "A balanced diet is essential for overall health. The Mediterranean diet and DASH diet are both evidence-based eating patterns associated with numerous health benefits.\n\nKey principles include:\n- Plenty of fruits and vegetables (aim for half your plate)\n- Whole grains rather than refined grains\n- Lean proteins (fish, poultry, beans, nuts)\n- Healthy fats (olive oil, avocados, nuts)\n- Limited added sugars, sodium, and processed foods\n\nIndividual nutritional needs vary based on age, activity level, health conditions, and other factors. A registered dietitian can provide personalized recommendations for your specific situation.";
    }
    
    if (query.includes('exercise') || query.includes('workout') || query.includes('physical activity')) {
      return "Regular physical activity offers numerous health benefits, including improved cardiovascular health, stronger muscles and bones, better weight management, and enhanced mental wellbeing.\n\nThe general recommendation for adults is:\n- At least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly\n- Muscle-strengthening activities at least twice a week\n- Balance training, especially for older adults\n\nStart gradually if you're new to exercise, and choose activities you enjoy to help maintain consistency. Always consult with a healthcare provider before beginning a new exercise program, especially if you have existing health conditions.";
    }
    
    if (query.includes('sleep') || query.includes('insomnia') || query.includes('can\'t sleep')) {
      return "Quality sleep is crucial for physical and mental health. Most adults need 7-9 hours of sleep per night.\n\nTo improve sleep quality:\n- Maintain a consistent sleep schedule\n- Create a restful environment (cool, dark, quiet room)\n- Limit screen time before bed\n- Avoid caffeine and large meals close to bedtime\n- Establish a relaxing bedtime routine\n\nIf you consistently struggle with sleep despite good sleep hygiene practices, consider consulting a healthcare provider, as persistent insomnia may require additional treatment approaches.";
    }
    
    if (query.includes('anxiety') || query.includes('stress') || query.includes('mental health')) {
      return "Anxiety and stress are common experiences that can impact both mental and physical wellbeing when persistent or severe.\n\nSome evidence-based strategies for managing stress and anxiety include:\n- Regular physical activity\n- Mindfulness meditation and deep breathing exercises\n- Adequate sleep and nutrition\n- Limiting alcohol and caffeine\n- Social connection and support\n- Professional help through therapy (particularly cognitive-behavioral therapy)\n\nIf anxiety is significantly affecting your daily functioning or quality of life, please consider reaching out to a mental health professional for proper evaluation and support.";
    }
    
    if (query.includes('thank')) {
      return "You're welcome! I'm glad I could help. Feel free to ask if you have any other health-related questions.";
    }
    
    if (query.includes('hello') || query.includes('hi ') || query === 'hi' || query.includes('hey')) {
      return "Hello! I'm your Health Compass AI assistant. I can provide evidence-based health information on topics like symptoms, conditions, treatments, nutrition, exercise, and general wellness. How can I help you today?";
    }
    
    // Default response for other queries
    return "Thank you for your question. As an AI health assistant, I aim to provide general health information based on current medical understanding.\n\nFor specific medical concerns, diagnoses, or treatment plans, it's important to consult with a qualified healthcare professional who can provide personalized advice based on your complete medical history and examination.\n\nIs there a specific health topic I can provide general information about?";
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
            <h3 className="text-white font-semibold">Health Compass AI</h3>
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
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="text-sm prose prose-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
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
                    <p className="text-sm">Generating response...</p>
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
              placeholder="Ask about health topics..."
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
