import React, { useState, useEffect, useRef } from 'react';
import {
  Save, Download, Upload, Settings, Maximize2, Minimize2, Code2, Bug,
  Zap, Shield, Clock, BarChart3, FileText, CheckCircle, AlertCircle,
  XCircle, Info, Play, UserCheck, UserX, Brackets, AlertTriangle,
  UserCog, Code, ChevronRight, Circle, Copy
} from 'lucide-react';

import MonacoEditor from '@monaco-editor/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import  {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Language options for the selector
// const LANGUAGE_OPTIONS = [
//   { value: 'java', label: 'Java' },
//   { value: 'javascript', label: 'JavaScript' },
//   { value: 'python', label: 'Python' },
//   { value: 'cpp', label: 'C++' },
//   { value: 'html', label: 'HTML' },
//   { value: 'css', label: 'CSS' },
// ];

// Constants for review categories
const REVIEW_CATEGORIES = [
  { id: 'Efficiency & Logic', label: 'Efficiency & Logic', icon: FileText },
  { id: 'Time Complexity', label: 'Time Complexity', icon: Clock },
  { id: 'Space Complexity', label: 'Space Complexity', icon: FileText },
  { id: 'Readability', label: 'Readability', icon: Code },
  { id: 'Edge Cases', label: 'Edge Cases', icon: AlertTriangle },
  { id: 'Security', label: 'Security', icon: Shield },
  { id: 'Improvement', label: 'Improvements', icon: CheckCircle }
];

