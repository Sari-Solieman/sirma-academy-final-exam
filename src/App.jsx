import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import TeamDetails from './components/TeamDetails';
import MatchDetails from './components/MatchDetails';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/MatchDetails/:matchId' element={<MatchDetails />} />
        <Route path='/TeamDetails/:teamID' element={<TeamDetails />} />
      </Routes>
    </>
  )
}

export default App
