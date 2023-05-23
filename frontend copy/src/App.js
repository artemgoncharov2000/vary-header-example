import logo from './logo.svg';
import {useCallback, useEffect, useState} from 'react';
import './App.css';


function App() {
  const [data, setData] = useState();
  const [headers, setHeaders] = useState({
    'Accept-Language': 'ru-RU',
    'X-Current-UID': 1234567890
  });

  const getData = useCallback(() => {
    fetch('http://localhost:8080', {
      headers,
    })
    .then(response=> response.json())
    .then(data => setData(data));
  }, [headers]);

  const onHeadersChange = (value, headerName) => {
    setHeaders((prevHeaders) => {
      return {
        ...prevHeaders,
        [headerName]: value,
      };
    });
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      <h1>{data}</h1>
      <button onClick={() => {
        getData();
      }}>Load data</button>
      <div>
        <ul>
          <li>
            <span>Accept-Language</span>
            <input onChange={(event => onHeadersChange(event.target.value, 'Accept-Language'))}  />
          </li>
          <li>
            <span>X-Current-UID</span>
            <input onChange={(event => onHeadersChange(event.target.value, 'X-Current-UID'))} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
