import React, { useRef, useEffect, useState, useCallback } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { usePlayground } from '../../contexts/PlaygroundContext';
import { 
  Search, 
  Replace, 
  Settings, 
  Zap, 
  AlertCircle, 
  CheckCircle,
  Lightbulb,
  Code,
  Eye,
  EyeOff,
  MessageSquarePlus,
  MessageSquare
} from 'lucide-react';

interface EditorError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export function AdvancedCodeEditor() {
  const { files, activeFile, updateFile } = usePlayground();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [errors, setErrors] = useState<EditorError[]>([]);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [fontSize, setFontSize] = useState(14);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);

  const currentFile = activeFile ? files[activeFile] : null;

  const handleEditorDidMount = useCallback((editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Configure Monaco editor with advanced features
    setupAdvancedFeatures(editor, monaco);
    
    // Set up error checking
    setupErrorChecking(monaco);
    
    // Add custom keyboard shortcuts
    setupKeyboardShortcuts(editor, monaco);
    
    // Configure themes
    setupCustomThemes(monaco);

    // Simulate collaborative cursors (mock)
    // This would be driven by WebSocket updates in a real app
    const mockCollaborators = [
      { id: 'user-2', name: 'Alice', color: '#00FF00', line: 5, column: 10, selectionEndLine: 5, selectionEndColumn: 15 },
      { id: 'user-3', name: 'Bob', color: '#0000FF', line: 8, column: 5, selectionEndLine: 8, selectionEndColumn: 5 },
    ];

    const updateMockCursors = () => {
      if (!editorRef.current || !monacoRef.current || !activeFile) return;

      const newDecorations = mockCollaborators.map(collab => {
        // Cursor decoration
        const cursorDecoration = {
          range: new monaco.Range(collab.line, collab.column, collab.line, collab.column),
          options: {
            is
            className: 'mock-cursor',
            glyphMarginClassName: 'mock-cursor-glyph',
            glyphMarginHoverMessage: { value: collab.name },
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            afterContentClassName: 'mock-cursor-content',
            hoverMessage: { value: `${collab.name} is here` },
            inlineClassName: 'mock-cursor-inline',
            minimap: { color: collab.color, position: monaco.editor.MinimapPosition.Inline },
            overviewRuler: { color: collab.color, position: monaco.editor.OverviewRulerLane.Full },
          }
        };

        // Selection decoration
        const selectionDecoration = {
          range: new monaco.Range(collab.line, collab.column, collab.selectionEndLine, collab.selectionEndColumn),
          options: {
            className: 'mock-selection',
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            overviewRuler: { color: collab.color, position: monaco.editor.OverviewRulerLane.Full },
          }
        };

        return [cursorDecoration, selectionDecoration];
      }).flat();

      editorRef.current.deltaDecorations(
        [], // Clear previous decorations
        newDecorations
      );
    };

    // Initial mock cursor setup
    updateMockCursors();

    // Simulate cursor movement/typing from other users
    const interval = setInterval(() => {
      // In a real app, this would be driven by WebSocket events
      // For mock, we can just update positions randomly
      if (editorRef.current && activeFile === 'src/App.tsx') {
        mockCollaborators[0].column = Math.min(mockCollaborators[0].column + 1, 80);
        if (mockCollaborators[0].column >= 80) {
          mockCollaborators[0].column = 1;
          mockCollaborators[0].line = (mockCollaborators[0].line % 10) + 1; // Cycle lines
        }
        updateMockCursors();
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [activeFile]);

  const setupAdvancedFeatures = (editor: any, monaco: Monaco) => {
    // Enable all advanced features
    editor.updateOptions({
      minimap: { enabled: showMinimap },
      fontSize: fontSize,
      lineNumbers: showLineNumbers ? 'on' : 'off',
      wordWrap: wordWrap,
      roundedSelection: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      contextmenu: true,
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true
      },
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true,
        bracketPairsHorizontal: true
      },
      folding: true,
      foldingStrategy: 'indentation',
      showFoldingControls: 'always',
      unfoldOnClickAfterEndOfLine: true,
      renderWhitespace: 'selection',
      renderControlCharacters: true,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: true,
      multiCursorModifier: 'ctrlCmd',
      selectionHighlight: true,
      occurrencesHighlight: true,
      codeLens: true,
      colorDecorators: true,
      lightbulb: { enabled: true },
      parameterHints: { enabled: true },
      hover: { enabled: true, delay: 300 },
      definitionLinkOpensInPeek: false,
      gotoLocation: {
        multipleReferences: 'peek',
        multipleDefinitions: 'peek',
        multipleDeclarations: 'peek'
      }
    });

    // Add custom actions
    editor.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
      run: () => formatDocument()
    });

    editor.addAction({
      id: 'find-replace',
      label: 'Find and Replace',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH],
      run: () => setShowFindReplace(true)
    });

    editor.addAction({
      id: 'toggle-minimap',
      label: 'Toggle Minimap',
      run: () => setShowMinimap(!showMinimap)
    });
  };

  const setupErrorChecking = (monaco: Monaco) => {
    // TypeScript/JavaScript error checking
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      noSuggestionDiagnostics: false
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Add React types
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'react' {
        export = React;
        export as namespace React;
        namespace React {
          interface Component<P = {}, S = {}> {}
          function createElement<P>(type: any, props?: P, ...children: any[]): any;
          function useState<T>(initial: T): [T, (value: T) => void];
          function useEffect(effect: () => void | (() => void), deps?: any[]): void;
          function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
          function useMemo<T>(factory: () => T, deps: any[]): T;
          function useRef<T>(initialValue: T): { current: T };
          function createContext<T>(defaultValue: T): React.Context<T>;
          function useContext<T>(context: React.Context<T>): T;
        }
      }`,
      'file:///node_modules/@types/react/index.d.ts'
    );

    // Add basic DOM types for HTML elements
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare namespace JSX {
        interface IntrinsicElements {
          div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
          span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
          button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
          input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
          textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
          img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
          h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
          p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
          // Add more common HTML elements as needed
        }
      }`,
      'file:///node_modules/@types/react/jsx-runtime.d.ts'
    );
  };

  const setupKeyboardShortcuts = (editor: any, monaco: Monaco) => {
    // Custom keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Auto-save is handled by context
      console.log('Save triggered');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => {
      editor.getAction('editor.action.quickCommand').run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
      editor.getAction('editor.action.addSelectionToNextFindMatch').run();
    });

    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.UpArrow, () => {
      editor.getAction('editor.action.moveLinesUpAction').run();
    });

    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.DownArrow, () => {
      editor.getAction('editor.action.moveLinesDownAction').run();
    });
  };

  const setupCustomThemes = (monaco: Monaco) => {
    // Lovable Dark Theme
    monaco.editor.defineTheme('lovable-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#0D1117',
        'editor.foreground': '#E6EDF3',
        'editor.lineHighlightBackground': '#161B22',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorCursor.foreground': '#AEAFAD',
        'editorWhitespace.foreground': '#404040',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.selectionHighlightBackground': '#ADD6FF26',
        'editorBracketMatch.background': '#0064001a',
        'editorBracketMatch.border': '#888888',
      }
    });

    // Lovable Light Theme
    monaco.editor.defineTheme('lovable-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'type', foreground: '267F99' },
        { token: 'class', foreground: '267F99' },
        { token: 'function', foreground: '795E26' },
        { token: 'variable', foreground: '001080' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#F7F7F7',
        'editor.selectionBackground': '#ADD6FF',
        'editor.inactiveSelectionBackground': '#E5EBF1',
      }
    });

    monaco.editor.setTheme('lovable-dark');
  };

  const formatDocument = async () => {
    if (!editorRef.current || !currentFile) return;
    
    setIsFormatting(true);
    try {
      // Use Monaco's built-in formatting
      await editorRef.current.getAction('editor.action.formatDocument').run();
    } catch (error) {
      console.error('Formatting error:', error);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value);
      
      // Check for errors (simplified)
      checkForErrors(value);

      // Simulate collaborative changes (mock)
      // This would typically be handled by a WebSocket connection
      // For now, just log to console
      console.log(`Simulating collaborative change for ${activeFile}`);
    }
  }, [activeFile, updateFile, checkForErrors]);

  const checkForErrors = useCallback((code: string) => {
    const newErrors: EditorError[] = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      // Simple error checking (in real implementation, use TypeScript compiler API or ESLint)
      if (line.includes('console.log') && !line.includes('// eslint-disable')) {
        newErrors.push({
          line: index + 1,
          column: line.indexOf('console.log') + 1,
          message: 'Unexpected console statement. Consider removing before production.',
          severity: 'warning'
        });
      }
      
      if (line.includes('debugger')) {
        newErrors.push({
          line: index + 1,
          column: line.indexOf('debugger') + 1,
          message: 'Debugger statement should be removed.',
          severity: 'error'
        });
      }

      if (line.includes('// TODO')) {
        newErrors.push({
          line: index + 1,
          column: line.indexOf('// TODO') + 1,
          message: 'TODO comment found. Address this task.',
          severity: 'info'
        });
      }
    });
    
    setErrors(newErrors);
    // Update Monaco decorations for problems
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      const markers = newErrors.map(err => ({
        severity: monacoRef.current!.MarkerSeverity[err.severity.toUpperCase() as keyof typeof monacoRef.current.MarkerSeverity],
        message: err.message,
        startLineNumber: err.line,
        startColumn: err.column,
        endLineNumber: err.line,
        endColumn: err.column + 1, // Simple range for single character
      }));
      monacoRef.current.editor.setModelMarkers(model, 'owner', markers);
    }
  }, []);

  const handleFind = useCallback(() => {
    if (!editorRef.current || !findText) return;
    
    const model = editorRef.current.getModel();
    const matches = model.findMatches(findText, false, false, true, null, true);
    
    if (matches.length > 0) {
      editorRef.current.setSelection(matches[0].range);
      editorRef.current.revealRangeInCenter(matches[0].range);
    }
  }, [findText]);

  const handleReplace = useCallback(() => {
    if (!editorRef.current || !findText) return;
    
    const selection = editorRef.current.getSelection();
    const selectedText = editorRef.current.getModel().getValueInRange(selection);
    
    if (selectedText === findText) {
      editorRef.current.executeEdits('replace', [{
        range: selection,
        text: replaceText
      }]);
    }
  }, [findText, replaceText]);

  const handleReplaceAll = useCallback(() => {
    if (!editorRef.current || !findText) return;
    
    const model = editorRef.current.getModel();
    const matches = model.findMatches(findText, false, false, true, null, true);
    
    const edits = matches.map(match => ({
      range: match.range,
      text: replaceText
    }));
    
    editorRef.current.executeEdits('replace-all', edits);
  }, [findText, replaceText]);

  const handleAddComment = useCallback(() => {
    if (!editorRef.current || !activeFile) return;

    const selection = editorRef.current.getSelection();
    const lineNumber = selection.startLineNumber;
    const commentContent = prompt(`Add a comment for line ${lineNumber}:`);

    if (commentContent) {
      addComment(activeFile, lineNumber, commentContent);
      // Add a decoration to show comment in editor margin
      editorRef.current.deltaDecorations([], [
        {
          range: new monacoRef.current!.Range(lineNumber, 1, lineNumber, 1),
          options: {
            is
            glyphMarginClassName: 'comment-glyph',
            glyphMarginHoverMessage: { value: `Comment on line ${lineNumber}: ${commentContent}` },
            stickiness: monacoRef.current!.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          }
        }
      ]);
    }
  }, [activeFile, addComment]);

  if (!currentFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No file selected</p>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {currentFile.name}
            </span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
              {currentFile.metadata.language}
            </span>
          </div>
          
          {errors.length > 0 && (
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-600">
                {errors.filter(e => e.severity === 'error').length} errors,{' '}
                {errors.filter(e => e.severity === 'warning').length} warnings
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFindReplace(!showFindReplace)}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Find & Replace (Ctrl+H)"
          >
            <Search className="h-4 w-4" />
          </button>
          
          <button
            onClick={formatDocument}
            disabled={isFormatting}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-50"
            title="Format Document (Shift+Alt+F)"
          >
            <Zap className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Toggle Minimap"
          >
            {showMinimap ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => { /* This will be handled by PlaygroundLayout's settings toggle */ }}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="Editor Settings (Ctrl+,)"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
          {/* Add Comment Button */}
          <button
            onClick={() => handleAddComment()}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
            title="Add Comment"
          >
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Find & Replace Panel */}
      {showFindReplace && (
        <div className="bg-gray-100 border-b border-gray-200 p-3">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="Find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleFind()}
            />
            <button
              onClick={handleFind}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Find
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleReplace()}
            />
            <button
              onClick={handleReplace}
              className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Replace
            </button>
            <button
              onClick={handleReplaceAll}
              className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              All
            </button>
            <button
              onClick={() => setShowFindReplace(false)}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={currentFile.metadata.language}
          value={currentFile.content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: showMinimap },
            fontSize: fontSize,
            lineNumbers: showLineNumbers ? 'on' : 'off',
            wordWrap: wordWrap,
          }}
          theme="lovable-dark"
        />
        
        {/* Error Indicators */}
          {errors.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-sm z-10">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Issues Found</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {errors.slice(0, 5).map((error, index) => (
                  <div key={index} className="text-xs">
                    <span className={`font-medium ${
                      error.severity === 'error' ? 'text-red-600' : 
                      error.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      Line {error.line}:
                    </span>
                    <span className="text-gray-600 ml-1">{error.message}</span>
                  </div>
                ))}
                {errors.length > 5 && (
                  <div className="text-xs text-gray-500">
                    +{errors.length - 5} more issues
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Mock collaborative cursors/indicators */}
          {/* Mock collaborative cursors/indicators */}
          {collaborators.map(collab => {
            if (collab.activeFile === activeFile) {
              return (
                <div 
                  key={collab.id} 
                  className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse z-10"
                  style={{ 
                    top: `${(collab.id === 'user-2' ? 30 : 50)}%`, // Mock position
                    left: `${(collab.id === 'user-2' ? 50 : 70)}%`, // Mock position
                    backgroundColor: collab.color,
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" style={{ backgroundColor: collab.color }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" style={{ backgroundColor: collab.color }}></span>
                  </span>
                  <span className="ml-1">{collab.name} {collab.isTyping ? 'is typing...' : 'is here'}</span>
                </div>
              );
            }
            return null;
          })}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-800 text-white text-xs">
        <div className="flex items-center space-x-4">
          <span>Line {editorRef.current?.getPosition()?.lineNumber || 1}</span>
          <span>Column {editorRef.current?.getPosition()?.column || 1}</span>
          <span className="capitalize">{currentFile.metadata.language}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>LF</span>
          {isFormatting && <span>Formatting...</span>}
        </div>
      </div>
    </div>
  );
}
