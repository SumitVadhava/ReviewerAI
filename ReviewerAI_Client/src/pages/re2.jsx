// // import React, { useState, useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// // import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// // import { Clipboard, Download, Share2, Upload } from 'lucide-react';
// // import DOMPurify from 'dompurify';
// // import Markdown from './../components/Markdown';

// // // ActionButton Component (defined first to avoid hoisting issues)
// // const ActionButton = ({ icon: Icon, label, onClick, className }) => (
// //     <button
// //         onClick={onClick}
// //         className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${className}`}
// //     >
// //         <Icon size={20} />
// //         {label}
// //     </button>
// // );

// // // CodeBlock Component
// // const CodeBlock = ({ code, language }) => {
// //     const lang = (language?.replace('language-', '') || 'java').toLowerCase();
// //     return (
// //         <SyntaxHighlighter
// //             language={lang}
// //             style={vscDarkPlus}
// //             customStyle={{
// //                 borderRadius: '0.5rem',
// //                 padding: '1.5rem',
// //                 margin: '1.5rem 0',
// //                 fontSize: '1rem',
// //                 lineHeight: '1.7',
// //                 backgroundColor: '#1e1e1e',
// //                 overflowX: 'auto',
// //                 boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
// //             }}
// //             wrapLines={true}
// //             showLineNumbers={true}
// //             PreTag="div"
// //         >
// //             {code.trim() || '// No code provided'}
// //         </SyntaxHighlighter>
// //     );
// // };

// // // Section Component
// // const Section = ({ title, children }) => {
// //     return (
// //         <div className="mb-10 bg-zinc-900 border border-gray-700 rounded-xl shadow-xl transition-all hover:shadow-2xl">
// //             <h2 className="bg-gray-800 p-6 rounded-t-xl text-2xl font-bold text-white tracking-tight">{title}</h2>
// //             <div className="p-8 text-gray-200 leading-relaxed">
// //                 {children}
// //             </div>
// //         </div>
// //     );
// // };

// // // ScorecardTable Component
// // // const ScorecardTable = ({ data }) => {
// // //     return (
// // //         <table className="w-full border-collapse text-gray-200 text-lg">
// // //             <thead>
// // //                 <tr className="bg-gray-800">
// // //                     <th className="border border-gray-700 p-4 text-left font-semibold">Category</th>
// // //                     <th className="border border-gray-700 p-4 text-center font-semibold">Score</th>
// // //                     <th className="border border-gray-700 p-4 text-left font-semibold">Notes</th>
// // //                 </tr>
// // //             </thead>
// // //             <tbody>
// // //                 {data.map((row, index) => (
// // //                     <tr key={index} className="border border-gray-700 hover:bg-gray-800 transition-colors">
// // //                         <td className="border border-gray-700 p-4">{row.category}</td>
// // //                         <td className="border border-gray-700 p-4 text-center">{row.score}</td>
// // //                         <td className="border border-gray-700 p-4">{row.notes}</td>
// // //                     </tr>
// // //                 ))}
// // //             </tbody>
// // //         </table>
// // //     );
// // // };

// // const ScorecardTable = ({ data }) => {
// //     const headers = data.length > 0 ? Object.keys(data[0]) : [];

// //     return (
// //         <table className="w-full border-collapse text-gray-200 text-lg">
// //            { /*<thead>
// //                 <tr className="bg-gray-800">
// //                     {headers.map((key) => (
// //                         <th
// //                             key={key}
// //                             className={`border border-gray-700 p-4 font-semibold ${
// //                                 key.toLowerCase() === "score" ? "text-center" : "text-left"
// //                             } capitalize`}
// //                         >
// //                             {key}
// //                         </th>
// //                     ))}
// //                 </tr>
// //             </thead>*/}
// //             <tbody>
// //                 {data.map((row, index) => (
// //                     <tr
// //                         key={index}
// //                         className="border border-gray-700 hover:bg-gray-800 transition-colors"
// //                     >
// //                         {headers.map((key, idx) => (
// //                             <td
// //                                 key={idx}
// //                                 className={`border border-gray-700 p-4 ${
// //                                     key.toLowerCase() === "score" ? "text-center" : ""
// //                                 }`}
// //                             >
// //                                 {row[key]}
// //                             </td>
// //                         ))}
// //                     </tr>
// //                 ))}
// //             </tbody>
// //         </table>
// //     );
// // };


// // // Parse markdown-like content
// // // Error Boundary Component
// // class ErrorBoundary extends React.Component {
// //     state = { hasError: false, error: null };

// //     static getDerivedStateFromError(error) {
// //         return { hasError: true, error };
// //     }

// //     render() {
// //         if (this.state.hasError) {
// //             return (
// //                 <div className="text-red-400 text-center p-8 text-xl font-medium">
// //                     Error: {this.state.error.message}
// //                 </div>
// //             );
// //         }
// //         return this.props.children;
// //     }
// // }

