import { createBrowserRouter } from "react-router";
import RootLayout from "./routes/rootLayout";
import Landing from "./routes/landing";
import RuleLibrary from "./routes/ruleLibrary";
import TaxCalculator from "./routes/taxCalculator";
import Status from "./routes/status";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "index", element: <Landing /> },
      { path: "rule-library", element: <RuleLibrary /> },
      { path: "tax-calculator", element: <TaxCalculator /> },
      { path: "status", element: <Status /> },
    ],
  },
]);
