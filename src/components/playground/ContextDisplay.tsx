import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Clock, Target } from 'lucide-react';
import { usePlayground } from '../../contexts/PlaygroundContext';

interface ContextDisplayProps {
  context: {
    projectId: string;
    currentFiles: string[];
    recentChanges: string[];
    userIntent: string;
  };
}

export function ContextDisplay({ context }: ContextDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { files } = usePlayground();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-900">Context Aware</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-blue-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-blue-600" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* Current Intent */}
          {context.userIntent && (
            <div className="flex items-start space-x-2">
              <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-900">Current Intent</p>
                <p className="text-xs text-blue-700">{context.userIntent}</p>
              </div>
            </div>
          )}

          {/* Active Files */}
          {context.currentFiles.length > 0 && (
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-900">Active Files</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {context.currentFiles.slice(0, 3).map((file) => (
                    <span
                      key={file}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                    >
                      {file.split('/').pop()}
                    </span>
                  ))}
                  {context.currentFiles.length > 3 && (
                    <span className="text-xs text-blue-600">
                      +{context.currentFiles.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Recent Changes */}
          {context.recentChanges.length > 0 && (
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-900">Recent Changes</p>
                <div className="text-xs text-blue-700 mt-1">
                  {context.recentChanges.slice(0, 2).map((change, index) => (
                    <div key={index} className="truncate">• {change}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
