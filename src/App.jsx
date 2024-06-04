import { useState } from "react"

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const decimal = getRandomInt(10, 100)

const origMoney = `${ getRandomInt(30, 200) }.${ decimal.toString().length == 1 ? decimal * 10 : decimal }`
let moneyPaid = 0

function App() {
  const [ paid, setPayStatus ] = useState(false)
  const [ tipAmount, setTipAmount ] = useState(0.15)
  const [ usingCustomTip, setTextBox ] = useState(false)
  const [ warningShowed, showWarning ] = useState(false)

  const onPay = () => {
    // moneyPaid = Math.round(((origMoney * (1 + tipAmount)) + Number.EPSILON) * 100) / 100
    // setPayStatus(true)

    if (tipAmount < 0.10 || tipAmount > 1) {
      showWarning(true)
    } else {
      moneyPaid = Math.round(((origMoney * (1 + tipAmount)) + Number.EPSILON) * 100) / 100
      setPayStatus(true)
    }
  }

  const handleChange = e => {
    const customTipAmount = e.target.value
    setTipAmount(parseInt(customTipAmount) / 100)
  }

  if (!paid) {
    return (
      <div className="parent">
        <div className="child">
          <h3 className="origMoney">${ origMoney }</h3>
          <h1 className="title">Would you like to leave a tip?</h1>

          <hr />

          <div className="btn-group">
            <button onClick={() => setTipAmount(0.15)}>15%</button>
            <button onClick={() => setTipAmount(0.20)}>20%</button>
            <button onClick={() => setTipAmount(0.25)}>25%</button>
            <button onClick={() => setTipAmount(0.30)}>30%</button>
          </div>

          { usingCustomTip ? (
            <>
              <input type="number" value={ tipAmount * 100 } onChange={handleChange} min={ 10 } max={ 100 } /> % <br/>
            </>
          ) : null }

          <button className="custom" onClick={() => setTextBox( usingCustomTip ? false : true )}>Custom tip</button><br />

          <button onClick={() => onPay()}>Pay</button>

          <br />

          { warningShowed ? (
            <>
              <p className="warning">Invalid tip amount. Tip must be between 10% and 100%.</p>
            </>
          ) : null }
        </div>
      </div>
    )
  } else {
    return (
      <div className="parent">
        <div className="child">
          <h1 className="paid-title">Money paid!</h1>
          <p className="paid-p">Thanks for paying <b>${moneyPaid}</b></p>
          <p className="paid-p">:-)</p>
        </div>
      </div>
    )
  }
}

export default App
