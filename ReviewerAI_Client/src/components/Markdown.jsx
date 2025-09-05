// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeSanitize from 'rehype-sanitize';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const Markdown = ({ content }) => {
//     return (
//         <div className="prose prose-invert max-w-none text-gray-200">
//             <ReactMarkdown
//                 children={content}
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeSanitize]}
//                 components={{
//                     // Code block
//                     code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || '');
//                         return !inline && match ? (
//                             <SyntaxHighlighter
//                                 style={vscDarkPlus}
//                                 language={match[1]}
//                                 PreTag="div"
//                                 customStyle={{
//                                     borderRadius: '0.5rem',
//                                     padding: '1.25rem',
//                                     margin: '1.5rem 0',
//                                     fontSize: '0.95rem',
//                                     lineHeight: '1.6',
//                                     backgroundColor: '#1e1e1e',
//                                     overflowX: 'auto',
//                                     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                                 }}
//                                 {...props}
//                             >
//                                 {String(children).replace(/\n$/, '')}
//                             </SyntaxHighlighter>
//                         ) : (
//                             <code className="bg-gray-800 text-pink-300 px-1 py-0.5 rounded" {...props}>
//                                 {children}
//                             </code>
//                         );
//                     },

//                     // Section title with emoji icons
//                     h2({ children }) {
//                         return (
//                             <h2 className="text-xl font-bold text-blue-300 mt-8 mb-4 flex items-center gap-2">
//                                 <span className="text-blue-400">🔷</span>
//                                 {children}
//                             </h2>
//                         );
//                     },
//                     h3({ children }) {
//                         return (
//                             <h3 className="text-lg font-semibold text-blue-200 mt-6 mb-2">
//                                 {children}
//                             </h3>
//                         );
//                     },

//                     // Special paragraph formatting (for *Strengths* ✅)
//                     p({ children }) {
//                         const raw = children?.[0]?.props?.children || '';
//                         const text = typeof raw === 'string' ? raw.trim() : '';

//                         const emoji = text.substring(text.length - 2);
//                         const isTitledLine = /^\*(.+)\*\s+/.test(text);

//                         const emojiClassMap = {
//                             '✅': 'text-green-400',
//                             '❌': 'text-red-400',
//                             '⚠️': 'text-yellow-400',
//                             '📉': 'text-red-300',
//                             '📈': 'text-green-300',
//                             '📌': 'text-blue-300',
//                             '👇': 'text-blue-400',
//                         };

//                         const emojiClass = emojiClassMap[emoji] || 'text-white';
//                         const baseStyle = 'mb-2 text-base leading-relaxed';

//                         if (isTitledLine) {
//                             return (
//                                 <p className={`font-semibold italic ${baseStyle} ${emojiClass}`}>
//                                     {children}
//                                 </p>
//                             );
//                         }

//                         return <p className={`${baseStyle} ${emojiClass}`}>{children}</p>;
//                     },

//                     // Tables
//                     table({ children }) {
//                         return (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full border-collapse text-gray-200 text-lg">
//                                     {children}
//                                 </table>
//                             </div>
//                         );
//                     },
//                     th({ children }) {
//                         return (
//                             <th className="border border-gray-700 p-4 text-left font-semibold bg-gray-800">
//                                 {children}
//                             </th>
//                         );
//                     },
//                     td({ children }) {
//                         return (
//                             <td className="border border-gray-700 p-4">
//                                 {children}
//                             </td>
//                         );
//                     },

//                     // Lists
//                     ul({ children }) {
//                         return (
//                             <ul className="list-disc pl-6 space-y-2">
//                                 {children}
//                             </ul>
//                         );
//                     },
//                     ol({ children }) {
//                         return (
//                             <ol className="list-decimal pl-6 space-y-2">
//                                 {children}
//                             </ol>
//                         );
//                     },

//                     // Blockquotes
//                     blockquote({ children }) {
//                         return (
//                             <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4">
//                                 {children}
//                             </blockquote>
//                         );
//                     },
//                 }}
//             />
//         </div>
//     );
// };

