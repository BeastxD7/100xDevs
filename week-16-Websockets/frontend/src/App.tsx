import { BrowserRouter,Routes ,Route} from 'react-router';
import Home from './pages/Home';
import Chat from './pages/Chat';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App