import React from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Zap,
  Brain,
  Settings
} from 'lucide-react';

interface StatusBarProps {
  onToggleIntelligence: () => void;
  showIntelligence: boolean;
  onOpenSettings: () => void;
}

export function StatusBar({ onToggleIntelligence, showIntelligence, onOpenSettings }: StatusBarProps) {
  const { files, activeFile, project, isBuilding } = usePlayground();
  
  const fileCount = Object.keys(files).length;
  const currentFile = activeFile ? files[activeFile] : null;
  
  // Mock data for demonstration
  const errors = 0;
  const warnings = 0;
  const buildTime = '1.2s';

  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-xs flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* File count */}
        <div className="flex items-center space-x-1">
          <FileText className="h-3 w-3" />
          <span>{fileCount} files</span>
        </div>
        
        {/* Current file info */}
        {currentFile && (
          <div className="flex items-center space-x-1">
            <span>•</span>
            <span>{activeFile}</span>
            <span>•</span>
            <span>{currentFile.metadata.language}</span>
          </div>
        )}
        
        {/* Build status */}
        <div className="flex items-center space-x-1">
          {isBuilding ? (
            <>
              <Clock className="h-3 w-3 animate-spin" />
              <span>Building...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-3 w-3" />
              <span>Ready</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Errors and warnings */}
        {errors > 0 && (
          <div className="flex items-center space-x-1 text-red-300">
            <AlertCircle className="h-3 w-3" />
            <span>{errors} errors</span>
          </div>
        )}
        
        {warnings > 0 && (
          <div className="flex items-center space-x-1 text-yellow-300">
            <AlertCircle className="h-3 w-3" />
            <span>{warnings} warnings</span>
          </div>
        )}
        
        {/* Build time */}
        <div className="flex items-center space-x-1">
          <Zap className="h-3 w-3" />
          <span>Built in {buildTime}</span>
        </div>
        
        {/* Code Intelligence Toggle */}
        <button
          onClick={onToggleIntelligence}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors ${
            showIntelligence ? 'bg-blue-700' : ''
          }`}
          title="Toggle Code Intelligence (Ctrl+I)"
        >
          <Brain className="h-3 w-3" />
          <span>Intelligence</span>
        </button>
        
        {/* Framework */}
        <div className="flex items-center space-x-1">
          <span className="capitalize">{project?.framework || 'React'}</span>
        </div>

        {/* Editor Settings Toggle */}
        <button
          onClick={onOpenSettings}
          className="flex items-center space-x-1 px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
          title="Editor Settings (Ctrl+,)"
        >
          <Settings className="h-3 w-3" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
