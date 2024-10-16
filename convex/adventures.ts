import { v } from "convex/values";
import { internalAction, internalQuery, mutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createAdventure = mutation({
  args: {
    character: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("adventures", {
      characterClass: args.character,
    });

    await ctx.scheduler.runAfter(0, internal.adventures.setupAdventureEntries, {
      adventureId: id,
    });

    return id;
  },
});

export const getAdventure = internalQuery({
  args: {
    adventureId: v.id("adventures"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.adventureId);
  },
});
export const setupAdventureEntries = internalAction({
  args: { adventureId: v.id("adventures") },
  handler: async (ctx, args) => {
    const adventure = await ctx.runQuery(
      internal.adventures.getAdventure,
      args
    );

    if (!adventure) {
      throw new Error("Adventure not found");
    }
    const input = `You are a dungeon master who is going to run a text based adventure RPG for me.
            You will need to setup an advanture for me wtich will involve having me fight random enemy encounters, reward me with loot after killing enemies, gimve me golas and quests, and finally let me know when i finish overall adventure.

            During this entire time please track my health points which will start at 10, and my character class which is a ${adventure.characterClass}, and my inventory which will start with 
            - a broad sword that deals a base damage of 1
            - a bronze helmet 
            - an a health potion that will restore 5 health points

            the adventure should have some of the following:
             - the hero must clear out a dungeon from undead enemies
             - the dungeon has 3 levels
            - each level has 1 set of enimies to fight
              - the final level has a boss enemy to fight
              - the final level has chest filled with one steel sword that deals 2 damage

              go ahead and describe the adventure for me, and then ask me for my next steps. 
              When i am fighting enemies, please ask me to roll 6 sided dices, with a 1 being the worst outcome of scenario, and a 6 being the best outcome of scenario.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    });
    // const input = args.message;
    const response = completion.choices[0].message.content ?? "";
    const adventureId = args.adventureId;
    await ctx.runMutation(api.chat.insertEntry, {
      input,
      response,
      adventureId,
    });
  },
});
