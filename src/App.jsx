import './index.css'
import TaskManager from './component/TaskManger'
import Auth from './component/Auth';
import { supabase } from './supabase-client';
import { use, useEffect, useState } from 'react';

function App() {
  const [userSession, setUserSession] = useState(null);

  const fetchUserSession = async () =>{
    const currentSession = await supabase.auth.getSession()
    setUserSession(currentSession.data.session)
  }

  useEffect(() =>{
    const {data: authListener} = supabase.auth.onAuthStateChange((event, session) =>{
      setUserSession(session)
    })

    return () =>{
      authListener.subscription.unsubscribe()
    }

    fetchUserSession()
  }, [])  

  return (
    <>
    {userSession ? <TaskManager session={userSession} /> : <Auth />}
    </>

  )
}

export default App
