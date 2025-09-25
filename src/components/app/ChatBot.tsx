import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Heart, Smile, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('mitra-personality-chat');
    if (saved) {
      return JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [
      {
        id: 1,
        text: "Hi! I'm your Personality AI companion. I'm here to support your mental health and wellbeing. How are you feeling today?",
        isBot: true,
        timestamp: new Date(),
      },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('mitra-personality-chat', JSON.stringify(messages));
  }, [messages]);

  const demoResponses: Record<string, string> = {
    'stress': "I understand you're feeling stressed. Here are some quick techniques that can help:\n\n• Try the 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8\n• Take a 5-minute walk outside\n• Practice progressive muscle relaxation\n\nRemember, it's okay to feel stressed sometimes. You're doing great by reaching out!",
    'anxious': "Anxiety can be overwhelming, but you're not alone. Here are some grounding techniques:\n\n• 5-4-3-2-1 method: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Deep breathing exercises\n• Gentle stretching or yoga\n\nWould you like me to guide you through a quick breathing exercise?",
    'sad': "I'm sorry you're feeling sad. Your feelings are valid and important. Some things that might help:\n\n• Reach out to a trusted friend or family member\n• Engage in a favorite activity, even briefly\n• Practice self-compassion\n• Consider journaling your thoughts\n\nRemember, this feeling won't last forever. You have support available.",
    'motivation': "Here are some gentle ways to boost your motivation:\n\n• Start with one tiny task - even making your bed counts!\n• Break big goals into smaller steps\n• Celebrate small wins\n• Remember your 'why'\n\nYou don't need to be perfect. Just taking one small step forward is enough for today.",
    'sleep': "Good sleep is crucial for mental health. Here are some tips:\n\n• Create a bedtime routine (no screens 1 hour before bed)\n• Keep your room cool and dark\n• Try relaxation techniques like meditation\n• Avoid caffeine after 2 PM\n\nConsistent sleep schedule can make a huge difference in how you feel!",
    'study': "Study stress is real! Here are some strategies:\n\n• Use the Pomodoro technique (25 min study, 5 min break)\n• Find a study buddy or group\n• Create a comfortable study environment\n• Take regular breaks for mental health\n\nRemember: Your worth isn't defined by your grades. You're more than your academic performance."
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    const input = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);

    // Generate contextual response
    let response = "Thank you for sharing that with me. I'm here to listen and support you. While I'm a demo AI, I want you to know that your feelings matter.";
    
    if (input.includes('stress') || input.includes('overwhelm')) {
      response = demoResponses.stress;
    } else if (input.includes('anxious') || input.includes('worry') || input.includes('nervous')) {
      response = demoResponses.anxious;
    } else if (input.includes('sad') || input.includes('down') || input.includes('depressed')) {
      response = demoResponses.sad;
    } else if (input.includes('motivation') || input.includes('lazy') || input.includes('procrastination')) {
      response = demoResponses.motivation;
    } else if (input.includes('sleep') || input.includes('tired') || input.includes('insomnia')) {
      response = demoResponses.sleep;
    } else if (input.includes('study') || input.includes('exam') || input.includes('assignment')) {
      response = demoResponses.study;
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-light to-primary shadow-lg hover:shadow-xl"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-card rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Personality AI</h3>
                  <p className="text-sm opacity-90">Your mental health companion</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Heart className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {!message.isBot && (
                        <User className="w-4 h-4 mt-1 text-primary-foreground flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-2xl p-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions (show when few messages) */}
            {messages.length <= 2 && (
              <div className="p-4 border-b border-border">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">How are you feeling?</h4>
                <div className="flex flex-wrap gap-2">
                  {['I feel stressed', 'I\'m anxious', 'Need motivation', 'Having trouble sleeping'].map((feeling) => (
                    <Button
                      key={feeling}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue(feeling)}
                      className="text-xs"
                    >
                      {feeling}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="btn-luxury"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;