// // // ReviewPage Component
// // const ReviewPage = () => {
// //     const { state } = useLocation();
// //     const [reviewData, setReviewData] = useState(null);
// //     const [reviewId, setReviewId] = useState(null);
// //     const [filename, setFilename] = useState(null);
// //     const [categories, setCategories] = useState([]);
// //     const [error, setError] = useState(null);
// //     const [notification, setNotification] = useState(null);
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //         setIsLoading(true);
// //         if (state?.jsonData) {
// //             try {
// //                 // Validate the full structure before accessing
// //                 if (
// //                     !state.jsonData.choices ||
// //                     !Array.isArray(state.jsonData.choices) ||
// //                     !state.jsonData.choices[0] ||
// //                     !state.jsonData.choices[0].message ||
// //                     !state.jsonData.choices[0].message.content
// //                 ) {
// //                     throw new Error("Invalid JSON data structure: Missing choices or content");
// //                 }
// //                 setReviewData(state.jsonData.choices[0].message.content);
// //                 setReviewId(state.jsonData.id || 'unknown');
// //                 setFilename(state.jsonData.filename || 'Unknown File');
// //                 setCategories(state.jsonData.categories || []);
// //             } catch (err) {
// //                 setError('Failed to parse review data. Please try uploading again.');
// //                 console.error('Error in useEffect:', err);
// //             }
// //         } else {
// //             setError('No review data provided. Please upload a file.');
// //         }
// //         setIsLoading(false);
// //     }, [state]);

// //     const handleFileUpload = (event) => {
// //         const file = event.target.files[0];
// //         if (file && file.type === 'application/json') {
// //             const reader = new FileReader();
// //             reader.onload = (e) => {
// //                 try {
// //                     const parsedData = JSON.parse(e.target.result);
// //                     if (
// //                         !parsedData.choices ||
// //                         !Array.isArray(parsedData.choices) ||
// //                         !parsedData.choices[0] ||
// //                         !parsedData.choices[0].message ||
// //                         !parsedData.choices[0].message.content
// //                     ) {
// //                         throw new Error("Invalid JSON data structure");
// //                     }
// //                     setReviewData(parsedData.choices[0].message.content);
// //                     setReviewId(parsedData.id || 'unknown');
// //                     setFilename(parsedData.filename || 'Unknown File');
// //                     setCategories(parsedData.categories || []);
// //                     setError(null);
// //                     setNotification('JSON file loaded successfully!');
// //                     setTimeout(() => setNotification(null), 3000);
// //                 } catch (err) {
// //                     setError('Failed to parse JSON file');
// //                     setNotification('Failed to parse JSON file');
// //                     setTimeout(() => setNotification(null), 3000);
// //                 }
// //             };
// //             reader.readAsText(file);
// //         } else {
// //             setError('Please upload a valid JSON file');
// //             setNotification('Please upload a valid JSON file');
// //             setTimeout(() => setNotification(null), 3000);
// //         }
// //     };

// //     const handleCopy = () => {
// //         if (!reviewData) {
// //             setNotification('No content to copy');
// //             setTimeout(() => setNotification(null), 3000);
// //             return;
// //         }
// //         navigator.clipboard.writeText(reviewData).then(() => {
// //             setNotification('Content copied to clipboard!');
// //             setTimeout(() => setNotification(null), 3000);
// //         }).catch(() => {
// //             setNotification('Failed to copy content');
// //             setTimeout(() => setNotification(null), 3000);
// //         });
// //     };

// //     const handleDownload = () => {
// //         if (!reviewData) {
// //             setNotification('No content to download');
// //             setTimeout(() => setNotification(null), 3000);
// //             return;
// //         }
// //         const blob = new Blob([reviewData], { type: 'text/plain' });
// //         const url = URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `code_review_${reviewId}.txt`;
// //         a.click();
// //         URL.revokeObjectURL(url);
// //         setNotification('File downloaded!');
// //         setTimeout(() => setNotification(null), 3000);
// //     };

// //     const handleShare = async () => {
// //         if (!reviewData) {
// //             setNotification('No content to share');
// //             setTimeout(() => setNotification(null), 3000);
// //             return;
// //         }
// //         try {
// //             if (navigator.share) {
// //                 await navigator.share({
// //                     title: `Code Review: ${reviewId}`,
// //                     text: reviewData,
// //                     url: window.location.href,
// //                 });
// //                 setNotification('Content shared successfully!');
// //             } else {
// //                 setNotification('Share API not supported, copied to clipboard instead!');
// //                 await navigator.clipboard.writeText(reviewData);
// //             }
// //         } catch (err) {
// //             setNotification('Failed to share content');
// //         }
// //         setTimeout(() => setNotification(null), 3000);
// //     };

// //     if (isLoading) {
// //         return <div className="text-gray-200 text-center p-8 text-xl font-medium">Loading...</div>;
// //     }

