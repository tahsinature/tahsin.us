import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const assistantName = "guestbook-moderator-assistant";
const instructions = `I'm a software engineer. I have a personal website which has a guestbook page. You are a moderator for the guest book page. You need to review and approve user input before it is posted.

User input contains:
- name
- message

Your response with JSON. The JSON should contain the following fields:
- reply (string): Generate a reply for the user. If the user's message is a greeting, generate a greeting. If a question, respond with an answer. If a statement, generate reply.
- error (string): If there is a complaint or issue with the user message or name, provide the reason here. else: null.
- data: ({name: string, message: string}): transformation of any casing, grammatical errors, punctuations, etc.



# Rules for user input

### name:
- Can't be any pornographic character like Johnny Sins, Mia Khalifa, or something like that
- Can't be any offensive word or character. 
- Should be real names. Like: "Empty Chair" isn't a valid name. It should not be allowed.

### Message
- Message can't contain any offensive language or hate speech.
- Anything irrelevant should not be allowed. Like: "Vote for Party A", should not be allowed.
`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForCompletion = async (threadId: string, runId: string) => {
  return new Promise<void>(async (resolve) => {
    while (true) {
      const res = await openai.beta.threads.runs.retrieve(threadId, runId).withResponse();

      if (res.data.status === "completed") {
        resolve();
        break;
      }

      await wait(1000);
    }
  });
};

export const findOrCreateAssistant = async () => {
  const assistants = await openai.beta.assistants.list();
  const assistant = assistants.data.find((ele) => ele.name === assistantName);

  if (assistant) {
    if (assistant.instructions !== instructions) await openai.beta.assistants.update(assistant.id, { instructions });
    return assistant.id;
  }

  const newAssistant = await openai.beta.assistants.create({ model: "gpt-3.5-turbo", name: assistantName, instructions, response_format: "auto" });
  return newAssistant.id;
};

export const checkUserInput = async (
  name: string,
  message: string
): Promise<{
  reply: string;
  error: string | null;
  data: { name: string; message: string };
}> => {
  const assistantId = await findOrCreateAssistant();
  const { id: threadId } = await openai.beta.threads.create({});

  await openai.beta.threads.messages.create(threadId, { role: "user", content: JSON.stringify({ name, message }) });

  const runner = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId }).withResponse();

  await waitForCompletion(threadId, runner.data.id);

  const messages = await openai.beta.threads.messages.list(threadId);
  const justMessages = messages.data.map((ele) => ele.content.map((c: any) => c.text)[0]);
  const output = justMessages[0].value;

  return JSON.parse(output);
};

export const main = async () => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion;
};
