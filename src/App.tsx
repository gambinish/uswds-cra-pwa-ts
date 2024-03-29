import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Alert,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";

function App() {
  const [alertHidden, setSetAlertHidden] = useState(true);
  const [error, setError] = useState(false);
  const mockSubmit = (e: any) => {
    setSetAlertHidden(true);
    e.preventDefault();

    const inputs: Array<any> = Array.from(e.target);

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "text" && !inputs[i].value) {
        setError(true);
      }
    }
    setSetAlertHidden(false);
  };
  return (
    <div className="App">
      <Alert
        type={error ? "error" : "success"}
        headingLevel={"h1"}
        hidden={alertHidden}
      >
        {error
          ? "There was an error submitting the form"
          : "Form submitted Successfully!"}
      </Alert>
      <main className="main-wrapper">
        <Form onSubmit={mockSubmit} className="noaa-form">
          <Fieldset legend="Name" legendStyle="large">
            <Label htmlFor="first-name">First or given name</Label>
            <span className="usa-hint">For example, Jose, Darren, or Mai</span>
            <TextInput id="first-name" name="first-name" type="text" />
            <Label htmlFor="middle-name">Middle name</Label>
            <TextInput id="middle-name" name="middle-name" type="text" />
            <Label htmlFor="last-name">Last or family name</Label>
            <span className="usa-hint">
              For example, Martinez Gonzalez, Gu, or Smith
            </span>
            <TextInput id="last-name" name="last-name" type="text" />
          </Fieldset>
          <Fieldset legend="Full name" legendStyle="large">
            <Label htmlFor="full-name">Full name</Label>
            <span className="usa-hint">
              For example, Prof. Madeline Martinez Hernandez
            </span>
            <TextInput id="full-name" name="full-name" type="text" />
          </Fieldset>
          <Fieldset legend="Preferred name" legendStyle="large">
            <Label htmlFor="preferred-name">I prefer to be addressed as</Label>
            <span className="usa-hint">
              For example, Dr. Gu, Mrs. Schmidt, Alix Martinez
            </span>
            <TextInput id="preferred-name" name="preferred-name" type="text" />
          </Fieldset>
          <Fieldset legend="Submit" legendStyle="large">
            <Label htmlFor="submit">Submit</Label>
            <span className="submit-hint">Please review before submitting</span>
            <input className="usa-button" type="submit" value="Submit Form" />
          </Fieldset>
        </Form>
      </main>
    </div>
  );
}

export default App;
