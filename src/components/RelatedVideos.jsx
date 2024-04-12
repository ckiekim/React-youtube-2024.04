import React from "react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function RelatedVideos({ id, name }) {
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${id}`;
  const {isLoading, error, data: videos} = useQuery({
    queryKey: ['relatedVideos', id],
    queryFn: async () => {
      return axios
              .get('/data/searchChannel.json')
              // .get(uri)
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,       // 1분
  });
  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
        <>
          <h4>이 채널의 다른 영상들</h4>
          <ul>
            {videos.map(video => (<p>{video.snippet.title}</p>))}
          </ul>
        </>
      )}
    </>
  )
}