import React from "react";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard";

import { useVideo } from '../api/youtube';

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, videos } = useVideo(keyword);

  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
        <Grid container spacing={1}>
          {videos.map(video => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <VideoCard video={video} key={video.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}