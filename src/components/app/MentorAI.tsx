import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, BookOpen, Target, HelpCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

const MentorAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('mitra-mentor-chat');
    if (saved) {
      return JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [
      {
        id: '1',
        type: 'ai',
        content: 'Hi! I\'m your Mentor AI. I can help you with syllabus guidance, study planning, and academic doubts. How can I assist you today?',
        timestamp: new Date()
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('mitra-mentor-chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createTaskFromChat = (taskTitle: string) => {
    const existingTasks = JSON.parse(localStorage.getItem('mitra-academic-tasks') || '[]');
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: 'Created by Mentor AI',
      dueDate: '',
      importance: 'normal',
      completed: false,
      subject: 'AI Generated'
    };
    localStorage.setItem('mitra-academic-tasks', JSON.stringify([...existingTasks, newTask]));
  };

  const demoResponses: Record<string, { content: string; actionButton?: { label: string; action: () => void } }> = {
    'syllabus': {
      content: 'Based on your Computer Science syllabus, I recommend focusing on:\n\n1. **Data Structures** (Weeks 1-4)\n   - Arrays, Linked Lists, Stacks, Queues\n   - Trees and Graphs\n\n2. **Algorithms** (Weeks 5-8)\n   - Sorting and Searching\n   - Dynamic Programming\n\n3. **Database Systems** (Weeks 9-12)\n   - SQL Fundamentals\n   - Normalization\n\nWould you like me to create study tasks for any specific topic?',
      actionButton: {
        label: 'Create Study Plan Tasks',
        action: () => {
          createTaskFromChat('Complete Data Structures Practice Problems');
          createTaskFromChat('Study SQL Fundamentals');
          addAIMessage('I\'ve created study tasks for you! Check your task planner to see them.');
        }
      }
    },
    'study plan': {
      content: 'Here\'s a recommended study plan for your upcoming exams:\n\n**Week 1-2: Foundation Building**\n- Review core concepts (2 hrs/day)\n- Practice basic problems\n\n**Week 3-4: Advanced Topics**\n- Complex problem solving (3 hrs/day)\n- Group study sessions\n\n**Week 5: Revision & Mock Tests**\n- Full-length practice tests\n- Weak area reinforcement\n\nShall I create specific tasks for this plan?',
      actionButton: {
        label: 'Create Study Tasks',
        action: () => {
          createTaskFromChat('Review Core Concepts - Week 1');
          createTaskFromChat('Practice Complex Problems - Week 3');
          createTaskFromChat('Take Mock Test - Week 5');
          addAIMessage('Study plan tasks created! You can find them in your task planner.');
        }
      }
    },
    'doubt': {
      content: 'I\'d be happy to help clarify your doubts! Here are some common academic questions I can assist with:\n\n• **Programming Concepts**: Data structures, algorithms, OOP\n• **Mathematics**: Calculus, linear algebra, statistics\n• **Science**: Physics problems, chemistry equations\n• **Research**: Paper writing, citation formats\n\nWhat specific topic would you like help with?'
    }
  };

  const addAIMessage = (content: string, actionButton?: any) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date(),
        actionButton
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Demo AI responses based on keywords
    const input = inputMessage.toLowerCase();
    let response = demoResponses['doubt'];

    if (input.includes('syllabus') || input.includes('curriculum')) {
      response = demoResponses['syllabus'];
    } else if (input.includes('study plan') || input.includes('planning') || input.includes('schedule')) {
      response = demoResponses['study plan'];
    } else if (input.includes('doubt') || input.includes('help') || input.includes('explain')) {
      response = demoResponses['doubt'];
    }

    addAIMessage(response.content, response.actionButton);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Get Syllabus Guidance', message: 'Can you help me understand my syllabus?' },
    { label: 'Create Study Plan', message: 'I need help creating a study plan for my exams' },
    { label: 'Ask a Doubt', message: 'I have a doubt about a concept, can you help?' }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Mentor AI</h3>
            <p className="text-sm text-muted-foreground">Your Academic Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground ml-4' 
                : 'bg-muted text-foreground mr-4'
            }`}>
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && (
                  <Bot className="w-5 h-5 mt-0.5 text-primary" />
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.actionButton && (
                    <Button
                      onClick={message.actionButton.action}
                      size="sm"
                      className="mt-3 btn-emerald"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {message.actionButton.label}
                    </Button>
                  )}
                </div>
                {message.type === 'user' && (
                  <User className="w-5 h-5 mt-0.5 text-primary-foreground" />
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted text-foreground rounded-2xl p-4 mr-4">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Actions:</h4>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(action.message)}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your studies..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="btn-luxury">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorAI;