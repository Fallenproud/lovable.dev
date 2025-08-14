import React, { useState } from 'react';
import { 
  Settings, 
  Type, 
  Eye, 
  Code, 
  Palette, 
  Keyboard,
  Monitor,
  X
} from 'lucide-react';

interface EditorSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    fontSize: number;
    fontFamily: string;
    theme: string;
    tabSize: number;
    wordWrap: boolean;
    minimap: boolean;
    lineNumbers: boolean;
    bracketPairColorization: boolean;
    smoothScrolling: boolean;
    cursorBlinking: string;
    renderWhitespace: string;
  };
  onSettingsChange: (settings: any) => void;
}

export function EditorSettings({ isOpen, onClose, settings, onSettingsChange }: EditorSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const themes = [
    { id: 'lovable-dark', name: 'Lovable Dark', preview: '#0D1117' },
    { id: 'lovable-light', name: 'Lovable Light', preview: '#FFFFFF' },
    { id: 'vs-dark', name: 'VS Code Dark', preview: '#1E1E1E' },
    { id: 'vs', name: 'VS Code Light', preview: '#FFFFFE' },
  ];

  const fontFamilies = [
    'Monaco, Menlo, "Ubuntu Mono", monospace',
    '"Fira Code", monospace',
    '"Source Code Pro", monospace',
    '"JetBrains Mono", monospace',
    'Consolas, monospace',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Editor Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-8">
            {/* Appearance */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-4 w-4 text-gray-600" />
                <h3 className="text-md font-medium text-gray-900">Appearance</h3>
              </div>
              
              <div className="space-y-4 ml-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleSettingChange('theme', theme.id)}
                        className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 ${
                          localSettings.theme === theme.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: theme.preview }}
                        />
                        <span className="text-sm">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {localSettings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={localSettings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={localSettings.fontFamily}
                    onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font.split(',')[0].replace(/"/g, '')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Editor Behavior */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-4 w-4 text-gray-600" />
                <h3 className="text-md font-medium text-gray-900">Editor Behavior</h3>
              </div>
              
              <div className="space-y-4 ml-6">
                {/* Tab Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tab Size
                  </label>
                  <select
                    value={localSettings.tabSize}
                    onChange={(e) => handleSettingChange('tabSize', parseInt(e.target.value))}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                {/* Word Wrap */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Word Wrap
                  </label>
                  <button
                    onClick={() => handleSettingChange('wordWrap', !localSettings.wordWrap)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.wordWrap ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.wordWrap ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Render Whitespace */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Show Whitespace
                  </label>
                  <select
                    value={localSettings.renderWhitespace}
                    onChange={(e) => handleSettingChange('renderWhitespace', e.target.value)}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="selection">Selection</option>
                    <option value="trailing">Trailing</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-4 w-4 text-gray-600" />
                <h3 className="text-md font-medium text-gray-900">Display Options</h3>
              </div>
              
              <div className="space-y-4 ml-6">
                {/* Minimap */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Minimap
                  </label>
                  <button
                    onClick={() => handleSettingChange('minimap', !localSettings.minimap)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.minimap ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.minimap ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Line Numbers */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Line Numbers
                  </label>
                  <button
                    onClick={() => handleSettingChange('lineNumbers', !localSettings.lineNumbers)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.lineNumbers ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.lineNumbers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Bracket Pair Colorization */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Bracket Pair Colorization
                  </label>
                  <button
                    onClick={() => handleSettingChange('bracketPairColorization', !localSettings.bracketPairColorization)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.bracketPairColorization ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.bracketPairColorization ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Smooth Scrolling */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Smooth Scrolling
                  </label>
                  <button
                    onClick={() => handleSettingChange('smoothScrolling', !localSettings.smoothScrolling)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.smoothScrolling ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.smoothScrolling ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Cursor */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Type className="h-4 w-4 text-gray-600" />
                <h3 className="text-md font-medium text-gray-900">Cursor</h3>
              </div>
              
              <div className="space-y-4 ml-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cursor Blinking
                  </label>
                  <select
                    value={localSettings.cursorBlinking}
                    onChange={(e) => handleSettingChange('cursorBlinking', e.target.value)}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="blink">Blink</option>
                    <option value="smooth">Smooth</option>
                    <option value="phase">Phase</option>
                    <option value="expand">Expand</option>
                    <option value="solid">Solid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              setLocalSettings(settings);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
