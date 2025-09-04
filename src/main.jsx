import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init("phc_yXPFqjzDo0hyO01iHeIJDG60joc2j8bnkC9c93Q6haj", {
  api_host: "https://us.i.posthog.com",
  defaults: "2025-05-24",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
