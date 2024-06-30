import { app } from "@/app";
import { env } from "@/env";

// pass this host 0.0.0.0 to make it accessible to any other application
app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:3333`);
  });
