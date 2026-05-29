import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "0p745kum",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false,
});