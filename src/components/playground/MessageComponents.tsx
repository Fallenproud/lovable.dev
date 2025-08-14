import React, { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, Play, Download } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePlayground } from '../../contexts/PlaygroundContext';

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
  onApply?: () => void;
}

export function CodeBlock({ language, code, filename, onApply }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { createFile, updateFile, files } = usePlayground();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyCode = () => {
    if (filename) {
      if (files[filename]) {
        updateFile(filename, code);
      } else {
        createFile(filename, code);
      }
    }
    onApply?.();
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-mono">{language}</span>
          {filename && (
            <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {filename && (
            <button
              onClick={handleApplyCode}
              className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
              title="Apply to project"
            >
              <Play className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
            title="Download file"
          >
            <Download className="h-3 w-3" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
          }}
          showLineNumbers={code.split('\n').length > 10}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

interface MessageActionsProps {
  messageId: string;
  onReaction: (messageId: string, reaction: 'like' | 'dislike') => void;
  onRegenerate?: () => void;
  timestamp: Date;
}

export function MessageActions({ messageId, onReaction, onRegenerate, timestamp }: MessageActionsProps) {
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  const handleReaction = (type: 'like' | 'dislike') => {
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);
    if (newReaction) {
      onReaction(messageId, newReaction);
    }
  };

  return (
    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleReaction('like')}
          className={`p-1 rounded transition-colors ${
            reaction === 'like'
              ? 'text-green-600 bg-green-50'
              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
          }`}
          title="Helpful"
        >
          <ThumbsUp className="h-3 w-3" />
        </button>
        <button
          onClick={() => handleReaction('dislike')}
          className={`p-1 rounded transition-colors ${
            reaction === 'dislike'
              ? 'text-red-600 bg-red-50'
              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
          }`}
          title="Not helpful"
        >
          <ThumbsDown className="h-3 w-3" />
        </button>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          >
            Regenerate
          </button>
        )}
      </div>
      <span className="text-xs text-gray-400">
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}

interface TypingIndicatorProps {
  variant?: 'default' | 'thinking' | 'generating';
}

export function TypingIndicator({ variant = 'default' }: TypingIndicatorProps) {
  const messages = {
    default: 'AI is typing...',
    thinking: 'AI is thinking...',
    generating: 'Generating code...'
  };

  return (
    <div className="flex items-center space-x-2 text-gray-500 text-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{messages[variant]}</span>
    </div>
  );
}

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSuggestionClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
