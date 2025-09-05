// // import React, { useState, useEffect } from 'react';
// // import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// // import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// // // CodeBlock Component
// // const CodeBlock = ({ code, language }) => {
// //   // Normalize language prop, default to 'java' if invalid or empty
// //   const lang = (language?.replace('language-', '') || 'java').toLowerCase();
// //   return (
// //     <SyntaxHighlighter
// //       language={lang}
// //       style={vscDarkPlus}
// //       customStyle={{
// //         borderRadius: '0.5rem',
// //         padding: '1.25rem',
// //         margin: '1rem 0',
// //         fontSize: '0.95rem',
// //         lineHeight: '1.6',
// //         backgroundColor: '#1a1a1a',
// //         overflowX: 'auto',
// //       }}
// //       wrapLines={true}
// //       showLineNumbers={true}
// //       PreTag="div" // Ensure consistent rendering
// //     >
// //       {code.trim() || '// No code provided'}
// //     </SyntaxHighlighter>
// //   );
// // };

// // // Section Component (Card)
// // const Section = ({ title, children }) => {
// //   return (
// //     <div className="mb-8 bg-gray-950 border border-gray-800 rounded-lg shadow-lg">
// //       <h2 className="bg-gray-900 p-5 rounded-t-lg text-xl font-semibold text-gray-100">{title}</h2>
// //       <div className="p-6 text-gray-300">
// //         {children}
// //       </div>
// //     </div>
// //   );
// // };

// // // ScorecardTable Component
// // const ScorecardTable = ({ data }) => {
// //   return (
// //     <table className="w-full border-collapse text-gray-300">
// //       <thead>
// //         <tr className="bg-gray-900">
// //           <th className="border border-gray-800 p-3 text-left">Category</th>
// //           <th className="border border-gray-800 p-3 text-center">Score (1-10)</th>
// //           <th className="border border-gray-800 p-3 text-left">Notes</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {data.map((row, index) => (
// //           <tr key={index} className="border border-gray-800">
// //             <td className="border border-gray-800 p-3">{row.category}</td>
// //             <td className="border border-gray-800 p-3 text-center">{row.score}</td>
// //             <td className="border border-gray-800 p-3">{row.notes}</td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // // Parse markdown-like content
// // const parseContent = (content) => {
// //   const lines = content.split('\n');
// //   const components = [];
// //   let currentSection = null;
// //   let currentList = null;
// //   let currentCode = null;
// //   let currentCodeLang = null;
// //   let currentTable = null;

// //   lines.forEach((line, index) => {
// //     line = line.trim();

// //     // Handle headings
// //     if (line.startsWith('# ')) {
// //       components.push(<h1 key={`h1-${index}`} className="text-4xl font-bold text-gray-100 mb-8 mt-4">{line.slice(2)}</h1>);
// //     } else if (line.startsWith('## ')) {
// //       if (currentSection) {
// //         components.push(
// //           <Section key={currentSection.title} title={currentSection.title}>
// //             {currentSection.content}
// //           </Section>
// //         );
// //       }
// //       currentSection = { title: line.slice(3), content: [] };
// //     }
// //     // Handle lists
// //     else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
// //       if (!currentList) {
// //         currentList = { type: line.startsWith('- ') ? 'ul' : 'ol', items: [] };
// //       }
// //       currentList.items.push(line.replace(/^- |\d+\. /, ''));
// //     }
// //     // Handle code blocks
// //     else if (line.startsWith('```')) {
// //       if (currentCode) {
// //         // Use the language specified at the start of the code block
// //         currentSection.content.push(
// //           <CodeBlock
// //             key={`code-${index}`}
// //             code={currentCode.join('\n')}
// //             language={`language-${currentCodeLang || 'java'}`}
// //           />
// //         );
// //         currentCode = null;
// //         currentCodeLang = null;
// //       } else {
// //         currentCode = [];
// //         currentCodeLang = line.slice(3).trim() || 'java'; // Capture language
// //       }
// //     } else if (currentCode !== null) {
// //       currentCode.push(line);
// //     }
// //     // Handle table
// //     else if (line.startsWith('|')) {
// //       if (!currentTable) {
// //         currentTable = { headers: [], rows: [] };
// //       }
// //       const cols = line.split('|').map(col => col.trim()).filter(col => col);
// //       if (line.includes('---')) {
// //         // Skip separator line
// //       } else if (!currentTable.headers.length) {
// //         currentTable.headers = cols;
// //       } else {
// //         currentTable.rows.push(cols);
// //       }
// //     }
// //     // Handle paragraphs or plain text
// //     else if (line && currentSection && !currentList && currentCode === null) {
// //       const cleanLine = line.replace(/\*([^*]+)\*/g, '$1');
// //       currentSection.content.push(<p key={`p-${index}`} className="mb-4 mt-6 text-lg leading-relaxed text-gray-300">{cleanLine}</p>);
// //     }

// //     // Close list if next line is not a list item
// //     if (currentList && (index === lines.length - 1 || !lines[index + 1]?.match(/^- |\d+\. /))) {
// //       currentSection.content.push(
// //         currentList.type === 'ul' ? (
// //           <ul key={`ul-${index}`} className="list-disc pl-6 mb-6 text-lg leading-relaxed text-gray-300">
// //             {currentList.items.map((item, i) => (
// //               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
// //             ))}
// //           </ul>
// //         ) : (
// //           <ol key={`ol-${index}`} className="list-decimal pl-6 mb-6 text-lg leading-relaxed text-gray-300">
// //             {currentList.items.map((item, i) => (
// //               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
// //             ))}
// //           </ol>
// //         )
// //       );
// //       currentList = null;
// //     }

// //     // Close table if next line is not a table row
// //     if (currentTable && (index === lines.length - 1 || !lines[index + 1]?.startsWith('|'))) {
// //       currentSection.content.push(
// //         <ScorecardTable
// //           key={`table-${index}`}
// //           data={currentTable.rows.map(row => ({
// //             category: row[0],
// //             score: row[1],
// //             notes: row[2]
// //           }))}
// //         />
// //       );
// //       currentTable = null;
// //     }
// //   });

