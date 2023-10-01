# Stock News Analyzer

A stock analyzer based on up-to-date news articles and quantitative measures.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Introduction

This project was created using Flask, React, Metaphor, OpenAI, and yFinance. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python (version 3.11)
- Node.js (version 18.17)
- npm (version 9.6.7)
- pip (version 23.2.1)
- Your API keys for OpenAI and Metaphor, which should be placed in a `config.json` file.

## Getting Started

This section provides step-by-step instructions on how to set up and run your project.

### Backend Setup

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rohancherukuri14/stock-info.git
   ```
2. Navigate to the repository and install the required pip packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a config.json file with your Metaphor and OpenAI API keys:
   ```bash
   {
    "gpt_api_key": "your-gpt-api-key",
    "metaphor_api_key": "your-metaphor-api-key"
    }
   ```
4. Navigate to the backend folder and start the Flask app:
   ```bash
   cd backend
   python app.py
   ```

## Frontend Setup
1. Open a new terminal tab with the repository and navigate to the stock-info react app:
   ```bash
   cd stock-info
   ```
2. Install frontend dependencies:
  ```bash
  npm install
  ```
3. Run the frontend app:
   ```bash
   npm start
   ```
4. Your frontend React app should now be running on http://localhost:3000.

## Usage

Enter a valid stock ticker into the input box. Wait for a couple seconds and you will be able to a view an in-depth textual analysis of the stock, a table with quantitative measures, a graph with recent stock trends, and useful links for more research.



<img width="1371" alt="Screenshot 2023-10-01 at 5 56 29 PM" src="https://github.com/rohancherukuri14/stock-info/assets/8194491/898d5967-a81b-49e2-9080-e7b1c5b36d53">
