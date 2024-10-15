import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createAdventure = mutation({
  args: { characterClass: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("adventures", {
      characterClass: args.characterClass,
    });
  },
});
