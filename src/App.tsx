import { Route, Routes } from 'react-router-dom';
import Login from './componentes/Login/Login';
import Search from './componentes/Search/Search';
import Album from './componentes/Album/Album';
import Layout from './componentes/Layout/layout';
import NotFound from './componentes/NotFound/NotFound';
import Favorites from './componentes/Favorites/Favorites';
import Profile from './componentes/Profile/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
        </Route>
        <Route path="*" element={ <NotFound /> } />
        <Route path="/profile" element={ <Profile /> } />

      </Routes>
    </div>
  );
}

export default App;
