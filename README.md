## Description
This is a small example about how to add NestJS to existing legacy app running on Express.

### How to integrate Nest.JS to Express app:
- Install @nestjs/cli:
```bash
$ npm i -g @nestjs/cli
```
- Rename your original `package.json`, e.g. `package-old.json`
- [Optional] Rename your old `src` folder if exist, e.g. `src-legacy`
- Create new NestJS project using this command inside your root folder using command:
```bash
$ nest new . -g -s -p npm -l TS
```
- Copy required dependencies from your legacy app (`package-old.json`) into the new `package.json`
- Install node modules
```bash
$ npm i
```
- Modify start commands in `package.json` file to run your file with an old express entrypoint, e.g. `app.js`:
```
"start": "npx ts-node app.js",
"start:prod": "node dist/app.js",
```
- [Optional] If your legacy project contains js code, allow it inside the `compilerOptions` in `tsconfig.json`:
```
"allowJs": true,
```
- Modify `src/main.ts`:
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

export async function bootstrap(express) {
  const adapter = new ExpressAdapter(express);
  const app = await NestFactory.create(AppModule, adapter);

  await app.init();

  return app;
}
```
- Modify `src/app.controller.ts` to test NestJS endpoints later, e.g.:
```ts
@Controller('v2')
```
- Pass your existing express into newly created Nest bootstrap function. In this example it's inside `app.js` file:
```js
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
```
- Build and run app:
```bash
# development
$ npm run start

# production mode
$ npm run build
$ npm run start:prod
```
- Verify your old and new NestJS endpoints

## How to run this example
### Installation

```bash
$ npm i
```

### Running the app

```bash
# development
$ npm run start

# production mode
$ npm run build
$ npm run start:prod
```

Nest JS Docs: https://docs.nestjs.com/