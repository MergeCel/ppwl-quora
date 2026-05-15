// lib/spotify-data.ts
export interface MusicItem {
  id: string;
  title?: string;
  name?: string;
  artist?: string;
  description?: string;
  cover?: string;
  image?: string;
  type?: string;
  gradient?: string;
  label?: string;
}

import chartGlobal1 from "../assets/region_global_default.webp";
import chartGlobal2 from "../assets/region_global_default2.webp";
import chartGlobal3 from "../assets/region_global_default3.webp";
import chartIndo1 from "../assets/region_id_default.webp";
import chartIndo2 from "../assets/region_id_default2.webp";
import chartIndo3 from "../assets/region_id_default3.webp";

import nikiBuzz from "../assets/niki-buzz.jpg";
import nikiEverySummertime from "../assets/niki-everysummertime.jpg";
import nikiLowkey from "../assets/niki-lowkey.jpg";
import nikiAcoustic from "../assets/niki-accoustic.jpg";
import nikiNicole from "../assets/niki-nicole.jpg";

export const featuredCharts: MusicItem[] = [
  { 
    id: "1", 
    title: "Top Songs Global", 
    description: "Your weekly update of the most played tracks right now", 
    cover: chartGlobal1,
    gradient: "from-blue-800 to-blue-950" 
  },
  { 
    id: "2", 
    title: "Top Songs Indonesia", 
    description: "Your weekly update of the most played tracks right now", 
    cover: chartIndo1,
    gradient: "from-green-800 to-green-950"
  },
  { 
    id: "3", 
    title: "Top 50 Global", 
    description: "Your daily update of the most played tracks right now", 
    cover: chartGlobal2, 
    gradient: "from-sky-700 to-sky-950"
  },
  { 
    id: "4", 
    title: "Top 50 Indonesia", 
    description: "Your daily update of the most played tracks right now", 
    cover: chartIndo2, 
    gradient: "from-red-800 to-red-950"
  },
  { 
    id: "5", 
    title: "Viral 50 Global", 
    description: "Your daily update of the most played tracks right now", 
    cover: chartGlobal3, 
    gradient: "from-emerald-700 to-emerald-950"
  },
  { 
    id: "6", 
    title: "Viral 50 Indonesia", 
    description: "Your daily update of the most played tracks right now", 
    cover: chartIndo3, 
    gradient: "from-red-700 to-red-950"
  },
];

export const trendingSongs: MusicItem[] = [
  { id: "1", title: "Kicau Mania", artist: "Bangsay", cover: "https://picsum.photos/seed/km1/300/300" },
  { id: "2", title: "Black Hole", artist: "DJ Teloor", cover: "https://picsum.photos/seed/bh2/300/300" },
  { id: "3", title: "Berapa Kali Kita Akan Saling...", artist: "Pamungkas", cover: "https://picsum.photos/seed/bk3/300/300" },
  { id: "4", title: "Kicau Mania", artist: "Ndarboy Genk, Banditoz", cover: "https://picsum.photos/seed/km4/300/300" },
  { id: "5", title: "Sesi Malam", artist: "Hindia", cover: "https://picsum.photos/seed/sm5/300/300" },
  { id: "6", title: "Back At One", artist: "Brian McKnight", cover: "https://picsum.photos/seed/bo6/300/300" },
  { id: "7", title: "Terpukau", artist: "Astrid", cover: "https://picsum.photos/seed/tp7/300/300" },
  { id: "8", title: "Nafas", artist: "Dipha Barus, Hindia", cover: "https://picsum.photos/seed/nf8/300/300" },
  { id: "9", title: "Ini Abadi", artist: "Perunggu", cover: "https://picsum.photos/seed/ia9/300/300" },
  { id: "10", title: "Body Pata Pata", artist: "Maman Fandi", cover: "https://picsum.photos/seed/bp10/300/300"},
];

export const popularArtists: MusicItem[] = [
  { id: "1", name: "Fourtwnty", image: "https://picsum.photos/seed/a1/300/300", type: "Artist" },
  { id: "2", name: "Raim Laode", image: "https://picsum.photos/seed/a2/300/300", type: "Artist" },
  { id: "3", name: "Hindia", image: "https://picsum.photos/seed/a3/300/300", type: "Artist" },
  { id: "4", name: "For Revenge", image: "https://picsum.photos/seed/a4/300/300", type: "Artist" },
  { id: "5", name: "NIKI", image: "https://picsum.photos/seed/a5/300/300", type: "Artist" },
  { id: "6", name: "Sheila On 7", image: "https://picsum.photos/seed/a6/300/300", type: "Artist" },
  { id: "7", name: "Jwael", image: "https://picsum.photos/seed/a7/300/300", type: "Artist" },
  { id: "8", name: "Balas Sanja", image: "https://picsum.photos/seed/a8/300/300", type: "Artist" },
  { id: "9", name: "Nadin Amizah", image: "https://picsum.photos/seed/a9/300/300", type: "Artist" },
  { id: "10", name: "Tulus", image: "https://picsum.photos/seed/a10/300/300", type: "Artist" },
];

