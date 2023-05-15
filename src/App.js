import { useCallback, useEffect, useState } from "react";
import moment from "moment";

function App() {
  const [second, setSecond] = useState(false);
  const [timer, setTimer] = useState("hh:mm:ss");
  const createTimerAnimator = useCallback(
    (duration) => {
      setSecond(second - 1);
      return [
        ("0" + duration.hours()).slice(-2),
        ("0" + duration.minutes()).slice(-2),
        ("0" + duration.seconds()).slice(-2),
      ].join(":");
    },
    [second]
  );
  const submitFormTimer = (e) => {
    if (!second) e.preventDefault();
    setSecond(e.target.time.value);
  };
  useEffect(() => {
    if (second > 0) {
      setTimeout(() => {
        setTimer(createTimerAnimator(moment.duration(second, "seconds")));
      }, 1000);
    } else {
      setTimer("hh:mm:ss");
      setSecond(false);
    }
  }, [createTimerAnimator, second]);
  return (
    <div>
      <form onSubmit={submitFormTimer}>
        <input placeholder="Seconds" type="number" name="time" />
        <button>Start</button>
        <br />
        <br />
        <span>{timer}</span>
      </form>
    </div>
  );
}

export default App;
