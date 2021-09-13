function safeMoneyDisplay(number) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  if (isNaN(number)) return formatter.format(number);
  else return formatter.format(number);
}

function Detail({
  eachAmount = 0,
  frequency = "Monthly",
  termCost = 0,
  termDuration = 0,
  termCount = 0,
  termInterest = 0,
  termPrincipal = 0,
  totalCost = 0,
  totalCount = 0,
  totalDurationYear = 0,
  totalDurationMonth = 0,
  totalInterest = 0,
  totalPrincipal = 0,
}) {
  return (
    <>
      <div className="card-title h3">Each Payment</div>
      <div className="h1">
        {safeMoneyDisplay(eachAmount)}
        <small className="mx-2 text-muted h3">{frequency}</small>
      </div>
      <hr />
      <div className="card-title h3">Term Cost</div>
      <div className="h2">
        {safeMoneyDisplay(termCost)}
        <small className="mx-2 text-muted h5 d-block">
          <abbr title="Mortgage term">{termDuration} year(s)</abbr> with{" "}
          {termCount} payment(s)
        </small>
      </div>
      <div className="h4 ">
        =
        <div>
          {safeMoneyDisplay(termInterest)}
          <small className="mx-2 text-muted">Interest</small>
        </div>
        +
        <div>
          {safeMoneyDisplay(termPrincipal)}
          <small className="mx-2 text-muted">Principal</small>
        </div>
      </div>
      <hr />
      <div className="card-title h3">Total Cost</div>
      <div className="h2">
        {safeMoneyDisplay(totalCost)}
        <small className="mx-2 text-muted h5 d-block">
          <abbr title="Total duration">
            {totalDurationYear === 0 ? null : `${totalDurationYear} year(s)`}{" "}
            {totalDurationYear !== 0 && totalDurationMonth !== 0 && "and "}
            {totalDurationMonth === 0 ? null : `${totalDurationMonth} month(s)`}
          </abbr>{" "}
          with {totalCount} payment(s)
        </small>
      </div>
      <div className="h4 ">
        =
        <div>
          {safeMoneyDisplay(totalInterest)}
          <small className="mx-2 text-muted">Interest</small>
        </div>
        +
        <div>
          {safeMoneyDisplay(totalPrincipal)}
          <small className="mx-2 text-muted">Principal</small>
        </div>
      </div>
    </>
  );
}

export default Detail;
