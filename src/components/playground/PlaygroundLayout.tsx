import React, { useEffect, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { EnhancedChatPanel } from './EnhancedChatPanel';
import { EditorPanel } from './EditorPanel';
import { PreviewPanel } from './PreviewPanel';
import { PlaygroundHeader } from './PlaygroundHeader';
import { StatusBar } from './StatusBar';
import { CodeIntelligence } from './CodeIntelligence';
import { EditorSettings } from './EditorSettings';
import { GripVertical } from 'lucide-react';

export function PlaygroundLayout() {
  const { layout, updateLayout } = usePlayground();
  const layoutRef = useRef<HTMLDivElement>(null);
  const [showCodeIntelligence, setShowCodeIntelligence] = useState(false);
  const [showEditorSettings, setShowEditorSettings] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    theme: 'lovable-dark',
    tabSize: 2,
    wordWrap: true,
    minimap: true,
    lineNumbers: true,
    bracketPairColorization: true,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    renderWhitespace: 'selection',
  });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            // TODO: Trigger save
            break;
          case '1':
            e.preventDefault();
            updateLayout({
              collapsed: { ...layout.collapsed, chat: !layout.collapsed.chat }
            });
            break;
          case '2':
            e.preventDefault();
            updateLayout({
              collapsed: { ...layout.collapsed, editor: !layout.collapsed.editor }
            });
            break;
          case '3':
            e.preventDefault();
            updateLayout({
              collapsed: { ...layout.collapsed, preview: !layout.collapsed.preview }
            });
            break;
          case 'i':
            e.preventDefault();
            setShowCodeIntelligence(!showCodeIntelligence);
            break;
          case ',':
            e.preventDefault();
            setShowEditorSettings(true);
            break;
          case 'm': // Mock for showing comments/references
            e.preventDefault();
            // This would typically open a specific tab in CodeIntelligence
            setShowCodeIntelligence(!showCodeIntelligence);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [layout.collapsed, updateLayout]);

  const handlePanelResize = (sizes: number[]) => {
    const [chatWidth, editorWidth, previewWidth] = sizes;
    updateLayout({
      chatWidth,
      editorWidth,
      previewWidth,
    });
  };

  return (
    <div ref={layoutRef} className="h-screen flex flex-col bg-gray-50">
      <PlaygroundHeader />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full"
        >
          {/* Chat Panel */}
          {!layout.collapsed.chat && (
            <>
              <Panel
                defaultSize={layout.chatWidth}
                minSize={20}
                maxSize={50}
                className="bg-white border-r border-gray-200"
              >
                <EnhancedChatPanel />
              </Panel>
              
              <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors relative group">
                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 flex items-center justify-center">
                  <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </div>
              </PanelResizeHandle>
            </>
          )}

          {/* Editor Panel */}
          {!layout.collapsed.editor && (
            <>
              <Panel
                defaultSize={layout.editorWidth}
                minSize={30}
                maxSize={70}
                className="bg-white"
              >
                <EditorPanel />
              </Panel>
              
              {!layout.collapsed.preview && (
                <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors relative group">
                  <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 flex items-center justify-center">
                    <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </PanelResizeHandle>
              )}
            </>
          )}

          {/* Preview Panel */}
          {!layout.collapsed.preview && (
            <Panel
              defaultSize={layout.previewWidth}
              minSize={20}
              maxSize={60}
              className="bg-white border-l border-gray-200"
            >
              <PreviewPanel />
            </Panel>
          )}
        </PanelGroup>
      </div>
      
      <StatusBar 
        onToggleIntelligence={() => setShowCodeIntelligence(!showCodeIntelligence)}
        showIntelligence={showCodeIntelligence}
        onOpenSettings={() => setShowEditorSettings(true)}
      />
      
      <CodeIntelligence 
        isVisible={showCodeIntelligence}
        onClose={() => setShowCodeIntelligence(false)}
      />
      
      <EditorSettings
        isOpen={showEditorSettings}
        onClose={() => setShowEditorSettings(false)}
        settings={editorSettings}
        onSettingsChange={setEditorSettings}
      />
    </div>
  );
}
