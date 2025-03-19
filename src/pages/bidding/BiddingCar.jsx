/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";
import { Button, Input } from '@material-tailwind/react';

const BiddingCar = () => {
  const [bids, setBids] = useState([]);
  const [topThreeBids, setTopThreeBids] = useState([]);
  const [bidAmount, setBidAmount] = useState(200000);
  const [bidCarId, setBidCarId] = useState(1);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // New state variable

  useEffect(() => {
    const socket = new SockJS('https://cffffftasting-production.up.railway.app/Aucbidding');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        // console.log(str);
      },
      onConnect: () => {
        // console.log('Connected');
        setIsConnected(true); // Update connection status
        stompClient.subscribe('/topic/bids', (message) => {
          const bid = JSON.parse(message.body);
          setBids((prevBids) => [...prevBids, bid]);
        });
        stompClient.subscribe('/topic/topThreeBids', (message) => {
          const topBids = JSON.parse(message.body);
          setTopThreeBids(topBids);
        });
        getTopThreeBids(stompClient); // Fetch top three bids when connected
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const placeBid = () => {
    const bid = {
      placedBidId: null,
      userId: 1601,
      bidCarId: bidCarId,
      dateTime: new Date().toISOString(),
      amount: bidAmount,
    };

    if (client) {
      client.publish({
        destination: '/app/placeBid',
        body: JSON.stringify(bid),
      }, (error, response) => {
        if (error) {
          console.error('Error placing bid:', error);
        } else {
          // console.log('Bid placed successfully:', response);
          getTopThreeBids(client);
        }
      });
    } else {
      console.error('Stomp client is not initialized.');
    }
  };

  const getTopThreeBids = (stompClient) => {
    const bidRequest = {
      bidCarId: 13,
    };
    if (stompClient) {
      stompClient.publish({
        destination: '/app/topThreeBids',
        body: JSON.stringify(bidRequest),
      });
    } else {
      console.error('Stomp client is not initialized.');
    }
  };

  // console.log("topThreeBids", topThreeBids);

  return (
    <div className='p-5'>
      <h1>Auction Bidding System</h1>
      <div>
        <Input
          type="number"
          placeholder="Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
        />
        <Input 
          type="number"
          placeholder="Car ID"
          value={bidCarId}
          onChange={(e) => setBidCarId(Number(e.target.value))}
        />
        <Button onClick={placeBid}>Place Bid</Button>
        <Button onClick={() => getTopThreeBids(client)}>Get Top Three Bids</Button>
      </div>
      <h2>All Bids</h2>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>{`User ${bid.userId} bid ${bid.amount} on car ${bid.bidCarId}`}</li>
        ))}
      </ul>
      <h2>Top Three Bids</h2>
      <ul>
        {topThreeBids.map((bid, index) => (
          <li key={index}>{`User ${bid.userId} bid ${bid.amount} on car ${bid.bidCarId}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default BiddingCar;
