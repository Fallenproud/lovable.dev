import React, { useState, useMemo } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface EnhancedFileTreeProps {
  searchQuery: string;
  sortBy: 'name' | 'modified' | 'type';
}

interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileTreeNode[];
  size?: number;
  modified?: Date;
  language?: string;
}

import React, { useState, useMemo, useCallback } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface EnhancedFileTreeProps {
  searchQuery: string;
  sortBy: 'name' | 'modified' | 'type';
}

interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileTreeNode[];
  size?: number;
  modified?: Date;
  language?: string;
}

export function EnhancedFileTree({ searchQuery, sortBy }: EnhancedFileTreeProps) {
  const { files, activeFile, setActiveFile, createFile, deleteFile, updateFile } = usePlayground();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; path: string; type: 'file' | 'directory' } | null>(null);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [hiddenFiles, setHiddenFiles] = useState<Set<string>>(new Set());
  const [draggedItem, setDraggedItem] = useState<string | null>(null); // For drag and drop

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = useCallback((path: string) => {
    if (files[path]?.type === 'file') {
      setActiveFile(path);
    }
  }, [files, setActiveFile]);

  const handleContextMenu = useCallback((e: React.MouseEvent, path: string, type: 'file' | 'directory') => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, path, type });
  }, []);

  const handleRename = useCallback((path: string) => {
    setRenamingFile(path);
    setNewName(path.split('/').pop() || '');
    setContextMenu(null);
  }, []);

  const confirmRename = useCallback(() => {
    if (renamingFile && newName.trim() && newName !== renamingFile.split('/').pop()) {
      const pathParts = renamingFile.split('/');
      pathParts[pathParts.length - 1] = newName.trim();
      const newPath = pathParts.join('/');
      
      // Create new file with new name
      if (files[renamingFile]) {
        createFile(newPath, files[renamingFile].content);
        deleteFile(renamingFile);
      }
    }
    setRenamingFile(null);
    setNewName('');
  }, [renamingFile, newName, files, createFile, deleteFile]);

  const handleDelete = useCallback((path: string) => {
    if (confirm(`Are you sure you want to delete ${path}?`)) {
      deleteFile(path);
    }
    setContextMenu(null);
  }, [deleteFile]);

  const handleCopy = useCallback((path: string) => {
    if (files[path]) {
      navigator.clipboard.writeText(files[path].content || '');
    }
    setContextMenu(null);
  }, [files]);

  const handleDownload = useCallback((path: string) => {
    if (files[path]) {
      const blob = new Blob([files[path].content || ''], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = path.split('/').pop() || 'file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setContextMenu(null);
  }, [files]);

  const toggleFileVisibility = useCallback((path: string) => {
    const newHidden = new Set(hiddenFiles);
    if (newHidden.has(path)) {
      newHidden.delete(path);
    } else {
      newHidden.add(path);
    }
    setHiddenFiles(newHidden);
    setContextMenu(null);
  }, [hiddenFiles]);

  // Build and sort file tree
  const fileTree = useMemo(() => {
    const tree: Record<string, FileTreeNode> = {};
    
    Object.entries(files).forEach(([path, fileData]) => {
      // Apply search filter
      if (searchQuery && !path.toLowerCase().includes(searchQuery.toLowerCase())) {
        return;
      }
      
      // Skip hidden files
      if (hiddenFiles.has(path)) {
        return;
      }
      
      const parts = path.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        const currentPath = parts.slice(0, index + 1).join('/');
        const isFile = index === parts.length - 1;
        
        if (!current[part]) {
          current[part] = {
            name: part,
            path: currentPath,
            type: isFile ? 'file' : 'directory',
            children: {},
            size: fileData.metadata?.size,
            modified: fileData.metadata?.modified,
            language: fileData.metadata?.language,
          };
        }
        
        if (!isFile) {
          current = current[part].children as Record<string, FileTreeNode>;
        }
      });
    });
    
    // Sort function
    const sortNodes = useCallback((nodes: Record<string, FileTreeNode>): FileTreeNode[] => {
      return Object.values(nodes).sort((a, b) => {
        // Directories first
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        
        switch (sortBy) {
          case 'modified':
            return (b.modified?.getTime() || 0) - (a.modified?.getTime() || 0);
          case 'type':
            return (a.language || '').localeCompare(b.language || '');
          default:
            return a.name.localeCompare(b.name);
        }
      });
    }, [sortBy]);
    
    const sortTreeRecursively = (node: FileTreeNode): FileTreeNode => {
      if (node.type === 'directory' && node.children) {
        const sortedChildren = sortNodes(node.children as Record<string, FileTreeNode>);
        return {
          ...node,
          children: sortedChildren.map(sortTreeRecursively),
        };
      }
      return node;
    };
    
    const rootNodes = sortNodes(tree);
    return rootNodes.map(sortTreeRecursively);
  }, [files, searchQuery, sortBy, hiddenFiles, sortNodes]);

  const getFileIcon = (node: FileTreeNode) => {
    if (node.type === 'directory') {
      const isExpanded = expandedFolders.has(node.path);
      return isExpanded ? <FolderOpen className="h-4 w-4 text-blue-600" /> : <Folder className="h-4 w-4 text-blue-600" />;
    }
    
    // File type specific icons could be added here
    return <File className="h-4 w-4 text-gray-500" />;
  };

  const renderTreeNode = (node: FileTreeNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isActive = activeFile === node.path;
    const isRenaming = renamingFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={`flex items-center space-x-1 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 group ${
            isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => node.type === 'file' ? handleFileClick(node.path) : toggleFolder(node.path)}
          onContextMenu={(e) => handleContextMenu(e, node.path, node.type)}
          draggable={node.type === 'file'} // Only files are draggable for now
          onDragStart={(e) => {
            e.stopPropagation();
            setDraggedItem(node.path);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', node.path);
          }}
          onDragOver={(e) => {
            e.preventDefault(); // Allow drop
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (draggedItem && draggedItem !== node.path) {
              // Simulate move operation
              const oldPath = draggedItem;
              let newPath = node.path;
              
              if (node.type === 'directory') {
                newPath = `${node.path}/${oldPath.split('/').pop()}`;
              } else {
                // If dropping on a file, assume move to its parent directory
                const parentDir = node.path.substring(0, node.path.lastIndexOf('/'));
                newPath = `${parentDir}/${oldPath.split('/').pop()}`;
              }

              if (files[oldPath]) {
                createFile(newPath, files[oldPath].content);
                deleteFile(oldPath);
                setActiveFile(newPath);
                console.log(`Moved ${oldPath} to ${newPath}`);
              }
            }
            setDraggedItem(null);
          }}
          onDragEnd={() => setDraggedItem(null)}
        >
          {node.type === 'directory' && (
            <button className="p-0.5 hover:bg-gray-200 rounded">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          
          {getFileIcon(node)}
          
          {isRenaming ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={confirmRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmRename();
                if (e.key === 'Escape') {
                  setRenamingFile(null);
                  setNewName('');
                }
              }}
              className="flex-1 px-1 py-0.5 text-xs border border-blue-500 rounded"
              autoFocus
            />
          ) : (
            <span className="truncate flex-1">{node.name}</span>
          )}
          
          {node.type === 'file' && (
            <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
              <span className="text-xs text-gray-400">{node.language}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenu(e, node.path, node.type);
                }}
                className="p-0.5 hover:bg-gray-200 rounded"
              >
                <MoreHorizontal className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
        
        {node.type === 'directory' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="space-y-0.5">
        {fileTree.length > 0 ? (
          fileTree.map((node) => renderTreeNode(node))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <File className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">
              {searchQuery ? 'No files match your search' : 'No files found'}
            </p>
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
            className="fixed z-20 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[160px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => {
                const fileName = prompt('Enter new file name:');
                if (fileName) {
                  const basePath = contextMenu.type === 'directory' ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf('/'));
                  createFile(`${basePath}/${fileName}`);
                }
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
            >
              <Plus className="h-3 w-3 mr-2" />
              New File
            </button>
            <button
              onClick={() => {
                const folderName = prompt('Enter new folder name:');
                if (folderName) {
                  const basePath = contextMenu.type === 'directory' ? contextMenu.path : contextMenu.path.substring(0, contextMenu.path.lastIndexOf('/'));
                  createFile(`${basePath}/${folderName}/.gitkeep`); // Create a dummy file to represent folder
                }
                setContextMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
            >
              <FolderPlus className="h-3 w-3 mr-2" />
              New Folder
            </button>
            <hr className="my-1" />
            
            {contextMenu.type === 'file' && (
              <>
                <button
                  onClick={() => handleCopy(contextMenu.path)}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy Content
                </button>
                <button
                  onClick={() => handleDownload(contextMenu.path)}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Download
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => toggleFileVisibility(contextMenu.path)}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center"
                >
                  {hiddenFiles.has(contextMenu.path) ? (
                    <>
                      <Eye className="h-3 w-3 mr-2" />
                      Show
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-2" />
                      Hide
                    </>
                  )}
                </button>
              </>
            )}
            
            <hr className="my-1" />
            <button
              onClick={() => handleDelete(contextMenu.path)}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-red-50 text-red-600 flex items-center"
            >
              <Trash2 className="h-3 w-3 mr-2" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
