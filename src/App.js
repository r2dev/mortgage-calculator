import { useState, useEffect } from "react";
import "./App.css";

const FREQUENCY_SELECTION = [
  { text: "Accelerated Weekly" },
  { text: "Weekly" },
  { text: "Accelerated Bi-weekly" },
  { text: "Bi-weekly (every 2 weeks)" },
  { text: "Semi-monthly (24x per year)" },
  { text: "Monthly (12x per year)" },
];
const DEFAULT_FREQUENCY = 5;

const DEFAULT_PREPAYMENT = 0;

const PREPAYMENT_FREQUENCY_SELECTION = [
  { text: "One time" },
  { text: "Each year" },
  { text: "Same as regular payment" },
];
const DEFAULT_PREPAYMENT_FREQUENCY = 0;

const DEFAULT_MORTGAGE_AMOUNT = 100000;

const DEFAULT_RATE = 5;

const DEFAULT_TERM = 5;

const DEFAULT_PREIOD_YEAR = 25;


function App() {
  const [amount, setAmount] = useState(DEFAULT_MORTGAGE_AMOUNT);
  const [rate, setRate] = useState(DEFAULT_RATE);

  const [periodYear, setPeriodYear] = useState(DEFAULT_PREIOD_YEAR);
  const [periodMonth, setPeriodMonth] = useState(0);

  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);
  const [preFrequency, setPreFrequency] = useState(
    DEFAULT_PREPAYMENT_FREQUENCY
  );

  const [term, setTerm] = useState(DEFAULT_TERM);
  const [prepayment, setPrepayment] = useState(DEFAULT_PREPAYMENT);

  const [startWith, setStartWith] = useState(1);

  useEffect(() => {
    console.log(
      amount,
      rate,
      periodYear,
      periodMonth,
      frequency,
      preFrequency,
      term,
      prepayment,
      startWith
    );
  }, [
    amount,
    rate,
    periodYear,
    periodMonth,
    frequency,
    preFrequency,
    term,
    prepayment,
    startWith,
  ]);

  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }

  function handleChangeRate(event) {
    setRate(event.target.value);
  }

  function handleChangePeriodYear(event) {
    setPeriodYear(event.target.value);
  }

  function handleChangePeriodMonth(event) {
    setPeriodMonth(event.target.value);
  }

  function handleChangeFrequency(event) {
    setFrequency(event.target.value);
  }

  function handleChangePreFrequency(event) {
    setPreFrequency(event.target.value);
  }

  function handleChangeStartWith(event) {
    setStartWith(event.target.value);
  }

  function handleChangeTerm(event) {
    setTerm(event.target.value);
  }

  function handleChangePrepayment(event) {
    setPrepayment(event.target.value);
  }

  function displayPlural(number, time) {
    let result = "";
    if (number === 1) {
      result = `1 ${time}`;
    } else if (number >= 2) {
      result = `${number} ${time}s`;
    }
    return result;
  }

  function renderPeriodYear() {
    let result = [];

    for (let index = 1; index <= 30; index++) {
      result.push(
        <option key={"year" + index} value={index}>
          {displayPlural(index, "Year")}
        </option>
      );
    }
    return result;
  }

  function renderPeriodMonth() {
    let result = [];

    for (let index = 1; index <= 12; index++) {
      result.push(
        <option key={"month" + index} value={index}>
          {displayPlural(index, "Month")}
        </option>
      );
    }
    return result;
  }

  function renderTerm() {
    let result = [];

    for (let index = 1; index <= 10; index++) {
      result.push(
        <option key={"term" + index} value={index}>
          {displayPlural(index, "Year")}
        </option>
      );
    }
    return result;
  }

  return (
    <div>
      <form>
        <label htmlFor="amount">Mortgage Amount</label>
        <div>
          <input
            id="amount"
            onChange={handleChangeAmount}
            value={amount}
          ></input>
        </div>

        <label htmlFor="rate">Interest Rate</label>
        <div>
          <input id="rate" onChange={handleChangeRate} value={rate}></input>
        </div>
        <label htmlFor="period-year">Period Year</label>
        <div>
          <select
            id="period-year"
            value={periodYear}
            onChange={handleChangePeriodYear}
          >
            <option value={0}></option>
            {renderPeriodYear()}
          </select>
        </div>

        <label htmlFor="period-month">Period Month</label>
        <div>
          <select
            id="period-month"
            value={periodMonth}
            onChange={handleChangePeriodMonth}
          >
            <option value={0}></option>
            {renderPeriodMonth()}
          </select>
        </div>

        <label htmlFor="frequency">Payment Frequency</label>
        <div>
          <select
            id="frequency"
            value={frequency}
            onChange={handleChangeFrequency}
          >
            {FREQUENCY_SELECTION.map((frequency, index) => (
              <option key={"frequency-" + index} value={index}>
                {frequency.text}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="term">Term</label>
        <div>
          <select id="term" value={term} onChange={handleChangeTerm}>
            {renderTerm()}
          </select>
        </div>

        <label htmlFor="prepayment">Prepayment Amount</label>
        <div>
          <input
            id="prepayment"
            onChange={handleChangePrepayment}
            value={prepayment}
          ></input>
        </div>

        <label htmlFor="prepayment-frequency">Prepayment Frequency</label>
        <div>
          <select
            id="prepayment-frequency"
            value={preFrequency}
            onChange={handleChangePreFrequency}
          >
            {PREPAYMENT_FREQUENCY_SELECTION.map((frequency, index) => (
              <option value={index} key={"prefrequency-" + index}>
                {frequency.text}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="start-with">Start With Payment</label>
        <div>
          <input
            id="start-with"
            onChange={handleChangeStartWith}
            value={startWith}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default App;
