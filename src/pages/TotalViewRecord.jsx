import React, { useState } from "react";

import { useAuthContext } from "../context/AuthContext";
import { getWatchVideoRecord } from '../api/firebase';
import { formatAgo } from "../util/date";

export default function TotalViewRecord() {
  // const {user} = useAuthContext();
  const [records, setRecords] = useState();
  getWatchVideoRecord()
    .then(setRecords);

  return (
    <>
      <p>시청 기록</p>
      {records && (
        <ul>
          {
            records.map(record => (
              <li key={record.id}>
                {record.userId}, {record.videoId}, {record.watchAt},
                {formatAgo(record.watchAt, 'ko')}
              </li>
            ))
          }
        </ul>
      ) }
    </>
  )
}