// //     if (error) {
// //         return (
// //             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
// //                 <div className="flex justify-end gap-4 mb-8">
// //                     <ActionButton
// //                         icon={Upload}
// //                         label="Upload JSON"
// //                         onClick={() => document.getElementById('fileInput').click()}
// //                         className="bg-yellow-600 hover:bg-yellow-700"
// //                     />
// //                     <input
// //                         id="fileInput"
// //                         type="file"
// //                         accept="application/json"
// //                         onChange={handleFileUpload}
// //                         className="hidden"
// //                     />
// //                 </div>
// //                 <div className="text-red-400 text-center p-8 text-xl font-medium">Error: {error}</div>
// //             </div>
// //         );
// //     }

// //     if (!reviewData) {
// //         return (
// //             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
// //                 <div className="flex justify-end gap-4 mb-8">
// //                     <ActionButton
// //                         icon={Upload}
// //                         label="Upload JSON"
// //                         onClick={() => document.getElementById('fileInput').click()}
// //                         className="bg-yellow-600 hover:bg-yellow-700"
// //                     />
// //                     <input
// //                         id="fileInput"
// //                         type="file"
// //                         accept="application/json"
// //                         onChange={handleFileUpload}
// //                         className="hidden"
// //                     />
// //                 </div>
// //                 <div className="text-gray-200 text-center p-8 text-xl font-medium">Please upload a JSON file to view the review.</div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <ErrorBoundary>
// //             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
// //                 <div className="mb-8">
// //                     <h2 className="text-2xl font-bold text-white">File: {filename}</h2>
// //                     <p className="text-gray-300">Categories: {categories.join(', ') || 'None'}</p>
// //                 </div>
// //                 <div className="flex justify-end gap-4 mb-8">
// //                     <ActionButton
// //                         icon={Clipboard}
// //                         label="Copy"
// //                         onClick={handleCopy}
// //                         className="bg-blue-600 hover:bg-blue-700"
// //                     />
// //                     <ActionButton
// //                         icon={Download}
// //                         label="Download"
// //                         onClick={handleDownload}
// //                         className="bg-green-600 hover:bg-green-700"
// //                     />
// //                     <ActionButton
// //                         icon={Share2}
// //                         label="Share"
// //                         onClick={handleShare}
// //                         className="bg-purple-600 hover:bg-purple-700"
// //                     />
// //                   {/*  <ActionButton
// //                         icon={Upload}
// //                         label="Upload New JSON"
// //                         onClick={() => document.getElementById('fileInput').click()}
// //                         className="bg-yellow-600 hover:bg-yellow-700"
// //                     />*/}
// //                     <input
// //                         id="fileInput"
// //                         type="file"
// //                         accept="application/json"
// //                         onChange={handleFileUpload}
// //                         className="hidden"
// //                     />
// //                 </div>
// //                 {notification && (
// //                     <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
// //                         {notification}
// //                     </div>
// //                 )}
// //               <Markdown content={reviewData} />

// //             </div>
// //         </ErrorBoundary>
// //     );
// // };

// // export default ReviewPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Clipboard, Download, Share2, Upload, FileText } from 'lucide-react';
// import DOMPurify from 'dompurify';
// import Markdown from './../components/Markdown';
// import html2pdf from 'html2pdf.js'; // ✅ NEW IMPORT

// // ActionButton Component
// const ActionButton = ({ icon: Icon, label, onClick, className }) => (
//     <button
//         onClick={onClick}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${className}`}
//     >
//         <Icon size={20} />
//         {label}
//     </button>
// );

// // CodeBlock Component
// const CodeBlock = ({ code, language }) => {
//     const lang = (language?.replace('language-', '') || 'java').toLowerCase();
//     return (
//         <SyntaxHighlighter
//             language={lang}
//             style={vscDarkPlus}
//             customStyle={{
//                 borderRadius: '0.5rem',
//                 padding: '1.5rem',
//                 margin: '1.5rem 0',
//                 fontSize: '1rem',
//                 lineHeight: '1.7',
//                 backgroundColor: '#1e1e1e',
//                 overflowX: 'auto',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//             }}
//             wrapLines={true}
//             showLineNumbers={true}
//             PreTag="div"
//         >
//             {code.trim() || '// No code provided'}
//         </SyntaxHighlighter>
//     );
// };

// // Section Component
// const Section = ({ title, children }) => {
//     return (
//         <div className="mb-10 bg-zinc-900 border border-gray-700 rounded-xl shadow-xl transition-all hover:shadow-2xl">
//             <h2 className="bg-gray-800 p-6 rounded-t-xl text-2xl font-bold text-white tracking-tight">{title}</h2>
//             <div className="p-8 text-gray-200 leading-relaxed">{children}</div>
//         </div>
//     );
// };

