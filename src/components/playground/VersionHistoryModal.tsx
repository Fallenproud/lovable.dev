import React, { useState, useEffect } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { X, History, User, Calendar, GitBranch, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  filePath: string;
}

export function VersionHistoryModal({ isOpen, onClose, filePath }: VersionHistoryModalProps) {
  const { files } = usePlayground();
  const file = files[filePath];
  const versions = file?.versions || [];
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(versions.length - 1);

  useEffect(() => {
    if (isOpen) {
      setSelectedVersionIndex(versions.length - 1); // Select latest version by default
    }
  }, [isOpen, versions.length]);

  if (!isOpen || !file) return null;

  const currentVersion = versions[selectedVersionIndex];
  const previousVersion = versions[selectedVersionIndex - 1];

  const getDiff = (oldContent: string, newContent: string) => {
    // This is a very simplified mock diff. A real diff would use a library like `diff-match-patch`.
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const diffLines: { type: 'added' | 'removed' | 'unchanged', content: string }[] = [];

    // For simplicity, just show added/removed lines if they are different
    // A proper diff would compare line by line and character by character
    if (oldContent === newContent) {
      return newLines.map(line => ({ type: 'unchanged', content: line }));
    }

    // Mock a simple diff: if lines are different, mark them as changed
    const maxLength = Math.max(oldLines.length, newLines.length);
    for (let i = 0; i < maxLength; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === undefined) {
        diffLines.push({ type: 'added', content: newLine });
      } else if (newLine === undefined) {
        diffLines.push({ type: 'removed', content: oldLine });
      } else if (oldLine !== newLine) {
        diffLines.push({ type: 'removed', content: oldLine });
        diffLines.push({ type: 'added', content: newLine });
      } else {
        diffLines.push({ type: 'unchanged', content: newLine });
      }
    }
    return diffLines;
  };

  const diffContent = currentVersion && previousVersion 
    ? getDiff(previousVersion.content, currentVersion.content)
    : currentVersion ? getDiff('', currentVersion.content) : []; // Show full content if no previous

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Version History: {file.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Version List (Left Panel) */}
          <div className="w-72 border-r border-gray-200 overflow-y-auto p-4">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Versions ({versions.length})</h3>
            {versions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <FileText className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">No versions yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {versions.map((version, index) => (
                  <button
                    key={version.id}
                    onClick={() => setSelectedVersionIndex(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedVersionIndex === index
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {index === versions.length - 1 ? 'Current Version' : `Version ${versions.length - index}`}
                    </p>
                    <div className="flex items-center text-xs text-gray-600 space-x-2">
                      <User className="h-3 w-3" />
                      <span>{version.authorName}</span>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(version.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{version.changesSummary}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Diff Viewer (Right Panel) */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h3 className="text-md font-semibold text-gray-900">
                {currentVersion ? `Viewing Version ${versions.length - selectedVersionIndex}` : 'No Version Selected'}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedVersionIndex(prev => Math.max(0, prev - 1))}
                  disabled={selectedVersionIndex === 0}
                  className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedVersionIndex(prev => Math.min(versions.length - 1, prev + 1))}
                  disabled={selectedVersionIndex === versions.length - 1}
                  className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Restore
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-gray-900 text-white font-mono text-sm">
              {currentVersion ? (
                <SyntaxHighlighter
                  language={file.metadata.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                  }}
                  showLineNumbers
                  wrapLines
                  lineProps={(lineNumber) => {
                    const lineContent = diffContent[lineNumber - 1];
                    if (!lineContent) return {};
                    return {
                      style: {
                        backgroundColor: lineContent.type === 'added' ? 'rgba(0,255,0,0.1)' :
                                         lineContent.type === 'removed' ? 'rgba(255,0,0,0.1)' : 'transparent',
                      },
                    };
                  }}
                >
                  {diffContent.map(line => line.content).join('\n')}
                </SyntaxHighlighter>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Select a version to view its content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
