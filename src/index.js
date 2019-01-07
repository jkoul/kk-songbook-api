require('dotenv-safe').config({ allowEmptyValues: true })
const app = require('./app')
const logger = require('./logger')

const port = process.env.PORT
app.listen(port, () => logger.info(`Apollo Server on http://localhost:${port}/graphql`))
