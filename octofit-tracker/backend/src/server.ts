import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    port,
    database: 'octofit_db',
    baseUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});