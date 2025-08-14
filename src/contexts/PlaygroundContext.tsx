import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PanelLayout, PlaygroundProject, ChatMessage, FileTree, ProjectSettings } from '../types/playground';

interface PlaygroundContextType {
  // Project state
  project: PlaygroundProject | null;
  setProject: (project: PlaygroundProject) => void;
  
  // Layout state
  layout: PanelLayout;
  updateLayout: (layout: Partial<PanelLayout>) => void;
  togglePanel: (panel: 'chat' | 'editor' | 'preview') => void;
  
  // File management
  files: FileTree;
  activeFile: string | null;
  openTabs: string[];
  setActiveFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  createFile: (path: string, content?: string) => void;
  deleteFile: (path: string) => void;
  
  // Chat state
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  
  // Preview state
  previewUrl: string | null;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  isBuilding: boolean;
  setIsBuilding: (building: boolean) => void;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

const defaultLayout: PanelLayout = {
  chatWidth: 30,
  editorWidth: 40,
  previewWidth: 30,
  collapsed: {
    chat: false,
    editor: false,
    preview: false,
  },
};

const defaultProject: PlaygroundProject = {
  id: 'new-project',
  name: 'New Project',
  description: 'A new Lovable project',
  framework: 'react',
  files: {
    'src/App.tsx': {
      name: 'App.tsx',
      type: 'file',
      content: `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Lovable
        </h1>
        <p className="text-gray-600">
          Start building something amazing with AI
        </p>
      </div>
    </div>
  );
}

export default App;`,
      metadata: {
        size: 0,
        modified: new Date(),
        language: 'typescript',
      },
    },
    'src/index.tsx': {
      name: 'index.tsx',
      type: 'file',
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      metadata: {
        size: 0,
        modified: new Date(),
        language: 'typescript',
      },
    },
    'src/index.css': {
      name: 'index.css',
      type: 'file',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
      metadata: {
        size: 0,
        modified: new Date(),
        language: 'css',
      },
    },
  },
  settings: {
    framework: 'react',
    buildTool: 'vite',
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'tailwindcss': '^3.4.0',
    },
    environment: 'development',
    autoSave: true,
    formatOnSave: true,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<PlaygroundProject>(defaultProject);
  const [layout, setLayout] = useState<PanelLayout>(defaultLayout);
  const [activeFile, setActiveFile] = useState<string>('src/App.tsx');
  const [openTabs, setOpenTabs] = useState<string[]>(['src/App.tsx']);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load chat history from localStorage
    try {
      const saved = localStorage.getItem('lovable_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isBuilding, setIsBuilding] = useState(false);
  const [collaborators, setCollaborators] = useState<import('../types/playground').Collaborator[]>([]); // Mock collaborators

  // Load layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('lovable_playground_layout');
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout));
      } catch (error) {
        console.error('Failed to load layout:', error);
      }
    }
  }, []);

  // Save layout to localStorage
  const updateLayout = useCallback((newLayout: Partial<PanelLayout>) => {
    setLayout(prev => {
      const updated = { ...prev, ...newLayout };
      localStorage.setItem('lovable_playground_layout', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const togglePanel = useCallback((panel: 'chat' | 'editor' | 'preview') => {
    updateLayout({
      collapsed: {
        ...layout.collapsed,
        [panel]: !layout.collapsed[panel],
      },
    });
  }, [layout.collapsed, updateLayout]);

  const updateFile = useCallback((path: string, content: string) => {
    if (!project) return;
    
    setProject(prev => {
      const currentFile = prev!.files[path];
      const newFiles = {
        ...prev!.files,
        [path]: {
          ...currentFile,
          content,
          metadata: {
            ...currentFile.metadata,
            modified: new Date(),
          },
        },
      };

      // Add to versions if content changed significantly (mock)
      if (currentFile.content !== content) {
        const newVersion = {
          id: `v${Date.now()}`,
          timestamp: new Date(),
          authorId: 'mock-user-1', // Replace with actual user ID
          authorName: 'Demo User',
          changesSummary: `Updated ${currentFile.name}`,
          content: content,
        };
        newFiles[path].versions = [...(currentFile.versions || []), newVersion];
      }

      return {
        ...prev!,
        files: newFiles,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [project]);

  const createFile = useCallback((path: string, content = '') => {
    if (!project) return;
    
    const fileName = path.split('/').pop() || 'untitled';
    const extension = fileName.split('.').pop() || '';
    const language = getLanguageFromExtension(extension);
    
    setProject(prev => ({
      ...prev!,
      files: {
        ...prev!.files,
        [path]: {
          name: fileName,
          type: 'file',
          content,
          metadata: {
            size: content.length,
            modified: new Date(),
            language,
          },
        },
      },
      updatedAt: new Date().toISOString(),
    }));
    
    // Open the new file
    setActiveFile(path);
    setOpenTabs(prev => prev.includes(path) ? prev : [...prev, path]);
  }, [project]);

  const deleteFile = useCallback((path: string) => {
    if (!project) return;
    
    setProject(prev => {
      const newFiles = { ...prev!.files };
      delete newFiles[path];
      
      return {
        ...prev!,
        files: newFiles,
        updatedAt: new Date().toISOString(),
      };
    });
    
    // Remove from open tabs
    setOpenTabs(prev => prev.filter(tab => tab !== path));
    
    // Switch to another file if this was active
    if (activeFile === path) {
      const remainingTabs = openTabs.filter(tab => tab !== path);
      setActiveFile(remainingTabs[0] || Object.keys(project.files)[0] || null);
    }
  }, [project, activeFile, openTabs]);

  // Comment management
  const addComment = useCallback((filePath: string, line: number, content: string) => {
    if (!project || !project.files[filePath]) return;

    setProject(prev => {
      const file = prev!.files[filePath];
      const newComment: import('../types/playground').CodeComment = {
        id: `comment-${Date.now()}`,
        authorId: 'mock-user-1',
        authorName: 'Demo User',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        line,
        content,
        createdAt: new Date(),
      };
      return {
        ...prev!,
        files: {
          ...prev!.files,
          [filePath]: {
            ...file,
            comments: [...(file.comments || []), newComment],
          },
        },
      };
    });
  }, [project]);

  const resolveComment = useCallback((filePath: string, commentId: string) => {
    if (!project || !project.files[filePath]) return;

    setProject(prev => {
      const file = prev!.files[filePath];
      return {
        ...prev!,
        files: {
          ...prev!.files,
          [filePath]: {
            ...file,
            comments: file.comments?.map(c => 
              c.id === commentId ? { ...c, resolved: !c.resolved } : c
            ),
          },
        },
      };
    });
  }, [project]);

  // Mock collaborators setup
  useEffect(() => {
    setCollaborators([
      { id: 'user-1', name: 'Demo User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', color: '#FF0000', activeFile: 'src/App.tsx', isTyping: false },
      { id: 'user-2', name: 'Alice', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face', color: '#00FF00', activeFile: 'src/index.tsx', isTyping: true },
      { id: 'user-3', name: 'Bob', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', color: '#0000FF', activeFile: null, isTyping: false },
    ]);
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Auto-save conversation
    localStorage.setItem('lovable_chat_history', JSON.stringify([...messages, newMessage]));
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('lovable_chat_history');
  }, []);

  return (
    <PlaygroundContext.Provider
      value={{
        project,
        setProject,
        layout,
        updateLayout,
        togglePanel,
        files: project?.files || {},
        activeFile,
        openTabs,
        setActiveFile,
        updateFile,
        createFile,
        deleteFile,
        messages,
        addMessage,
        clearMessages,
        isTyping,
        setIsTyping,
        previewUrl,
        previewDevice,
        setPreviewDevice,
        isBuilding,
        setIsBuilding,
        collaborators,
        addComment,
        resolveComment,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (context === undefined) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
}

function getLanguageFromExtension(extension: string): string {
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'go': 'go',
    'rs': 'rust',
    'php': 'php',
    'rb': 'ruby',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
  };
  
  return languageMap[extension] || 'plaintext';
}
