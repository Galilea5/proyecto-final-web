import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Views/Login'
import Dashboard from './Views/Dashboard'
import CreateTask from './Views/CreateTask'
import ShowTasks from './Views/ShowTasks'
import CreateProyect from './Views/CreateProyect'
import CommentsView from './Views/CommentsView'
import Register from './Views/Register'
import NotFound from './Views/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signIn' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/taskList' element={<ShowTasks />}/>
        <Route path='/newProyect' element={<CreateProyect />}/>
        <Route path='/newTask' element={<CreateTask />}/>
        <Route path='/comments' element={<CommentsView />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
