import { defineConfig } from "vite"
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite"
import handlebars from "vite-plugin-handlebars";
import ctx from "./context.json"

export default defineConfig({
  base: "./",
  plugins: [
    tailwindcss(),
    handlebars({
      context: ctx,
      partialDirectory: resolve(__dirname, "partials"),
    })
  ],
})
