import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import List from "./pages/List";
import PrivateRoute from "./components/PrivateRoute";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="body" style={{ padding: "20px" }}>
          <Outlet />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/list"
              element={
                <PrivateRoute>
                  <List />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
