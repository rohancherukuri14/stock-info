import yfinance as yf
import pandas_ta as ta
import pandas as pd
from datetime import datetime

def getImportantInfo(ticker):
    ticker = ticker.upper()
    today = datetime.today().strftime('%Y-%m-%d')

    data = yf.download(ticker, start="2020-01-01", end=today)

    info = yf.Ticker(ticker).info

    name = info.get("longName")

    data['RSI'] = ta.rsi(data['Close'])
    data['SMA_50'] = ta.sma(data['Close'], length=50)
    data['SMA_200'] = ta.sma(data['Close'], length=200)

    macd = ta.macd(data['Close'])
    data['MACD'] = macd['MACD_12_26_9']
    data['MACD_signal'] = macd['MACDs_12_26_9']


    data['OBV'] = ta.obv(data['Close'], data['Volume'])


    data['STOCH'] = ta.stoch(data['High'], data['Low'], data['Close'])['STOCHk_14_3_3']


    data['ATR'] = ta.atr(data['High'], data['Low'], data['Close'])


    bbands = ta.bbands(data['Close'])
    bbands.dropna(inplace=True)

    data["BOLL_UPPER"] = bbands['BBU_5_2.0']
    data['BOLL_LOWER'] = bbands['BBL_5_2.0']

    data.dropna(inplace=True)

    processed_graph_data = {
        "close_prices": data['Close'].tolist(),
        "sma_50": data['SMA_50'].tolist(),
        "sma_200": data['SMA_200'].tolist(),
        "boll_upper": data['BOLL_UPPER'].tolist(),
        "boll_lower": data['BOLL_LOWER'].tolist()
    }

    processed_table_data = {
        "RSI": data['RSI'].iloc[-1],
        "MACD": data['MACD'].iloc[-1],
        "MACD_signal": data['MACD_signal'].iloc[-1],
        "STOCH": data['STOCH'].iloc[-1],
        "ATR": data['ATR'].iloc[-1],
        "PE": info['trailingPE'],
        "debtToEquity": info['debtToEquity'],
        "returnOnEquity": info['returnOnEquity'],
        "sma_50": data['SMA_50'].iloc[-1],
        "sma_200": data['SMA_200'].iloc[-1],
        "boll_lower": data['BOLL_LOWER'].iloc[-1],
        "boll_upper": data['BOLL_UPPER'].iloc[-1],
        "close_price": data['Close'].iloc[-1]
    }
    return processed_graph_data, processed_table_data, name

getImportantInfo("TM")