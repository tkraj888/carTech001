
// import {  useEffect } from 'react';
import Card from './Card';
import { useWebSocket } from '../../Utiles/WebSocketConnection';

const LiveBid = () => {
  const { liveCars} = useWebSocket() || {} ;
  // useEffect(() => {
  //   getLiveCars();
  // }, []);
  
  return (
    <div className="mx-4 mb-10 sm:mx-12">
      <h1 className="text-2xl font-bold text-center mt-5 mb-4 sm:text-3xl">Bidding Car Live</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liveCars && liveCars?.map((cardData, i) => (
          <Card key={i} cardData={cardData} handleHighestBidAmount="" />
        ))}
      </div>
    </div>
  );
};

export default LiveBid;
