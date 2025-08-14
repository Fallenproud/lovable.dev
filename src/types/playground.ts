export interface PanelLayout {
  chatWidth: number;
  editorWidth: number;
  previewWidth: number;
  collapsed: {
    chat: boolean;
    editor: boolean;
    preview: boolean;
  };
}

export interface PlaygroundProject {
  id: string;
  name: string;
  description?: string;
  framework: 'react' | 'vue' | 'vanilla' | 'next';
  files: FileTree;
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
}

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
  metadata: {
    size: number;
    modified: Date;
    language: string;
  };
  comments?: CodeComment[]; // Add comments to file node
  versions?: FileVersion[]; // Add versions to file node
}

export interface FileTree {
  [path: string]: FileNode;
}

export interface ProjectSettings {
  framework: 'react' | 'vue' | 'vanilla' | 'next';
  buildTool: 'vite' | 'webpack' | 'parcel';
  dependencies: Record<string, string>;
  environment: 'development' | 'production';
  autoSave: boolean;
  formatOnSave: boolean;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    codeBlocks?: CodeBlock[];
    files?: string[];
    actions?: Action[];
  };
  suggestions?: string[];
  context?: ChatContext;
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface Action {
  type: 'create_file' | 'update_file' | 'delete_file' | 'run_command';
  payload: any;
}

export interface ChatContext {
  projectId: string;
  currentFiles: string[];
  recentChanges: string[];
  userIntent: string;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface PreviewError {
  type: 'build' | 'runtime' | 'network';
  message: string;
  file?: string;
  line?: number;
  column?: number;
}

export interface CodeComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  line: number;
  content: string;
  createdAt: Date;
  resolved?: boolean;
}

export interface FileVersion {
  id: string;
  timestamp: Date;
  authorId: string;
  authorName: string;
  changesSummary: string;
  content: string; // Full content of the file at this version
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  color: string; // For cursor/selection
  activeFile?: string;
  isTyping?: boolean;
}
