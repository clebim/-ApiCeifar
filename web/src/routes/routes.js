import React, { useContext } from 'react'
import { Redirect, Route as ReactDomRoute } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const RouteWrapper = ({ component: Component, isPrivate = false, ...rest }) => {
  const { signed } = useContext(AuthContext)

  if (rest.path === '/') {
    return <Redirect to="/login" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />
  }

  if (!signed && isPrivate) {
    return <Redirect to="/login" />
  }

  return <ReactDomRoute {...rest} render={() => <Component />} />
}

export default RouteWrapper
