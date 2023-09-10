import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function RoutesApp() {
   return (
      <Router>
         <Routes>
            <Route path="/" index element={<Home />} />
         </Routes>
      </Router>
   );
}
