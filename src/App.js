import { useState } from "react";
import "./App.css";
import Detail from "./Detail";

import Form from "./Form";

function App() {
  const [mortgageDetail, setMortgageDetail] = useState(null);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0 ">Mortgage Calculator</h1>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <Form setMortgageDetail={setMortgageDetail}></Form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card h-100">
              <div className="card-body">
                {mortgageDetail ? (
                  <Detail
                    eachAmount={mortgageDetail.eachAmount}
                    frequency={mortgageDetail.frequencyText}
                    termCost={mortgageDetail.termCost}
                    termDuration={mortgageDetail.termDuration}
                    termCount={mortgageDetail.termCount}
                    termInterest={mortgageDetail.termInterest}
                    termPrincipal={mortgageDetail.termPrincipal}
                    totalCost={mortgageDetail.totalCost}
                    totalInterest={mortgageDetail.totalInterest}
                    totalPrincipal={mortgageDetail.totalPrincipal}
                    totalCount={mortgageDetail.totalCount}
                    totalDurationYear={mortgageDetail.totalDurationYear}
                    totalDurationMonth={mortgageDetail.tootalDurationMonth}
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 flex-column">
                    <svg
                      t="1631507642496"
                      className="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="5197"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M874.53 760.991l-63.99-31.995-63.99 31.995V895.86h127.98V760.991z m63.99 31.995V959.85H682.56V792.986l-14.309 7.155-28.617-57.235 170.906-85.452 170.906 85.452-28.617 57.235-14.309-7.155zM319.95 319.95v-85.32h63.99v85.32h85.32v63.99h-85.32v85.32h-63.99v-85.32h-85.32v-63.99h85.32z m597.24 277.29H853.2V202.635c0-16.63-12.689-30.298-28.914-31.849l-621.651-0.146c-16.63 0-30.298 12.689-31.849 28.914l-0.146 621.651c0 16.63 12.689 30.298 28.914 31.849l397.686 0.093v64.043H202.635c-53.011 0-95.985-42.974-95.985-95.985v-618.57c0-53.011 42.974-95.985 95.985-95.985h618.57c53.011 0 95.985 42.974 95.985 95.985V597.24z m-565.245 29.407l60.33-60.33 45.248 45.248-60.33 60.33 60.33 60.33-45.248 45.248-60.33-60.33-60.33 60.33-45.248-45.248 60.33-60.33-60.33-60.33 45.248-45.248 60.33 60.33zM554.58 319.95h234.63v63.99H554.58v-63.99z"
                        p-id="5198"
                      ></path>
                    </svg>
                    <div className="h4 w-50 text-center">
                      Find out how much you are signing up for your dream house
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
