import React, { useState} from 'react';
import ChartComponent from './ChartComponent';
import axios from 'axios';
import './App.css';

function App() {

  const indicatorDescriptions = {
    ATR: "Measures market volatility. Represents the average distance between highs and lows over a given period.",
    MACD: "A trend-following momentum indicator showing the relationship between two moving averages of an asset’s price.",
    MACD_signal: "A signal line for the MACD, used with the MACD to identify bullish or bearish crossovers.",
    PE: "A valuation ratio indicating if a stock is over or undervalued. Calculated by dividing the current share price by its earnings.",
    RSI: "Measures the speed and change of price movements, indicating overbought or oversold conditions.",
    STOCH: "Compares a closing price to its price range over a period, used for buy/sell signals.",
    boll_lower: "Lower boundary of the Bollinger Bands, usually two standard deviations below the 20-day moving average.",
    boll_upper: "Upper boundary of the Bollinger Bands, usually two standard deviations above the 20-day moving average.",
    close_price: "The last price at which a security trades during a regular session.",
    debtToEquity: "Represents the proportion of a company's equity and debt used to finance its assets.",
    returnOnEquity: "Measures a company's profitability by its profit relative to shareholders' equity.",
    sma_200: "An average of closing prices over the last 200 days, used for the overall trend.",
    sma_50: "An average of closing prices over the last 50 days, often used to confirm trend direction."
  };

  const [ticker, setTicker] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [tableData, setTableData] = useState([]);
  const [chartViewData, setChartViewData] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Make the API call
    setTableData([]);
    setParagraph("");
    setChartViewData(null);
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/stockInfo', {
        ticker: ticker
      });

      // Format the bot's response before setting it in the state

      console.log(response.data)
      
      setTableData(response.data.tableData);
      setParagraph(response.data.summary);
      setChartViewData(response.data.graphData);
      setUrls(response.data.urls);
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="ticker-title">{ticker || "Enter a Ticker"}</h1>
      <div>
        <input 
          value={ticker} 
          onChange={(e) => setTicker(e.target.value)} 
          placeholder="Enter stock ticker..." 
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) :
      (
      <div className="content">
        <div className="left">
          <div className="content-border paragraph-section">
            <p>{paragraph}</p>
          </div>
          <div className="content-border urls-section">
            <h2>Helpful URLs</h2>
            <ol>
              {urls.map((url, index) => (
                <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="right">
          <div className="table content-border">
          <table>
            <tbody>
              {Object.entries(tableData).map((row, idx) => (
                <tr key={idx}>
                  <td key="key">
                    {row[0]} 
                    <span className="info-icon">
                      i
                      <span className="tooltip">{indicatorDescriptions[row[0]]}</span>
                    </span>
                  </td>
                  <td key="value">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
          <div className="graph content-border">
          {chartViewData && 
        <ChartComponent 
            closePrices={chartViewData.close_prices}
            SMA_50={chartViewData.sma_50}
            SMA_200={chartViewData.sma_200}
            bollUpper={chartViewData.boll_upper}
            bollLower={chartViewData.boll_lower}
        />}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
