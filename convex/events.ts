import { v } from "convex/values";
import {mutation,query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel" 

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new Error("Not Auth")};

    const events = await ctx.db.query("events").collect();

    return events;
  }
})

export const getByDay = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new Error("Not Auth")};

    const userId = identity.subject;

    const events = await ctx.db
      .query("events")
      .withIndex("by_date", (q) => 
        q 
          .eq("userId", userId)
          .eq("date", args.date)
    )
    .order("desc")
    .collect();

    return events;
  }
})

export const create = mutation({
  args: {
    name: v.string(),
    parentCalendar: v.optional(v.id("calendars")),
    date: v.string(),
    desc: v.optional(v.string()),
    time: v.optional(v.string()),
    allDay: v.boolean(),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new Error("Not Auth")};

    const userId = identity.subject;

    const event = await ctx.db.insert("events", {
      name: args.name,
      parentCalendar: args.parentCalendar,
      desc: args.desc,
      userId,
      date: args.date,
      time: args.time,
      allDay: args.allDay,
      location: args.location,
    });

    return event;
  }
})