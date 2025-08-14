import React, { useState } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { X, File, Circle } from 'lucide-react';

export function TabBar() {
  const { openTabs, activeFile, setActiveFile, files, updateFile } = usePlayground();
  const [unsavedTabs, setUnsavedTabs] = useState<Set<string>>(new Set());

  const closeTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Remove from open tabs
    const newTabs = openTabs.filter(tab => tab !== path);
    
    // If closing active tab, switch to another tab
    if (activeFile === path) {
      const currentIndex = openTabs.indexOf(path);
      const nextTab = newTabs[currentIndex] || newTabs[currentIndex - 1] || newTabs[0];
      setActiveFile(nextTab || null);
    }
    
    // Update context (this would need to be implemented in the context)
    console.log('Close tab:', path);
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || path;
  };

  const getFileIcon = (path: string) => {
    const extension = path.split('.').pop()?.toLowerCase();
    
    // File type specific icons
    const iconMap: Record<string, string> = {
      'tsx': '⚛️',
      'ts': '🔷',
      'jsx': '⚛️',
      'js': '🟨',
      'css': '🎨',
      'scss': '🎨',
      'html': '🌐',
      'json': '📄',
      'md': '📝',
    };
    
    return (
      <span className="text-xs">
        {iconMap[extension || ''] || '📄'}
      </span>
    );
  };

  const isModified = (path: string) => {
    // This would check if file has unsaved changes
    return unsavedTabs.has(path);
  };

  return (
    <div className="flex items-center bg-gray-100 border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
      {openTabs.map((path) => (
        <div
          key={path}
          className={`flex items-center space-x-2 px-3 py-2 text-sm border-r border-gray-200 cursor-pointer min-w-0 max-w-[200px] group ${
            activeFile === path
              ? 'bg-white text-gray-900 border-b-2 border-blue-500'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveFile(path)}
          title={path}
        >
          {getFileIcon(path)}
          <span className="truncate flex-1">{getFileName(path)}</span>
          
          {isModified(path) ? (
            <Circle className="h-2 w-2 fill-current text-orange-500" />
          ) : (
            <button
              onClick={(e) => closeTab(path, e)}
              className="p-0.5 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}
      
      {openTabs.length === 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          No files open
        </div>
      )}
    </div>
  );
}
