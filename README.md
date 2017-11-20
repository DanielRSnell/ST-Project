###Overview:

The goal of this documentation and project is to server a testing grounds for establishing a GraphQL and Big Query CLI relational query system that will produce topical value by domain for a list of domains.

The testing grounds provides a simple JSON-server, as well as GraphQL server with pre-defined schema setup to work with the topical request from Majestic’s API.

You can use the format included in the json.js file with a set of queries domains to fetch a list of domains, as well as test majestic’s API with-in GraphiQL.

##Packages in use:

Express 

GraphQL 

Express-GraphQL 

Json-Server (replace) 

Axios 

Nodemon

##Getting Started

Clone the package

In Git Bash go to the projects folder 

Run npm json:server to start the json-server 

Run npm dev:server to start the GraphQL Server 

Register with https://developer-support.majestic.com/api for your API key 

In your browser go to http://Localhost4000/graphql 

Run the following command for a test:

{ 

grabList(domain: “ShareThis.com”, apiKey: “”){ 

Topic } 

}

This will return topical data by domain query. In-order to run this through a list, I recommend establishing a new schema for Big Query CLI linking to your database, run a query for a list, then execute forEach loop that executes the above GraphQL command.

This should help you get started with exploring the Topical API through Majestic, as well as establishing a consistent schema based workflow using GraphQL, Big Query, and 3rd Party APIs.

##For additional information about GraphQL, please visit:

http://graphql.org/

http://graphql.org/learn/
