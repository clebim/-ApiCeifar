import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './routes'

import Sign from '../pages/signIn/index'
import Home from '../pages/home/index'
import Payments from '../pages/Payments/index'
import Loading from '../components/Loading'
import Admin from '../pages/Admin/index'
import Reports from '../pages/Reports/index'
import Sales from '../pages/Sales/index'

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Loading} />
        <Route path="/login" component={Sign} />
        <Route path="/home" isPrivate component={Home} />
        <Route path="/payments" isPrivate component={Payments} />
        <Route path="/admin" isPrivate component={Admin} />
        <Route path="/reports" isPrivate component={Reports} />
        <Route path="/sales" isPrivate component={Sales} />
      </Switch>
    </BrowserRouter>
  )
}

export default routes
