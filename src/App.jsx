import { useState } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateBmi = () => {
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);

    if (isValidHeight && isValidWeight) {
      const heightInMeters = height / 100;
      // BMI FORMULA : (BMI = weight (kg) / height (m)²)
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      if (bmiValue < 18.5) {
        setBmiStatus("Under Weight");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiStatus("Normal Weight");
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiStatus("Over Weight");
      } else {
        setBmiStatus("Obese");
      }
      setErrorMessage("");
    } else {
      setBmi(null);
      setBmiStatus("");
      setErrorMessage(
        "Please enter valid numeric values for height and weight"
      );
    }
  };

  const clearAll = () => {
    setBmi(null);
    setBmiStatus("");
    setHeight("");
    setWeight("");
    setErrorMessage("");
  };

  return (
    <>
      <div className="bmi-container">
        <div className="img-container"></div>
        <div className="bmi-calculator-container">
          <h1>BMI CALCULATOR</h1>

          {errorMessage && <div className="error">{errorMessage}</div>}
          <div className="text-box">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="text-box">
            <label htmlFor="height">Weight(kg):</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <button className="bmi" onClick={calculateBmi}>
            Calculate BMI
          </button>
          <button className="clear" onClick={clearAll}>
            Clear
          </button>

          {bmi !== null && (
            <div className="result">
              <p>Your BMI is: {bmi}</p>
              <p>Status: {bmiStatus}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
