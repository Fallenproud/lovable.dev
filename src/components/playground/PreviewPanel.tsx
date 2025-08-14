import React, { useState, useRef, useEffect } from 'react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  RefreshCw, 
  ExternalLink, 
  Monitor, 
  Smartphone, 
  Tablet,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

export function PreviewPanel() {
  const { 
    files, 
    previewDevice, 
    setPreviewDevice, 
    isBuilding,
    project 
  } = usePlayground();
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [buildErrors, setBuildErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Simulate build process
  useEffect(() => {
    const buildPreview = async () => {
      setIsLoading(true);
      setBuildErrors([]);
      
      try {
        // Simulate build delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a simple HTML preview
        const htmlContent = generatePreviewHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      } catch (error) {
        setBuildErrors(['Failed to build preview']);
      } finally {
        setIsLoading(false);
      }
    };

    if (Object.keys(files).length > 0) {
      buildPreview();
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [files]);

  const generatePreviewHTML = () => {
    const appFile = files['src/App.tsx'];
    const cssFile = files['src/index.css'];
    
    // This is a simplified preview generation
    // In a real implementation, you'd use a proper bundler
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview - ${project?.name || 'Lovable Project'}</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${cssFile?.content || ''}
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${appFile?.content || 'function App() { return React.createElement("div", null, "Hello World"); }'}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  </script>
</body>
</html>`;
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleOpenExternal = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-80 h-[600px] mx-auto';
      case 'tablet':
        return 'w-[768px] h-[600px] mx-auto';
      default:
        return 'w-full h-full';
    }
  };

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Preview Header */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-gray-900">Preview</h3>
            {isLoading && <Loader className="h-4 w-4 text-blue-600 animate-spin" />}
            {!isLoading && buildErrors.length === 0 && previewUrl && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            {buildErrors.length > 0 && (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Device selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
              {Object.entries(deviceIcons).map(([device, Icon]) => (
                <button
                  key={device}
                  onClick={() => setPreviewDevice(device as any)}
                  className={`p-1.5 rounded ${
                    previewDevice === device
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title={`${device} view`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            
            <button
              onClick={handleRefresh}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded"
              title="Refresh preview"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleOpenExternal}
              disabled={!previewUrl}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded disabled:opacity-50"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Loader className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Building preview...</p>
            </div>
          </div>
        ) : buildErrors.length > 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Build Failed</h3>
              <div className="text-left bg-red-50 border border-red-200 rounded-md p-3">
                {buildErrors.map((error, index) => (
                  <p key={index} className="text-sm text-red-700 font-mono">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : previewUrl ? (
          <div className={`${getDeviceClass()} border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm`}>
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full h-full border-0"
              title="Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Monitor className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
              <p className="text-gray-600">Start coding to see your app come to life</p>
            </div>
          </div>
        )}
      </div>

      {/* Console/Logs (if needed) */}
      {buildErrors.length === 0 && previewUrl && (
        <div className="border-t border-gray-200 bg-white p-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Build successful • Ready for development</span>
          </div>
        </div>
      )}
    </div>
  );
}
