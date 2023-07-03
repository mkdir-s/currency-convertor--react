import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [quotes, setQuotes] = React.useState({});

  React.useEffect(() => {
    fetch('http://api.currencylayer.com/live?access_key=dad4b012fe28c4a73b69b9be7771cb1e&format=1')
    .then(res => res.json())
    .then(json => {
      setQuotes(json.quotes);
    })
    .catch(err => {
      console.warn(err);
      alert('Не удалось получить данные');
    });
  })

  const onChangeFromPrice = (value) => {
    const price = value / quotes[fromCurrency];
    const result = price * quotes[toCurrency];
    setFromPrice(value);
    setToPrice(result);
  }
  const onChangeToPrice = (value) => {
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
