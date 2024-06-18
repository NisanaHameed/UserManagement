import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'


function App() {

  return (
    <Router>
     <Routes>
      <Route path='/*' element={<UserRoutes />}></Route>
      <Route path='/admin/*' element={<AdminRoutes />}></Route>
     </Routes>  
    </Router>
  )
}

export default App
