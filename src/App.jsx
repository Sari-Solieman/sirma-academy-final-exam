import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import TeamDetails from './components/TeamDetails';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/TeamDetails' element={<TeamDetails />} />
      </Routes>
    </>
  )
}

export default App