export const popularAlbums: MusicItem[] = [
  { id: "1", title: "Manari Dengan Bayangan", artist: "Hindia", cover: "https://picsum.photos/seed/al1/300/300" },
  { id: "2", title: "Membangun & Menghancurkan", artist: "Jwael", cover: "https://picsum.photos/seed/al2/300/300" },
  { id: "3", title: "You'll Be In My Heart", artist: "NIKI", cover: "https://picsum.photos/seed/al3/300/300" },
  { id: "4", title: "Nalar", artist: "Fourtwnty", cover: "https://picsum.photos/seed/al4/300/300" },
  { id: "5", title: "Kisah Klasik Untuk Masa Depan", artist: "Sheila On 7", cover: "https://picsum.photos/seed/al5/300/300" },
  { id: "6", title: "Nilude", artist: "Mghalbe", cover: "https://picsum.photos/seed/al6/300/300" },
  { id: "7", title: "Potongan Patah Hati - Babak 1", artist: "For Revenge", cover: "https://picsum.photos/seed/al7/300/300" },
  { id: "8", title: "Lenang Pipi", artist: "Raim Laode", cover: "https://picsum.photos/seed/al8/300/300" },
  { id: "9", title: "Siarnya, Hidup Harus Tetap Berjalan", artist: "Bitta Bibit", cover: "https://picsum.photos/seed/al9/300/300" },
  { id: "10", title: "HITMEHARD AND SOFT", artist: "Billie Eilish", cover: "https://picsum.photos/seed/al10/300/300" },
];

export const popularRadio: MusicItem[] = [
  { id: "1", name: "Sheila On 7", description: "With Tulus, Piyu, Bernadya and more", image: "https://picsum.photos/seed/r1/300/300", gradient: "from-orange-600 to-orange-900", label: "RADIO" },
  { id: "2", name: "Fourtwnty", description: "With Payung Teduh, Nadin Amizah, Bernadya and more", image: "https://picsum.photos/seed/r2/300/300", gradient: "from-green-700 to-green-900", label: "RADIO" },
  { id: "3", name: "Bruno Mars", description: "With Ed Sheeran, Katy Perry, Adele and more", image: "https://picsum.photos/seed/r3/300/300", gradient: "from-teal-600 to-teal-900", label: "RADIO" },
  { id: "4", name: "Bernadya", description: "With Sal Priadi, Nadin Amizah, Juicy Luicy and more", image: "https://picsum.photos/seed/r4/300/300", gradient: "from-purple-700 to-purple-900", label: "RADIO" },
  { id: "5", name: "NIKI", description: "With LAWY, JBiang, Arash Buana and more", image: "https://picsum.photos/seed/r5/300/300", gradient: "from-blue-700 to-blue-900", label: "RADIO" },
  { id: "6", name: "Hindia", description: "With Fajar, Nadin Amizah, Sal Priadi and more", image: "https://picsum.photos/seed/r6/300/300", gradient: "from-rose-700 to-rose-900", label: "RADIO" },
  { id: "7", name: "Juicy Luicy", description: "With Tulus, Piyu, Bernadya and more", image: "https://picsum.photos/seed/r7/300/300", gradient: "from-pink-700 to-pink-900", label: "RADIO" },
  { id: "8", name: "NDX A.K.A.", description: "With Guyon Waton, Aftershine, Larone and more", image: "https://picsum.photos/seed/r8/300/300", gradient: "from-yellow-700 to-yellow-900", label: "RADIO" },
];

export const moreByNikiData = [
  { id: 1, title: "Nicole", year: "2022", img: nikiNicole },
  { id: 2, title: "lowkey", year: "2019", img: nikiLowkey },
  { id: 3, title: "Buzz", year: "2024", img: nikiBuzz },
  { id: 4, title: "NIKI Acoustic Sessions", year: "2018", img: nikiAcoustic },
  { id: 5, title: "Every Summertime", year: "2021", img: nikiEverySummertime }
];