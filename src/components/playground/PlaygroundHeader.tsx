switchimport React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { VersionHistoryModal } from './VersionHistoryModal';
import { 
  Save, 
  Share, 
  Settings, 
  Monitor, 
  Smartphone, 
  Tablet,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Play,
  Square,
  ArrowLeft,
  Home,
  Users,
  History
} from 'lucide-react';

export function PlaygroundHeader() {
  const { 
    project, 
    layout, 
    togglePanel, 
    previewDevice, 
    setPreviewDevice,
    isBuilding,
    setIsBuilding 
  } = usePlayground();
  
  const { 
    project, 
    layout, 
    togglePanel, 
    previewDevice, 
    setPreviewDevice,
    isBuilding,
    setIsBuilding,
    collaborators, // Get collaborators from context
    activeFile // Needed for version history
  } = usePlayground();
  
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false); // State for version history modal

  const handleSave = async () => {
    // TODO: Implement save functionality
    console.log('Saving project...');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing project...');
  };

  const handleBuild = () => {
    setIsBuilding(!isBuilding);
    // TODO: Implement build functionality
    setTimeout(() => setIsBuilding(false), 2000);
  };

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  };

  const DeviceIcon = deviceIcons[previewDevice];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left side - Navigation and Project info */}
      <div className="flex items-center space-x-4">
        <Link
          to="/app"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-1.svg" alt="Lovable" className="h-6 w-6" />
            <span className="font-semibold text-gray-900 hidden sm:inline">Lovable</span>
          </Link>
          <span className="text-gray-400 hidden sm:inline">/</span>
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
            {project?.name || 'Untitled Project'}
          </h1>
          {project?.description && (
            <span className="text-sm text-gray-500 hidden md:inline">
              • {project.description}
            </span>
          )}
        </div>

        {/* Collaborators */}
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4 text-gray-500" />
          <div className="flex -space-x-1 overflow-hidden">
            {collaborators.slice(0, 3).map(collab => (
              <img
                key={collab.id}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={collab.avatar}
                alt={collab.name}
                title={collab.name}
              />
            ))}
            {collaborators.length > 3 && (
              <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 text-gray-600 text-xs flex items-center justify-center">
                +{collaborators.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleBuild}
            disabled={isBuilding}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            {isBuilding ? (
              <>
                <Square className="h-3 w-3 mr-1.5" />
                Building...
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1.5" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Center - Panel toggles */}
      <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => togglePanel('chat')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !layout.collapsed.chat
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => togglePanel('editor')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !layout.collapsed.editor
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => togglePanel('preview')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !layout.collapsed.preview
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        {/* Device selector */}
        <div className="relative">
          <button
            onClick={() => setShowDeviceMenu(!showDeviceMenu)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <DeviceIcon className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline capitalize">{previewDevice}</span>
          </button>
          
          {showDeviceMenu && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {Object.entries(deviceIcons).map(([device, Icon]) => (
                <button
                  key={device}
                  onClick={() => {
                    setPreviewDevice(device as any);
                    setShowDeviceMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                    previewDevice === device ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="capitalize">{device}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <button
          onClick={handleSave}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Save className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Share className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="inline-flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          
          {showMoreMenu && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <Link
                to="/app/settings"
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </Link>
              <Link
                to="/app"
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <button 
                onClick={() => { /* TODO: Implement fullscreen */ setShowMoreMenu(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </button>
              <button 
                onClick={() => { setShowVersionHistory(true); setShowMoreMenu(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                disabled={!activeFile}
              >
                <History className="h-4 w-4 mr-2" />
                Version History
              </button>
            </div>
          )}
        </div>
      </div>
      
      {activeFile && (
        <VersionHistoryModal
          isOpen={showVersionHistory}
          onClose={() => setShowVersionHistory(false)}
          filePath={activeFile}
        />
      )}
    </header>
  );
}
