import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Carregando from '../Carregando/carregando';
import MusicCard from '../MusicCard/musicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { MusicType } from '../../types';

function Album() {
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState<any>(null);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);

  const { id } = useParams<string>();

  let keyCounter = 0;

  useEffect(() => {
    const requestAlbum = async () => {
      setLoading(true);
      try {
        if (id !== undefined) {
          const data = await getMusics(id);
          setAlbumData(data);
          console.log(data);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    requestAlbum();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const favoriteSongsData = await getFavoriteSongs();
        const favoriteTracksIds = favoriteSongsData
          .map((song: MusicType) => song.trackId);
        setFavoriteSongs(favoriteTracksIds);
      } catch (error) {
        console.error('Error ao obter as músicas favoritas', error);
      }
    };

    fetchFavoriteSongs();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Carregando />
      ) : (
        albumData && (
          <div>
            <h1 data-testid="artist-name">{albumData[0]?.artistName}</h1>
            <h3 data-testid="album-name">{albumData[0]?.collectionName}</h3>
            <ul>
              {albumData.map((music: MusicType) => (
                <MusicCard
                  key={ keyCounter++ }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  artistName={ music.artistName }
                  checked={ favoriteSongs.includes(music.trackId) }
                />
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default Album;
