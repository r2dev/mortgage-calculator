import React from "react";
import {
  useFloatInput,
  useSelectValue,
  useUnsignedIntegerInput,
} from "./helper";


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
) {
  let paymentCountYearly = 1;
  let frequencyText = "";
  switch (frequency) {
    case 0:
    case 1:
      {
        paymentCountYearly = 52;
        frequencyText = "Weekly";
      }
      break;
    case 2:
    case 3:
      {
        paymentCountYearly = 26;
        frequencyText = "Bi-Weekly";
      }
      break;
    case 4:
      {
        paymentCountYearly = 24;
        frequencyText = "Bi-Monthly";
      }
      break;
    case 5:
      {
        paymentCountYearly = 12;
        frequencyText = "Monthly";
      }
      break;
    default: {
      console.debug("unhandle frequency value", frequency);
    }
  }

  let totalPeriodInYear = periodYear + periodMonth / 12;

  const termCount = term * 12;
  const totalCount = Math.floor(totalPeriodInYear * paymentCountYearly);

  const rateForEachPayment = rate / paymentCountYearly / 100;

  const totalAmount = amount - prepayment;

  const powerValue = Math.pow(1 + rateForEachPayment, totalCount);
  const eachAmount =
    (rateForEachPayment * totalAmount * powerValue) / (powerValue - 1);

  const termCost = eachAmount * termCount;
  const totalCost = eachAmount * totalCount;
  const totalInterest = totalCost - totalAmount;
  let termInterest = 0;

  for (let i = 0; i < termCount; i++) {
    termInterest += (totalAmount - eachAmount * i) * rateForEachPayment;
  }
  const termPrincipal = termCost - termInterest;

  return {
    eachAmount,
    termCost,
    totalCost,
    termCount,
    totalCount,
    totalPrincipal: totalAmount,
    totalInterest,
    termPrincipal,
    termInterest,
    termDuration: term,
    frequencyText: frequencyText,
    totalDurationYear: periodYear,
    tootalDurationMonth: periodMonth,
  };
}

function Form({ setMortgageDetail }) {
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
    const result = calculateMortgageDetail(
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
    setMortgageDetail(result);
    event.preventDefault();
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="amount">
          Mortgage Amount
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            id="amount"
            type="text"
            className="form-control"
            onChange={handleChangeAmount}
            value={amount}
          ></input>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="rate">
          Interest Rate
        </label>
        <div className="input-group">
          <input
            id="rate"
            type="text"
            className="form-control"
            onChange={handleChangeRate}
            value={rate}
          ></input>
          <div className="input-group-append">
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="period-year">
          Period Year
        </label>

        <select
          id="period-year"
          value={periodYear}
          onChange={handleChangePeriodYear}
          className="form-select"
        >
          <option value={0}></option>
          {renderPeriodYear()}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="period-month">
          Period Month
        </label>

        <select
          id="period-month"
          value={periodMonth}
          onChange={handleChangePeriodMonth}
          className="form-select"
        >
          <option value={0}></option>
          {renderPeriodMonth()}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="frequency">
          Payment Frequency
        </label>

        <select
          id="frequency"
          value={frequency}
          onChange={handleChangeFrequency}
          className="form-select"
        >
          {FREQUENCY_SELECTION.map((frequency, index) => (
            <option key={"frequency-" + index} value={index}>
              {frequency.text}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="term">
          Term
        </label>

        <select
          id="term"
          value={term}
          onChange={handleChangeTerm}
          className="form-select"
        >
          {renderTerm()}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="prepayment">
          Prepayment Amount
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            id="prepayment"
            onChange={handleChangePrepayment}
            value={prepayment}
            type="text"
            className="form-control"
          ></input>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="prepayment-frequency">
          Prepayment Frequency
        </label>

        <select
          id="prepayment-frequency"
          value={preFrequency}
          onChange={handleChangePreFrequency}
          className="form-select"
        >
          {PREPAYMENT_FREQUENCY_SELECTION.map((frequency, index) => (
            <option value={index} key={"prefrequency-" + index}>
              {frequency.text}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="start-with">
          Start With Payment
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">#</div>
          </div>
          <input
            id="start-with"
            type="number"
            onChange={handleChangeStartWith}
            value={startWith}
            className="form-control"
          ></input>
        </div>
      </div>
      <input type="submit" value="Calculate" className="btn btn-primary" />
    </form>
  );
}

export default Form;
