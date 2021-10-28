import ReactDOM from 'react-dom'

import SendMail from './pages/sendMail'

import './base.css'
import './common.css'

function App(){
    return(
        <SendMail />
    )
}

ReactDOM.render(
      <App />,
      document.getElementById('root')
    );