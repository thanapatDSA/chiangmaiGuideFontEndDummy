import { createMemoryHistory } from 'history'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import logger from 'redux-logger'

const reducers = (history) => combineReducers({
  router: connectRouter(history)
})

export const history = createMemoryHistory()

export const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger
    )
  )
)