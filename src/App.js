import './default.scss';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router';
import Registration from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render = {() => (
          <HomeLayout>
            <HomePage></HomePage>
          </HomeLayout>
        )}></Route>
        <Route path="/registration" render = {() => (
          <MainLayout>
            <Registration></Registration>
          </MainLayout>
        )}></Route>
      </Switch>
    </div>
  );
}

export default App;
