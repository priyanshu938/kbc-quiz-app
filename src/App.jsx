import { useEffect, useState, useMemo } from "react";

import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";
import questionsData from "./questionsData";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("Rs 0");
  const data = questionsData;
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "Rs 1000" },
        { id: 2, amount: "Rs 2000" },
        { id: 3, amount: "Rs 3000" },
        { id: 4, amount: "Rs 5000" },
        { id: 5, amount: "Rs 10000" },
        { id: 6, amount: "Rs 20000" },
        { id: 7, amount: "Rs 40000" },
        { id: 8, amount: "Rs 80000" },
        { id: 9, amount: "Rs 160000" },
        { id: 10, amount: "Rs 320000" },
        { id: 11, amount: "Rs 640000" },
        { id: 12, amount: "Rs 1250000" },
        { id: 13, amount: "Rs 2500000" },
        { id: 14, amount: "Rs 5000000" },
        { id: 15, amount: "Rs 10000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned} </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>

                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <div className="moneyList">
              {moneyPyramid.map((m, i) => (
                <li
                  key={i}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}
export default App;
