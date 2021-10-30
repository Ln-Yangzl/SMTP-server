import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import SendMail from './pages/sendMail'
import SendedBox from './pages/sendedBox';
import DraftsBox from './pages/draftsBox';

import './utils/tools'
import './base.css'
import './common.css'

function App(){
    return(
        <BrowserRouter>
            <Switch>

                <Route path='/send' component={SendMail} />

                <Route path='/outbox' component={SendedBox} />

                <Route path='/draftsbox' component={DraftsBox} />

                <Route path='/'>
                    <Redirect to='/send' />
                </Route>

            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(
      <App />,
      document.getElementById('root')
    );