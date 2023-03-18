import express from 'express';
import { getHello } from './src/my-legacy-service.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(getHello());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
