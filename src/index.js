const app = require('./app')
const logger = require('./logger')

const { PORT } = process.env

app.listen(PORT, () => logger.info(`Apollo Server on http://localhost:${PORT}/graphql`))
