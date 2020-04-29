import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Healthy, StatusPage } from 'react-healthy';

function App() {
  const apis = [
    {
      name: '400',
      endpoint: 'https://httpstat.us/400'
    },
    {
      name: '200',
      endpoint: 'http://httpstat.us/200'
    }
  ]
  return (
    <BrowserRouter>
      <Route path={'/'} exact>
        <StatusPage apis={apis}></StatusPage>
      </Route>
      <Route path={'/healthy'}>
        <Healthy apis={apis}></Healthy>
        <div>Healthy page</div>
      </Route>
    </BrowserRouter>
  );
}

export default App;
