import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { routes } from "./store/routes";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">
          <Routes>
            {routes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