// // ScorecardTable Component
// const ScorecardTable = ({ data }) => {
//     const headers = data.length > 0 ? Object.keys(data[0]) : [];
//     return (
//         <table className="w-full border-collapse text-gray-200 text-lg">
//             <tbody>
//                 {data.map((row, index) => (
//                     <tr
//                         key={index}
//                         className="border border-gray-700 hover:bg-gray-800 transition-colors"
//                     >
//                         {headers.map((key, idx) => (
//                             <td
//                                 key={idx}
//                                 className={`border border-gray-700 p-4 ${
//                                     key.toLowerCase() === 'score' ? 'text-center' : ''
//                                 }`}
//                             >
//                                 {row[key]}
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//     state = { hasError: false, error: null };
//     static getDerivedStateFromError(error) {
//         return { hasError: true, error };
//     }
//     render() {
//         if (this.state.hasError) {
//             return (
//                 <div className="text-red-400 text-center p-8 text-xl font-medium">
//                     Error: {this.state.error.message}
//                 </div>
//             );
//         }
//         return this.props.children;
//     }
// }

// // ReviewPage Component
// const ReviewPage = () => {
//     const { state } = useLocation();
//     const [reviewData, setReviewData] = useState(null);
//     const [reviewId, setReviewId] = useState(null);
//     const [filename, setFilename] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);
//     const [notification, setNotification] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const pdfRef = useRef(); // ✅ PDF Target

