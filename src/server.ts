import { app } from './app';

// pass this host 0.0.0.0 to make it accessible to any other application
app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log(`🚀 Server running on http://localhost:3333`);
});