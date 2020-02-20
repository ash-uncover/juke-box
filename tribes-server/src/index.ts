import connection from './database/connection'
import servlets from './servlets'
import sockets from './sockets'

import Logger, {
  LogConfig
} from 'ap-utils-logger'

LogConfig.info()

const LOGGER = new Logger('SERVER')

const PORT_REST = 3090
const PORT_SOCKET = 3091

connection.open(() => {
  const serverServlets = servlets.listen(PORT_REST, () => {
    LOGGER.info(`REST is running in http://localhost:${PORT_REST}`)
  })
  serverServlets.on('close', () => {
    LOGGER.debug('REST Shutting down')
  })

  const serverSockets = sockets.listen(PORT_SOCKET, () => {
    LOGGER.info(`SOCKET is running in http://localhost:${PORT_SOCKET}`)
  })
  serverSockets.on('close', () => {
    LOGGER.debug('SOCKET Shutting down')
  })
})
