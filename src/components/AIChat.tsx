
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
      content: "Hello! I'm your Health Compass AI assistant. I can help answer your health questions using the latest medical research. How can I help you today?",
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
  
  // Sample responses to common medical questions
  const responses = {
    greeting: [
      "Hello! I'm here to help with your health questions. What would you like to know?",
      "Hi there! How can I assist you with your health concerns today?",
      "Welcome to Health Compass. How may I help you with your health questions?"
    ],
    symptoms: [
      "Based on those symptoms, there could be several potential causes. It's important to consult with a healthcare professional for a proper diagnosis. Would you like me to provide some general information about these symptoms?",
      "These symptoms could be associated with several conditions. While I can provide general information, a healthcare provider can give you personalized advice. Would you like me to explain some possible causes?",
      "I understand you're experiencing these symptoms. While I can offer general insights, it's best to consult with a medical professional for proper evaluation. What specific information are you looking for?"
    ],
    treatment: [
      "Treatment options typically include medication, lifestyle changes, and sometimes surgical interventions depending on the condition. A healthcare provider can recommend the most appropriate treatment plan for your specific situation.",
      "The most effective treatment depends on your specific diagnosis, medical history, and other factors. Generally, options may include medications, physical therapy, lifestyle modifications, or in some cases, surgical procedures.",
      "Treatment approaches vary based on diagnosis, severity, and individual factors. While I can provide general information about common treatments, your doctor can create a personalized plan."
    ],
    prevention: [
      "Prevention strategies often include maintaining a balanced diet, regular physical activity, adequate sleep, stress management, and regular medical check-ups. Would you like more specific information about preventing a particular condition?",
      "Preventive measures typically involve lifestyle factors such as nutrition, exercise, avoiding tobacco and excessive alcohol, and getting recommended screenings. Is there a specific condition you're concerned about preventing?",
      "Many health conditions can be prevented through healthy lifestyle choices. This includes nutritious eating, regular exercise, not smoking, limiting alcohol, managing stress, and getting appropriate vaccinations and screenings."
    ],
    nutrition: [
      "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Specific nutritional needs may vary based on age, sex, activity level, and health conditions. Would you like information about nutrition for a specific health concern?",
      "Nutritional recommendations focus on whole foods like vegetables, fruits, whole grains, lean proteins, and healthy fats while limiting processed foods, added sugars, and excess sodium. Different health conditions may require specific dietary approaches.",
      "Good nutrition involves eating a variety of foods that give you the nutrients needed to maintain health, feel good, and have energy. These nutrients include protein, carbohydrates, fat, water, vitamins, and minerals."
    ],
    exercise: [
      "Regular physical activity offers numerous health benefits, including improved cardiovascular health, stronger muscles and bones, better weight management, and enhanced mental health. Adults should aim for at least 150 minutes of moderate-intensity activity per week.",
      "Exercise recommendations typically include both aerobic activity (like walking, swimming or cycling) and strength training. The specific amount and type of exercise that's best for you depends on factors like age, health status, and fitness goals.",
      "Physical activity benefits nearly all aspects of health. For most adults, experts recommend 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus muscle-strengthening activities twice weekly."
    ],
    medications: [
      "Medications work in different ways depending on their type and purpose. It's important to take medications as prescribed, be aware of potential side effects, and inform your healthcare provider of all medications you're taking to avoid interactions.",
      "When taking any medication, it's important to follow your doctor's instructions carefully, be aware of possible side effects, and alert your healthcare provider to any problems. Never stop taking a medication without consulting your doctor first.",
      "Medications can be effective when used appropriately, but all have potential benefits and risks. Always take medications as prescribed, report side effects to your doctor, and don't adjust dosage without medical guidance."
    ],
    mental_health: [
      "Mental health is just as important as physical health. Common mental health conditions include depression, anxiety disorders, and stress-related conditions. Treatment often includes therapy, medication, lifestyle changes, or a combination of these approaches.",
      "Taking care of your mental health involves seeking professional help when needed, building strong relationships, managing stress, getting enough sleep, staying physically active, and practicing mindfulness or other relaxation techniques.",
      "Mental health affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health treatment can include counseling, therapy, medication, or a combination of approaches."
    ],
    research: [
      "Medical research is constantly evolving. The most reliable information comes from peer-reviewed studies, systematic reviews, and meta-analyses. It's always good to check that health information is based on current evidence from reputable sources.",
      "Recent medical research has made significant advances in areas like genetics, immunotherapy, and digital health technologies. While promising, new findings often need further validation before becoming standard clinical practice.",
      "When evaluating medical research, consider factors like study size, design, peer review status, funding sources, and whether the results have been replicated. Individual studies should be interpreted within the context of the broader body of evidence."
    ],
    fallback: [
      "That's an interesting question. While I aim to provide helpful health information, I recommend consulting with a healthcare professional for personalized advice based on your specific situation.",
      "I understand you're looking for information on this topic. While I can provide general insights, a healthcare provider can give you guidance tailored to your individual needs and medical history.",
      "Thank you for your question. I can offer general health information, but for specific medical advice or diagnosis, it's best to consult with a qualified healthcare professional."
    ]
  };

  // Function to classify the user's message
  const classifyMessage = (text: string): keyof typeof responses => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      return 'greeting';
    } else if (lowerText.includes('symptom') || lowerText.includes('pain') || lowerText.includes('feel') || lowerText.includes('hurt')) {
      return 'symptoms';
    } else if (lowerText.includes('treat') || lowerText.includes('cure') || lowerText.includes('heal')) {
      return 'treatment';
    } else if (lowerText.includes('prevent') || lowerText.includes('avoid')) {
      return 'prevention';
    } else if (lowerText.includes('eat') || lowerText.includes('food') || lowerText.includes('diet') || lowerText.includes('nutrition')) {
      return 'nutrition';
    } else if (lowerText.includes('exercise') || lowerText.includes('workout') || lowerText.includes('fitness') || lowerText.includes('activity')) {
      return 'exercise';
    } else if (lowerText.includes('medicine') || lowerText.includes('drug') || lowerText.includes('pill') || lowerText.includes('medication')) {
      return 'medications';
    } else if (lowerText.includes('mental') || lowerText.includes('stress') || lowerText.includes('anxiety') || lowerText.includes('depression')) {
      return 'mental_health';
    } else if (lowerText.includes('research') || lowerText.includes('study') || lowerText.includes('evidence')) {
      return 'research';
    } else {
      return 'fallback';
    }
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
    
    // Classify message and get appropriate response category
    const category = classifyMessage(message);
    const responseList = responses[category];
    
    // Select a random response from the category
    const aiResponse = responseList[Math.floor(Math.random() * responseList.length)];
    
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
    }, 1000);
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
