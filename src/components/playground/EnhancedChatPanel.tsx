import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { Send, Bot, User, Sparkles, Zap, Lightbulb } from 'lucide-react';
import { CodeBlock, MessageActions, TypingIndicator, SuggestionChips } from './MessageComponents';
import { ContextDisplay } from './ContextDisplay';

interface EnhancedMessage extends import('../../types/playground').ChatMessage {
  suggestions?: string[];
  context?: {
    projectId: string;
    currentFiles: string[];
    recentChanges: string[];
    userIntent: string;
  };
}

export function EnhancedChatPanel() {
  const { messages, addMessage, isTyping, setIsTyping, files, activeFile, project } = usePlayground();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentContext, setCurrentContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update context based on current state
  useEffect(() => {
    const context = {
      projectId: project?.id || '',
      currentFiles: activeFile ? [activeFile] : [],
      recentChanges: [`Modified ${activeFile?.split('/').pop() || 'file'}`],
      userIntent: input || 'Building a React application'
    };
    setCurrentContext(context);
  }, [activeFile, project, input]);

  const generateAIResponse = useCallback(async (userMessage: string) => {
    setIsTyping(true);
    setIsGenerating(true);

    // Simulate different response types based on user input
    await new Promise(resolve => setTimeout(resolve, 2000));

    let response = '';
    let suggestions: string[] = [];
    let codeBlocks: any[] = [];

    if (userMessage.toLowerCase().includes('component')) {
      response = `I'll help you create a React component! Here's a well-structured component based on your request:`;
      
      codeBlocks = [{
        language: 'tsx',
        code: `import React, { useState } from 'react';

interface ${userMessage.includes('button') ? 'Button' : 'Custom'}ComponentProps {
  title?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function ${userMessage.includes('button') ? 'Button' : 'Custom'}Component({ 
  title = "Click me", 
  onClick, 
  variant = 'primary' 
}: ${userMessage.includes('button') ? 'Button' : 'Custom'}ComponentProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={\`px-4 py-2 rounded-lg font-medium transition-all duration-200 \${
        variant === 'primary' 
          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      } \${isClicked ? 'scale-95' : 'scale-100'}\`}
    >
      {title}
    </button>
  );
}`,
        filename: `src/components/${userMessage.includes('button') ? 'Button' : 'Custom'}Component.tsx`
      }];

      suggestions = [
        'Add TypeScript props',
        'Make it responsive',
        'Add animations',
        'Create a variant'
      ];
    } else if (userMessage.toLowerCase().includes('style') || userMessage.toLowerCase().includes('css')) {
      response = `I'll help you with styling! Here are some modern CSS approaches:`;
      
      codeBlocks = [{
        language: 'css',
        code: `/* Modern CSS with Tailwind-like utilities */
.container {
  @apply max-w-4xl mx-auto px-4 py-8;
}

.card {
  @apply bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300;
}

.button-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg 
         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .card {
    @apply bg-gray-800 text-white;
  }
}`,
        filename: 'src/styles/components.css'
      }];

      suggestions = [
        'Add dark mode',
        'Create animations',
        'Make it responsive',
        'Add hover effects'
      ];
    } else if (userMessage.toLowerCase().includes('api') || userMessage.toLowerCase().includes('fetch')) {
      response = `I'll help you set up API integration with proper error handling and TypeScript:`;
      
      codeBlocks = [{
        language: 'tsx',
        code: `import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage example
export function DataComponent() {
  const { data, loading, error } = useApi<{ id: number; name: string }[]>('/api/users');

  if (loading) return <div className="animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  
  return (
    <div className="space-y-2">
      {data?.map(item => (
        <div key={item.id} className="p-3 bg-gray-100 rounded">
          {item.name}
        </div>
      ))}
    </div>
  );
}`,
        filename: 'src/hooks/useApi.ts'
      }];

      suggestions = [
        'Add caching',
        'Handle loading states',
        'Add retry logic',
        'Implement pagination'
      ];
    } else {
      response = `I understand you want to ${userMessage.toLowerCase()}. Let me help you with that! Here's a solution:`;
      
      codeBlocks = [{
        language: 'tsx',
        code: `// Generated based on your request: "${userMessage}"
import React from 'react';

export function GeneratedComponent() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Your Request
      </h2>
      <p className="text-gray-600 mb-4">
        ${userMessage}
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
}`,
        filename: 'src/components/GeneratedComponent.tsx'
      }];

      suggestions = [
        'Add more features',
        'Improve styling',
        'Make it interactive',
        'Add TypeScript types'
      ];
    }

    const enhancedMessage: EnhancedMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions,
      context: currentContext,
      metadata: {
        codeBlocks: codeBlocks.map(block => ({
          language: block.language,
          code: block.code,
          filename: block.filename
        }))
      }
    };

    addMessage(enhancedMessage);
    setIsTyping(false);
    setIsGenerating(false);
  }, [addMessage, currentContext]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    addMessage({
      type: 'user',
      content: userMessage,
    });

    // Generate AI response
    await generateAIResponse(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  const handleReaction = (messageId: string, reaction: 'like' | 'dislike') => {
    console.log(`Message ${messageId} received ${reaction}`);
    // TODO: Send feedback to analytics
  };

  const handleRegenerate = () => {
    const lastUserMessage = messages.filter(m => m.type === 'user').pop();
    if (lastUserMessage) {
      generateAIResponse(lastUserMessage.content);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const quickPrompts = [
    { icon: Sparkles, text: "Create a modern landing page", color: "text-purple-600" },
    { icon: Zap, text: "Build a todo app with drag & drop", color: "text-yellow-600" },
    { icon: Lightbulb, text: "Add dark mode to my app", color: "text-blue-600" }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Lovable AI</h3>
            <p className="text-xs text-gray-600">
              {isGenerating ? 'Generating code...' : 'Ready to build amazing things'}
            </p>
          </div>
          {isGenerating && (
            <div className="ml-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Context Display */}
      {currentContext && messages.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <ContextDisplay context={currentContext} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Welcome to Lovable AI!
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-sm mx-auto">
              I'm here to help you build amazing applications. Describe what you want to create and I'll generate the code for you.
            </p>
            
            <div className="space-y-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(prompt.text)}
                  className="flex items-center space-x-3 w-full p-4 text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <prompt.icon className={`h-5 w-5 ${prompt.color}`} />
                  <span className="text-gray-700">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const enhancedMessage = message as EnhancedMessage;
          return (
            <div
              key={message.id}
              className={`flex space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[85%] ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-lg px-4 py-3'
                    : 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap mb-0">{message.content}</p>
                </div>

                {/* Code blocks */}
                {message.metadata?.codeBlocks?.map((block, index) => (
                  <CodeBlock
                    key={index}
                    language={block.language}
                    code={block.code}
                    filename={block.filename}
                  />
                ))}

                {/* Suggestions */}
                {enhancedMessage.suggestions && enhancedMessage.suggestions.length > 0 && (
                  <SuggestionChips
                    suggestions={enhancedMessage.suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}

                {/* Message actions for assistant messages */}
                {message.type === 'assistant' && (
                  <MessageActions
                    messageId={message.id}
                    onReaction={handleReaction}
                    onRegenerate={handleRegenerate}
                    timestamp={message.timestamp}
                  />
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <TypingIndicator variant={isGenerating ? 'generating' : 'thinking'} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build... (e.g., 'Create a responsive navbar with dropdown menu')"
              className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isTyping}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="text-blue-600">✨ AI-powered</span>
        </div>
      </div>
    </div>
  );
}
