import React, { useState, useEffect } from 'react';
import './Trochoiduquay.css';

const Trochoiduquay = () => {
  const [money, setMoney] = useState(100000);
  const [betAmount, setBetAmount] = useState(10); // Default bet amount
  const [selectedUnits, setSelectedUnits] = useState({});
  const [remainingTime, setRemainingTime] = useState(15);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(''); // Message for win/lose
  const [history, setHistory] = useState([]); // New history state

  const units = [
    { name: 'Đấm', multiplier: 5 },
    { name: 'Bóng', multiplier: 5 },
    { name: 'Phao', multiplier: 5 },
    { name: 'Kem', multiplier: 5 },
    { name: 'Tiên', multiplier: 15 },
    { name: 'Ảnh', multiplier: 15 },
    { name: 'Gấu', multiplier: 10 },
    { name: 'Vương Miện', multiplier: 45 },
  ];

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      endRound();
      setRemainingTime(15); // Reset the timer for the next round
    }
  }, [remainingTime]);

  const handleBetChange = (amount) => {
    setBetAmount(amount);
  };

  const toggleUnitSelection = (unitName) => {
    const newBetAmount = (selectedUnits[unitName] || 0) + betAmount;

    if (newBetAmount <= money) {
      setSelectedUnits({
        ...selectedUnits,
        [unitName]: newBetAmount,
      });
      setMoney(money - betAmount);
      setMessage(''); // Clear previous win/lose message
    } else {
      alert("Số dư không đủ để đặt cược!");
    }
  };

  const endRound = () => {
    const winningUnit = units[Math.floor(Math.random() * units.length)];
    setResult(winningUnit);

    let winnings = 0;
    Object.keys(selectedUnits).forEach((unit) => {
      if (unit === winningUnit.name) {
        winnings += selectedUnits[unit] * winningUnit.multiplier;
      }
    });

    if (winnings > 0) {
      setMoney(money + winnings);
      setMessage(`Bạn đã thắng ${winnings}!`);
    } else {
      setMessage('Bạn đã thua vòng này.');
    }

    // Update the history
    setHistory((prevHistory) => {
      const newHistory = [{ result: winningUnit.name, multiplier: winningUnit.multiplier, winnings }]
        .concat(prevHistory);
      return newHistory.slice(0, 10); // Keep only the last 10 results
    });

    setSelectedUnits({});
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Trò Chơi Đu Quay</h1>
        <p>Số tiền của bạn: {money}</p>
        <p>Thời gian còn lại: {remainingTime}s</p>
      </div>

      <div className="bet-options">
        <p>Chọn tiền cược:</p>
        {[10, 100, 1000, 10000].map((amount) => (
          <button
            key={amount}
            onClick={() => handleBetChange(amount)}
            className={betAmount === amount ? 'active' : ''}
          >
            {amount}
          </button>
        ))}
      </div>

      <div className="unit-selection">
        <p>Chọn đơn vị cược:</p>
        {units.map((unit) => (
          <button
            key={unit.name}
            onClick={() => toggleUnitSelection(unit.name)}
            className={selectedUnits[unit.name] ? 'selected' : ''}
          >
            {unit.name} (x{unit.multiplier})
          </button>
        ))}
      </div>

      {Object.keys(selectedUnits).length > 0 && (
        <div className="bet-details">
          <p>Các đơn vị đã đặt cược:</p>
          <ul>
            {Object.keys(selectedUnits).map((unit, index) => (
              <li key={index}>{unit}: {selectedUnits[unit]} VND</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="result">
          <p>Kết quả vòng quay: {result.name} (x{result.multiplier})</p>
          <p>{message}</p>
        </div>
      )}

      {/* History table */}
      <div className="history">
        <h2>Lịch sử Kết Quả</h2>
        <table>
          <thead>
            <tr>
              <th>Vòng</th>
              <th>Kết quả</th>
              <th>Multiplier</th>
              <th>Thắng</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.result}</td>
                <td>x{entry.multiplier}</td>
                <td>{entry.winnings} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trochoiduquay;
