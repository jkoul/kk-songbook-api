require('dotenv-safe').config()
const app = require('./app')

const port = process.env.PORT
app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
})
