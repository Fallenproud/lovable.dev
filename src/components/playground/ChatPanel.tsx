import React, { useState, useRef, useEffect } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { Send, Bot, User, Code, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export function ChatPanel() {
  const { messages, addMessage, isTyping, setIsTyping } = usePlayground();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    addMessage({
      type: 'user',
      content: userMessage,
    });

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      addMessage({
        type: 'assistant',
        content: `I understand you want to ${userMessage.toLowerCase()}. Let me help you with that! Here's what I can do:

\`\`\`tsx
// Example React component
function ExampleComponent() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Hello from AI!</h2>
      <p>This is a generated component based on your request.</p>
    </div>
  );
}
\`\`\`

Would you like me to create this component in your project?`,
        metadata: {
          codeBlocks: [{
            language: 'tsx',
            code: `function ExampleComponent() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Hello from AI!</h2>
      <p>This is a generated component based on your request.</p>
    </div>
  );
}`,
            filename: 'ExampleComponent.tsx'
          }]
        }
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // TODO: Show toast notification
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

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-500">Ready to help you build</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Welcome to Lovable!
            </h3>
            <p className="text-gray-600 text-sm">
              Describe what you want to build and I'll help you create it.
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setInput("Create a todo app with dark mode")}
                className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              >
                💡 Create a todo app with dark mode
              </button>
              <button
                onClick={() => setInput("Build a landing page for a SaaS product")}
                className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              >
                🚀 Build a landing page for a SaaS product
              </button>
              <button
                onClick={() => setInput("Make a dashboard with charts and tables")}
                className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
              >
                📊 Make a dashboard with charts and tables
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'assistant' && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                {message.content.split('```').map((part, index) => {
                  if (index % 2 === 0) {
                    return <p key={index} className="whitespace-pre-wrap mb-2 last:mb-0">{part}</p>;
                  } else {
                    const [language, ...codeLines] = part.split('\n');
                    const code = codeLines.join('\n');
                    return (
                      <div key={index} className="relative bg-gray-900 rounded-md p-3 my-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">{language}</span>
                          <button
                            onClick={() => copyCode(code)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <pre className="text-sm text-gray-100 overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                      </div>
                    );
                  }
                })}
              </div>
              
              {message.type === 'assistant' && (
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
                  <button className="text-gray-400 hover:text-green-600">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build..."
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
