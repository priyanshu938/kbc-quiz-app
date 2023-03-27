import { useEffect, useState, useMemo } from "react";

import "./App.css";
import Trivia from "./components/Trivia";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("Rs 0");
  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "Rs 100" },
        { id: 2, amount: "Rs 200" },
        { id: 3, amount: "Rs 300" },
        { id: 4, amount: "Rs 500" },
        { id: 5, amount: "Rs 1000" },
        { id: 6, amount: "Rs 2000" },
        { id: 7, amount: "Rs 4000" },
        { id: 8, amount: "Rs 8000" },
        { id: 9, amount: "Rs 16000" },
        { id: 10, amount: "Rs 32000" },
        { id: 11, amount: "Rs 64000" },
        { id: 12, amount: "Rs 125000" },
        { id: 13, amount: "Rs 250000" },
        { id: 14, amount: "Rs 500000" },
        { id: 15, amount: "Rs 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned: {earned} </h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">30</div>
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
    </div>
  );
}
export default App;
