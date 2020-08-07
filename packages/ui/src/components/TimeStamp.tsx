import React from 'react';
import moment from 'moment';

const Timestamp = (props: { timestamp: number }) => {
  // Genesis has 0 timestamp which would print 50 years ago.
  const d = moment(props.timestamp);

  return props.timestamp ? (
    <span title={d.toISOString()}>{d.fromNow()}</span>
  ) : null;
};
export default Timestamp;
