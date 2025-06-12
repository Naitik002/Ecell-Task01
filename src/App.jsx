import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamMemberForm from "./components/Home.jsx";
import Teamlist from "./components/Cards.jsx";

// Root App Component
export default function App() {
  const [members, setMembers] = useState(() => {
    const data = localStorage.getItem("members");
    return data ? JSON.parse(data) : [];
  });

  const [currentEdit, setCurrentEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const saveMember = (member) => {
    if (currentEdit) {
      setMembers((all) =>
        all.map((m) => (m.id === currentEdit.id ? member : m))
      );
      setCurrentEdit(null);
    } else {
      setMembers((all) => [...all, member]);
    }
  };

  const removeMember = (id) => {
    setMembers((all) => all.filter((m) => m.id !== id));
  };

  const resetEdit = () => setCurrentEdit(null);

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={1200} />
      <Routes>
        <Route
          path="/"
          element={
            <TeamMemberForm
              saveUser={saveMember}
              resetEdit={resetEdit}
              currentEdit={currentEdit}
            />
          }
        />
        <Route
          path="/team"
          element={
            <Teamlist
              members={members}
              removeMember={removeMember}
              editMember={setCurrentEdit}
            />
          }
        />
      </Routes>
    </Router>
  );
}