// //   // Push the last section
// //   if (currentSection) {
// //     components.push(
// //       <Section key={currentSection.title} title={currentSection.title}>
// //         {currentSection.content}
// //       </Section>
// //     );
// //   }

// //   return components;
// // };

// // // App Component
// // const ReviewPage = () => {
// //   const [reviewData, setReviewData] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const jsonData = {
// //           id: 'chatcmpl-b512be53-1f0c-4d58-b9d7-6b94890561ce',
// //           object: 'chat.completion',
// //           created: 1753940693,
// //           model: 'qwen/qwen3-32b',
// //           choices: [{
// //             index: 0,
// //             message: {
// //               role: 'assistant',
// //               content: `# Code Review: BFS in Java

// // The provided Java code implements Breadth-First Search (BFS) on an undirected graph. This review analyzes the code across seven critical dimensions.

// // ---

// // ## 🔍 Code Efficiency & Logic

// // *Observations:*
// // - ✅ Correctly implements BFS traversal for connected graphs
// // - ❌ *Critical Logic Error*: Marks *visited[node] = true* twice - once when enqueuing and again when dequeuing
// // - ⚠ The answer list is constructed when nodes are added to the queue rather than when dequeued (non-standard but functionally correct)

// // *Recommendations:*
// // 1. Remove redundant visited marking after dequeuing:
// // \`\`\`java
// // // Remove this line (currently marked in error)
// // visited[node] = true;
// // \`\`\`
// // 2. Standardize BFS traversal pattern by adding nodes to the result when dequeued:
// // \`\`\`java
// // while (!queue.isEmpty()) {
// //     int node = queue.poll();
// //     ans.add(node);
    
// //     for(int neighbor : adj.get(node)) {
// //         if (!visited[neighbor]) {
// //             visited[neighbor] = true;
// //             queue.add(neighbor);
// //         }
// //     }
// // }
// // \`\`\`

// // ---

// // ## ⏱ Time Complexity

// // *Analysis:*
// // - Worst-case time complexity is *O(V + E)* where:
// //   - V = Number of vertices
// //   - E = Number of edges

// // *Improvement Opportunities:*
// // - Current algorithm is already optimal for BFS traversal
// // - No nested loops or unnecessary operations

// // ---

// // ## 💾 Space Complexity

// // *Breakdown:*
// // - *O(V + E)* total space:
// //   - O(V) for visited array
// //   - O(E) for adjacency list
// //   - O(V) for BFS queue and result list

// // *Optimizations:*
// // - Consider using primitive arrays (*int[]* vs *ArrayList<Integer>*) for better memory performance
// // - Avoid unnecessary object creation where possible

// // ---

// // ## 🧠 Readability & Code Style

// // *Strengths:*
// // - Clear variable names (*visited*, *queue*, *adj*)
// // - Proper JavaDoc-style formatting
// // - Reasonable code structure

// // *Improvements:*
// // 1. Add method documentation:
// // \`\`\`java
// // /**
// //  * Performs BFS traversal starting from node 0
// //  * @param adj Adjacency list of the graph
// //  * @return Traversal order as List<Integer>
// //  */
// // \`\`\`
// // 2. Use *List<>* instead of *ArrayList<>* in method signatures for better abstraction
// // 3. Add meaningful comments where logic might be unclear

// // ---

// // ## 🧪 Edge Cases & Robustness

// // *Critical Edge Cases Not Handled:*
// // - ✅ Empty graph (but will throw IndexOutOfBoundsException)
// // - ❌ Negative vertex indices
// // - ❌ Vertex indices >= V
// // - ❌ Duplicate edges
// // - ❌ Disconnected graphs (correct behavior but should be documented)

// // *Recommendations:*
// // 1. Validate input edges:
// // \`\`\`java
// // if (x < 0 || x >= V || y < 0 || y >= V) {
// //     System.out.println("Invalid edge: vertex index out of range");
// //     // Handle error appropriately
// // }
// // \`\`\`
// // 2. Add input validation for vertex count *V >= 1*
// // 3. Consider handling disconnected graphs by starting BFS from all unvisited nodes

// // ---

// // ## 🛡 Security & Safety

// // *Issues Identified:*
// // - ❌ No input validation for edge vertices (can lead to IndexOutOfBoundsExceptions)
// // - ❌ No protection against incorrect edge counts

// // *Security Recommendations:*
// // 1. Implement input validation:
// // \`\`\`java
// // // Add boundary checks before adding edges to adjacency list
// // if (x >= 0 && x < V && y >= 0 && y < V) {
// //     adj.get(x).add(y);
// //     adj.get(y).add(x);
// // }
// // \`\`\`
// // 2. Sanitize all user inputs with proper validation
// // 3. Consider using a *TreeSet* for edge storage to automatically handle duplicates

// // ---

// // ## 💡 Suggestions & Improvements

// // *1. Complete Rewrite with Improvements:*
// // \`\`\`java
// // import java.util.*;

// // public class BFS {
// //     /**
// //      * Performs BFS traversal starting from node 0
// //      * @param adj Adjacency list of the graph
// //      * @return Traversal order as List<Integer>
// //      */
// //     public static List<Integer> bfs(List<List<Integer>> adj) {
// //         int numVertices = adj.size();
// //         if (numVertices == 0) return Collections.emptyList();

// //         boolean[] visited = new boolean[numVertices];
// //         List<Integer> ans = new ArrayList<>();
// //         Queue<Integer> queue = new LinkedList<>();
        
// //         queue.add(0);
// //         visited[0] = true;
        
// //         while (!queue.isEmpty()) {
// //             int node = queue.poll();
// //             ans.add(node);
            
