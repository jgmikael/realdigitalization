import express from 'express';
import cors from 'cors';
import { shaclRoutes } from './routes/shacl';
import { contextRoutes } from './routes/context';
import { vcRoutes } from './routes/vc';
import { walletRoutes } from './routes/wallet';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/turtle' }));

// Routes
app.use('/api/shacl', shaclRoutes);
app.use('/api/context', contextRoutes);
app.use('/api/vc', vcRoutes);
app.use('/api/wallet', walletRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Welcome page
app.get('/', (req, res) => {
  res.json({
    message: 'W3C VC Business Document Demo API',
    endpoints: {
      shacl: '/api/shacl/generate',
      context: '/api/context/generate',
      issue: '/api/vc/issue',
      wallet: '/api/wallet/credentials'
    },
    docs: '/api/docs'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VC Demo Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`💼 Wallet UI: http://localhost:${PORT}/wallet`);
});

export default app;
