// AI related controller for generating chapter content using OpenRouter
const OpenAI = require("openai");


let openRouterClient = null;

// Initialize OpenRouter client if API key exists
if (process.env.OPENROUTER_API_KEY) {
  try {
    openRouterClient = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER || "https://localhost:5000", // Optional
        "X-Title": "AI E-Book Creator", // Optional
      },
    });
    console.log("✅ OpenRouter AI client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize OpenRouter:", error.message);
  }
}

// Mock response for testing (when USE_MOCK_AI=true)
const generateMockResponse = (title) => {
  return `# ${title}

This is a sample chapter about "${title}". 

## Introduction

In this chapter, we will explore the fundamental concepts and principles related to ${title}. This topic is of great importance in understanding the broader context of our discussion.

## Main Content

The subject of ${title} encompasses various aspects that are worth examining in detail. We will begin by looking at the historical context and then move on to contemporary applications.

### Key Points

1. **Historical Background**: Understanding the origins helps us appreciate the evolution of this field.

2. **Current Applications**: Today, ${title} plays a crucial role in various industries and sectors.

3. **Future Implications**: Looking ahead, we can see how ${title} will continue to shape our world.

## Conclusion

In summary, ${title} represents an important area of study that continues to evolve. As we move forward, it will be essential to stay updated with the latest developments in this field.

---
*Note: This is a mock response. Configure your AI API keys in .env file for real AI-generated content.*`;
};

// @desc    Generate a chapter using OpenRouter AI
// @route   POST /api/ai/generate
// @access  Private (uses protect middleware)
exports.generateChapter = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Check if mock mode is enabled (for testing without API)
    if (process.env.USE_MOCK_AI === "true") {
      const mockContent = generateMockResponse(title);
      return res.json({
        success: true,
        content: mockContent,
        note: "Mock response - set USE_MOCK_AI=false and add OPENROUTER_API_KEY for real AI",
      });
    }

    // Check if OpenRouter is configured
    if (!openRouterClient || !process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        message: "AI service not configured",
        error: "OPENROUTER_API_KEY is missing in environment variables",
        suggestion: "Add OPENROUTER_API_KEY to your .env file, or set USE_MOCK_AI=true for testing",
      });
    }

    // Create prompt for AI
    const prompt = `Write a detailed, comprehensive book chapter on the topic: "${title}". 

Requirements:
- Make it well-structured with clear sections
- Include an introduction, main content, and conclusion
- Use engaging and professional language
- Make it informative and detailed
- Format the content in markdown with proper headings
- Aim for approximately 1000-2000 words

Chapter Title: ${title}`;

    // Get model from env or use a default (OpenRouter supports many models)
    // Popular models: openai/gpt-4, openai/gpt-3.5-turbo, anthropic/claude-3-sonnet, google/gemini-pro, etc.
    const modelName = process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo";

    try {
      console.log(`Using OpenRouter model: ${modelName}`);
      
      const completion = await openRouterClient.chat.completions.create({
        model: modelName,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = completion.choices[0]?.message?.content || "";

      if (!content || content.trim().length === 0) {
        return res.status(500).json({
          message: "AI generated empty response",
          error: "No content returned from OpenRouter",
        });
      }

      return res.json({
        success: true,
        content: content,
        model: modelName,
        usage: completion.usage || null,
      });
    } catch (apiError) {
      console.error("OpenRouter API Error:", apiError);
      
      const errorMessage = apiError.message || "Unknown error";
      
      if (errorMessage.includes("API_KEY") || errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
        return res.status(401).json({
          message: "Invalid API key",
          error: "OPENROUTER_API_KEY is invalid or expired",
          suggestion: "Check your API key in .env file. Get a new key at https://openrouter.ai/keys",
        });
      }

      if (errorMessage.includes("quota") || errorMessage.includes("429") || errorMessage.includes("rate limit")) {
        return res.status(429).json({
          message: "API quota/rate limit exceeded",
          error: errorMessage,
          suggestion: "Check your OpenRouter credits at https://openrouter.ai/credits",
        });
      }

      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        return res.status(404).json({
          message: "Model not found",
          error: `Model "${modelName}" is not available on OpenRouter`,
          suggestion: `Change OPENROUTER_MODEL in .env. See available models at https://openrouter.ai/models`,
        });
      }

      return res.status(500).json({
        message: "AI generation failed",
        error: errorMessage,
        model: modelName,
        suggestion: "Check your OpenRouter API key and model name. Visit https://openrouter.ai for help",
      });
    }
  } catch (error) {
    console.error("AI Controller Error:", error);
    
    return res.status(500).json({
      message: "AI generation failed",
      error: error.message || "Unknown error",
    });
  }
};


