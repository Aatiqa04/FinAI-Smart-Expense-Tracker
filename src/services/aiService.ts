import OpenAI from "openai";
import { Expense, AIInsight } from "../types";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true
});

export const getAIInsights = async (expenses: Expense[]): Promise<AIInsight> => {
  const prompt = `
    Analyze the following financial transactions for the last period:
    ${JSON.stringify(expenses, null, 2)}

    Provide a concise summary of spending patterns, predictions for next month's spending based on trends,
    specific savings suggestions, and a financial health score (0-100).

    Respond with a JSON object in this exact format:
    {
      "summary": "Executive summary of finances",
      "predictions": "Predicted spending for next month",
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "healthScore": 75
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a financial analyst AI. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as AIInsight;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      summary: "Could not analyze data at this time.",
      predictions: "Prediction unavailable.",
      suggestions: ["Try logging more expenses for better accuracy."],
      healthScore: 50
    };
  }
};

export const generateFinancialReport = async (expenses: Expense[], month: string) => {
  const prompt = `
    Generate a detailed financial health report for the month of ${month}.
    Transactions: ${JSON.stringify(expenses)}

    Structure the report with these sections:
    1. Executive Summary
    2. Spending Analysis
    3. Income Efficiency
    4. Strategic Recommendations

    Use standard Markdown:
    - Use # for section headers
    - Use **bold** for emphasis on numbers or critical points
    - Use * for bulleted lists

    Make it look like a high-end financial audit.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert financial auditor. Generate professional, detailed financial reports in Markdown format."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Report Generation Error:", error);
    return "Error generating report. Please try again.";
  }
};
