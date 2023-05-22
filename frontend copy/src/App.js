import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';


function App() {
  const [data, setData] = useState();
  const [acceptLanguage, setAcceptLanguage] = useState('ru-RU');

  const getData = () => {
    fetch('http://localhost:8080', {
      headers: {
        'Accept-Language': acceptLanguage,
      }
    })
    .then(response=> response.json())
    .then(data => setData(data));
  }

  useEffect(() => {
    getData();
  }, []);

  const onClick = () => {
    getData();
  }
  
  return (
    <div className="App">
      <h1>{data}</h1>
      <button onClick={onClick}>Load data</button>
      <button onClick={() => {
        if (acceptLanguage === 'ru-RU') {
          setAcceptLanguage('us-US')
        }
        if (acceptLanguage === 'us-US') {
          setAcceptLanguage('ru-RU')
        }
      }}>{acceptLanguage}</button>
    </div>
  );
}

export default App;
