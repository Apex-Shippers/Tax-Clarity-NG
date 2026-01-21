import { createBrowserRouter } from "react-router";
import RootLayout from "./routes/rootLayout";
import RuleLibrary from "./routes/ruleLibrary";
import TaxCalculator from "./routes/taxCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <RuleLibrary /> },
      { path: "tax-calculator", element: <TaxCalculator /> },
    ],
  },
]);
