import { useState, useEffect } from "react";
import "./App.css";
import {
  Alert,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useQuery, useQueryClient } from "react-query";

const ping = async () => {
  // Perform a ping-like check by attempting to fetch a resource
  try {
    const response = await fetch("https://8.8.8.8", { method: "HEAD" }); // Ping Google's Public DNS
    if (response.ok) {
      return "Online"; // If the request is successful, consider it online
    } else {
      throw new Error("Not reachable");
    }
  } catch (error) {
    throw new Error("Not reachable");
  }
};

function App() {
  const { refetch } = useQuery("offlineQuery", ping, {
    staleTime: Infinity, // Set to Infinity to keep data even when offline
  });
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      // You may want to refetch data when the app comes online
      // You can do that by using the refetch function from the useQuery hook
      setOnlineStatus(true);
      refetch();
    };

    const handleOffline = () => {
      setOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // need this cleanup, else event listeners are immediately removed
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [refetch]);

  return (
    <div className="App">
      <Alert
        type={onlineStatus ? "success" : "error"}
        headingLevel={"h1"}
        hidden={false}
      >
        {onlineStatus ? "Application online!" : "Application currently offline"}
      </Alert>
      <main className="main-wrapper">
        <Form onSubmit={() => console.log("submit")} className="noaa-form">
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
