const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList
} = graphql;

// This is the Majestic SEO Schema
const topicalSearch = new GraphQLObjectType({
  name: 'getTopical',
  fields: () => ({
    topic: { type: GraphQLString },
    links: { type: GraphQLInt },
    TopicalTrustFlow: { type: GraphQLInt },
    RefDomains: { type: GraphQLInt },
    Pages: { type: GraphQLInt }
  })
});

const jsonServer = new GraphQLObjectType({
  name: 'grabJson',
  fields: () => ({
    month: { type: GraphQLInt },
    domain: { type: GraphQLString },
    events: { type: GraphQLInt }
  })
});

// This is the query designation, you can add your custom queries here:

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // This returns a list of topical info by domain
    grabList: {
      type: new GraphQLList(topicalSearch),
      // You must get your API Key Before Testing
      args: {
        domain: { type: GraphQLString },
        apiKey: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        //Remote request to json server
        return axios.get(`https://api.majestic.com/api/json?app_api_key=${args.apiKey}&cmd=GetTopics&item=${args.domain}&datasource=fresh&count=10`)
        .then(response => response.data.datatables_data);
        // GraphQL needs to know the data requires pairing down for nested array
      }
    },
    //This will return 1 result per domain
    grabDomain: {
      type: topicalSearch,
      args: {
        domain: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get(`https://api.majestic.com/api/json?app_api_key=${args.apiKey}&cmd=GetTopics&item=${args.domain}&datasource=fresh&count=10`)
        .then(response => response.data.datatables_data[0]);
      }
    },
    getJson: {
      type: new GraphQLList(jsonServer),
      args: {
        //No Args Needed
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/ShareThis-Domains')
        .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
