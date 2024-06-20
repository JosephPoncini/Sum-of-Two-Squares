'use client'
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { twoSquares } from './utils/utils';

function App() {

  const [number, setNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(number)
  const [squareNumsList, setSquareNumList] = useState([[0,0]]);

  const handleOnChange = (e) => {
    const value = e.target.value;

    // Check if the value is an integer
    if (/^\d+$/.test(value)) {
      setNumber(parseInt(value, 10));
    }else if (value === '') {
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
    <div className=' flex flex-col items-center py-20 px-20 bg-slate-100 h-screen space-y-10'>
      <h1 className="text-3xl font-ArchivoBlack">
        SUM OF TWO SQUARES CALCULATOR
      </h1>
      <h6 className=' font-RobotoSerif '> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</h6>

      <div className=' bg-white h-[300px] w-[500px] rounded-md border-2 border-black flex flex-col items-center justify-center space-y-5 px-10 '>
        <div className=' font-RobotoSerif text-center' >Enter in the number you want to know the sum of two squares for:</div>
        <input className=' w-[300px] h-[50px] border border-black rounded-md text-center text-xl' type='text' onChange={handleOnChange} value={number} onKeyDown={handleEnter} />
        <button className=' py-2 font-ArchivoBlack w-[150px] h-[70px] bg-slate-300 rounded-md border-2 border-black active:bg-slate-500' onClick={handleOnClick}>Get Squared Sums!</button>

      </div>

      <div className=' font-RobotoSerif text-red-600 flex flex-col items-center text-center'>
        <div>List of Square Sums:</div>
        <div>
          {
            squareNumsList.length != 0 ?
            squareNumsList.map((pair, idx)=>{
              return <div key={idx} className=' flex '>{pair[0]}<span className=' text-xs'>2</span> + {pair[1]}<span className=' text-xs'>2</span> = {displayNumber}</div>
            }):
            <div> A sum of two squares does not exist for {displayNumber} </div>
          }
        </div>
        
      </div>

    </div>
  );
}

export default App;
