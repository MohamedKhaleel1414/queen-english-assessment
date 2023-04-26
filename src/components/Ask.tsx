import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ask.css";

function Ask() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [selections, setSelections] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(true);
  const [ind, setInd] = useState<number>(0);

  useEffect(() => {
    let answers: string[] = [];
    axios
      .get("https://opentdb.com/api.php?amount=1")
      .then((res) => {
        console.log(res.data.results);
        setQuestion(res.data.results[0].question);
        answers.push(res.data.results[0].correct_answer);
        let selec: string[] = answers.concat(
          res.data.results[0].incorrect_answers
        );
        setSelections(selec.sort());
        setCorrect(res.data.results[0].correct_answer);
        setIsLoaded(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let answers: string[] = [];
    axios
      .get("https://opentdb.com/api.php?amount=1")
      .then((res) => {
        console.log(res.data.results);
        setQuestion(res.data.results[0].question);
        answers.push(res.data.results[0].correct_answer);
        let selec: string[] = answers.concat(
          res.data.results[0].incorrect_answers
        );
        setSelections(selec.sort());
        setCorrect(res.data.results[0].correct_answer);
        setIsLoaded(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  function check(selected: string, index: number): void {
    if (correct === selected) {
      setColor("lightgreen");
      setInd(index);
    } else {
      setColor("#ff4044");
      setInd(index);
    }
  }

  function changeQuestion(): void {
    setFlag(!flag);
    setIsLoaded(false)
    setColor("")
    setInd(0)
  }

  if (!isLoaded) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <article className="wholebody">
        {question.length !== 0 && (
          <div className="questionbar">
            <div className="textq">{question}</div>
          </div>
        )}
        {selections.length !== 0 && (
          <div className="selections">
            {selections.map((sel: string, idx: number) => {
              return (
                <div
                  key={idx}
                  className="selectCon"
                  onClick={() => check(sel, idx)}
                  style={{ backgroundColor: idx === ind ? color : "" }}
                >
                  <div className="select">{sel}</div>
                </div>
              );
            })}
          </div>
        )}
        {/* <button className='btnStyle'>Next</button> */}
        <button className="button-9" onClick={changeQuestion}>
          Next Question
        </button>
      </article>
    </>
  );
}

export default Ask;