const CodeReviewCompiler = () => {
  // State management
  const [code, setCode] = useState(`// Welcome to ReviewerAI Compiler...
// Paste your code here for analysis and review
`);
  const [activeTab, setActiveTab] = useState('editor');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResults, setReviewResults] = useState({});
  const [activeReviewTab, setActiveReviewTab] = useState('Efficiency & Logic');
  const [lineNumbers, setLineNumbers] = useState('1\n2\n3\n4\n5\n6\n7\n8');
  const [copiedStates, setCopiedStates] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const editorRef = useRef(null);
  const copyTimeoutRef = useRef({});

  // Update line numbers when code changes
  useEffect(() => {
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1).join('\n'));
  }, [code]);

  // Copy code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  // Download review as TXT
  const downloadTXT = () => {
    if (!Object.keys(reviewResults).length) {
      toast.error('No review data to download', { position: "top-center", autoClose: 1000 });
      return;
    }
    let content = 'CODE REVIEW REPORT\n==================\n\nCODE:\n-----\n' + code + '\n\n';
    Object.entries(reviewResults).forEach(([category, data]) => {
      content += `${category.toUpperCase()} ANALYSIS:\n${'-'.repeat(category.length + 10)}\n${data.content}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download review as HTML (for PDF conversion)
  const downloadPDF = () => {
    if (!Object.keys(reviewResults).length) {
      toast.error('No review data to download.', { position: "top-center", autoClose: 1000 });
      return;
    }
    const cleanText = (text) => text
      .replace(/[*#]/g, '')
      .replace(/```[\w]*\n?/g, '')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    let htmlContent = `
      <html>
        <head>
          <title>Code Review Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #666; margin-top: 30px; }
            .code-block { background: #1e1e1e; padding: 15px; border-left: 4px solid #333; margin: 15px 0; font-family: monospace; white-space: pre-wrap; color: #d4d4d4; }
            .content { margin: 15px 0; padding: 15px; background: #f9f9f9; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>Code Review Report</h1>
          <h2>Code</h2>
          <div class="code-block">${cleanText(code)}</div>
    `;
    Object.entries(reviewResults).forEach(([category, data]) => {
      htmlContent += `<h2>${category}</h2><div class="content">${cleanText(data.content)}</div>`;
    });
    htmlContent += '</body></html>';
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review-report.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.error('Open in a browser and save as PDF.', { position: "top-center", autoClose: 1000 });
  };

  // Parse API response and remove duplicate code
  const parseMarkdownResponse = (markdown) => {
    const results = REVIEW_CATEGORIES.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: { content: '', items: [], codeBlocks: [] }
    }), {});
    let afterSecurity = false;
    const cleanContent = markdown.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    const sections = cleanContent.split(/##\s+/).filter(s => s.trim());
    const categoryMapping = {
      'code efficiency': 'Efficiency & Logic',
      'efficiency & logic': 'Efficiency & Logic',
      'time complexity': 'Time Complexity',
      'space complexity': 'Space Complexity',
      'readability': 'Readability',
      'code style': 'Readability',
      'edge cases': 'Edge Cases',
      'robustness': 'Edge Cases',
      'security': 'Security',
      'safety': 'Security',
      'improvement': 'Improvement',
      'improvements': 'Improvement',
      'suggestions': 'Improvement',
      'final rating': 'Improvement',
      'final rating (1-10)': 'Improvement',
      'Final Rating': 'Improvement',
      'final ratings': 'Improvement',
      'improved code': 'Improvement',
      'improved code with comments': 'Improvement',
      'suggestions & code improvements': 'Improvement',
      'suggestions & improvements': 'Improvement',
      'final review summary': 'Improvement',
      'summary': 'Improvement',
      'ratings': 'Improvement',
      'final code with improvements': 'Improvement',
      'final imporved code with improvements': 'Improvement',
      'final review scores': 'Improvement',
      'final code': 'Improvement',
      'final code with comments': 'Improvement',
      'final code (improved version)': 'Improvement',
      'rating': 'Improvement',
      'review scoreboard': 'Improvement',
      'scoreboard': 'Improvement',
      'Improved Code with Changes': 'Improvement'
    };
    sections.forEach(section => {
      const lines = section.split('\n');
      const headerLine = lines[0].toLowerCase().replace(/[^a-z &]/g, '').trim();
      let matchedCategory = Object.entries(categoryMapping).find(([key]) =>
        headerLine.includes(key)
      )?.[1];
      if (matchedCategory) {
        if (matchedCategory === 'Security') afterSecurity = true;
        const contentLines = lines.slice(1).filter(line =>
          line.trim() !== code.trim()
        );
        let sectionContent = contentLines.join('\n').trim();
        sectionContent = sectionContent
          .replace(/\n---\s*$/, '')
          .replace(/\n#+$/, '')
          .trim();
        if (afterSecurity && matchedCategory !== 'Security') {
          matchedCategory = 'Improvement';
        }
        if (results[matchedCategory]) {
          results[matchedCategory].content += (results[matchedCategory].content ? '\n\n' : '') + sectionContent;
          const codeBlockRegex = /```(\w*)\n([\s\S]*?)(?:\n```|$)/g;
          results[matchedCategory].codeBlocks = [];
          let match;
          while ((match = codeBlockRegex.exec(sectionContent)) !== null) {
            results[matchedCategory].codeBlocks.push({
              language: match[1] || selectedLanguage,
              code: match[2].trim()
            });
          }
          const itemRegex = /^[-•*]\s+(.+)|^\d+\.\s+(.+)/gm;
          results[matchedCategory].items = [...sectionContent.matchAll(itemRegex)].map(match =>
            (match[1] || match[2] || '').trim()
          );
        }
      }
    });
    return results;
  };

  // Syntax highlighting for review tab code blocks
  const highlightCode = (code, language = selectedLanguage) => {
    const keywords = /\b(public|private|protected|class|interface|extends|implements|static|final|void|int|double|float|boolean|char|long|short|byte|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|throws|new|import|package|this|super)\b/g;
    const strings = /(".*?"|'.*?')/g;
    const comments = /(\/\/.*?$|\/\*[\s\S]*?\*\/)/g;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const annotations = /@\w+/g;
    let escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    escapedCode = escapedCode
      .replace(comments, '<span style="color: #7A7777;">$1</span>')
      .replace(strings, '<span style="color: #98c379;">$1</span>')
      .replace(keywords, '<span style="color: #61afef; font-weight: bold;">$1</span>')
      .replace(numbers, '<span style="color: #d19a66;">$1</span>')
      .replace(annotations, '<span style="color: #c678dd;">$&</span>');
    return escapedCode;
  };

  //   const highlightCode = (code, language) => {
  //   if (language && hljs.getLanguage(language)) {
  //     return hljs.highlight(code, { language }).value;
  //   }
  //   return hljs.highlightAuto(code).value; // auto-detect
  // };

  // Convert markdown to HTML with emoji support
  const markdownToHtml = (text) => {
    return text
      .replace(/^#\s+(.*)/gm, '<h1 class="text-2xl font-bold text-yellow-300 mt-6 mb-2">$1</h1>')
      .replace(/^##\s+(.*)/gm, '<h2 class="text-xl font-bold text-yellow-300 mt-4 mb-2">$1</h2>')
      .replace(/^###\s+(.*)/gm, '<h3 class="text-lg font-bold text-yellow-300 mt-3 mb-1">$1</h3>')
      .replace(/^####\s+(.*)/gm, '<h4 class="text-base font-bold text-yellow-300 mt-2 mb-1">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 rounded text-pink-300">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline" target="_blank">$1</a>')
      .replace(/:([a-z_]+):/g, (match, emoji) => {
        const emojiMap = {
          'warning': '⚠️',
          'check': '✅',
          'cross': '❌',
          'info': 'ℹ️',
          'lightbulb': '💡'
        };
        return emojiMap[emoji] || match;
      })
      .trim();
  };

  // Parse markdown table to HTML
  const parseMarkdownTable = (text) => {
    const tableRegex = /\|.*?\|\n\|[-:\s|]+\|\n((?:\|.*?\|\n)*)/g;
    let tableHtml = '';
    let match;
    while ((match = tableRegex.exec(text)) !== null) {
      const tableContent = match[0];
      const rows = tableContent.split('\n').filter(line => line.trim() && !line.match(/\|[-:\s|]+\|/));
      const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
      const bodyRows = rows.slice(1).map(row => {
        const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
        while (cells.length < headers.length) cells.push('');
        return cells;
      });
      tableHtml += `
        <table class="w-full border-collapse border border-gray-700 my-4">
          <thead>
            <tr>
              ${headers.map(header => `<th class="border border-gray-600 p-2 bg-gray-800 text-gray-200">${markdownToHtml(header)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${bodyRows.map(row => `
              <tr>
                ${row.map(cell => `<td class="border border-gray-600 p-2 text-gray-300">${markdownToHtml(cell)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
    return { tableHtml, remainingText: text.replace(tableRegex, '') };
  };

  // Analyze code with real API call
  const analyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_PYTHON_API_URL}/compile-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage })
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      const processedResults = parseMarkdownResponse(data.review);
      setReviewResults(processedResults);
      setActiveTab('review');
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast.error('Failed to get review. Please try again.', { position: "top-center", autoClose: 1000 });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const detectLanguage = (code) => {
    const result = hljs.highlightAuto(code);
    return result.language || "plaintext"; // fallback if unknown
  };

  // Render review content
  const renderContent = (category) => {
    const data = reviewResults[category];
    if (!data || !data.content) return null;
    const lines = data.content.split("\n");
    const elements = [];
    let currentList = [];
    let listType = null;
    let codeBlockIndex = 0;
    const { tableHtml, remainingText } = parseMarkdownTable(data.content);
    if (tableHtml) {
      elements.push(
        <div
          key={`table-${category}`}
          className="my-6"
          dangerouslySetInnerHTML={{ __html: tableHtml }}
        />
      );
    }
    const remainingLines = remainingText.split('\n');
    const flushList = () => {
      if (currentList.length > 0) {
        const ListTag = listType === "ol" ? "ol" : "ul";
        elements.push(
          <ListTag
            key={`list-${elements.length}`}
            className={`${listType === "ol" ? "list-decimal" : "list-disc"} list-inside ml-4 space-y-1 mb-4 text-gray-300`}
          >
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: markdownToHtml(item) }} />
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };
    for (let i = 0; i < remainingLines.length; i++) {
      const trimmedLine = remainingLines[i].trim();
      if (!trimmedLine || trimmedLine === '---' || trimmedLine.match(/^#+$/)) {
        flushList();
        continue;
      }
      if (trimmedLine.startsWith("```")) {
        flushList();
        let language = trimmedLine.match(/```(\w*)/)?.[1] || selectedLanguage;
        i++;
        let codeLines = [];
        while (i < remainingLines.length && !remainingLines[i].trim().startsWith("```")) {
          codeLines.push(remainingLines[i]);
          i++;
        }
        const blockCode = codeLines.join('\n').trim();
        const blockKey = `${category}-${codeBlockIndex}`;
        codeBlockIndex++;
        const block = data.codeBlocks[codeBlockIndex - 1] || { language, code: blockCode };
        if (block.code) {
          elements.push(
            <div key={`code-${i}`} className="my-6">
              <div className="bg-[#1e1e1e] rounded-lg shadow-md border border-gray-600 overflow-hidden">
                <div className="bg-[#1e1e1e] px-4 py-2 flex items-center justify-between text-sm text-gray-400 border-b border-gray-700">
                  <span className="font-mono text-white">{block.language}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(block.code);
                      setCopiedStates((prev) => ({ ...prev, [blockKey]: true }));
                      if (copyTimeoutRef.current[blockKey]) {
                        clearTimeout(copyTimeoutRef.current[blockKey]);
                      }
                      copyTimeoutRef.current[blockKey] = setTimeout(() => {
                        setCopiedStates((prev) => ({ ...prev, [blockKey]: false }));
                      }, 2000);
                    }}
                    className="flex items-center gap-1 hover:text-gray-200 text-xs"
                  >
                    {copiedStates[blockKey] ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-100">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(block.code, block.language),
                    }}
                  />
                </pre>
              </div>
            </div>
          );
        }
        continue;
      }
      if (trimmedLine.match(/^#{1,4}\s+/)) {
        flushList();
        const html = markdownToHtml(trimmedLine);
        if (html) {
          elements.push(
            <div
              key={`header-${i}`}
              className="text-gray-300 mb-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        continue;
      }
      let newListType = null;
      let content = trimmedLine;
      if (/^[-•*⚠️✅❌💡]\s+/.test(trimmedLine)) {
        newListType = "ul";
        content = trimmedLine.replace(/^[-•*⚠️✅❌💡]\s+/, "");
      } else if (/^\d+\.\s+/.test(trimmedLine)) {
        newListType = "ol";
        content = trimmedLine.replace(/^\d+\.\s+/, "");
      } else {
        flushList();
        const html = markdownToHtml(trimmedLine);
        if (html) {
          elements.push(
            <div
              key={`p-${i}`}
              className="text-gray-300 mb-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        continue;
      }
      if (newListType !== listType && currentList.length > 0) {
        flushList();
      }
      listType = newListType;
      currentList.push(content);
    }
    flushList();
    return <>{elements}</>;
  };

  // Define custom Monaco theme
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Core Java tokens
        { token: 'keyword', foreground: '61afef', fontStyle: 'bold' }, // Covers public, private, class, void, etc.
        { token: 'entity.name.type.class', foreground: '4ec9b0', fontStyle: 'bold' }, // Class names
        { token: 'entity.name.type.interface', foreground: '4ec9b0' }, // Interface names
        { token: 'entity.name.type.enum', foreground: '4ec9b0' }, // Enum names
        { token: 'storage.modifier', foreground: 'c586c0' }, // static, final, abstract, etc.
        { token: 'entity.name.function', foreground: 'dcdcaa' }, // Method names
        { token: 'variable.parameter', foreground: '9cdcfe' }, // Method parameters
        { token: 'constant.language', foreground: 'd16969' }, // null, true, false
        { token: 'string', foreground: '98c379' }, // Strings
        { token: 'comment', foreground: '7A7777', fontStyle: 'italic' }, // Comments
        { token: 'number', foreground: 'd19a66' }, // Numbers
        { token: 'annotation', foreground: 'c678dd' }, // Annotations like @Override
        { token: 'entity.name.package', foreground: '4ec9b0' }, // Package declarations
        // Broader language support (retaining your existing rules)
        { token: 'import', foreground: 'c586c0', fontStyle: 'bold' }, // For import statements
        { token: 'identifier', foreground: 'd4d4d4' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'variable', foreground: '9cdcfe' },
        { token: 'constant', foreground: 'd16969' },
        { token: 'module', foreground: '4ec9b0' },
        { token: 'namespace', foreground: '4ec9b0' },
        { token: 'operator', foreground: 'd4d4d4' },
        { token: 'delimiter', foreground: 'd4d4d4' },
        { token: 'string.escape', foreground: 'd7ba7d' },
        { token: 'regexp', foreground: 'd16969' },
        { token: 'tag', foreground: '569cd6' },
        { token: 'attribute.name', foreground: '9cdcfe' },
        { token: 'attribute.value', foreground: 'ce9178' },
        { token: 'keyword.control', foreground: 'c586c0' },
        { token: 'property', foreground: '9cdcfe' },
        { token: 'label', foreground: 'd4d4d4' },
        { token: 'comment.doc', foreground: '608b4e', fontStyle: 'italic' },
        { token: 'comment.doc.tag', foreground: '569cd6', fontStyle: 'italic' },
        { token: 'comment.doc.tag.name', foreground: '9cdcfe', fontStyle: 'italic' },
        { token: "storage.modifier.java", foreground: "FF6B6B", fontStyle: "bold" }, // public, private, protected, static, final

        // Control keywords
        { token: "keyword.control.java", foreground: "F7B32B", fontStyle: "bold" }, // if, else, switch, case, for, while, do, break, continue, return

        // Declarations
        { token: "storage.type.java", foreground: "5CC9F5", fontStyle: "bold" }, // class, interface, enum, extends, implements
        { token: "keyword.package.java", foreground: "FFD166", fontStyle: "bold" }, // package, import

        // Types & primitives
        { token: "keyword.type.primitive.java", foreground: "06D6A0", fontStyle: "bold" }, // int, float, boolean, char, double, long, void
        { token: "support.type.java", foreground: "4ECDC4" }, // String, Object, List, Map

        // Class & interface names
        { token: "entity.name.type.class.java", foreground: "4ECDC4", fontStyle: "bold" },
        { token: "entity.name.type.interface.java", foreground: "4ECDC4", fontStyle: "italic" },

        // Methods & functions
        { token: "entity.name.function.java", foreground: "C792EA" }, // method names

        // Variables & parameters
        { token: "variable.parameter.java", foreground: "82AAFF" },
        { token: "variable.language.java", foreground: "FF6B6B", fontStyle: "italic" }, // this, super

        // Strings & chars
        { token: "string.quoted.double.java", foreground: "F78C6C" },
        { token: "string.quoted.single.java", foreground: "F78C6C" },
        { token: "constant.character.escape.java", foreground: "FF9F1C" }, // \n, \t, etc.

        // Numbers
        { token: "constant.numeric.java", foreground: "F7B32B" },

        // Comments
        { token: "comment.line.double-slash.java", foreground: "9E9E9E", fontStyle: "italic" },
        { token: "comment.block.java", foreground: "9E9E9E", fontStyle: "italic" },
        { token: "comment.block.documentation.java", foreground: "A3BE8C", fontStyle: "italic" }, // /** Javadoc */

        // Annotations
        { token: "storage.annotation.java", foreground: "FF9F1C", fontStyle: "bold" }, // @Override, @Autowired
        { token: "entity.name.tag.java", foreground: "FF9F1C" } // 
      ],
      colors: {
        'editor.background': '#171717DD',
        'editor.foreground': '#D1D5DB',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#D1D5DB',
        'editor.selectionBackground': '#4B5563',
        'editor.selectionForeground': '#FFFFFF',
        'editorCursor.foreground': '#FFFFFF',
        'editor.lineHighlightBackground': '#1F2937',
        'editor.lineHighlightBorder': '#374151',
      },
    });
    monaco.editor.setTheme('custom-dark');
  };

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <ToastContainer position='top-center' />
      <div className="bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex">
            {[
              { id: 'logo', label: '', icon: () => <img src='./../../public/favicon7.png' alt="Logo" className='w-10 h-14' /> },
              { id: 'editor', label: 'Editor', icon: Code2 },
              { id: 'review', label: 'Code Review', icon: Bug }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id !== "logo") {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${tab.id === "logo"
                  ? "cursor-default text-white"
                  : "cursor-pointer"
                  } ${activeTab === tab.id
                    ? "border-blue-500 text-blue-400 bg-gray-800/50"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'editor' && (
              <>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded text-sm transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Code
                </button>
                <button
                  onClick={analyzeCode}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 mx-5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 text-white border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span className="text-sm">🚀 Get Review</span>
                    </>
                  )}
                </button>
              </>
            )}
            {activeTab === 'review' && (
              <>
                <button
                  onClick={downloadTXT}
                  className="flex items-center gap-2 px-3 mx-1 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download TXT
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-3 mx-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'editor' && (
          <div className="flex-1 bg-gray-900 relative">
            <div className="absolute inset-0 flex">
              <div className="w-12 bg-gray-900 border-r border-gray-800 p-4 text-right text-gray-500 text-sm font-mono leading-6 select-none overflow-clip">
                <pre>{lineNumbers}</pre>
              </div>
              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  language={detectLanguage(code)}
                  theme="custom-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  // onMount={handleEditorDidMount}
                  onMount={(editor, monaco) => {
                    handleEditorDidMount(editor, monaco);

                    // 🔑 Sync scrolling
                    editor.onDidScrollChange((e) => {
                      const lineNumbersEl = document.getElementById("lineNumbers");
                      if (lineNumbersEl) {
                        lineNumbersEl.scrollTop = e.scrollTop; // match scroll position
                      }
                    });
                  }}
                  options={{
                    fontFamily: 'JetBrains Mono, Consolas, monospace',
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    lineNumbers: 'off', // Use custom line numbers
                    glyphMargin: false,
                    folding: true,
                    wordWrap: 'on',
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'review' && (
          <div className="flex-1 flex">
            <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-medium text-white">Categories</h3>
              </div>
              <div className="flex-1 p-2">
                {REVIEW_CATEGORIES.map(category => {
                  const hasContent = reviewResults[category.id]?.content;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveReviewTab(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${activeReviewTab === category.id
                        ? 'bg-blue-600 text-white'
                        : hasContent
                          ? 'text-gray-300 hover:text-gray-200 hover:bg-gray-800'
                          : 'text-gray-500 hover:bg-gray-800/50 opacity-50'
                        }`}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.label}
                      {hasContent && (
                        <Circle className="w-2 h-2 ml-auto fill-current" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 bg-gray-950 flex flex-col">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                  <span className="text-3xl">
                    {activeReviewTab === 'Efficiency & Logic' && '🔍'}
                    {activeReviewTab === 'Time Complexity' && '⏱️'}
                    {activeReviewTab === 'Space Complexity' && '💾'}
                    {activeReviewTab === 'Readability' && '🧠'}
                    {activeReviewTab === 'Edge Cases' && '🧪'}
                    {activeReviewTab === 'Security' && '🛡️'}
                    {activeReviewTab === 'Improvement' && '💡'}
                  </span>
                  {activeReviewTab}
                </h2>
              </div>
              <div className="flex-1 p-6 overflow-auto">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-medium text-white mb-2">Analyzing Code...</h3>
                    <p className="text-gray-400">Running comprehensive analysis on your code</p>
                  </div>
                ) : reviewResults[activeReviewTab]?.content ? (
                  <div className="max-w-5xl space-y-6">
                    {renderContent(activeReviewTab)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Bug className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No Analysis Available</h3>
                    <p className="text-gray-400">
                      {Object.keys(reviewResults).length === 0
                        ? "Click 'Get Review' to analyze your code"
                        : "No data available for this category"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-2 flex items-center justify-between text-xs text-gray-400 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Ready
          </div>
          <div>Lines: {code.split('\n').length}</div>
          <div>Characters: {code.length}</div>
        </div>
        <div className="flex items-center gap-4">
          <div>UTF-8</div>
          <div>Spaces: 2</div>
          <div>Dark Theme</div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewCompiler;