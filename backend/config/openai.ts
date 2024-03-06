// import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPEN_API_KEY,
  apiKey:process.env.OPEN_API_ORG
});


// const completion = await openai.create



async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();