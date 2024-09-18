import { colorConsole } from 'tracer'

import { singleton } from './singleton.server'

class loggerInit {
  // eslint-disable-next-line ts/no-explicit-any
  public logger: any

  constructor() {
    const debug = import.meta.env.MODE !== 'production'

    this.logger = colorConsole({
      level: debug ? 0 : 4,
    })
  }
}

export default singleton(loggerInit).logger
