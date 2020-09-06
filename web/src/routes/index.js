import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './routes'

import Sign from '../pages/signIn/index'
import Home from '../pages/home/index'
import Payments from '../pages/Payments/index'
import Loading from '../components/Loading'

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Loading} />
        <Route path="/login" component={Sign} />
        <Route path="/home" isPrivate component={Home} />
        <Route path="/payments" isPrivate component={Payments} />
      </Switch>
    </BrowserRouter>
  )
}

export default routes
