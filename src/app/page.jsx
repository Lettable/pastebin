"use client"

import { useRouter } from "next/navigation";
import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, FilePlus, Download, Copy, AlertCircleIcon } from 'lucide-react'
import { Editor } from '@monaco-editor/react'

const languages = [
  { value: 'plaintext', label: 'Plain Text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'typescript', label: 'TypeScript' },
]

export default function WebIDE() {
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('plaintext')
  const editorRef = useRef(null)
  const router = useRouter();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  const handleNew = () => {
    setContent('')
  }

  const handleSave = async () => {

    if (!content.trim()) {
      alert("You can't store a blank page.");
      return;
    }

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      const objectId = result.objectId;
      alert(`Saved successfully with ID: ${objectId}`)
      router.push(`/paste?id=${objectId}`);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };



  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Paste copied to clipboard!");
  }

  const handleAbout = () => {
    router.push('/api')
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${language}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-2 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleNew}>
            <FilePlus className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-[#3c3c3c] border-[#6c6c6c] text-gray-300">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleAbout}>
            <AlertCircleIcon className="mr-2 h-4 w-4" /> About
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <ScrollArea className="flex-grow">
        <Editor
          height="calc(100vh - 48px)"
          defaultLanguage="plaintext"
          language={language}
          value={content}
          onChange={(value) => setContent(value)}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
          }}
          onMount={(editor) => handleEditorDidMount(editor)}
        />
      </ScrollArea>
    </div>
  )
}