import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    name: v.string(),
    userId: v.string(),
    date: v.string(),
    desc: v.optional(v.string()),
    time: v.optional(v.string()),
    parentCalendar: v.optional(v.id("calendars")),
    allDay: v.boolean(),
    location: v.optional(v.string()),
  })
  .index("by_user",["userId"])
  .index("by_user_calendar", ["userId", "parentCalendar"])
  .index("by_date", ["userId", "date"]),

  calendars: defineTable({
    userId: v.string(),
  })
  .index("by_userId", ["userId"])
});