// //             for(int neighbor : adj.get(node)) {
// //                 if (!visited[neighbor]) {
// //                     visited[neighbor] = true;
// //                     queue.add(neighbor);
// //                 }
// //             }
// //         }
// //         return ans;
// //     }

// //     public static void main(String[] args) {
// //         Scanner sc = new Scanner(System.in);
        
// //         System.out.println("Enter number of Vertices : ");
// //         int V = sc.nextInt();
        
// //         if (V < 1) {
// //             System.out.println("Vertex count must be positive");
// //             return;
// //         }
        
// //         List<List<Integer>> adj = new ArrayList<>();
// //         for(int i = 0; i < V; i++) {
// //             adj.add(new ArrayList<>());
// //         }

// //         System.out.println("Enter number of edges : ");
// //         int E = sc.nextInt();

// //         for(int i = 0; i < E; i++) {
// //             System.out.println("Enter " + (i + 1) + " edge : ");
// //             int x = sc.nextInt();
// //             int y = sc.nextInt();
            
// //             // Validate edge vertices
// //             if (x >= 0 && x < V && y >= 0 && y < V) {
// //                 adj.get(x).add(y);
// //                 adj.get(y).add(x);
// //             } else {
// //                 System.out.println("Invalid edge: vertex index out of range");
// //             }
// //         }

// //         List<Integer> result = bfs(adj);
// //         System.out.println("BFS Traversal: ");
// //         System.out.println(String.join(" ", result.stream().map(String::valueOf).toArray(String[]::new)));
// //     }
// // }
// // \`\`\`

// // *Key Improvements:*
// // - Uses standard BFS algorithm pattern
// // - Validates all edge inputs
// // - Uses *List<>* for better abstraction
// // - Handles empty graph case
// // - Adds proper error checking
// // - Uses Java Streams for cleaner output

// // ---

// // ## ✅ Final Review Scorecard

// // | Category             | Score (1-10) | Notes |
// // |----------------------|--------------|-------|
// // | Code Efficiency      | 7            | Correct algorithm but with critical logic error |
// // | Time Complexity      | 10           | Optimal O(V + E) implementation |
// // | Space Complexity     | 8            | Could be improved with primitive arrays |
// // | Readability/Style    | 7            | Good style but could follow Java best practices more strictly |
// // | Edge Cases           | 5            | Missing critical input validation |
// // | Security             | 6            | Susceptible to input errors |
// // | Overall Improvements | 7            | Simple but important improvements can make a significant difference |

