import React from 'react'
import { Router, Switch, Route } from "react-router-dom"

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Sponsor from './pages/Sponsor'
import Team from './pages/Team'
import Cars from './pages/Cars'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import './App.scss'

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
const history = createBrowserHistory();

function logGoogle(location)
{
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
}
history.listen(location => {
  logGoogle(location)
});

logGoogle(window.location)

const routerBaseName = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="overflow-hidden">
      <Router basename={routerBaseName} history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/sponsors" component={Sponsor} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/contact" component={Contact} />

          {/* 404 page */}
          <Route path="*" component={NotFound} /> 
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
