## Getting Started
This is a open-source RESTful API project made with ExpressJS and MongoDB.

To run this as a development server simply run:

```bash
npm run dev
```

Which will prompt you the following messages:
```bash
> api@1.0.0 dev C:\your_local_repository\your_api
> ts-node-dev --transpile-only --ignore-watch node_modules src/config/app.ts

[INFO] 10:40:19 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.3)
Application running!
```
## ExpressJS
This project is developed with ExpressJS, a small (but robust) library for HTTP servers. To learn more about ExpressJS werecommend its [npm package page](https://www.npmjs.com/package/express) or its [documentation page](https://expressjs.com/en/5x/api.html).

## mongoose
This project was made using mongoose, in order to learn more about mongoose we recommend its [npm package page](https://www.npmjs.com/package/mongoose), or its [documentation page](https://mongoosejs.com/docs/api.html).
## Database
In order to set up your database connection, set your connection string at a local ```.env``` file, which will be imported to your ```./src/database/connection.ts.```
If you need to change the format of your connection string, this is the file you should edit.




