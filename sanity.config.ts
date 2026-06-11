import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? "ndqivyq6";
const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "nuru-trace",
  title: "Nuru Trace",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
