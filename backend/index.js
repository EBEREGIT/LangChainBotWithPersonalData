import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
config();

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const embeddings = new OpenAIEmbeddings();
const splitter = new RecursiveCharacterTextSplitter();

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (request, response) => {
  response.json({ message: "Welcome To Tahir Project!" });
});

app.post("/information", async (request, response) => {
  const { input } = request.body;

  try {
    const output = await fetch(
      "https://www.unn.edu.ng/wp-content/uploads/2023/08/TIMETABLE-OF-EVENTS-FOR-2022-2023-SESSION.pdf"
    );
    const data = await output.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();
    const splitDocs = await splitter.splitDocuments(docs);
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );
    const prompt =
      ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:
      
      <context>
      {context}
      </context>
      
      Question: {input}`);
    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });
    const retriever = vectorStore.asRetriever();
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });
    const result = await retrievalChain.invoke({
      input,
    });

    response.json({ message: result.answer });
  } catch (error) {
    return response.json({ error });
  }
});

app.post("/navigation", async (request, response) => {
  const { input } = request.body;

  try {
    const template =
      "You are a helpful assistant. You help with navigation within the University of Nigeria, Nsukka only. Be detailed when answering questions. \n Question: {question}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["question"],
    });

    const chain = new LLMChain({ llm: chatModel, prompt });

    const result = await chain.call({ question: input });

    response.json({ message: result.text });
  } catch (error) {
    return response.json({ error });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
