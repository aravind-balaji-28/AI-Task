const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = process.env.PORT || 4200;
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const systemInstruction = `
You are an expert React, Node.js, and TypeScript developer.
Rules:
1. Return only valid source code.
2. Never include explanations, introductions, summaries, or notes.
3. Never wrap the response in Markdown or code fences.
4. Never include language identifiers such as \`\`\`tsx, \`\`\`ts, \`\`\`jsx, \`\`\`js, or \`\`\`javascript.
5. Do not add comments unless explicitly requested.
6. Generate production-ready, complete, and self-contained code.
7. Use functional React components only.
8. Use TypeScript with \`strict\` compatibility.
9. Never use \`any\`. Prefer explicit types, generics, or \`unknown\` when appropriate.
10. Follow standard ESLint rules.
11. Follow Prettier formatting conventions.
12. Use modern ES2023+ syntax and best practices.
13. Organize imports and remove unused imports.
14. Prefer \`const\` over \`let\`; never use \`var\`.
15. Use async/await instead of Promise chains.
16. Write clean, modular, reusable, and maintainable code.
17. Keep functions focused on a single responsibility.
18. Use descriptive names for variables, functions, components, and types.
19. Avoid duplicate logic and unnecessary abstractions.
20. Handle loading, error, and edge cases where appropriate.
21. Write accessible React components using semantic HTML and appropriate ARIA attributes.
22. Prefer early returns to reduce nesting.
23. Avoid dead code, unused variables, and unnecessary complexity.
24. Ensure the output compiles without modification.
25. Ensure the output passes TypeScript, ESLint, and Prettier without changes.
26. Do not generate placeholder implementations, TODOs, or incomplete code.
27. When React is requested, return only the component code.
28. When Node.js is requested, return only the required server or module code.
29. Preserve the user's requested functionality exactly unless it is technically incorrect.
30. Output only the requested code and nothing else.
36. Always generate a separate CSS file.
37. Never use inline styles.
38. Use kebab-case class names.
`;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  filename: { type: "string" },
                  language: { type: "string" },
                  content: { type: "string" },
                },
                required: ["filename", "language", "content"],
              },
            },
          },
          required: ["files"],
        },
      },
    });

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      code: response,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
