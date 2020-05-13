import React, {useState, createContext} from 'react';
import './App.css';


function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const result = localStorage.getItem('user')
    return result ? JSON.parse(result) : []
  })

  return (
    <div className="App">
      <RundownContext.Provider value={
        {
          setUserInfo,
          userInfo
        }
      }>
        <Main/>
      </RundownContext.Provider>
    </div>
  );
}

export default App
