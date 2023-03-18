import * as express from 'express';
import { getHello } from './src-legacy/my-legacy-service.js';
import { bootstrap } from './src/app.bootstraper';

const app = express();
const PORT = 3000;

app.get('/v1', (req, res) => {
  res.send(getHello());
});

bootstrap(app).then((nestApp) => {
  nestApp.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
});
