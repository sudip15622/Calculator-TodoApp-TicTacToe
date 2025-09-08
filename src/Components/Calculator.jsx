import { useState, useEffect } from 'react'
import "./Calculator.css"

function App() {
  const [calc, setcalc] = useState("")

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/^[0-9+\-*/=.]$/.test(key)) {
        event.preventDefault();
        clickhandler(key);
      } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        event.preventDefault();
        del();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calc]);


  const clickhandler = (value) => {
    setcalc(calc + value);
  }
  const erease = () => {
    setcalc("");
  }
  const calculate = () => {
    try {
      if (calc != "") {
        setcalc(String(eval(calc)));
      }
    } catch (error) {
      setcalc("Syntax Error!");
      // console.log(error);
    }

  }
  const del = () => {
    const newval = calc.substring(0, calc.length - 1);
    setcalc(newval);
  }

  const Mybutton = ({ content }) => {
    let myfunct, cl;
    if (content != "AC" && content != "DEL" && content != "=") {
      myfunct = clickhandler;
      cl = "";
    }
    else if(content == "AC" || content == "DEL") {
      myfunct = content == "AC" ? erease.bind(null) : del.bind(null);
      cl = "delac";
    }
    else if(content == "=") {
      myfunct = calculate.bind(null);
      cl = "big-equal";
    }
    return (
      <input type="button" value={content} className={cl} onClick={(e)=>{myfunct(e.target.value)}} />
    )

  }

  return (
    <>
      <div className="container">
        <div className="showexpression">{calc}</div>
        <div className="numbers">
          <div>
            <Mybutton content="%" />
            <Mybutton content="/" />
            <Mybutton content="DEL" />
            <Mybutton content="AC" />
          </div>
          <div>
            <Mybutton content="7" />
            <Mybutton content="8" />
            <Mybutton content="9" />
            <Mybutton content="*" />
          </div>
          <div>
            <Mybutton content="4" />
            <Mybutton content="5" />
            <Mybutton content="6" />
            <Mybutton content="-" />
          </div>
          <div>
            <Mybutton content="1" />
            <Mybutton content="2" />
            <Mybutton content="3" />
            <Mybutton content="+" />
          </div>
          <div>
            <Mybutton content="0" />
            <Mybutton content="." />
            <Mybutton content="=" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
