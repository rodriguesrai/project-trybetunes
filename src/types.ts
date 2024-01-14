export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type MusicType = {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
};

export type Album = {
  collectionId: number;
  collectionName: string;
};
