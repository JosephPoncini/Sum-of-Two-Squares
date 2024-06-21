'use client'
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { twoSquares } from './utils/utils';

function App() {

  const [number, setNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(number)
  const [squareNumsList, setSquareNumList] = useState([[0, 0]]);

  const handleOnChange = (e) => {
    const value = e.target.value;

    // Check if the value is an integer
    if (/^\d+$/.test(value) && parseInt(value, 10) <= 1000000000) {
      setNumber(parseInt(value, 10));
    } else if (value === '') {
      setNumber(0);
    }
  }

  const handleOnClick = () => {
    setSquareNumList(twoSquares(number))
    setDisplayNumber(number);
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleOnClick();
    }
  }

  return (
    <div className=' flex flex-col items-center py-20 px-20 bg-slate-100 h-screen space-y-10 overflow-auto'>
      <h1 className="text-3xl font-ArchivoBlack">
        SUM OF TWO SQUARES CALCULATOR
      </h1>
      <h6 className=' font-RobotoSerif '> Have you ever come by a number and wondered... can this number be written as the sum of two perfect square?? If so, can it be written more than one way like? If you have had these thoughts, it turns out you are not alone. Mathematician in the last 300 years have had similar quandries and have been able to come up with some relatively fast algorithms to answer these questions. In the calculator below, I have integrated some of these algorithms to calculate for a given number, up to a billion, all possible squares that will sum up to it. If you are curious as to how I developed my code, I heavily leveraged knowledge gained from this site: <a href='https://nonagon.org/ExLibris/fermat-sum-two-squares-calculator' target='_blank' className=' underline font-bold text-blue-900'>https://nonagon.org/ExLibris/fermat-sum-two-squares-calculator</a>. Furthermore, if you would like to try coding this yourself, you may use my <a className=' underline font-bold text-blue-900' href='https://github.com/JosephPoncini/Sum-of-Two-Squares' target='_blank'>github</a>  for help as well.</h6>

      <div className=' bg-white py-10 md:h-[300px] w-[300px] md:w-[500px] rounded-md border-2 border-black flex flex-col items-center justify-center space-y-5 px-10 '>
        <div className=' font-RobotoSerif text-center' >Enter in the number you want to know the sum of two squares for:</div>
        <input className=' w-[200px] md:w-[300px] h-[50px] border border-black rounded-md text-center text-xl' type='text' onChange={handleOnChange} value={number} onKeyDown={handleEnter} />
        <button className=' py-2 font-ArchivoBlack w-[150px] h-[70px] bg-slate-300 rounded-md border-2 border-black active:bg-slate-500' onClick={handleOnClick}>Get Squared Sums!</button>

      </div>

      <div className=' font-RobotoSerif text-red-600 flex flex-col items-center text-center'>
        <div>List of Square Sums:</div>
        <div>
          {
            squareNumsList.length != 0 ?
              squareNumsList.map((pair, idx) => {
                return <div key={idx}>
                  <div className=' flex whitespace-nowrap'>
                    {pair[0]}<span className=' text-xs self-start '>2</span>  &nbsp;+ {pair[1]}<span className=' text-xs'>2</span> &nbsp;= {displayNumber}
                  </div>
                </div>
              }) :
              <div> A sum of two squares does not exist for {displayNumber} </div>
          }
        </div>

      </div>

    </div>
  );
}

export default App;
