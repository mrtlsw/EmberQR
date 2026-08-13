import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import helmet from "helmet";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Obscure server software details
  app.disable("x-powered-by");
  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    // Some scanners look for the Server header, you can spoof or remove it
    res.setHeader("Server", "Generic"); 
    next();
  });

  // Apply security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          imgSrc: ["'self'", "data:", "blob:", "https:"],
          fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
          connectSrc: ["'self'", "https:", "ws:", "wss:"],
          frameAncestors: null, // Allow embedding in AI Studio iframes
        },
      },
      crossOriginOpenerPolicy: false,
      xFrameOptions: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      referrerPolicy: {
        policy: "no-referrer",
      },
      xContentTypeOptions: true,
    })
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
