import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-02-02",
  useCdn: false,
  token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
