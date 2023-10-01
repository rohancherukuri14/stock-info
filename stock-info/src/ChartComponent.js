import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ChartComponent = ({ bollLower, bollUpper, SMA_50, SMA_200, closePrices }) => {
    const [showBollLower, setShowBollLower] = useState(false);
    const [showBollUpper, setShowBollUpper] = useState(false);
    const [showSMA50, setShowSMA50] = useState(false);
    const [showSMA200, setShowSMA200] = useState(false);
    const [showClosePrices, setShowClosePrices] = useState(true); // to start, only the closePrices is shown

    const data = closePrices.map((_, index) => ({
        index,
        bollLower: bollLower[index],
        bollUpper: bollUpper[index],
        closePrices: closePrices[index],
        SMA_50: SMA_50[index],
        SMA_200: SMA_200[index]
    }));

    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={showBollLower}
                        onChange={() => setShowBollLower(!showBollLower)}
                    />
                    Bollinger Lower
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showBollUpper}
                        onChange={() => setShowBollUpper(!showBollUpper)}
                    />
                    Bollinger Upper
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showClosePrices}
                        onChange={() => setShowClosePrices(!showClosePrices)}
                    />
                    Close Prices
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showSMA50}
                        onChange={() => setShowSMA50(!showSMA50)}
                    />
                    SMA 50
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showSMA200}
                        onChange={() => setShowSMA200(!showSMA200)}
                    />
                    SMA 200
                </label>
            </div>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                {showBollLower && <Line type="monotone" dataKey="bollLower" stroke="blue" dot={false} />}
                {showBollUpper && <Line type="monotone" dataKey="bollUpper" stroke="red" dot={false} />}
                {showClosePrices && <Line type="monotone" dataKey="closePrices" stroke="green" dot={false} />}
                {showSMA50 && <Line type="monotone" dataKey="SMA_50" stroke="purple" dot={false} />}
                {showSMA200 && <Line type="monotone" dataKey="SMA_200" stroke="orange" dot={false} />}
            </LineChart>
        </div>
    );
};

export default ChartComponent;

