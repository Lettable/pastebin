"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, FilePlus, Download, Copy, Delete, AlertCircleIcon } from "lucide-react";
import { Editor } from "@monaco-editor/react";

const languages = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "typescript", label: "TypeScript" },
];

const WebIDE = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GetSearchParams router={router} />
    </Suspense>
  );
};

const GetSearchParams = ({ router }) => {
  const searchParams = useSearchParams();
  const objectId = searchParams.get("id");

  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [notFound, setNotFound] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleNew = () => {
    router.push("/");
  };

  const handleDelete = async () => {
    if (!objectId) {
      alert("No paste ID found to delete.");
      return;
    }

    if (confirm("Are you sure you want to delete this paste? This action cannot be undone.")) {
      try {
        const response = await fetch(`/api/delete?id=${objectId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        await response.json();
        alert("Paste deleted successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error deleting paste:", error);
        alert("An error occurred while deleting the paste.");
      }
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      alert("You can't store a blank page.");
      return;
    }

    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      alert("Paste saved successfully!");

      const objectId = result.objectId;
      router.push(`/paste?id=${objectId}`);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleUpdate = async () => {
    if (!content.trim()) {
      alert("You can't store a blank page.");
      return;
    }

    try {
      const response = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: objectId,
          content,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await response.json();
      alert("Paste updated successfully!");
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Paste copied to clipboard!");
  };

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

  const handleAbout = () => {
    router.push('/api')
  }

  useEffect(() => {
    const fetchContent = async () => {
      if (objectId) {
        const response = await fetch(`/api/get?id=${objectId}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.data) {
            setContent(data.data.content);
            setLanguage(data.data.language);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      }
    };

    fetchContent();
  }, [objectId]);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-2 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleNew}>
            <FilePlus className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={objectId ? handleUpdate : handleSave}>
            <Save className="mr-2 h-4 w-4" /> {objectId ? 'Update' : 'Save'}
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#3c3c3c]" onClick={handleDelete}>
            <Delete className="mr-2 h-4 w-4" /> Delete
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
        {notFound ? (
          <div className="text-red-500 text-center mt-10">No paste found</div>
        ) : (
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
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
            onMount={(editor) => handleEditorDidMount(editor)}
          />
        )}
      </ScrollArea>
    </div>
  );
};

export default WebIDE;