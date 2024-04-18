import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import WatchRecord from "../components/WatchRecord";
import { getWatchVideoRecordByUser } from '../api/firebase';

export default function TotalViewRecord() {
  const [totalRecords, setTotalRecords] = useState();
  getWatchVideoRecordByUser()
    .then(setTotalRecords);  

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>시청기록</Typography>
      {totalRecords && (
        Object.keys(totalRecords).map(user => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id={user}
            >
              <Typography variant="h6">{user}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {totalRecords[user].map(record => (
                  <Grid item xs={12} md={6} xl={4}>
                    <WatchRecord record={record} key={record.id} />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  )
}