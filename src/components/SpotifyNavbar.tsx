import { useState } from 'react'

const SpotifyNavbar = () => {
  const [search, setSearch] = useState('')

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black w-full">
      <div className="flex items-center gap-4 flex-1">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="Spotify"
          className="h-8 w-auto"
        />
        <button className="bg-[#1f1f1f] p-3 rounded-full text-white hover:scale-105 transition">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"/>
          </svg>
        </button>
        <div className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-2 gap-2 w-[360px] hover:bg-[#2a2a2a] transition">
          <svg className="w-5 h-5 fill-white opacity-70 shrink-0" viewBox="0 0 24 24">
            <path d="M10.533 1.279c-5.18 0-9.407 4.274-9.407 9.521s4.226 9.521 9.407 9.521c2.234 0 4.29-.79 5.907-2.104l2.846 2.894a1 1 0 1 0 1.428-1.404l-2.844-2.894a9.571 9.571 0 0 0 2.07-5.013 1 1 0 1 0-1.991-.123 7.569 7.569 0 0 1-7.416 6.124c-4.148 0-7.407-3.279-7.407-7.521s3.259-7.521 7.407-7.521c2.138 0 4.067.895 5.46 2.346a1 1 0 0 0 1.442-1.386A9.468 9.468 0 0 0 10.533 1.28z"/>
          </svg>
          <input
            type="text"
            placeholder="Ngapain dengar lagu disini, make spotify asli woi"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-6 text-white text-sm font-semibold">
        <a href="#" className="hover:text-white text-gray-300 transition">Premium</a>
        <a href="#" className="hover:text-white text-gray-300 transition">Support</a>
        <a href="#" className="hover:text-white text-gray-300 transition">Download</a>
        <div className="w-px h-5 bg-gray-600"/>
        <button className="hover:text-white text-gray-300 transition">Sign up</button>
        <button className="bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition font-bold">
          Log in
        </button>
      </div>
    </nav>
  )
}

export default SpotifyNavbar