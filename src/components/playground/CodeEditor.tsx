import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { usePlayground } from '../../contexts/PlaygroundContext';

export function CodeEditor() {
  const { files, activeFile, updateFile } = usePlayground();
  const editorRef = useRef<any>(null);

  const currentFile = activeFile ? files[activeFile] : null;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Monaco editor
    monaco.editor.defineTheme('lovable-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
      },
    });
    
    // Set theme
    monaco.editor.setTheme('vs-dark');
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save file (handled by context)
      console.log('Save shortcut triggered');
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value);
    }
  };

  if (!currentFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No file selected</p>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={currentFile.metadata.language}
        value={currentFile.content}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          contextmenu: true,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
        theme="vs-dark"
      />
    </div>
  );
}
