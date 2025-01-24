import {GraphQLClient} from 'graphql-request'

const url = 'https://malharnagar.us-east-a.ibm.stepzen.net/api/get-exercises/__graphql'
const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY

const client = new GraphQLClient(url, {headers: {Authorization: `apikey ${apiKey}`}})

export default client