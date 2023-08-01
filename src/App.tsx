import { Route, Routes } from 'react-router-dom';
import Login from './componentes/Login/Login';
import Search from './componentes/Search/Search';
import Album from './componentes/Album/Album';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Routes>
    </div>
  );
}

export default App;
