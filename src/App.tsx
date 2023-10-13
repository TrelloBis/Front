import './App.css'
import Router from './Router'
import TasksProvider from './providers/TaskProvider'
import UsersProvider from './providers/UserProvider'

export default function App() {
  return (
    <>
    <UsersProvider>
      <TasksProvider>
        <Router />
      </TasksProvider>
    </UsersProvider>
      
    </>
  )
}