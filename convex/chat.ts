import { action, mutation, query } from "./_generated/server";
import { fetchMutation, fetchQuery, fetchAction } from "convex/nextjs";

import { revalidatePath } from "next/cache";

import { api } from "./_generated/api";

import { v } from "convex/values";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handlePlayerAction = action({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Write a haiku about recursion in programming.",
        },
      ],
    });

    const input = args.message;
    const response = completion.choices[0].message.content ?? "";

    await ctx.runMutation(api.chat.storeEntry, {
      input,
      response,
    });

    return completion;
  },
});

// export const createChatAction = async ({ message }: { message: string }) => {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//           role: "user",
//           content: "Write a haiku about recursion in programming.",
//         },
//       ],
//     });

//     if (!completion) {
//       return;
//     }

//     const input = message;
//     const response = completion.choices[0].message.content ?? "";

//     await fetchMutation(api.chat.storeEntry, {
//       input,
//       response,
//     });

//     return completion;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const storeEntry = mutation({
  args: { input: v.string(), response: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("entries", {
      input: args.input,
      response: args.response,
    });
  },
});

export const getAllEntries = query({
  handler: async ctx => {
    return await ctx.db.query("entries").collect();
  },
});
