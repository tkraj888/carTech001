/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// WebSocketConnection.jsx

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [topThreeBidsAmount, setTopThreeBidsAmount] = useState([]);
  const [topThreeBidsAmountArray, setTopThreeBidsAmountArray] = useState([]);
  const [liveCars, setLiveCars] = useState([]);
  const subscriptions = useRef({});

  useEffect(() => {
    const socket = new SockJS('https://cffffftasting-production.up.railway.app/Aucbidding');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
      },
      onConnect: () => {
        setIsConnected(true);
        setClient(stompClient);
        
        if (!subscriptions.current['/topic/bids']) {
          subscriptions.current['/topic/bids'] = stompClient.subscribe('/topic/bids', (message) => {
            const bid = JSON.parse(message.body);
            // Handle bid message
          });
        }

        if (!subscriptions.current['/topic/topThreeBids']) {
          subscriptions.current['/topic/topThreeBids'] = stompClient.subscribe('/topic/topThreeBids', (message) => {
            const topBids = JSON.parse(message.body);
            setTopThreeBidsAmount(topBids);
          });
        }

        if (!subscriptions.current['/topic/liveCars']) {
          subscriptions.current['/topic/liveCars'] = stompClient.subscribe('/topic/liveCars', (message) => {
            const cars = JSON.parse(message.body);
            setLiveCars((prevCars) => [...cars]);
          });
        }
        stompClient.publish({destination :`/topic/topBids`}, {}, {});

        stompClient.publish({ destination: '/app/liveCars' });
      },
      onStompError: (frame) => {
        // console.error('Broker reported error: ' + frame.headers['message']);
        // console.error('Additional details: ' + frame.body);
      },
      onDisconnect: () => {
        // console.log('Disconnected');
        setIsConnected(false);
      }
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const getLiveCars = () => {
    if (client) {
      client.publish({
        destination: '/app/liveCars'
      });
    } else {
      // console.log('Stomp client is not initialized.');
    }
  }

  const getTopThreeBids = (bidCarId) => {
    if (client) {
      const bidRequest = {
        bidCarId: bidCarId,
      };

      client.publish({
        destination: '/app/topThreeBids',
        body: JSON.stringify(bidRequest),
      });

      // if (!subscriptions.current[`/topic/topThreeBids_${bidCarId}`]) {
        subscriptions.current[`/topic/topThreeBids_${bidCarId}`] = client.subscribe(`/topic/topThreeBids`, (message) => {
          const topBids = JSON.parse(message.body);
          // const exists = biddingData.some(item => bidCarId === item.bidCarId);
          // if (!exists) {
          //   biddingData.push(...topBids);
          // }
          setTopThreeBidsAmount(topBids);
          // setTopThreeBidsAmountArray(biddingData);
        }, { ack: 'client' });
      // }
    } else {
      // console.log('Stomp client is not initialized.');
    }
  };

  const refreshTopThreeBids = (bidCarId) => {

    return new Promise((resolve, reject) => {
    if (bidCarId && client) {
      client.publish({destination :`/topic/topBids`}, {}, {});

        subscriptions.current[`/topic/topBids_${bidCarId}`] = client.subscribe(`/topBids/${bidCarId}`, (message) => {
          const topBid = JSON.parse(message.body);
          setTopThreeBidsAmountArray(topBid);
          resolve(topBid);
        });
    }
    })
  };

  const placeBid = (userData) => {
    const bid = {
      placedBidId: null,
      userId: userData.userId,
      bidCarId: userData.bidCarId,
      dateTime: new Date().toISOString(),
      amount: userData.amount,
    };

    return new Promise((resolve, reject) => {
      if (client) {
        client.publish({
          destination: '/app/placeBid',
          body: JSON.stringify(bid),
        });

          subscriptions.current["/topic/bids"] = client.subscribe("/topic/bids", (message) => {
            var response = JSON.parse(message.body);
            if(response?.status){
              // console.log("bidcheck", response?.status);
              resolve(response);
            }
          });
      } else {
        // console.error('Stomp client is not initialized.');
        reject('Stomp client is not initialized.');
      }
    });
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, placeBid, getTopThreeBids, topThreeBidsAmount, topThreeBidsAmountArray, getLiveCars, liveCars, refreshTopThreeBids,client ,subscriptions }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketConnection = () => {
  return (
   <>
   </>
  );
};

export default WebSocketConnection;
