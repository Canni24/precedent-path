
import { analyzeDocument, chatWithAI } from "./gemini.lib";

export interface PoshAnalysisResult {
  jurisdictionalSummary: {
    authority: string;
    sector: string;
  };
  statutoryBenchmark: {
    icConstitution: string;
    limitationPeriod: string;
    inquiryTimeline: string;
  };
  riskAssessment: {
    liabilityScore: number;
    liabilityReason: string;
    confidentialityRisk: string;
  };
  legalNuance: {
    genderNeutrality: string;
    maliciousIntent: string;
  };
  strategicImplications: {
    pros: string[];
    cons: string[];
  };
  citations: string[];
  summary: string;
  verdict: "POSH ALLOWED" | "POSH NOT APPLICABLE";
}

const SYSTEM_PROMPT = `
System Instructions: National POSH Act Expert
Role: You are a specialized Legal ML Model trained on the Sexual Harassment of Women at Workplace Act, 2013 and relevant Indian Supreme Court precedents.

Task: Analyze the uploaded document and provide a structured Pan-India compliance report in JSON format.
Output JSON Structure:
{
  "jurisdictionalSummary": {
    "authority": "Identify which Indian court or authority issued the document",
    "sector": "Organized Sector or Unorganized Sector (referencing Section 2(p))"
  },
  "statutoryBenchmark": {
    "icConstitution": "Analysis of Section 4 compliance (senior woman Presiding Officer, 50% women members)",
    "limitationPeriod": "Analysis of Section 9 compliance (90-day filing window)",
    "inquiryTimeline": "Analysis of Section 11 compliance (90-day completion window)"
  },
  "riskAssessment": {
    "liabilityScore": 1-10,
    "liabilityReason": "Assessment of risk of ₹50,000 fine or license cancellation (Section 26)",
    "confidentialityRisk": "Analysis of confidentiality leaks (Section 16)"
  },
  "legalNuance": {
    "genderNeutrality": "Address same-gender harassment (Section 2(m))",
    "maliciousIntent": "Discuss malicious vs unproven findings (Section 14)"
  },
  "strategicImplications": {
    "pros": ["List how document upholds Articles 14, 15, and 21"],
    "cons": ["Identify procedural gaps, e.g., missing external member"]
  },
  "citations": ["Specific Sections or Source IDs for every finding"],
  "summary": "A concise overview of the entire case",
  "verdict": "POSH ALLOWED" or "POSH NOT APPLICABLE"
}

Example Output:
{
  "jurisdictionalSummary": {
    "authority": "Internal Committee, Techorp Ltd, Bangalore",
    "sector": "Organized Sector"
  },
  "statutoryBenchmark": {
    "icConstitution": "Non-compliant: Presiding Officer was a mid-level manager, not senior-level woman as required by Section 4(2)(a).",
    "limitationPeriod": "Compliant: Incident occurred on Jan 5, reported on Feb 10 (within 90 days).",
    "inquiryTimeline": "Pending: Inquiry ongoing for 45 days."
  },
  "riskAssessment": {
    "liabilityScore": 7,
    "liabilityReason": "High risk of penalty due to improper IC constitution.",
    "confidentialityRisk": "Low: All parties referred to by pseudonyms in the report."
  },
  "legalNuance": {
    "genderNeutrality": "Document correctly identifies that identity of respondent does not preclude an inquiry.",
    "maliciousIntent": "No evidence of malice found."
  },
  "strategicImplications": {
    "pros": ["Immediate interim relief provided to complainant."],
    "cons": ["Lack of external member in IC constitution violates Section 4(2)(c)."]
  },
  "citations": ["Section 4(2)(a)", "Section 9", "Section 12"],
  "summary": "The case involves a complaint of verbal harassment. While timelines were met, the IC structure is legally flawed.",
  "verdict": "POSH ALLOWED"
}
`;

export async function processPoshDocument(file: File): Promise<PoshAnalysisResult> {
  const base64Data = await fileToBase64(file);
  const responseText = await analyzeDocument(
    base64Data,
    file.type || "application/pdf",
    SYSTEM_PROMPT
  );

  try {
    // Clean potential markdown code blocks from response
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse AI response:", responseText);
    throw new Error("Invalid AI response format");
  }
}

export async function askPoshClarification(
  history: { role: string; content: string }[],
  message: string,
  analysisResult: PoshAnalysisResult
) {
  // Map roles
  const geminiHistory = history.map(h => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }]
  }));

  // Gemini history MUST start with 'user' role. 
  // We filter out any leading messages that are not from the user.
  const firstUserIndex = geminiHistory.findIndex(h => h.role === "user");
  const filteredHistory = firstUserIndex !== -1 ? geminiHistory.slice(firstUserIndex) : [];

  const chatInstruction = `
    ${SYSTEM_PROMPT}
    
    CRITICAL CONTEXT FOR THIS CHAT:
    You have already analyzed the user's document and produced the following findings:
    ${JSON.stringify(analysisResult, null, 2)}
    
    The user is now asking clarifying questions about this specific case and your findings. 
    Use the above JSON data as your source of truth for the case details, but continue to apply your expertise on the POSH Act, 2013 to provide deep legal insights.
  `;

  const responseText = await chatWithAI(filteredHistory, message, chatInstruction);
  return responseText;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}
