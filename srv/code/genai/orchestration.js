// genai-orchestration.js
const cds = require("@sap/cds");
const LOG = cds.log("GenAI");

const MODEL_NAME = "gpt-5.2";

const MODEL_PARAMS = {
  max_tokens: 2048,
  //temperature: 0.1,
  response_format: { type: "json_object" }
};

const SYSTEM_MESSAGE = {
  role: "system",
  content: "You are a support agent for our freezers products"
};

async function createOrchestrationClient(userPromptTemplate) {
  const { OrchestrationClient, buildAzureContentSafetyFilter } = await import(
    "@sap-ai-sdk/orchestration"
  );

  const inputFilter = buildAzureContentSafetyFilter("input", {
    self_harm: "ALLOW_SAFE"
  });

  return new OrchestrationClient({
    promptTemplating: {
      model: {
        name: MODEL_NAME,
        params: MODEL_PARAMS
      },
      prompt: {
        template: [SYSTEM_MESSAGE, { role: "user", content: userPromptTemplate }]
      }
    },
    filtering: {
      input: {
        filters: [inputFilter]
      }
    }
  });
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text, parseError: String(e) };
  }
}

async function orchestrationCompletionSimple(promptTemplate, placeholderValues = {}) {
  try {
    const orchestrationClient = await createOrchestrationClient(promptTemplate);

    const response = await orchestrationClient.chatCompletion({
      placeholderValues
    });

    return safeJsonParse(response.getContent());
  } catch (error) {
    LOG.error("Error in orchestration:", error);
    throw new Error("Orchestration service failed.");
  }
}

async function orchestrationCompletionTemplate(promptTemplate, placeholderValues = {}) {
  return orchestrationCompletionSimple(promptTemplate, placeholderValues);
}

async function preprocessCustomerMassage(titleCustomerLanguage, fullMessageCustomerLanguage) {
  const promptTemplate = `
Categorize the fullMessageCustomerLanguage into one of (Technical, Delivery, Service).
Classify urgency of the fullMessageCustomerLanguage into one of (High, Medium, Low).
Classify sentiment of the fullMessageCustomerLanguage into one of (Negative, Positive, Neutral).
Translate fullMessageCustomerLanguage to English and put it in fullMessageEnglish.
Summarize fullMessageCustomerLanguage into 20 words max and keep the original language and put it in summaryCustomerLanguage.
Translate the summaryCustomerLanguage to English and put it in summaryEnglish.
Translate the titleCustomerLanguage to English and put it in titleEnglish.

Here is the titleCustomerLanguage and fullMessageCustomerLanguage:
titleCustomerLanguage: {{?titleCustomerLanguage}}
fullMessageCustomerLanguage: {{?fullMessageCustomerLanguage}}

Return the result in the following JSON template:
{
  "fullMessageEnglish": "Text",
  "titleEnglish": "Text",
  "summaryCustomerLanguage": "Text",
  "summaryEnglish": "Text",
  "messageCategory": "Text",
  "messageUrgency": "Text",
  "messageSentiment": "Text"
}
`;

  try {
    const response = await orchestrationCompletionSimple(promptTemplate, {
      titleCustomerLanguage,
      fullMessageCustomerLanguage
    });

    return response;
  } catch (error) {
    LOG.error("Error in preprocessing:", error);
    throw new Error("Preprocessing service failed.");
  }
}

module.exports = {
  preprocessCustomerMassage,
  orchestrationCompletionSimple,
  orchestrationCompletionTemplate
};