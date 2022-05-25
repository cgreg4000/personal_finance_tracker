import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import NewExpenseForm from './components/NewExpenseForm';
import ExpenseDetails from './components/ExpenseDetails';
import UpdateExpenseForm from './components/UpdateExpenseForm';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <div>
          <h1 className='text-primary'>myfinancepal</h1>
          <hr></hr>
        </div>
        <Switch>
          <Route exact path="/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/expenses/add">
            <NewExpenseForm></NewExpenseForm>
          </Route>
          <Route exact path="/expenses/:_id">
            <ExpenseDetails></ExpenseDetails>
          </Route>
          <Route exact path="/expenses/update/:_id">
            <UpdateExpenseForm></UpdateExpenseForm>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
