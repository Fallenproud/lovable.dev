# Component Specifications

## Playground Components

### 1. PlaygroundLayout Component

**Purpose**: Main layout container for the playground environment

**Props**:
```typescript
interface PlaygroundLayoutProps {
  projectId: string;
  initialLayout?: PanelLayout;
  onLayoutChange?: (layout: PanelLayout) => void;
}
```

**Features**:
- Resizable three-panel layout
- Responsive breakpoints
- Panel collapse/expand
- Layout persistence
- Keyboard shortcuts

### 2. ChatPanel Component

**Purpose**: AI conversation interface

**Props**:
```typescript
interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  context?: ChatContext;
}
```

**Features**:
- Message history with virtualization
- Code block syntax highlighting
- Copy-to-clipboard functionality
- Message reactions
- Context awareness display

### 3. EditorPanel Component

**Purpose**: Code editing interface with file management

**Props**:
```typescript
interface EditorPanelProps {
  files: FileTree;
  activeFile: string;
  onFileChange: (path: string, content: string) => void;
  onFileSelect: (path: string) => void;
  language: string;
}
```

**Features**:
- Monaco Editor integration
- Multi-tab support
- File explorer tree
- Syntax highlighting
- Auto-completion
- Error highlighting

### 4. PreviewPanel Component

**Purpose**: Live preview of the generated application

**Props**:
```typescript
interface PreviewPanelProps {
  projectFiles: FileTree;
  framework: Framework;
  onError: (error: PreviewError) => void;
  device?: DeviceType;
}
```

**Features**:
- Sandboxed iframe preview
- Hot reload on changes
- Device simulation
- Console output capture
- Error boundary handling

## Implementation Priority

### Week 1: Layout Foundation
```typescript
// PlaygroundLayout.tsx
export function PlaygroundLayout({ projectId, initialLayout, onLayoutChange }: PlaygroundLayoutProps) {
  const [layout, setLayout] = useState(initialLayout || defaultLayout);
  const [panelSizes, setPanelSizes] = useState([30, 40, 30]); // Chat, Editor, Preview percentages
  
  return (
    <div className="playground-layout h-screen flex flex-col">
      <PlaygroundHeader projectId={projectId} />
      <div className="flex-1 flex">
        <ResizablePanel size={panelSizes[0]} minSize={20} maxSize={50}>
          <ChatPanel />
        </ResizablePanel>
        <ResizablePanel size={panelSizes[1]} minSize={30} maxSize={60}>
          <EditorPanel />
        </ResizablePanel>
        <ResizablePanel size={panelSizes[2]} minSize={20} maxSize={50}>
          <PreviewPanel />
        </ResizablePanel>
      </div>
      <StatusBar />
    </div>
  );
}
```

### Week 2: Chat Interface
```typescript
// ChatPanel.tsx
export function ChatPanel({ messages, onSendMessage, isTyping, context }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  return (
    <div className="chat-panel h-full flex flex-col">
      <div className="chat-header p-4 border-b">
        <h3 className="font-semibold">AI Assistant</h3>
        {context && <ContextDisplay context={context} />}
      </div>
      
      <div className="messages flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input p-4 border-t">
        <MessageInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          placeholder="Describe what you want to build..."
        />
      </div>
    </div>
  );
}
```

### Week 3: Code Editor
```typescript
// EditorPanel.tsx
export function EditorPanel({ files, activeFile, onFileChange, onFileSelect, language }: EditorPanelProps) {
  const [openTabs, setOpenTabs] = useState<string[]>([activeFile]);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  
  return (
    <div className="editor-panel h-full flex">
      <div className="file-explorer w-64 border-r">
        <FileTree
          files={files}
          activeFile={activeFile}
          onFileSelect={onFileSelect}
        />
      </div>
      
      <div className="editor-area flex-1 flex flex-col">
        <TabBar
          tabs={openTabs}
          activeTab={activeFile}
          onTabSelect={onFileSelect}
          onTabClose={(path) => setOpenTabs(tabs => tabs.filter(t => t !== path))}
        />
        
        <div className="editor-container flex-1">
          <MonacoEditor
            ref={editorRef}
            language={language}
            value={files[activeFile]?.content || ''}
            onChange={(value) => onFileChange(activeFile, value)}
            options={{
              theme: 'vs-dark',
              fontSize: 14,
              minimap: { enabled: true },
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

### Week 4: Preview System
```typescript
// PreviewPanel.tsx
export function PreviewPanel({ projectFiles, framework, onError, device = 'desktop' }: PreviewPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    buildPreview(projectFiles, framework)
      .then(setPreviewUrl)
      .catch(onError);
  }, [projectFiles, framework]);
  
  return (
    <div className="preview-panel h-full flex flex-col">
      <div className="preview-header p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Preview</h3>
        <div className="flex items-center space-x-2">
          <DeviceSelector value={device} onChange={setDevice} />
          <RefreshButton onClick={() => window.location.reload()} />
          <FullscreenButton onClick={() => openInNewTab(previewUrl)} />
        </div>
      </div>
      
      <div className="preview-container flex-1 relative">
        {isLoading && <LoadingSpinner />}
        <iframe
          ref={iframeRef}
          src={previewUrl}
          className={`w-full h-full border-0 ${getDeviceClass(device)}`}
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="preview-footer p-2 border-t text-sm text-gray-500">
        <ConsoleOutput />
      </div>
    </div>
  );
}
```

## Styling Guidelines

### Design System
- Use Tailwind CSS for consistent styling
- Follow existing Lovable design tokens
- Maintain accessibility standards (WCAG 2.1)
- Support dark/light theme switching

### Component Patterns
- Use compound components for complex UI
- Implement proper loading states
- Handle error boundaries gracefully
- Provide keyboard navigation support

### Responsive Design
- Mobile-first approach
- Collapsible panels on small screens
- Touch-friendly interactions
- Optimized for tablet usage

This specification provides a clear roadmap for implementing the core playground components while maintaining consistency with the existing Lovable design system.
