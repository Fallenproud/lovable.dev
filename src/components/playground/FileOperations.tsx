import React, { useState, useRef } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  Plus, 
  FolderPlus, 
  Upload, 
  Download, 
  Search,
  Filter,
  SortAsc,
  MoreHorizontal,
  File,
  Folder,
  X,
  Check
} from 'lucide-react';

interface FileOperationsProps {
  onCreateFile: (path: string, content?: string) => void;
  onCreateFolder: (path: string) => void;
  onUploadFiles: (files: FileList) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'name' | 'modified' | 'type';
  onSortChange: (sort: 'name' | 'modified' | 'type') => void;
}

export function FileOperations({ 
  onCreateFile, 
  onCreateFolder, 
  onUploadFiles, 
  searchQuery, 
  onSearchChange,
  sortBy,
  onSortChange
}: FileOperationsProps) {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showSortMenu, setShowSortMenu] = useState(false); // New state for sort menu
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim());
      setNewFileName('');
      setShowNewFileDialog(false);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderDialog(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onUploadFiles(files);
    }
  };

  const fileTemplates = [
    { name: 'React Component', extension: 'tsx', template: `import React from 'react';

interface Props {
  // Add your props here
}

export function Component({ }: Props) {
  return (
    <div>
      {/* Your component content */}
    </div>
  );
}` },
    { name: 'TypeScript File', extension: 'ts', template: `// TypeScript file
export {};` },
    { name: 'CSS File', extension: 'css', template: `/* CSS styles */` },
    { name: 'JSON File', extension: 'json', template: `{}` },
  ];

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Create Menu */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </button>
            
            {showCreateMenu && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowNewFileDialog(true);
                    setShowCreateMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                >
                  <File className="h-4 w-4 mr-2" />
                  New File
                </button>
                <button
                  onClick={() => {
                    setShowNewFolderDialog(true);
                    setShowCreateMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                >
                  <Folder className="h-4 w-4 mr-2" />
                  New Folder
                </button>
                <hr className="my-1" />
                {fileTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => {
                      const fileName = `new-file.${template.extension}`;
                      onCreateFile(fileName, template.template);
                      setShowCreateMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {/* Sort Options */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
            title="Sort files"
          >
            <SortAsc className="h-4 w-4" />
          </button>
          {showSortMenu && (
            <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => { onSortChange('name'); setShowSortMenu(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'name' ? 'bg-gray-50 font-medium' : ''}`}
              >
                Name
              </button>
              <button
                onClick={() => { onSortChange('modified'); setShowSortMenu(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'modified' ? 'bg-gray-50 font-medium' : ''}`}
              >
                Modified
              </button>
              <button
                onClick={() => { onSortChange('type'); setShowSortMenu(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'type' ? 'bg-gray-50 font-medium' : ''}`}
              >
                Type
              </button>
            </div>
          )}
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
            <Filter className="h-4 w-4" /> {/* Placeholder for filter */}
          </button>
        </div>
      </div>

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New File</h3>
            <input
              type="text"
              placeholder="Enter file name (e.g., component.tsx)"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowNewFileDialog(false);
                  setNewFileName('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                disabled={!newFileName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Folder</h3>
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowNewFolderDialog(false);
                  setNewFolderName('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