// // This is a solid implementation that has been improved with standard BFS pattern, input validation, and clearer structure while maintaining the original functionality. The critical logic errors have been addressed to produce a more reliable and maintainable BFS implementation.`
// //             }
// //           }]
// //         };
// //         setReviewData(jsonData.choices[0].message.content);
// //       } catch (err) {
// //         setError('Failed to fetch or parse review data');
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   if (error) {
// //     return <div className="text-red-400 text-center p-6 text-xl">Error: {error}</div>;
// //   }

// //   if (!reviewData) {
// //     return <div className="text-gray-300 text-center p-6 text-xl">Loading...</div>;
// //   }

// //   return (
// //     <div className="max-w-5xl mx-auto p-8 bg-black min-h-screen text-gray-100">
// //       {parseContent(reviewData)}
// //     </div>
// //   );
// // };

// // export default ReviewPage;


// import React, { useState, useEffect } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Clipboard, Download, Share2 } from 'lucide-react';

// // CodeBlock Component
// const CodeBlock = ({ code, language }) => {
//   const lang = (language?.replace('language-', '') || 'java').toLowerCase();
//   return (
//     <SyntaxHighlighter
//       language={lang}
//       style={vscDarkPlus}
//       customStyle={{
//         borderRadius: '0.5rem',
//         padding: '1.5rem',
//         margin: '1.5rem 0',
//         fontSize: '1rem',
//         lineHeight: '1.7',
//         backgroundColor: '#1e1e1e',
//         overflowX: 'auto',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//       }}
//       wrapLines={true}
//       showLineNumbers={true}
//       PreTag="div"
//     >
//       {code.trim() || '// No code provided'}
//     </SyntaxHighlighter>
//   );
// };

// // Section Component
// const Section = ({ title, children }) => {
//   return (
//     <div className="mb-10 bg-zinc-1100 border border-gray-700 rounded-xl shadow-xl transition-all hover:shadow-2xl">
//       <h2 className="bg-gray-800 p-6 rounded-t-xl text-2xl font-bold text-white tracking-tight">{title}</h2>
//       <div className="p-8 text-gray-200 leading-relaxed">
//         {children}
//       </div>
//     </div>
//   );
// };

// // ScorecardTable Component
// const ScorecardTable = ({ data }) => {
//   return (
//     <table className="w-full border-collapse text-gray-200 text-lg">
//       <thead>
//         <tr className="bg-gray-800">
//           <th className="border border-gray-700 p-4 text-left font-semibold">Category</th>
//           <th className="border border-gray-700 p-4 text-center font-semibold">Score (1-10)</th>
//           <th className="border border-gray-700 p-4 text-left font-semibold">Notes</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index} className="border border-gray-700 hover:bg-gray-800 transition-colors">
//             <td className="border border-gray-700 p-4">{row.category}</td>
//             <td className="border border-gray-700 p-4 text-center">{row.score}</td>
//             <td className="border border-gray-700 p-4">{row.notes}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // Parse markdown-like content
// const parseContent = (content) => {
//   const lines = content.split('\n');
//   const components = [];
//   let currentSection = null;
//   let currentList = null;
//   let currentCode = null;
//   let currentCodeLang = null;
//   let currentTable = null;

//   lines.forEach((line, index) => {
//     line = line.trim();

//     if (line.startsWith('# ')) {
//       components.push(<h1 key={`h1-${index}`} className="text-4xl font-extrabold text-white mb-10 mt-6 tracking-tight">{line.slice(2)}</h1>);
//     } else if (line.startsWith('## ')) {
//       if (currentSection) {
//         components.push(
//           <Section key={currentSection.title} title={currentSection.title}>
//             {currentSection.content}
//           </Section>
//         );
//       }
//       currentSection = { title: line.slice(3), content: [] };
//     } else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
//       if (!currentList) {
//         currentList = { type: line.startsWith('- ') ? 'ul' : 'ol', items: [] };
//       }
//       currentList.items.push(line.replace(/^- |\d+\. /, ''));
//     } else if (line.startsWith('```')) {
//       if (currentCode) {
//         currentSection.content.push(
//           <CodeBlock
//             key={`code-${index}`}
//             code={currentCode.join('\n')}
//             language={`language-${currentCodeLang || 'java'}`}
//           />
//         );
//         currentCode = null;
//         currentCodeLang = null;
//       } else {
//         currentCode = [];
//         currentCodeLang = line.slice(3).trim() || 'java';
//       }
//     } else if (currentCode !== null) {
//       currentCode.push(line);
//     } else if (line.startsWith('|')) {
//       if (!currentTable) {
//         currentTable = { headers: [], rows: [] };
//       }
//       const cols = line.split('|').map(col => col.trim()).filter(col => col);
//       if (line.includes('---')) {
//         // Skip separator line
//       } else if (!currentTable.headers.length) {
//         currentTable.headers = cols;
//       } else {
//         currentTable.rows.push(cols);
//       }
//     } else if (line && currentSection && !currentList && currentCode === null) {
//       const cleanLine = line.replace(/\*([^*]+)\*/g, '<em>$1</em>');
//       currentSection.content.push(<p key={`p-${index}`} className="mb-6 text-lg leading-loose text-gray-300" dangerouslySetInnerHTML={{ __html: cleanLine }} />);
//     }

//     if (currentList && (index === lines.length - 1 || !lines[index + 1]?.match(/^- |\d+\. /))) {
//       currentSection.content.push(
//         currentList.type === 'ul' ? (
//           <ul key={`ul-${index}`} className="list-disc pl-8 mb-8 text-lg leading-loose text-gray-300">
//             {currentList.items.map((item, i) => (
//               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
//             ))}
//           </ul>
//         ) : (
//           <ol key={`ol-${index}`} className="list-decimal pl-8 mb-8 text-lg leading-loose text-gray-300">
//             {currentList.items.map((item, i) => (
//               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
//             ))}
//           </ol>
//         )
//       );
//       currentList = null;
//     }

//     if (currentTable && (index === lines.length - 1 || !lines[index + 1]?.startsWith('|'))) {
//       currentSection.content.push(
//         <ScorecardTable
//           key={`table-${index}`}
//           data={currentTable.rows.map(row => ({
//             category: row[0],
//             score: row[1],
//             notes: row[2]
//           }))}
//         />
//       );
//       currentTable = null;
//     }
//   });

//   if (currentSection) {
//     components.push(
//       <Section key={currentSection.title} title={currentSection.title}>
//         {currentSection.content}
//       </Section>
//     );
//   }

//   return components;
// };

// // Button Component for Copy, Download, Share
// const ActionButton = ({ icon: Icon, label, onClick, className }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${className}`}
//   >
//     <Icon size={20} />
//     {label}
//   </button>
// );

// // ReviewPage Component
// const ReviewPage = () => {
//   const [reviewData, setReviewData] = useState(null);
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const jsonData = {
//           id: 'chatcmpl-b512be53-1f0c-4d58-b9d7-6b94890561ce',
//           object: 'chat.completion',
//           created: 1753940693,
//           model: 'qwen/qwen3-32b',
//           choices: [{
//             index: 0,
//             message: {
//               role: 'assistant',
//               content: `# Code Review: BFS in Java

// The provided Java code implements Breadth-First Search (BFS) on an undirected graph. This review analyzes the code across seven critical dimensions.

// ---

// ## 🔍 Code Efficiency & Logic

// *Observations:*
// - ✅ Correctly implements BFS traversal for connected graphs
// - ❌ *Critical Logic Error*: Marks *visited[node] = true* twice - once when enqueuing and again when dequeuing
// - ⚠ The answer list is constructed when nodes are added to the queue rather than when dequeued (non-standard but functionally correct)

// *Recommendations:*
// 1. Remove redundant visited marking after dequeuing:
// \`\`\`java
// // Remove this line (currently marked in error)
// visited[node] = true;
// \`\`\`
// 2. Standardize BFS traversal pattern by adding nodes to the result when dequeued:
// \`\`\`java
// while (!queue.isEmpty()) {
//     int node = queue.poll();
//     ans.add(node);
    
//     for(int neighbor : adj.get(node)) {
//         if (!visited[neighbor]) {
//             visited[neighbor] = true;
//             queue.add(neighbor);
//         }
//     }
// }
// \`\`\`

// ---

// ## ⏱ Time Complexity

// *Analysis:*
// - Worst-case time complexity is *O(V + E)* where:
//   - V = Number of vertices
//   - E = Number of edges

// *Improvement Opportunities:*
// - Current algorithm is already optimal for BFS traversal
// - No nested loops or unnecessary operations

// ---

// ## 💾 Space Complexity

// *Breakdown:*
// - *O(V + E)* total space:
//   - O(V) for visited array
//   - O(E) for adjacency list
//   - O(V) for BFS queue and result list

// *Optimizations:*
// - Consider using primitive arrays (*int[]* vs *ArrayList<Integer>*) for better memory performance
// - Avoid unnecessary object creation where possible

// ---

// ## 🧠 Readability & Code Style

// *Strengths:*
// - Clear variable names (*visited*, *queue*, *adj*)
// - Proper JavaDoc-style formatting
// - Reasonable code structure

// *Improvements:*
// 1. Add method documentation:
// \`\`\`java
// /**
//  * Performs BFS traversal starting from node 0
//  * @param adj Adjacency list of the graph
//  * @return Traversal order as List<Integer>
//  */
// \`\`\`
// 2. Use *List<>* instead of *ArrayList<>* in method signatures for better abstraction
// 3. Add meaningful comments where logic might be unclear

// ---

// ## 🧪 Edge Cases & Robustness

// *Critical Edge Cases Not Handled:*
// - ✅ Empty graph (but will throw IndexOutOfBoundsException)
// - ❌ Negative vertex indices
// - ❌ Vertex indices >= V
// - ❌ Duplicate edges
// - ❌ Disconnected graphs (correct behavior but should be documented)

// *Recommendations:*
// 1. Validate input edges:
// \`\`\`java
// if (x < 0 || x >= V || y < 0 || y >= V) {
//     System.out.println("Invalid edge: vertex index out of range");
//     // Handle error appropriately
// }
// \`\`\`
// 2. Add input validation for vertex count *V >= 1*
// 3. Consider handling disconnected graphs by starting BFS from all unvisited nodes

// ---

// ## 🛡 Security & Safety

// *Issues Identified:*
// - ❌ No input validation for edge vertices (can lead to IndexOutOfBoundsExceptions)
// - ❌ No protection against incorrect edge counts

// *Security Recommendations:*
// 1. Implement input validation:
// \`\`\`java
// // Add boundary checks before adding edges to adjacency list
// if (x >= 0 && x < V && y >= 0 && y < V) {
//     adj.get(x).add(y);
//     adj.get(y).add(x);
// }
// \`\`\`
// 2. Sanitize all user inputs with proper validation
// 3. Consider using a *TreeSet* for edge storage to automatically handle duplicates

// ---

// ## 💡 Suggestions & Improvements

// *1. Complete Rewrite with Improvements:*
// \`\`\`java
// import java.util.*;

// public class BFS {
//     /**
//      * Performs BFS traversal starting from node 0
//      * @param adj Adjacency list of the graph
//      * @return Traversal order as List<Integer>
//      */
//     public static List<Integer> bfs(List<List<Integer>> adj) {
//         int numVertices = adj.size();
//         if (numVertices == 0) return Collections.emptyList();

//         boolean[] visited = new boolean[numVertices];
//         List<Integer> ans = new ArrayList<>();
//         Queue<Integer> queue = new LinkedList<>();
        
//         queue.add(0);
//         visited[0] = true;
        
//         while (!queue.isEmpty()) {
//             int node = queue.poll();
//             ans.add(node);
            
//             for(int neighbor : adj.get(node)) {
//                 if (!visited[neighbor]) {
//                     visited[neighbor] = true;
//                     queue.add(neighbor);
//                 }
//             }
//         }
//         return ans;
//     }

//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
        
//         System.out.println("Enter number of Vertices : ");
//         int V = sc.nextInt();
        
//         if (V < 1) {
//             System.out.println("Vertex count must be positive");
//             return;
//         }
        
//         List<List<Integer>> adj = new ArrayList<>();
//         for(int i = 0; i < V; i++) {
//             adj.add(new ArrayList<>());
//         }

//         System.out.println("Enter number of edges : ");
//         int E = sc.nextInt();

//         for(int i = 0; i < E; i++) {
//             System.out.println("Enter " + (i + 1) + " edge : ");
//             int x = sc.nextInt();
//             int y = sc.nextInt();
            
//             // Validate edge vertices
//             if (x >= 0 && x < V && y >= 0 && y < V) {
//                 adj.get(x).add(y);
//                 adj.get(y).add(x);
//             } else {
//                 System.out.println("Invalid edge: vertex index out of range");
//             }
//         }

//         List<Integer> result = bfs(adj);
//         System.out.println("BFS Traversal: ");
//         System.out.println(String.join(" ", result.stream().map(String::valueOf).toArray(String[]::new)));
//     }
// }
// \`\`\`

// *Key Improvements:*
// - Uses standard BFS algorithm pattern
// - Validates all edge inputs
// - Uses *List<>* for better abstraction
// - Handles empty graph case
// - Adds proper error checking
// - Uses Java Streams for cleaner output

// ---

// ## ✅ Final Review Scorecard

// | Category             | Score (1-10) | Notes |
// |----------------------|--------------|-------|
// | Code Efficiency      | 7            | Correct algorithm but with critical logic error |
// | Time Complexity      | 10           | Optimal O(V + E) implementation |
// | Space Complexity     | 8            | Could be improved with primitive arrays |
// | Readability/Style    | 7            | Good style but could follow Java best practices more strictly |
// | Edge Cases           | 5            | Missing critical input validation |
// | Security             | 6            | Susceptible to input errors |
// | Overall Improvements | 7            | Simple but important improvements can make a significant difference |

// This is a solid implementation that has been improved with standard BFS pattern, input validation, and clearer structure while maintaining the original functionality. The critical logic errors have been addressed to produce a more reliable and maintainable BFS implementation.`
//             }
//           }]
//         };
//         setReviewData(jsonData.choices[0].message.content);
//       } catch (err) {
//         setError('Failed to fetch or parse review data');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(reviewData).then(() => {
//       setNotification('Content copied to clipboard!');
//       setTimeout(() => setNotification(null), 3000);
//     }).catch(() => {
//       setNotification('Failed to copy content');
//       setTimeout(() => setNotification(null), 3000);
//     });
//   };

//   const handleDownload = () => {
//     const blob = new Blob([reviewData], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'code_review.txt';
//     a.click();
//     URL.revokeObjectURL(url);
//     setNotification('File downloaded!');
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: 'Code Review: BFS in Java',
//           text: reviewData,
//           url: window.location.href,
//         });
//         setNotification('Content shared successfully!');
//       } else {
//         setNotification('Share API not supported, copied to clipboard instead!');
//         await navigator.clipboard.writeText(reviewData);
//       }
//     } catch (err) {
//       setNotification('Failed to share content');
//     }
//     setTimeout(() => setNotification(null), 3000);
//   };

//   if (error) {
//     return <div className="text-red-400 text-center p-8 text-xl font-medium">Error: {error}</div>;
//   }

//   if (!reviewData) {
//     return <div className="text-gray-200 text-center p-8 text-xl font-medium">Loading...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//       <div className="flex justify-end gap-4 mb-8">
//         <ActionButton
//           icon={Clipboard}
//           label="Copy"
//           onClick={handleCopy}
//           className="bg-blue-600 hover:bg-blue-700"
//         />
//         <ActionButton
//           icon={Download}
//           label="Download"
//           onClick={handleDownload}
//           className="bg-green-600 hover:bg-green-700"
//         />
//         <ActionButton
//           icon={Share2}
//           label="Share"
//           onClick={handleShare}
//           className="bg-purple-600 hover:bg-purple-700"
//         />
//       </div>
//       {notification && (
//         <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
//           {notification}
//         </div>
//       )}
//       {parseContent(reviewData)}
//     </div>
//   );
// };

// export default ReviewPage;




// import React, { useState, useEffect } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Clipboard, Download, Share2, Upload } from 'lucide-react';

// // CodeBlock Component
// const CodeBlock = ({ code, language }) => {
//   const lang = (language?.replace('language-', '') || 'java').toLowerCase();
//   return (
//     <SyntaxHighlighter
//       language={lang}
//       style={vscDarkPlus}
//       customStyle={{
//         borderRadius: '0.5rem',
//         padding: '1.5rem',
//         margin: '1.5rem 0',
//         fontSize: '1rem',
//         lineHeight: '1.7',
//         backgroundColor: '#1e1e1e',
//         overflowX: 'auto',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//       }}
//       wrapLines={true}
//       showLineNumbers={true}
//       PreTag="div"
//     >
//       {code.trim() || '// No code provided'}
//     </SyntaxHighlighter>
//   );
// };

// // Section Component
// const Section = ({ title, children }) => {
//   return (
//     <div className="mb-10 bg-zinc-900 border border-gray-700 rounded-xl shadow-xl transition-all hover:shadow-2xl">
//       <h2 className="bg-gray-800 p-6 rounded-t-xl text-2xl font-bold text-white tracking-tight">{title}</h2>
//       <div className="p-8 text-gray-200 leading-relaxed">
//         {children}
//       </div>
//     </div>
//   );
// };

// // ScorecardTable Component
// const ScorecardTable = ({ data }) => {
//   return (
//     <table className="w-full border-collapse text-gray-200 text-lg">
//       <thead>
//         <tr className="bg-gray-800">
//           <th className="border border-gray-700 p-4 text-left font-semibold">Category</th>
//           <th className="border border-gray-700 p-4 text-center font-semibold">Score (1-10)</th>
//           <th className="border border-gray-700 p-4 text-left font-semibold">Notes</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index} className="border border-gray-700 hover:bg-gray-800 transition-colors">
//             <td className="border border-gray-700 p-4">{row.category}</td>
//             <td className="border border-gray-700 p-4 text-center">{row.score}</td>
//             <td className="border border-gray-700 p-4">{row.notes}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // Parse markdown-like content
// const parseContent = (content) => {
//   const lines = content.split('\n');
//   const components = [];
//   let currentSection = null;
//   let currentList = null;
//   let currentCode = null;
//   let currentCodeLang = null;
//   let currentTable = null;

//   lines.forEach((line, index) => {
//     line = line.trim();

//     if (line.startsWith('# ')) {
//       components.push(<h1 key={`h1-${index}`} className="text-4xl font-extrabold text-white mb-10 mt-6 tracking-tight">{line.slice(2)}</h1>);
//     } else if (line.startsWith('## ')) {
//       if (currentSection) {
//         components.push(
//           <Section key={currentSection.title} title={currentSection.title}>
//             {currentSection.content}
//           </Section>
//         );
//       }
//       currentSection = { title: line.slice(3), content: [] };
//     } else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
//       if (!currentList) {
//         currentList = { type: line.startsWith('- ') ? 'ul' : 'ol', items: [] };
//       }
//       currentList.items.push(line.replace(/^- |\d+\. /, ''));
//     } else if (line.startsWith('```')) {
//       if (currentCode) {
//         currentSection.content.push(
//           <CodeBlock
//             key={`code-${index}`}
//             code={currentCode.join('\n')}
//             language={`language-${currentCodeLang || 'java'}`}
//           />
//         );
//         currentCode = null;
//         currentCodeLang = null;
//       } else {
//         currentCode = [];
//         currentCodeLang = line.slice(3).trim() || 'java';
//       }
//     } else if (currentCode !== null) {
//       currentCode.push(line);
//     } else if (line.startsWith('|')) {
//       if (!currentTable) {
//         currentTable = { headers: [], rows: [] };
//       }
//       const cols = line.split('|').map(col => col.trim()).filter(col => col);
//       if (line.includes('---')) {
//         // Skip separator line
//       } else if (!currentTable.headers.length) {
//         currentTable.headers = cols;
//       } else {
//         currentTable.rows.push(cols);
//       }
//     } else if (line && currentSection && !currentList && currentCode === null) {
//       const cleanLine = line.replace(/\*([^*]+)\*/g, '<em>$1</em>');
//       currentSection.content.push(<p key={`p-${index}`} className="mb-6 text-lg leading-loose text-gray-300" dangerouslySetInnerHTML={{ __html: cleanLine }} />);
//     }

//     if (currentList && (index === lines.length - 1 || !lines[index + 1]?.match(/^- |\d+\. /))) {
//       currentSection.content.push(
//         currentList.type === 'ul' ? (
//           <ul key={`ul-${index}`} className="list-disc pl-8 mb-8 text-lg leading-loose text-gray-300">
//             {currentList.items.map((item, i) => (
//               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
//             ))}
//           </ul>
//         ) : (
//           <ol key={`ol-${index}`} className="list-decimal pl-8 mb-8 text-lg leading-loose text-gray-300">
//             {currentList.items.map((item, i) => (
//               <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
//             ))}
//           </ol>
//         )
//       );
//       currentList = null;
//     }

//     if (currentTable && (index === lines.length - 1 || !lines[index + 1]?.startsWith('|'))) {
//       currentSection.content.push(
//         <ScorecardTable
//           key={`table-${index}`}
//           data={currentTable.rows.map(row => ({
//             category: row[0],
//             score: row[1],
//             notes: row[2]
//           }))}
//         />
//       );
//       currentTable = null;
//     }
//   });

//   if (currentSection) {
//     components.push(
//       <Section key={currentSection.title} title={currentSection.title}>
//         {currentSection.content}
//       </Section>
//     );
//   }

//   return components;
// };

// // Button Component for Copy, Download, Share, Upload
// const ActionButton = ({ icon: Icon, label, onClick, className }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${className}`}
//   >
//     <Icon size={20} />
//     {label}
//   </button>
// );

// // ReviewPage Component
// const ReviewPage = ({ jsonData }) => {
//   const [reviewData, setReviewData] = useState(null);
//   const [reviewId, setReviewId] = useState(null);
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState(null);

//   // Parse JSON object when component mounts or jsonData prop changes
//   useEffect(() => {
//     if (jsonData) {
//       try {
//         setReviewData(jsonData.choices[0].message.content);
//         setReviewId(jsonData.id || 'unknown');
//       } catch (err) {
//         setError('Failed to parse JSON data');
//       }
//     }
//   }, [jsonData]);

//   // Handle file upload for new JSON data
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/json') {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const parsedData = JSON.parse(e.target.result);
//           setReviewData(parsedData.choices[0].message.content);
//           setReviewId(parsedData.id || 'unknown');
//           setError(null);
//           setNotification('JSON file loaded successfully!');
//           setTimeout(() => setNotification(null), 3000);
//         } catch (err) {
//           setError('Failed to parse JSON file');
//           setNotification('Failed to parse JSON file');
//           setTimeout(() => setNotification(null), 3000);
//         }
//       };
//       reader.readAsText(file);
//     } else {
//       setError('Please upload a valid JSON file');
//       setNotification('Please upload a valid JSON file');
//       setTimeout(() => setNotification(null), 3000);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(reviewData).then(() => {
//       setNotification('Content copied to clipboard!');
//       setTimeout(() => setNotification(null), 3000);
//     }).catch(() => {
//       setNotification('Failed to copy content');
//       setTimeout(() => setNotification(null), 3000);
//     });
//   };

//   const handleDownload = () => {
//     const blob = new Blob([reviewData], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `code_review_${reviewId}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//     setNotification('File downloaded!');
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: `Code Review: ${reviewId}`,
//           text: reviewData,
//           url: window.location.href,
//         });
//         setNotification('Content shared successfully!');
//       } else {
//         setNotification('Share API not supported, copied to clipboard instead!');
//         await navigator.clipboard.writeText(reviewData);
//       }
//     } catch (err) {
//       setNotification('Failed to share content');
//     }
//     setTimeout(() => setNotification(null), 3000);
//   };

//   if (error) {
//     return (
//       <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//         <div className="flex justify-end gap-4 mb-8">
//           <ActionButton
//             icon={Upload}
//             label="Upload JSON"
//             onClick={() => document.getElementById('fileInput').click()}
//             className="bg-yellow-600 hover:bg-yellow-700"
//           />
//           <input
//             id="fileInput"
//             type="file"
//             accept="application/json"
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//         </div>
//         <div className="text-red-400 text-center p-8 text-xl font-medium">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!reviewData) {
//     return (
//       <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//         <div className="flex justify-end gap-4 mb-8">
//           <ActionButton
//             icon={Upload}
//             label="Upload JSON"
//             onClick={() => document.getElementById('fileInput').click()}
//             className="bg-yellow-600 hover:bg-yellow-700"
//           />
//           <input
//             id="fileInput"
//             type="file"
//             accept="application/json"
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//         </div>
//         <div className="text-gray-200 text-center p-8 text-xl font-medium">Please upload a JSON file to view the review.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-10 bg-black min-h-screen text-gray-100">
//       <div className="flex justify-end gap-4 mb-8">
//         <ActionButton
//           icon={Clipboard}
//           label="Copy"
//           onClick={handleCopy}
//           className="bg-blue-600 hover:bg-blue-700"
//         />
//         <ActionButton
//           icon={Download}
//           label="Download"
//           onClick={handleDownload}
//           className="bg-green-600 hover:bg-green-700"
//         />
//         <ActionButton
//           icon={Share2}
//           label="Share"
//           onClick={handleShare}
//           className="bg-purple-600 hover:bg-purple-700"
//         />
//         <ActionButton
//           icon={Upload}
//           label="Upload New JSON"
//           onClick={() => document.getElementById('fileInput').click()}
//           className="bg-yellow-600 hover:bg-yellow-700"
//         />
//         <input
//           id="fileInput"
//           type="file"
//           accept="application/json"
//           onChange={handleFileUpload}
//           className="hidden"
//         />
//       </div>
//       {notification && (
//         <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300">
//           {notification}
//         </div>
//       )}
//       {parseContent(reviewData)}
//     </div>
//   );
// };

// export default ReviewPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Clipboard, Download, Share2, Upload } from 'lucide-react';
import DOMPurify from 'dompurify';

// ActionButton Component (defined first to avoid hoisting issues)
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
            <div className="p-8 text-gray-200 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

// ScorecardTable Component
// const ScorecardTable = ({ data }) => {
//     return (
//         <table className="w-full border-collapse text-gray-200 text-lg">
//             <thead>
//                 <tr className="bg-gray-800">
//                     <th className="border border-gray-700 p-4 text-left font-semibold">Category</th>
//                     <th className="border border-gray-700 p-4 text-center font-semibold">Score</th>
//                     <th className="border border-gray-700 p-4 text-left font-semibold">Notes</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((row, index) => (
//                     <tr key={index} className="border border-gray-700 hover:bg-gray-800 transition-colors">
//                         <td className="border border-gray-700 p-4">{row.category}</td>
//                         <td className="border border-gray-700 p-4 text-center">{row.score}</td>
//                         <td className="border border-gray-700 p-4">{row.notes}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

const ScorecardTable = ({ data }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <table className="w-full border-collapse text-gray-200 text-lg">
           { /*<thead>
                <tr className="bg-gray-800">
                    {headers.map((key) => (
                        <th
                            key={key}
                            className={`border border-gray-700 p-4 font-semibold ${
                                key.toLowerCase() === "score" ? "text-center" : "text-left"
                            } capitalize`}
                        >
                            {key}
                        </th>
                    ))}
                </tr>
            </thead>*/}
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={index}
                        className="border border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                        {headers.map((key, idx) => (
                            <td
                                key={idx}
                                className={`border border-gray-700 p-4 ${
                                    key.toLowerCase() === "score" ? "text-center" : ""
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


// Parse markdown-like content
const parseContent = (content) => {
    const lines = content.split('\n');
    const components = [];
    let currentSection = null;
    let currentList = null;
    let currentCode = null;
    let currentCodeLang = null;
    let currentTable = null;

    lines.forEach((line, index) => {
        line = line.trim();

        if (line.startsWith('# ')) {
            components.push(<h1 key={`h1-${index}`} className="text-4xl font-extrabold text-white mb-10 mt-6 tracking-tight">{line.slice(2)}</h1>);
        } else if (line.startsWith('## ')) {
            if (currentSection) {
                components.push(
                    <Section key={currentSection.title} title={currentSection.title}>
                        {currentSection.content}
                    </Section>
                );
            }
            currentSection = { title: line.slice(3), content: [] };
        } else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
            if (!currentList) {
                currentList = { type: line.startsWith('- ') ? 'ul' : 'ol', items: [] };
            }
            currentList.items.push(line.replace(/^- |\d+\. /, ''));
        } else if (line.startsWith('```')) {
            if (currentCode) {
                currentSection.content.push(
                    <CodeBlock
                        key={`code-${index}`}
                        code={currentCode.join('\n')}
                        language={`language-${currentCodeLang || 'java'}`}
                    />
                );
                currentCode = null;
                currentCodeLang = null;
            } else {
                currentCode = [];
                currentCodeLang = line.slice(3).trim() || 'java';
            }
        } else if (currentCode !== null) {
            currentCode.push(line);
        } else if (line.startsWith('|')) {
            if (!currentTable) {
                currentTable = { headers: [], rows: [] };
            }
            const cols = line.split('|').map(col => col.trim()).filter(col => col);
            if (line.includes('---')) {
                // Skip separator line
            } else if (!currentTable.headers.length) {
                currentTable.headers = cols;
            } else {
                currentTable.rows.push(cols);
            }
        } else if (line && currentSection && !currentList && currentCode === null) {
            const cleanLine = DOMPurify.sanitize(line.replace(/\*([^*]+)\*/g, '<em>$1</em>'));
            currentSection.content.push(<p key={`p-${index}`} className="mb-6 text-lg leading-loose text-gray-300" dangerouslySetInnerHTML={{ __html: cleanLine }} />);
        }

        if (currentList && (index === lines.length - 1 || !lines[index + 1]?.match(/^- |\d+\. /))) {
            currentSection.content.push(
                currentList.type === 'ul' ? (
                    <ul key={`ul-${index}`} className="list-disc pl-8 mb-8 text-lg leading-loose text-gray-300">
                        {currentList.items.map((item, i) => (
                            <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                        ))}
                    </ul>
                ) : (
                    <ol key={`ol-${index}`} className="list-decimal pl-8 mb-8 text-lg leading-loose text-gray-300">
                        {currentList.items.map((item, i) => (
                            <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                        ))}
                    </ol>
                )
            );
            currentList = null;
        }

        if (currentTable && (index === lines.length - 1 || !lines[index + 1]?.startsWith('|'))) {
            currentSection.content.push(
                <ScorecardTable
                    key={`table-${index}`}
                    data={currentTable.rows.map(row => ({
                        category: row[0],
                        score: row[1],
                        notes: row[2]
                    }))}
                />
            );
            currentTable = null;
        }
    });

    if (currentSection) {
        components.push(
            <Section key={currentSection.title} title={currentSection.title}>
                {currentSection.content}
            </Section>
        );
    }

    return components;
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
                // Validate the full structure before accessing
                if (
                    !state.jsonData.choices ||
                    !Array.isArray(state.jsonData.choices) ||
                    !state.jsonData.choices[0] ||
                    !state.jsonData.choices[0].message ||
                    !state.jsonData.choices[0].message.content
                ) {
                    throw new Error("Invalid JSON data structure: Missing choices or content");
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
                        throw new Error("Invalid JSON data structure");
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

    const handleDownload = () => {
        if (!reviewData) {
            setNotification('No content to download');
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        const blob = new Blob([reviewData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code_review_${reviewId}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        setNotification('File downloaded!');
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
                        label="Download"
                        onClick={handleDownload}
                        className="bg-green-600 hover:bg-green-700"
                    />
                    <ActionButton
                        icon={Share2}
                        label="Share"
                        onClick={handleShare}
                        className="bg-purple-600 hover:bg-purple-700"
                    />
                  {/*  <ActionButton
                        icon={Upload}
                        label="Upload New JSON"
                        onClick={() => document.getElementById('fileInput').click()}
                        className="bg-yellow-600 hover:bg-yellow-700"
                    />*/}
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
                {parseContent(reviewData)}
            </div>
        </ErrorBoundary>
    );
};

export default ReviewPage;