//     useEffect(() => {
//         setIsLoading(true);
//         if (state?.jsonData) {
//             try {
//                 if (
//                     !state.jsonData.choices ||
//                     !Array.isArray(state.jsonData.choices) ||
//                     !state.jsonData.choices[0] ||
//                     !state.jsonData.choices[0].message ||
//                     !state.jsonData.choices[0].message.content
//                 ) {
//                     throw new Error('Invalid JSON data structure: Missing choices or content');
//                 }
//                 setReviewData(state.jsonData.choices[0].message.content);
//                 setReviewId(state.jsonData.id || 'unknown');
//                 setFilename(state.jsonData.filename || 'Unknown File');
//                 setCategories(state.jsonData.categories || []);
//             } catch (err) {
//                 setError('Failed to parse review data. Please try uploading again.');
//                 console.error('Error in useEffect:', err);
//             }
//         } else {
//             setError('No review data provided. Please upload a file.');
//         }
//         setIsLoading(false);
//     }, [state]);

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file && file.type === 'application/json') {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 try {
//                     const parsedData = JSON.parse(e.target.result);
//                     if (
//                         !parsedData.choices ||
//                         !Array.isArray(parsedData.choices) ||
//                         !parsedData.choices[0] ||
//                         !parsedData.choices[0].message ||
//                         !parsedData.choices[0].message.content
//                     ) {
//                         throw new Error('Invalid JSON data structure');
//                     }
//                     setReviewData(parsedData.choices[0].message.content);
//                     setReviewId(parsedData.id || 'unknown');
//                     setFilename(parsedData.filename || 'Unknown File');
//                     setCategories(parsedData.categories || []);
//                     setError(null);
//                     setNotification('JSON file loaded successfully!');
//                     setTimeout(() => setNotification(null), 3000);
//                 } catch (err) {
//                     setError('Failed to parse JSON file');
//                     setNotification('Failed to parse JSON file');
//                     setTimeout(() => setNotification(null), 3000);
//                 }
//             };
//             reader.readAsText(file);
//         } else {
//             setError('Please upload a valid JSON file');
//             setNotification('Please upload a valid JSON file');
//             setTimeout(() => setNotification(null), 3000);
//         }
//     };

//     const handleCopy = () => {
//         if (!reviewData) {
//             setNotification('No content to copy');
//             setTimeout(() => setNotification(null), 3000);
//             return;
//         }
//         navigator.clipboard.writeText(reviewData).then(() => {
//             setNotification('Content copied to clipboard!');
//             setTimeout(() => setNotification(null), 3000);
//         }).catch(() => {
//             setNotification('Failed to copy content');
//             setTimeout(() => setNotification(null), 3000);
//         });
//     };

//     const handleDownload = () => {
//         if (!reviewData) {
//             setNotification('No content to download');
//             setTimeout(() => setNotification(null), 3000);
//             return;
//         }
//         const blob = new Blob([reviewData], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `code_review_${reviewId}.txt`;
//         a.click();
//         URL.revokeObjectURL(url);
//         setNotification('File downloaded!');
//         setTimeout(() => setNotification(null), 3000);
//     };

//     const handleDownloadPDF = () => {
//         if (!reviewData) {
//             setNotification('No content to download');
//             setTimeout(() => setNotification(null), 3000);
//             return;
//         }

//         const element = pdfRef.current;
//         const opt = {
//             margin: 0.5,
//             filename: `code_review_${reviewId}.pdf`,
//             text: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2, scrollY: 0 },
//             jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
//         };

//         html2pdf().set(opt).from(element).save();

//         setNotification('PDF downloaded!');
//         setTimeout(() => setNotification(null), 3000);
//     };

//     const handleShare = async () => {
//         if (!reviewData) {
//             setNotification('No content to share');
//             setTimeout(() => setNotification(null), 3000);
//             return;
//         }
//         try {
//             if (navigator.share) {
//                 await navigator.share({
//                     title: `Code Review: ${reviewId}`,
//                     text: reviewData,
//                     url: window.location.href,
//                 });
//                 setNotification('Content shared successfully!');
//             } else {
//                 setNotification('Share API not supported, copied to clipboard instead!');
//                 await navigator.clipboard.writeText(reviewData);
//             }
//         } catch (err) {
//             setNotification('Failed to share content');
//         }
//         setTimeout(() => setNotification(null), 3000);
//     };

//     if (isLoading) {
//         return <div className="text-gray-200 text-center p-8 text-xl font-medium">Loading...</div>;
//     }

//     if (error) {
//         return (
//             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//                 <div className="flex justify-end gap-4 mb-8">
//                     <ActionButton
//                         icon={Upload}
//                         label="Upload JSON"
//                         onClick={() => document.getElementById('fileInput').click()}
//                         className="bg-yellow-600 hover:bg-yellow-700"
//                     />
//                     <input
//                         id="fileInput"
//                         type="file"
//                         accept="application/json"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                     />
//                 </div>
//                 <div className="text-red-400 text-center p-8 text-xl font-medium">Error: {error}</div>
//             </div>
//         );
//     }

//     if (!reviewData) {
//         return (
//             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//                 <div className="flex justify-end gap-4 mb-8">
//                     <ActionButton
//                         icon={Upload}
//                         label="Upload JSON"
//                         onClick={() => document.getElementById('fileInput').click()}
//                         className="bg-yellow-600 hover:bg-yellow-700"
//                     />
//                     <input
//                         id="fileInput"
//                         type="file"
//                         accept="application/json"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                     />
//                 </div>
//                 <div className="text-gray-200 text-center p-8 text-xl font-medium">Please upload a JSON file to view the review.</div>
//             </div>
//         );
//     }

//     return (
//         <ErrorBoundary>
//             <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100" ref={pdfRef}>
//                 <div className="mb-8">
//                     <h2 className="text-2xl font-bold text-white">File: {filename}</h2>
//                     <p className="text-gray-300">Categories: {categories.join(', ') || 'None'}</p>
//                 </div>
//                 <div className="flex justify-end gap-4 mb-8">
//                     <ActionButton
//                         icon={Clipboard}
//                         label="Copy"
//                         onClick={handleCopy}
//                         className="bg-blue-600 hover:bg-blue-700"
//                     />
//                     <ActionButton
//                         icon={Download}
//                         label="Download TXT"
//                         onClick={handleDownload}
//                         className="bg-green-600 hover:bg-green-700"
//                     />
//                     <ActionButton
//                         icon={FileText}
//                         label="Download PDF"
//                         onClick={handleDownloadPDF}
//                         className="bg-red-600 hover:bg-red-700"
//                     />
//                     <ActionButton
//                         icon={Share2}
//                         label="Share"
//                         onClick={handleShare}
//                         className="bg-purple-600 hover:bg-purple-700"
//                     />
//                     <input
//                         id="fileInput"
//                         type="file"
//                         accept="application/json"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                     />
//                 </div>
//                 {notification && (
//                     <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
//                         {notification}
//                     </div>
//                 )}
//                 <Markdown content={reviewData} />
//             </div>
//         </ErrorBoundary>
//     );
// };

// export default ReviewPage;



/// grok ....///  
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Clipboard, Download, Share2, Upload, FileText } from 'lucide-react';
import DOMPurify from 'dompurify';
import Markdown from './../components/Markdown';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'; // ✅ NEW IMPORT (replacing html2pdf.js)
import { marked } from "marked"; 

// ActionButton Component
const ActionButton = ({ icon: Icon, label, onClick, className }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${className}`}
    >
        <Icon size={20} />
        {label}
    </button>
);

// CodeBlock Component
const CodeBlock = ({ code, language }) => {
    const lang = (language?.replace('language-', '') || 'java').toLowerCase();
    return (
        <SyntaxHighlighter
            language={lang}
            style={vscDarkPlus}
            customStyle={{
                borderRadius: '0.5rem',
                padding: '1.5rem',
                margin: '1.5rem 0',
                fontSize: '1rem',
                lineHeight: '1.7',
                backgroundColor: '#1e1e1e',
                overflowX: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
            wrapLines={true}
            showLineNumbers={true}
            PreTag="div"
        >
            {code.trim() || '// No code provided'}
        </SyntaxHighlighter>
    );
};

// Section Component
const Section = ({ title, children }) => {
    return (
        <div className="mb-10 bg-zinc-900 border border-gray-700 rounded-xl shadow-xl transition-all hover:shadow-2xl">
            <h2 className="bg-gray-800 p-6 rounded-t-xl text-2xl font-bold text-white tracking-tight">{title}</h2>
            <div className="p-8 text-gray-200 leading-relaxed">{children}</div>
        </div>
    );
};

// ScorecardTable Component
const ScorecardTable = ({ data }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    return (
        <table className="w-full border-collapse text-gray-200 text-lg">
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={index}
                        className="border border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                        {headers.map((key, idx) => (
                            <td
                                key={idx}
                                className={`border border-gray-700 p-4 ${key.toLowerCase() === 'score' ? 'text-center' : ''
                                    }`}
                            >
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="text-red-400 text-center p-8 text-xl font-medium">
                    Error: {this.state.error.message}
                </div>
            );
        }
        return this.props.children;
    }
}

// ReviewPage Component
const ReviewPage = () => {
    const { state } = useLocation();
    const [reviewData, setReviewData] = useState(null);
    const [reviewId, setReviewId] = useState(null);
    const [filename, setFilename] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (state?.jsonData) {
            try {
                if (
                    !state.jsonData.choices ||
                    !Array.isArray(state.jsonData.choices) ||
                    !state.jsonData.choices[0] ||
                    !state.jsonData.choices[0].message ||
                    !state.jsonData.choices[0].message.content
                ) {
                    throw new Error('Invalid JSON data structure: Missing choices or content');
                }
                setReviewData(state.jsonData.choices[0].message.content);
                setReviewId(state.jsonData.id || 'unknown');
                setFilename(state.jsonData.filename || 'Unknown File');
                setCategories(state.jsonData.categories || []);
            } catch (err) {
                setError('Failed to parse review data. Please try uploading again.');
                console.error('Error in useEffect:', err);
            }
        } else {
            setError('No review data provided. Please upload a file.');
        }
        setIsLoading(false);
    }, [state]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    if (
                        !parsedData.choices ||
                        !Array.isArray(parsedData.choices) ||
                        !parsedData.choices[0] ||
                        !parsedData.choices[0].message ||
                        !parsedData.choices[0].message.content
                    ) {
                        throw new Error('Invalid JSON data structure');
                    }
                    setReviewData(parsedData.choices[0].message.content);
                    setReviewId(parsedData.id || 'unknown');
                    setFilename(parsedData.filename || 'Unknown File');
                    setCategories(parsedData.categories || []);
                    setError(null);
                    setNotification('JSON file loaded successfully!');
                    setTimeout(() => setNotification(null), 3000);
                } catch (err) {
                    setError('Failed to parse JSON file');
                    setNotification('Failed to parse JSON file');
                    setTimeout(() => setNotification(null), 3000);
                }
            };
            reader.readAsText(file);
        } else {
            setError('Please upload a valid JSON file');
            setNotification('Please upload a valid JSON file');
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleCopy = () => {
        if (!reviewData) {
            setNotification('No content to copy');
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        navigator.clipboard.writeText(reviewData).then(() => {
            setNotification('Content copied to clipboard!');
            setTimeout(() => setNotification(null), 3000);
        }).catch(() => {
            setNotification('Failed to copy content');
            setTimeout(() => setNotification(null), 3000);
        });
    };

    // const handleDownload = () => {
    //     if (!reviewData) {
    //         setNotification('No content to download');
    //         setTimeout(() => setNotification(null), 3000);
    //         return;
    //     }
    //     const blob = new Blob([reviewData], { type: 'text/plain' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `code_review_${reviewId}.txt`;
    //     a.click();
    //     URL.revokeObjectURL(url);
    //     setNotification('File downloaded!');
    //     setTimeout(() => setNotification(null), 3000);
    // };

// Function to convert markdown to plain text
// Function to convert markdown to plain text
const markdownToPlainText = (markdown) => {
    if (!markdown) return '';
    // Remove <think> section including tags
    let plainText = markdown.replace(/<think>[\s\S]*?<\/think>/g, '');
    // Process markdown elements
    plainText = plainText
        // Remove headers (e.g., # Heading)
        .replace(/^#{1,6}\s*(.*?)(\r?\n|$)/gm, '$1\n')
        // Remove bold and italic (**, __, *, _)
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, '$2')
        // Remove inline code (`code` or `c`)
        .replace(/`[^`]*`/g, '')
        // Remove code blocks (```lang ... ``` or single ``` or ```lang)
        .replace(/```.*?(\r?\n|$)([\s\S]*?)(```|$)/g, '')
        // Remove links ([text](url))
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        // Remove images (![alt](url))
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
        // Remove unordered lists (-, *, +)
        .replace(/^[\-\*\+]\s*(.*?)(\r?\n|$)/gm, '$1\n')
        // Remove ordered lists (1., 2., etc.)
        .replace(/^\d+\.\s*(.*?)(\r?\n|$)/gm, '$1\n')
        // Remove blockquotes (>)
        .replace(/^>\s*(.*?)(\r?\n|$)/gm, '$1\n')
        // Remove horizontal rules (---, ***, ___)
        .replace(/^(-{3,}|\*{3,}|_{3,})(\r?\n|$)/gm, '\n')
        // Normalize multiple newlines and add extra newline between non-empty lines
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n\n')
        // Trim leading/trailing whitespace
        .trim();
    return plainText;
};

