import * as express from 'express';
import { getHello } from './src-legacy/my-legacy-service.js';
import { bootstrap } from './src/main';

const app = express();
const port = 3000;

app.get('/v1', (req, res) => {
  res.send(getHello());
});

bootstrap(app).then((nestApp) => {
  nestApp.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
});
