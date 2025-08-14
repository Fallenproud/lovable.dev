import React, { useState } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  Plus,
  MoreHorizontal
} from 'lucide-react';

interface FileTreeProps {
  searchQuery: string;
}

export function FileTree({ searchQuery }: FileTreeProps) {
  const { files, activeFile, setActiveFile, createFile, deleteFile } = usePlayground();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; path: string } | null>(null);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (path: string) => {
    setActiveFile(path);
  };

  const handleContextMenu = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, path });
  };

  const handleCreateFile = (basePath: string) => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const fullPath = basePath === '.' ? fileName : `${basePath}/${fileName}`;
      createFile(fullPath);
    }
    setContextMenu(null);
  };

  const handleDeleteFile = (path: string) => {
    if (confirm(`Are you sure you want to delete ${path}?`)) {
      deleteFile(path);
    }
    setContextMenu(null);
  };

  // Build file tree structure
  const buildFileTree = () => {
    const tree: any = {};
    
    Object.keys(files).forEach(path => {
      if (searchQuery && !path.toLowerCase().includes(searchQuery.toLowerCase())) {
        return;
      }
      
      const parts = path.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
            isFile: index === parts.length - 1,
            children: {},
          };
        }
        current = current[part].children;
      });
    });
    
    return tree;
  };

  const renderTreeNode = (node: any, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isActive = activeFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={`flex items-center space-x-1 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 ${
            isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => node.isFile ? handleFileClick(node.path) : toggleFolder(node.path)}
          onContextMenu={(e) => handleContextMenu(e, node.path)}
        >
          {!node.isFile && (
            <button className="p-0.5 hover:bg-gray-200 rounded">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          
          {node.isFile ? (
            <File className="h-4 w-4 text-gray-500" />
          ) : isExpanded ? (
            <FolderOpen className="h-4 w-4 text-blue-600" />
          ) : (
            <Folder className="h-4 w-4 text-blue-600" />
          )}
          
          <span className="truncate">{node.name}</span>
        </div>
        
        {!node.isFile && isExpanded && (
          <div>
            {Object.values(node.children).map((child: any) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const fileTree = buildFileTree();

  return (
    <div className="relative">
      <div className="p-2">
        {Object.values(fileTree).map((node: any) => renderTreeNode(node))}
        
        {Object.keys(fileTree).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <File className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No files found</p>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="fixed z-20 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[150px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => handleCreateFile(contextMenu.path)}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
            >
              <Plus className="h-3 w-3 mr-2" />
              New File
            </button>
            {files[contextMenu.path] && (
              <button
                onClick={() => handleDeleteFile(contextMenu.path)}
                className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 text-red-600 flex items-center"
              >
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
