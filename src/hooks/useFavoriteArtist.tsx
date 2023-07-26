import { useEffect, useState } from "react";

interface FavoriteArtistHook {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
}

export default function useFavoriteArtist(id: string): FavoriteArtistHook {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("favoriteArtists") === null) {
      localStorage.setItem("favoriteArtists", JSON.stringify([]));
    } else {
      const favoriteArtists = JSON.parse(localStorage.favoriteArtists);
      if (favoriteArtists.includes(id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [id]);

  useEffect(() => {
    let favoriteArtists = JSON.parse(localStorage.favoriteArtists);
    if (isFavorite) {
      favoriteArtists.push(id);
    } else {
      favoriteArtists = favoriteArtists.filter((item: string) => item !== id);
    }
    localStorage.favoriteArtists = JSON.stringify(favoriteArtists);
  }, [isFavorite, id]);

  return { isFavorite, setIsFavorite };
}
