import { useState, useEffect, useCallback } from "react";
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

function useFloatInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [displayValue, setDisplayValue] = useState(defaultValue);

  const handleValueChange = useCallback((event) => {
    const re = /^([1-9][0-9]*)\.?[0-9]*$/;
    const reZero = /^0\..[0-9]*$/;
    const rawValue = event.target.value;
    if (
      rawValue === "" ||
      rawValue === "0" ||
      rawValue === "0." ||
      re.test(rawValue) ||
      reZero.test(rawValue)
    ) {
      let value = parseFloat(rawValue);
      if (isNaN(value)) {
        value = 0;
      }
      setValue(value);
      setDisplayValue(rawValue);
    }
  }, []);
  return [value, displayValue, handleValueChange];
}

function useUnsignedIntegerInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [displayValue, setDisplayValue] = useState(defaultValue);

  const handleValueChange = useCallback((event) => {
    const re = /^(0|[1-9][0-9]*)$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      let value = parseInt(event.target.value, 10);
      if (isNaN(value)) {
        value = 0;
      }
      setValue(value);
      setDisplayValue(event.target.value);
    }
  }, []);

  return [value, displayValue, handleValueChange];
}

function useSelectValue(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const handleSelectChange = useCallback(
    (event) => {
      let value = event.target.value;

      let numberValue = parseInt(value, 10);
      if (isNaN(numberValue)) {
        setValue(defaultValue);
      } else {
        setValue(numberValue);
      }
    },
    [defaultValue]
  );
  return [value, handleSelectChange];
}

function calculateMortgageDetail(
  amount,
  rate,
  periodYear,
  periodMonth,
  frequency,
  term,

  prepayment,
  preFrequency,
  startWith
) {}

function App() {
  const [amountValue, amount, handleChangeAmount] = useFloatInput(
    DEFAULT_MORTGAGE_AMOUNT
  );
  const [rateValue, rate, handleChangeRate] = useFloatInput(DEFAULT_RATE);

  const [periodYear, handleChangePeriodYear] =
    useSelectValue(DEFAULT_PREIOD_YEAR);
  const [periodMonth, handleChangePeriodMonth] = useSelectValue(0);

  const [frequency, handleChangeFrequency] = useSelectValue(DEFAULT_FREQUENCY);
  const [preFrequency, handleChangePreFrequency] = useSelectValue(
    DEFAULT_PREPAYMENT_FREQUENCY
  );

  const [term, handleChangeTerm] = useSelectValue(DEFAULT_TERM);
  const [prepaymentValue, prepayment, handleChangePrepayment] =
    useFloatInput(DEFAULT_PREPAYMENT);

  const [startWithValue, startWith, handleChangeStartWith] =
    useUnsignedIntegerInput(1);

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

  function handleFormSubmit(event) {
    calculateMortgageDetail(
      amountValue,
      rateValue,
      periodYear,
      periodMonth,
      frequency,
      term,

      prepaymentValue,
      preFrequency,
      startWithValue
    );
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
            type="number"
            onChange={handleChangeStartWith}
            value={startWith}
          ></input>
        </div>

        <input type="submit" value="Calculate" />
      </form>
    </div>
  );
}

export default App;
