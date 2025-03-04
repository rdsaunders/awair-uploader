import React, { useEffect, useState } from 'react';
import Scheduler, { Statuses } from '../scheduler';
import MyTimeAgo from 'react-timeago';

const Status = () => {
  const [data, setData] = useState<Statuses>();

  const printData = (info: Statuses) => {
    setData(info);
  };

  const renderStatuses = () => {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      result.push({ name: key, receivedAt: value.receivedAt, calledAt: value.calledAt });
    }
    return (
      <tbody>
        {
          result.map((element, index) => (
            <tr key={index}>
              {element.calledAt !== '' && element.receivedAt !== '' &&
                
                  <><td>{element.name}</td><td><MyTimeAgo date={new Date(element.calledAt)} /></td><td><MyTimeAgo date={new Date(element.receivedAt)} /></td></>
                
              }
            </tr>
          ))
        }
      </tbody>
    );
  };

  useEffect(() => {
    Scheduler.getInstance().addStatusSubscriber(printData);
  }, []);

  return (
    <>
      <div className="card">
        <h2 className="cardTitle">Sensor status</h2>
        <div className="cardBody">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last call</th>
                <th>Last data</th>
              </tr>
            </thead>
            {data && renderStatuses()}
          </table>
        </div>
      </div>
    </>
  );
};

export default Status;
