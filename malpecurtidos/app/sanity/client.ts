import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || "vtvto3et", // Placeholder
    dataset: process.env.SANITY_DATASET || "production",
    useCdn: true, // Use CDN for client-side, or false for fresh data
    apiVersion: "2024-02-09", // Use a recent date
});
