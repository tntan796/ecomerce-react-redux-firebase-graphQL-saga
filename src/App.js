import './default.scss';
import HomePage from './pages/HomePage';
import { Redirect, Route, Switch } from 'react-router';
import Registration from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useEffect } from 'react';
import Recovery from './pages/Recovery';
import * as UserAction from './redux/User/user.action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  let authenListener = null;

  let currentUser = useSelector((state) => state.user.currentUser);

  let dispatch = useDispatch();
  
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [UserAction.checkUserSession])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => (
          <HomeLayout>
            <HomePage></HomePage>
          </HomeLayout>
        )}></Route>
        <Route path="/registration" render={() => currentUser ?
          <Redirect to="/" /> : (
            <MainLayout>
              <Registration></Registration>
            </MainLayout>
          )}></Route>
        <Route path="/login" render={() => (currentUser) ?
          <Redirect to="/" /> : (
            <MainLayout>
              <Login></Login>
            </MainLayout>
          )}></Route>
        <Route path="/recovery" render={() => currentUser ? <Redirect to="/" /> : (
          <MainLayout>
            <Recovery></Recovery>
          </MainLayout>
        )}></Route>
        <Route path="/dashboard" render={() => (
          <withAuth>
            <MainLayout>
              <Dashboard></Dashboard>
            </MainLayout>
          </withAuth>
        )}></Route>
      </Switch>
    </div>
  );
}

export default App;
