import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import tailwindcssPostcss from "@tailwindcss/postcss"
import autoprefixer from "autoprefixer"
import envloader from "loony-dotenv"
import os from "os"
import path from "path"

const homePath = path.join(os.homedir(), ".envs", "book", "front.env")
envloader(homePath)

const { PORT } = process.env

const config = {
  server: {
    port: (PORT && parseInt(PORT)) || 3003,
    strictPort: true,
  },
  source: {
    define: {
      "process.env": JSON.stringify(process.env),
    },
  },
  plugins: [pluginReact()],
  html: {
    template: "./public/index.html",
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcssPostcss, autoprefixer],
      },
    },
  },
}

// if ((typeof HTTPS === "boolean" && HTTPS) || HTTPS === "true") {
//   config.server.https = {
//     key: HTTPS_KEY_PATH && fs.readFileSync(HTTPS_KEY_PATH),
//     cert: HTTPS_CERT_PATH && fs.readFileSync(HTTPS_CERT_PATH),
//   }
// }

export default defineConfig(config)
