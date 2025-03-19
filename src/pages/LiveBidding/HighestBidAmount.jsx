/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useWebSocket } from '../../Utiles/WebSocketConnection';

// eslint-disable-next-line react/prop-types
const HighestBidAmount = ({bidId}) => {
  // console.log("BidId----",bidId)
 const { isConnected, getTopThreeBids,topThreeBidsAmount } = useWebSocket();
useEffect(() => {
  if (isConnected && bidId) {
    const bidCarId = bidId; // replace with the actual value
    getTopThreeBids(bidCarId);
  }
}, [isConnected,bidId]);

    return(
        <>
            {topThreeBidsAmount[0]?.amount || "-"}
        </>
    )
}

export default HighestBidAmount;