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
  args: { message: v.string(), adventureId: v.id("adventures") },
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
    const adventureId = args.adventureId;

    await ctx.runMutation(api.chat.insertEntry, {
      input,
      response,
      adventureId,
    });

    return completion;
  },
});

export const insertEntry = mutation({
  args: {
    input: v.string(),
    response: v.string(),
    adventureId: v.id("adventures"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("entries", {
      input: args.input,
      response: args.response,
      adventureId: args.adventureId,
    });
  },
});

export const getAllEntries = query({
  args: {
    adventureId: v.id("adventures"),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("entries")
      .filter(q => q.eq(q.field("adventureId"), args.adventureId))
      .collect();

    return entries;
  },
});
