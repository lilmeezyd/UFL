import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Leaderboard from "./pages/Leaderboard";
import TeamSelection from "./pages/TeamSelection";
import PickTeam from "./pages/PickTeam";
import Points from "./pages/Points";
import Transfers from "./pages/Transfers";
import Teams from "./pages/Teams";
import Matchdays from "./pages/Matchdays";
import Positions from "./pages/Positions";
import Players from "./pages/Players";
import Fixtures from "./pages/Fixtures";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ModalContext } from "./modalContext";
import { useDispatch, useSelector } from "react-redux";
import { getPicks } from "./features/picks/picksSlice";
import { getPlayers, reset } from "./features/players/playerSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { managerPicks } = useSelector((state) => state.managerPicks);
  const { players } = useSelector((state) => state.players);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getPicks());
    dispatch(getPlayers());
  }, [dispatch]);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const onClick = () => {
    //setShowModal(false)
  };
  return (
    <ModalContext.Provider value={showModal}>
      <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <ProtectedRoute
                    redirectPath="/login"
                    isAllowed={!!user.user && !user.user.roles.includes(2048)}
                  />
                }
              >
                <Route
                  path="/teamselection"
                  element={
                    <TeamSelection
                      managerPicks={managerPicks}
                      showPop={showModal}
                      handleShow={handleShow}
                      handleClose={handleClose}
                    />
                  }
                />
                <Route
                  path="/points"
                  element={
                    <Points
                      managerPicks={managerPicks}
                      handleShow={handleShow}
                      handleClose={handleClose}
                    />
                  }
                />
                <Route
                  path="/pickteam"
                  element={
                    <PickTeam
                      managerPicks={managerPicks}
                      handleShow={handleShow}
                      handleClose={handleClose}
                    />
                  }
                />
                <Route
                  path="/transfers"
                  element={
                    <Transfers
                      managerPicks={managerPicks}
                      handleShow={handleShow}
                      handleClose={handleClose}
                    />
                  }
                />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute
                    redirectPath="*"
                    isAllowed={!!user.user && user.user.roles.includes(2048)}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/players" element={<Players />} />
                <Route path="/dashboard/teams" element={<Teams />} />
                <Route path="/dashboard/matchdays" element={<Matchdays />} />
                <Route
                  path="/dashboard/fixtures"
                  element={
                    <Fixtures
                      handleShow={handleShow}
                      handleClose={handleClose}
                    />
                  }
                />
                <Route path="/dashboard/positions" element={<Positions />} />
              </Route>
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
            <Footer />
            {showModal && <div onClick={onClick} className="playerpopup"></div>}
          </div>
        </Router>
        <ToastContainer />
      </>
    </ModalContext.Provider>
  );
}

export default App;