// export default Markdown;


// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeSanitize from 'rehype-sanitize';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const Markdown = ({ content }) => {
//     return (
//         <div className="prose prose-invert max-w-none text-gray-200 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
//             <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeSanitize]}
//                 components={{
//                     h1: ({ node, ...props }) => (
//                         <h1 className="text-3xl font-bold mb-4 text-blue-400" {...props} />
//                     ),
//                     h2: ({ node, ...props }) => (
//                         <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-300" {...props} />
//                     ),
//                     h3: ({ node, ...props }) => (
//                         <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-200" {...props} />
//                     ),
//                     strong: ({ node, ...props }) => (
//                         <strong className="font-semibold text-green-300" {...props} />
//                     ),
//                     em: ({ node, ...props }) => (
//                         <em className="italic text-yellow-300" {...props} />
//                     ),
//                     code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || '');
//                         return !inline && match ? (
//                             <SyntaxHighlighter
//                                 style={vscDarkPlus}
//                                 language={match[1]}
//                                 PreTag="div"
//                                 customStyle={{
//                                     borderRadius: '0.5rem',
//                                     padding: '1.5rem',
//                                     margin: '1.5rem 0',
//                                     fontSize: '1rem',
//                                     lineHeight: '1.7',
//                                     backgroundColor: '#1e1e1e',
//                                     overflowX: 'auto',
//                                     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                                 }}
//                                 {...props}
//                             >
//                                 {String(children).replace(/\n$/, '')}
//                             </SyntaxHighlighter>
//                         ) : (
//                             <code className="bg-gray-800 text-pink-300 px-1 py-0.5 rounded" {...props}>
//                                 {children}
//                             </code>
//                         );
//                     },
//                     blockquote({ children }) {
//                         return (
//                             <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-300 my-4">
//                                 {children}
//                             </blockquote>
//                         );
//                     },
//                     ul({ children }) {
//                         return (
//                             <ul className="list-disc pl-6 space-y-2 text-gray-300">
//                                 {children}
//                             </ul>
//                         );
//                     },
//                     ol({ children }) {
//                         return (
//                             <ol className="list-decimal pl-6 space-y-2 text-gray-300">
//                                 {children}
//                             </ol>
//                         );
//                     },
//                     table({ children }) {
//                         return (
//                             <div className="overflow-x-auto my-4">
//                                 <table className="w-full border-collapse text-gray-200 text-lg">
//                                     {children}
//                                 </table>
//                             </div>
//                         );
//                     },
//                     th({ children }) {
//                         return (
//                             <th className="border border-gray-700 p-4 text-left font-semibold bg-gray-800">
//                                 {children}
//                             </th>
//                         );
//                     },
//                     td({ children }) {
//                         return (
//                             <td className="border border-gray-700 p-4">
//                                 {children}
//                             </td>
//                         );
//                     },
//                 }}
//             >
//                 {content}
//             </ReactMarkdown>
//         </div>
//     );
// };

// export default Markdown;


// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeSanitize from 'rehype-sanitize';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const Markdown = ({ content }) => {
//     // Remove any text before the first heading
//     const cleanedContent = content.replace(/^[\s\S]*?(?=^# )/m, '');

