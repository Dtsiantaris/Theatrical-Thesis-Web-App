import { useEffect, useState } from "react";

interface WatchlistHook {
  inWatchlist: boolean;
  setInWatchlist: (value: boolean) => void;
}

export default function useWatchlist(id: string): WatchlistHook {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("watchlist") === null) {
      localStorage.setItem("watchlist", JSON.stringify([]));
    } else {
      const watchlist = JSON.parse(localStorage.watchlist);
      if (watchlist.includes(id)) {
        setInWatchlist(true);
      } else {
        setInWatchlist(false);
      }
    }
  }, [id]);

  useEffect(() => {
    let watchlist = JSON.parse(localStorage.watchlist);
    if (inWatchlist) {
      watchlist.push(id);
    } else {
      watchlist = watchlist.filter((item: string) => item !== id);
    }
    localStorage.watchlist = JSON.stringify(watchlist);
  }, [inWatchlist, id]);

  return { inWatchlist, setInWatchlist };
}
