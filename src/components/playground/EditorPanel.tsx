import React, { useState } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { EnhancedFileTree } from './EnhancedFileTree';
import { FileOperations } from './FileOperations';
import { AdvancedCodeEditor } from './AdvancedCodeEditor';
import { TabBar } from './TabBar';
import { 
  FolderOpen, 
  File, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function EditorPanel() {
  const { files, activeFile, openTabs, createFile } = usePlayground();
  const [showFileTree, setShowFileTree] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'type'>('name'); // Added for sorting

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  const handleCreateFile = (path: string, content?: string) => {
    createFile(path, content);
  };

  const handleCreateFolder = (path: string) => {
    // Create a placeholder file in the folder to ensure it exists
    createFile(`${path}/.gitkeep`, '');
  };

  const handleUploadFiles = (fileList: FileList) => {
    Array.from(fileList).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        createFile(file.name, content);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="h-full flex">
      {/* File Explorer */}
      {showFileTree && (
        <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
          {/* File Explorer Header */}
          <div className="p-3 border-b border-gray-200 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Explorer</h3>
            
            <FileOperations
              onCreateFile={handleCreateFile}
              onCreateFolder={handleCreateFolder}
              onUploadFiles={handleUploadFiles}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy} // Pass sortBy
              onSortChange={setSortBy} // Pass onSortChange
            />
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-y-auto p-2">
            <EnhancedFileTree 
              searchQuery={searchQuery} 
              sortBy={sortBy}
            />
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toggle File Tree Button */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
          <button
            onClick={toggleFileTree}
            className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
            title={showFileTree ? 'Hide Explorer' : 'Show Explorer'}
          >
            {showFileTree ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {!showFileTree && (
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Explorer</span>
            </div>
          )}
        </div>

        {/* Tab Bar */}
        {openTabs.length > 0 && <TabBar />}

        {/* Editor */}
        <div className="flex-1">
          {activeFile ? (
            <AdvancedCodeEditor />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <File className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No file selected</p>
                <p className="text-sm mb-4">Select a file from the explorer to start editing</p>
                <button
                  onClick={() => handleCreateFile('new-file.tsx', `import React from 'react';

export function NewComponent() {
  return (
    <div className="p-4">
      <h1>Hello from Lovable!</h1>
    </div>
  );
}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Your First File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