//     return (
//         <div className="prose prose-invert max-w-none text-gray-200 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
//             <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeSanitize]}
//                 components={{
//                     h1: ({ node, ...props }) => (
//                         <h1 className="text-3xl font-bold mb-4 text-blue-400" {...props} />
//                     ),
//                     h2: ({ node, ...props }) => (
//                         <h1 className="text-3xl font-semibold mt-6 mb-3 text-blue-300" {...props} />
//                     ),
//                     h3: ({ node, ...props }) => (
//                         <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-200" {...props} />
//                     ),
//                     strong: ({ node, ...props }) => (
//                         <strong className="font-semibold text-green-300" {...props} />
//                     ),
//                     em: ({ node, ...props }) => (
//                         <em className="italic text-yellow-300" {...props} />
//                     ),
//                     code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || '');
//                         return !inline && match ? (
//                             <SyntaxHighlighter
//                                 style={vscDarkPlus}
//                                 language={match[1]}
//                                 PreTag="div"
//                                 customStyle={{
//                                     borderRadius: '0.5rem',
//                                     padding: '1.5rem',
//                                     margin: '1.5rem 0',
//                                     fontSize: '1rem',
//                                     lineHeight: '1.7',
//                                     backgroundColor: '#1e1e1e',
//                                     overflowX: 'auto',
//                                     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                                 }}
//                                 {...props}
//                             >
//                                 {String(children).replace(/\n$/, '')}
//                             </SyntaxHighlighter>
//                         ) : (
//                             <code className="bg-gray-800 text-pink-300 px-1 py-0.5 rounded" {...props}>
//                                 {children}
//                             </code>
//                         );
//                     },
//                     blockquote({ children }) {
//                         return (
//                             <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-300 my-4">
//                                 {children}
//                             </blockquote>
//                         );
//                     },
//                     ul({ children }) {
//                         return (
//                             <ul className="list-disc pl-6 space-y-2 text-gray-300">
//                                 {children}
//                             </ul>
//                         );
//                     },
//                     ol({ children }) {
//                         return (
//                             <ol className="list-decimal pl-6 space-y-2 text-gray-300">
//                                 {children}
//                             </ol>
//                         );
//                     },
//                     table({ children }) {
//                         return (
//                             <div className="overflow-x-auto my-4">
//                                 <table className="w-full border-collapse text-gray-200 text-lg">
//                                     {children}
//                                 </table>
//                             </div>
//                         );
//                     },
//                     th({ children }) {
//                         return (
//                             <th className="border border-gray-700 p-4 text-left font-semibold bg-gray-800">
//                                 {children}
//                             </th>
//                         );
//                     },
//                     td({ children }) {
//                         return (
//                             <td className="border border-gray-700 p-4">
//                                 {children}
//                             </td>
//                         );
//                     },
//                 }}
//             >
//                 {cleanedContent}
//             </ReactMarkdown>
//         </div>
//     );
// };

// export default Markdown;

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

const Markdown = ({ content }) => {
    const cleanedContent = content.replace(/^[\s\S]*?(?=^# )/m, '');

    const CodeBlock = ({ inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        };

        return !inline && match ? (
            <div className="relative my-6">
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded"
                    title="Copy code"
                >
                    {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                </button>
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        paddingTop: '2.5rem',
                        fontSize: '1rem',
                        backgroundColor: '#1e1e1e',
                        overflowX: 'auto',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    }}
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        ) : (
            <code className="bg-gray-800 text-pink-300 px-1 py-0.5 rounded" {...props}>
                {children}
            </code>
        );
    };

    return (
        <div className="prose prose-invert max-w-none  text-gray-200 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-white prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={{
                    h1: (props) => (
                        <h1 className="text-4xl font-bold mb-8 text-blue-400" {...props} />
                    ),
                    h2: (props) => (
                        <h2 className="text-3xl font-semibold mt-6 mb-5 text-blue-300" {...props} />
                    ),
                    h3: (props) => (
                        <h3 className="text-2xl font-semibold mt-6 mb-5 text-blue-200" {...props} />
                    ),
                    p: (props) => (
                        <p className="my-6" {...props} />
                    ),
                    strong: (props) => (
                        <strong className="font-semibold text-green-300" {...props} />
                    ),
                    em: (props) => (
                        <em className="italic text-yellow-300" {...props} />
                    ),
                    li: ({ children }) => (
                        <li className="mb-6">{children}</li>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 text-gray-300 space-y-3">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 text-gray-300 space-y-3">{children}</ol>
                    ),
                    code: CodeBlock,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-300 my-4">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="w-full border-collapse text-gray-200 text-lg">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-gray-700 p-4 text-left font-semibold bg-gray-800">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-gray-700 p-4">
                            {children}
                        </td>
                    ),
                }}
            >
                {cleanedContent}
            </ReactMarkdown>
        </div>
    );
};

export default Markdown;
