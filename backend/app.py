from flask import Flask, request, jsonify
import openai
import json
from flask_cors import CORS
import stockInfo
from metaphor_python import Metaphor
import json

app = Flask(__name__)
CORS(app, origins='http://localhost:3000', allow_headers=["Content-Type"])

def get_config_key():
    with open('../config.json') as f:
        config_data = json.load(f)
    return config_data["gpt_api_key"]

def get_metaphor_key():
    with open('../config.json') as f:
        config_data = json.load(f)
    return config_data["metaphor_api_key"]

openai.api_key = get_config_key()

metaphor_key = get_metaphor_key()

metaphor = Metaphor(metaphor_key)

def add_cors_headers(response):
    # Allow requests from the specific origin (your React app's origin)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    # Allow the Content-Type header for the preflight request
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/stockInfo', methods=['POST', 'OPTIONS'])
def getStockInfo():
    if request.method == 'OPTIONS':
        response = jsonify({})
    else:
        data = request.get_json()
        ticker = data.get('ticker').upper()

        # Run the Python script (example: my_script.py) with user_message as an argument
        graph_data, table_data = stockInfo.getImportantInfo(ticker)

        summary, urls = getRecentNewsAboutStock(ticker, table_data)

        response = jsonify({"graphData": graph_data, "tableData": table_data, "summary": summary, 'urls': urls})
    # Price with Moving Averages and Bollinger Bands

    response = add_cors_headers(response)
    return response


def getRecentNewsAboutStock(ticker, data):
    SYSTEM_MESSAGE = "You are a helpful assistant that generates search queries to find recent news about a stock given the ticker symbol. This can be expert stock analyses, news about the company, etc."

    search_response = metaphor.search(
        "Expert Stock Analysis about " + ticker, use_autoprompt=True, start_published_date="2023-06-01"
    )

    contents_result = search_response.get_contents()
    first_result = contents_result.contents[0]

    urls = [content.url for content in contents_result.contents]

    SYSTEM_MESSAGE = "You are an expert investment banker and your job is to analyze a stock based on recent news articles and technical measures. The content of a recent news article will be given, followed by a json string with quantitative measures of the stock. Give reasonings behind your analysis."

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": SYSTEM_MESSAGE},
            {"role": "user", "content": "Article content: " + first_result.extract + "Quantitative Data: " + json.dumps(data)},
        ],
    )

    summary = completion.choices[0].message.content
    return summary, urls

if __name__ == '__main__':
    app.run(debug=True)