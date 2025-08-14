import React, { useState, useEffect, useCallback } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import React, { useState, useEffect, useCallback } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Zap,
  Search,
  BookOpen,
  Code2,
  MessageSquare,
  User,
  CheckSquare
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'error' | 'warning' | 'info' | 'suggestion';
  title: string;
  description: string;
  line?: number;
  column?: number;
  fix?: string;
  action?: () => void;
}

interface CodeIntelligenceProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CodeIntelligence({ isVisible, onClose }: CodeIntelligenceProps) {
  const { files, activeFile, updateFile } = usePlayground();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { files, activeFile, updateFile, addComment, resolveComment } = usePlayground();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeTab, setActiveTab] = useState<'problems' | 'suggestions' | 'references' | 'comments'>('problems');

  const currentFile = activeFile ? files[activeFile] : null;
  const comments = currentFile?.comments || [];

  const currentFile = activeFile ? files[activeFile] : null;

  useEffect(() => {
    if (currentFile && currentFile.content) {
      analyzecode(currentFile.content);
    }
  }, [currentFile?.content]);

  const analyzecode = useCallback((code: string) => {
    const newSuggestions: Suggestion[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for common issues
      if (line.includes('console.log')) {
        newSuggestions.push({
          id: `console-${lineNumber}`,
          type: 'warning',
          title: 'Console statement found',
          description: 'Remove console.log statements before production',
          line: lineNumber,
          column: line.indexOf('console.log') + 1,
          fix: line.replace(/console\.log\([^)]*\);?\s*/, ''),
          action: () => applySuggestion(`console-${lineNumber}`)
        });
      }

      if (line.includes('var ')) {
        newSuggestions.push({
          id: `var-${lineNumber}`,
          type: 'suggestion',
          title: 'Use const or let instead of var',
          description: 'var has function scope, prefer const or let for block scope',
          line: lineNumber,
          column: line.indexOf('var ') + 1,
          fix: line.replace('var ', 'const '),
          action: () => applySuggestion(`var-${lineNumber}`)
        });
      }

      if (line.includes('==') && !line.includes('===')) {
        newSuggestions.push({
          id: `equality-${lineNumber}`,
          type: 'warning',
          title: 'Use strict equality',
          description: 'Use === instead of == for strict equality comparison',
          line: lineNumber,
          column: line.indexOf('==') + 1,
          fix: line.replace('==', '==='),
          action: () => applySuggestion(`equality-${lineNumber}`)
        });
      }

      // React-specific suggestions
      if (line.includes('React.createElement') && currentFile?.metadata.language === 'typescript') {
        newSuggestions.push({
          id: `jsx-${lineNumber}`,
          type: 'suggestion',
          title: 'Use JSX syntax',
          description: 'JSX syntax is more readable than React.createElement',
          line: lineNumber,
          column: line.indexOf('React.createElement') + 1,
        });
      }

      // TypeScript suggestions
      if (line.includes(': any') && currentFile?.metadata.language === 'typescript') {
        newSuggestions.push({
          id: `any-${lineNumber}`,
          type: 'info',
          title: 'Avoid using any type',
          description: 'Consider using more specific types for better type safety',
          line: lineNumber,
          column: line.indexOf(': any') + 1,
        });
      }

      // Performance suggestions
      if (line.includes('useState') && line.includes('[]')) {
        newSuggestions.push({
          id: `state-${lineNumber}`,
          type: 'suggestion',
          title: 'Consider useMemo for expensive calculations',
          description: 'If this state involves expensive calculations, consider useMemo',
          line: lineNumber,
        });
      }

      // Accessibility suggestions
      if (line.includes('<img') && !line.includes('alt=')) {
        newSuggestions.push({
          id: `alt-${lineNumber}`,
          type: 'warning',
          title: 'Missing alt attribute',
          description: 'Images should have alt attributes for accessibility',
          line: lineNumber,
          column: line.indexOf('<img') + 1,
        });
      }

      // Security suggestions
      if (line.includes('dangerouslySetInnerHTML')) {
        newSuggestions.push({
          id: `xss-${lineNumber}`,
          type: 'error',
          title: 'Potential XSS vulnerability',
          description: 'Be careful with dangerouslySetInnerHTML, ensure content is sanitized',
          line: lineNumber,
          column: line.indexOf('dangerouslySetInnerHTML') + 1,
        });
      }
    });

    // Add general suggestions
    if (code.includes('function') && !code.includes('export')) {
      newSuggestions.push({
        id: 'export-suggestion',
        type: 'suggestion',
        title: 'Consider exporting functions',
        description: 'Export functions to make them reusable across modules',
      });
    }

    if (code.includes('className') && !code.includes('tailwind') && !code.includes('css')) {
      newSuggestions.push({
        id: 'styling-suggestion',
        type: 'info',
        title: 'Styling detected',
        description: 'Consider using Tailwind CSS for consistent styling',
      });
    }

    setSuggestions(newSuggestions);
  }, [currentFile?.metadata.language]);

  const applySuggestion = useCallback((suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (!suggestion || !suggestion.fix || !activeFile || !currentFile) return;

    const lines = currentFile!.content.split('\n');
    if (suggestion.line) {
      lines[suggestion.line - 1] = suggestion.fix;
      const newContent = lines.join('\n');
      updateFile(activeFile, newContent);
    }

    // Remove the applied suggestion
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  }, [activeFile, currentFile, suggestions, updateFile]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityCount = (type: string) => {
    return suggestions.filter(s => s.type === type).length;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium text-gray-900">Code Intelligence</h3>
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3 text-red-500" />
              <span>{getSeverityCount('error')} errors</span>
            </span>
            <span className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
              <span>{getSeverityCount('warning')} warnings</span>
            </span>
            <span className="flex items-center space-x-1">
              <Info className="h-3 w-3 text-blue-500" />
              <span>{getSeverityCount('info')} info</span>
            </span>
            <span className="flex items-center space-x-1">
              <Lightbulb className="h-3 w-3 text-green-500" />
              <span>{getSeverityCount('suggestion')} suggestions</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white rounded-md border border-gray-200">
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-3 py-1 text-xs font-medium rounded-l-md ${
                activeTab === 'problems'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`px-3 py-1 text-xs font-medium ${
                activeTab === 'suggestions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Suggestions
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`px-3 py-1 text-xs font-medium ${
                activeTab === 'references'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              References
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-3 py-1 text-xs font-medium rounded-r-md ${
                activeTab === 'comments'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Comments
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            ×
          </button>
        </div>
      </div>

      <div className="h-48 overflow-y-auto">
        {activeTab === 'problems' && (
          <div className="p-4">
            {suggestions.filter(s => s.type === 'error' || s.type === 'warning').length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm">No problems found! Your code looks good.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions
                  .filter(s => s.type === 'error' || s.type === 'warning')
                  .map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      {getIcon(suggestion.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {suggestion.title}
                          </p>
                          {suggestion.line && (
                            <span className="text-xs text-gray-500">
                              Line {suggestion.line}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                      {suggestion.action && (
                        <button
                          onClick={suggestion.action}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Fix
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="p-4">
            {suggestions.filter(s => s.type === 'suggestion' || s.type === 'info').length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No suggestions available.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions
                  .filter(s => s.type === 'suggestion' || s.type === 'info')
                  .map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      {getIcon(suggestion.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {suggestion.title}
                          </p>
                          {suggestion.line && (
                            <span className="text-xs text-gray-500">
                              Line {suggestion.line}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                      {suggestion.action && (
                        <button
                          onClick={suggestion.action}
                          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'references' && (
          <div className="p-4">
            <div className="text-center py-8 text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Find references feature coming soon!</p>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="p-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No comments yet for this file. Add inline comments to your code!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={comment.authorAvatar || `https://ui-avatars.com/api/?name=${comment.authorName}&background=random`}
                        alt={comment.authorName}
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{comment.authorName}</p>
                        <p className="text-xs text-gray-500">
                          Line {comment.line} • {new Date(comment.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => resolveComment(activeFile!, comment.id)}
                        className={`px-3 py-1 text-xs rounded-md flex items-center space-x-1 transition-colors ${
                          comment.resolved
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <CheckSquare className="h-3 w-3" />
                        <span>{comment.resolved ? 'Resolved' : 'Resolve'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
