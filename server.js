const express = require('express');
const expressGraphQL = require('express-graphql');
const topicalSchema = require('./schema/topical.js');

const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema:topicalSchema,
    graphiql:true
  }));

app.listen(4000, () => {
  console.log('Topical Playground - ST Project');
});
