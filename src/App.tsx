
import './App.css'
import Screens from './screens/Screens'
import {Provider} from 'react-redux'
import store from './redux/store'
function App() {


  return (
    <div className='w-[400px] h-[600px] '>
    <Provider store={store}>
     <Screens />
     </Provider>
    </div>
  )
}

export default App