const markdownToPdfText = (markdown) => {
    if (!markdown) return [];
    let lines = [];
    let currentLine = '';
    let inThink = false;
    let inCodeBlock = false;

    markdown.split('\n').forEach(line => {
        line = line.trim();

        // Handle <think> section
        if (line.startsWith('<think>')) {
            inThink = true;
            return;
        }
        if (line.startsWith('</think>')) {
            inThink = false;
            return;
        }
        if (inThink) return;

        // Handle code blocks
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return;
        }
        if (inCodeBlock) return;

        // Process non-code, non-think lines
        if (line) {
            // Handle headers
            let headerMatch = line.match(/^#{1,6}\s*(.+)/);
            if (headerMatch) {
                if (currentLine) lines.push(currentLine);
                lines.push({ text: headerMatch[1], options: { fontSize: 16 - (headerMatch[0].match(/#/g).length * 2), bold: true } });
                currentLine = '';
                return;
            }

            // Handle bold/italic
            let boldMatch = line.match(/(\*\*|__)(.*?)\1/g);
            if (boldMatch) {
                boldMatch.forEach(match => {
                    let text = match.replace(/(\*\*|__)/g, '');
                    line = line.replace(match, `{bold}${text}{/bold}`);
                });
            }
            let italicMatch = line.match(/(\*|_)(.*?)\1/g);
            if (italicMatch) {
                italicMatch.forEach(match => {
                    let text = match.replace(/(\*|_)/g, '');
                    line = line.replace(match, `{italic}${text}{/italic}`);
                });
            }

            currentLine += (currentLine ? ' ' : '') + line;
        } else if (currentLine) {
            lines.push(currentLine);
            currentLine = '';
        }
    });

    if (currentLine) lines.push(currentLine);
    return lines.map(line => {
        let options = {};
        let text = line;
        // Apply bold/italic styling
        while (text.toString().includes('{bold}')) {
            let start = text.indexOf('{bold}');
            let end = text.indexOf('{/bold}', start);
            if (end === -1) break;
            let boldText = text.substring(start + 6, end);
            text = text.replace(`{bold}${boldText}{/bold}`, boldText);
            options.bold = true;
        }
        while (text.toString().includes('{italic}')) {
            let start = text.indexOf('{italic}');
            let end = text.indexOf('{/italic}', start);
            if (end === -1) break;
            let italicText = text.substring(start + 8, end);
            text = text.replace(`{italic}${italicText}{/italic}`, italicText);
            options.italic = true;
        }
        return { text, options };
    });
};

        const handleDownload = () => {
            if (!reviewData) {
                setNotification('No content to download');
                setTimeout(() => setNotification(null), 3000);
                return;
            }
            const plainText = markdownToPlainText(reviewData);
            const blob = new Blob([plainText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `code_review_${reviewId}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            setNotification('File downloaded!');
            setTimeout(() => setNotification(null), 3000);
        };

    // const handleDownloadPDF = () => {
    //     if (!reviewData) {
    //         setNotification('No content to download');
    //         setTimeout(() => setNotification(null), 3000);
    //         return;
    //     }

    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'in',
    //         format: 'a4',
    //     });

    //     // Add title
    //     doc.setFontSize(16);
    //     doc.setFont('helvetica', 'bold');
    //     doc.text(`Code Review: ${filename}`, 0.5, 0.5);

    //     // Add categories
    //     doc.setFontSize(12);
    //     doc.setFont('helvetica', 'normal');
    //     doc.text(`Categories: ${categories.join(', ') || 'None'}`, 0.5, 0.8);

    //     // Add review content
    //     doc.setFontSize(10);
    //     const splitText = doc.splitTextToSize(reviewData, 7.5); // Split text to fit page width
    //     doc.text(splitText, 0.5, 1.2);

    //     // Save the PDF
    //     doc.save(`code_review_${reviewId}.pdf`);

    //     setNotification('PDF downloaded!');
    //     setTimeout(() => setNotification(null), 3000);
    // };

    // const handleDownloadPDF = async () => {
    //     const input = document.getElementById('review-content');

    //     if (!input || !reviewData) {
    //         setNotification('No content to download');
    //         setTimeout(() => setNotification(null), 3000);
    //         return;
    //     }

    //     const canvas = await html2canvas(input, {
    //         scale: 2,
    //         scrollY: -window.scrollY, // Prevent scroll cut-off
    //         useCORS: true,
    //     });

    //     const imgData = canvas.toDataURL('image/png');

    //     const pdf = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'px',
    //         format: 'a4',
    //     });

    //     const pageWidth = pdf.internal.pageSize.getWidth();
    //     const pageHeight = pdf.internal.pageSize.getHeight();

    //     const imgWidth = pageWidth;
    //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //     let heightLeft = imgHeight;
    //     let position = 0;

    //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;

    //     while (heightLeft > 0) {
    //         position = heightLeft - imgHeight;
    //         pdf.addPage();
    //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //         heightLeft -= pageHeight;
    //     }

    //     pdf.save(`code_review_${reviewId}.pdf`);

    //     setNotification('PDF downloaded!');
    //     setTimeout(() => setNotification(null), 3000);
    // };

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000; // 32KB chunks to avoid stack overflow
    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
}

const handleDownloadPDF = async () => {
    if (!reviewData) {
        setNotification("No content to download");
        setTimeout(() => setNotification(null), 3000);
        return;
    }

    // ✅ Convert markdown to HTML
    const htmlContent = marked.parse(markdownToPlainText(reviewData));

    // ✅ Create styled hidden container
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.width = "800px";
    tempDiv.style.padding = "35px";
    tempDiv.style.paddingBottom = '10px';
    tempDiv.style.margin = "15px";
    tempDiv.style.fontFamily = "'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif";
    tempDiv.style.fontSize = "18px"; // better readability
    tempDiv.style.lineHeight = "2.5"; // improved spacing
    tempDiv.style.color = "#000";
    tempDiv.style.backgroundColor = "#fff";
    document.body.appendChild(tempDiv);

    // ✅ Load merged font
    const fontUrl = "./../../public/fonts/NotoSans-Regular.ttf";
    const fontData = await fetch(fontUrl).then(res => res.arrayBuffer());
    const base64Font = arrayBufferToBase64(fontData);

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.addFileToVFS("NotoSans-Regular.ttf", base64Font);
    doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
    doc.setFont("NotoSans");

    // ✅ Render HTML into canvas
    const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ✅ Calculate number of pages needed
    let imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // ✅ Add first page
    doc.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    // ✅ Add more pages if needed
    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    // ✅ Save PDF
    doc.save(`code_review_${reviewId}.pdf`);

    // Cleanup
    document.body.removeChild(tempDiv);
    setNotification("PDF downloaded!");
    setTimeout(() => setNotification(null), 3000);
};


    const handleShare = async () => {
        if (!reviewData) {
            setNotification('No content to share');
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Code Review: ${reviewId}`,
                    text: reviewData,
                    url: window.location.href,
                });
                setNotification('Content shared successfully!');
            } else {
                setNotification('Share API not supported, copied to clipboard instead!');
                await navigator.clipboard.writeText(reviewData);
            }
        } catch (err) {
            setNotification('Failed to share content');
        }
        setTimeout(() => setNotification(null), 3000);
    };

    if (isLoading) {
        return <div className="text-gray-200 text-center p-8 text-xl font-medium">Loading...</div>;
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
                <div className="flex justify-end gap-4 mb-8">
                    <ActionButton
                        icon={Upload}
                        label="Upload JSON"
                        onClick={() => document.getElementById('fileInput').click()}
                        className="bg-yellow-600 hover:bg-yellow-700"
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
                <div className="text-red-400 text-center p-8 text-xl font-medium">Error: {error}</div>
            </div>
        );
    }

    if (!reviewData) {
        return (
            <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
                <div className="flex justify-end gap-4 mb-8">
                    <ActionButton
                        icon={Upload}
                        label="Upload JSON"
                        onClick={() => document.getElementById('fileInput').click()}
                        className="bg-yellow-600 hover:bg-yellow-700"
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
                <div className="text-gray-200 text-center p-8 text-xl font-medium">Please upload a JSON file to view the review.</div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white">File: {filename}</h2>
                    <p className="text-gray-300">Categories: {categories.join(', ') || 'None'}</p>
                </div>
                <div className="flex justify-end gap-4 mb-8">
                    <ActionButton
                        icon={Clipboard}
                        label="Copy"
                        onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700"
                    />
                    <ActionButton
                        icon={Download}
                        label="Download TXT"
                        onClick={handleDownload}
                        className="bg-green-600 hover:bg-green-700"
                    />
                    <ActionButton
                        icon={FileText}
                        label="Download PDF"
                        onClick={handleDownloadPDF}
                        className="bg-red-600 hover:bg-red-700"
                    />
                    <ActionButton
                        icon={Share2}
                        label="Share"
                        onClick={handleShare}
                        className="bg-purple-600 hover:bg-purple-700"
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
                {notification && (
                    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
                        {notification}
                    </div>
                )}
                <div
                    id="review-content"
                    className="prose max-w-4xl mx-auto p-6 bg-black text-white"
                    style={{ minHeight: 'auto', overflow: 'visible' }}
                >
                    <Markdown content={reviewData} />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default ReviewPage;


