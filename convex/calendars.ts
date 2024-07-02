import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new Error("Not Auth")};

    const userId = identity.subject;

    const calendars = await ctx.db
    
      .query("calendars")
      .withIndex("by_userId", (q) =>
        q
          .eq("userId", userId)
      )
      .order("desc")
      .collect();

    return calendars;
  }
})

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new Error("Not Auth")};

    const userId = identity.subject;

    const calendar = await ctx.db.insert("calendars", {
      name: args.name,
      userId,
    })
  }
})