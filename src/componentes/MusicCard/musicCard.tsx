import { useState } from 'react';
import { MusicType } from '../../types/types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
// import { addSong, removeSong } from '../../services/favoriteSongsAPI';
// import './checkboxStyles.css';

function MusicCard({ trackName, previewUrl, trackId }: MusicType) {
  const [checked, setChecked] = useState(false);
  const heartImagePath = '/src/images/checked_heart.png';
  const emptyHeartImagePath = '/src/images/empty_heart.png';

  function handlerChange() {
    setChecked(!checked);
  }

  if (!previewUrl) {
    return null;
  }
  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <img src={ checked ? heartImagePath : emptyHeartImagePath } alt="favorite" />
        <input
          id={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ checked }
          onChange={ handlerChange }
        />
      </label>
    </div>
  );
}

export default MusicCard;
