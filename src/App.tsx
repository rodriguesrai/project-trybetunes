import { Route, Routes } from 'react-router-dom';
import Login from './componentes/Login/Login';
import Search from './componentes/Search/Search';
import Album from './componentes/Album/Album';
import Layout from './componentes/Layout/layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
