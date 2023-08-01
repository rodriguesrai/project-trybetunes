import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Carregando/carregando';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { Album } from '../../types/types';

function Search() {
  // const location = useLocation();
  // const userName = location.state?.userName;

  const [value, setValue] = useState(''); // useState do input
  const [loading, setLoading] = useState(false); // useState do carregando
  const [showInput, setShowInput] = useState(true); // esconde input
  const [showResult, setShowResult] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);

  const validName = value.trim().length >= 2; // disabled botão

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // onChange input
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    if (validName) {
      setShowInput(false);
      setLoading(true);
      try {
        const resultSearch = await searchAlbumsAPI(value);
        setArtistName(value);
        setAlbums(resultSearch);
      } catch (error) {
        console.error('Error ao pesquisar', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowResult(true);
        }, 1500);
        setShowInput(true);
        setValue('');
      }
    }
  };

  return (
    <div>
      {showInput && (
        <div>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            data-testid="search-artist-input"
            id="search"
            value={ value }
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ !validName }
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </div>
      )}
      {loading && <Carregando />}
      {showResult && (
        <div>
          <p>
            {`Resultado de álbuns de: ${artistName}`}
          </p>
          {albums.length === 0 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            albums.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default Search;
