import { createBrowserRouter } from "react-router";
import RootLayout from "./routes/rootLayout";
import RuleLibrary from "./routes/ruleLibrary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <RuleLibrary /> }],
  },
]);
