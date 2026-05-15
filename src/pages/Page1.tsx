import SectionRow from "../components/SectionRow";
import {
  trendingSongs,
  popularArtists,
  popularAlbums,
  popularRadio,
  featuredCharts,
} from "../lib/spotify-data";

export default function Page1() {
  return (
    <>
      <SectionRow title="Trending songs" items={trendingSongs} />
      <SectionRow title="Popular artists" items={popularArtists} isArtist />
      <SectionRow title="Popular albums and singles" items={popularAlbums} />
      <SectionRow title="Popular radio" items={popularRadio} isRadio />
      <SectionRow title="Featured Charts" items={featuredCharts} isChart />
    </>
  );
}