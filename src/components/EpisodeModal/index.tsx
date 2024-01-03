import { IGetEpisode } from '@/pages/api/omdb/getEpisode/types';

/**
 * The modal that displays information about a single episode
 */
function EpisodeModal({ Plot, Released, Title }: IGetEpisode) {
  return (
    <div className="absolute bg-white overflow-hidden border custom-border-color border-dashed top-0 mt-14 p-3 w-80 h-56 text-sm rounded-xl drop-shadow-xl z-10">
      <ul>
        <li className="text-lg font-medium">{Title}</li>
        <li className="pb-2 border-b">Released: {Released}</li>
        <li className="pt-2">{Plot}</li>
      </ul>
    </div>
  );
}

export { EpisodeModal };
