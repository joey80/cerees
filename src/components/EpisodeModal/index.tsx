import { IGetEpisode } from '@/pages/api/omdb/getEpisode/types';

function EpisodeModal({ Plot, Released, Title }: IGetEpisode) {
  return (
    <div className="absolute bg-white overflow-hidden border border-zinc-800 border-dashed top-0 mt-14 p-3 w-80 h-56 z-10 text-sm rounded-xl drop-shadow-xl">
      <ul>
        <li className="text-lg font-medium">{Title}</li>
        <li className="pb-2 border-b">Released: {Released}</li>
        <li className="pt-2">{Plot}</li>
      </ul>
    </div>
  );
}

export { EpisodeModal };
