import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ wallpaper }) => {
  if (!wallpaper || !wallpaper.id) return null;

  const detailsPath =
    wallpaper.media_type === "tv"
      ? `/tv-shows/details/${wallpaper.id}`
      : `/movies/details/${wallpaper.id}`;
  console.log('wallpaper from Header:',wallpaper);
  return (
    <div className="w-full h-[60vh] relative overflow-hidden bg-zinc-900 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/original${wallpaper.backdrop_path}`}
        alt={wallpaper.title || wallpaper.name}
        className="w-full h-full object-cover object-top select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      <div className="absolute bottom-6 left-6 md:left-12 text-white max-w-[70%] md:max-w-[50%] space-y-3">
        <h1 className="text-2xl md:text-4xl font-black tracking-wide drop-shadow-lg">
          {wallpaper.title || wallpaper.name}
        </h1>
        <p className="text-xs md:text-sm leading-6 opacity-90">
          {wallpaper.overview?.split(" ").slice(0, 20).join(" ")}
          <Link to={detailsPath} className="text-blue-300 hover:text-blue-400 font-semibold hover:underline">
          ...more
          </Link>
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm opacity-85">
          <span className="flex items-center gap-1 font-semibold select-none">
            <i className="ri-megaphone-fill text-md text-yellow-400"></i>
            {wallpaper.release_date || wallpaper.first_air_date
              ? new Date(wallpaper.release_date || wallpaper.first_air_date)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(",", "")
              : "Unknown"}
          </span>
          <span className="flex items-center gap-1 font-semibold text-center uppercase select-none">
            {wallpaper.media_type === "tv" ? (
              <i className="ri-tv-fill text-lg text-blue-400"></i>
            ) : (
              <i className="ri-album-fill text-lg text-red-400"></i>
            )}
            {wallpaper.media_type}
          </span>
        </div>

        <Link
          className="mt-4 px-4 py-3 w-fit flex items-center gap-2 bg-[#6556CD] hover:bg-[#5747C7] 
             text-white font-bold text-sm rounded-md transition-all duration-300 
             focus:outline-none focus:ring-2 focus:ring-[#5747C7] group"
             to={ `/${wallpaper.media_type === "tv" ? "tv-shows" : "movies"}/details/${wallpaper.id}/trailer` }

        >
          <i className="ri-play-circle-fill text-black text-xl transition-all duration-300 
                ease-in-out group-hover:text-white"></i> 
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
