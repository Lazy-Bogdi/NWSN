import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Board from './components/board/Board';
import Login from './components/home/Login';
import GoogleCallback from './components/GoogleCallback';
import { ModalProvider, useModal } from './contexts/ModalContext';
import Modal from './components/auth/Modal';
import './App.css';


const AppContent: React.FC = () => {
  const { isOpen, title, message, closeModal } = useModal();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<GoogleCallback />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/board"
          element={
            <Board />
          }
        />
      </Routes>
      <Modal isOpen={isOpen} message={message} title={title} closeModal={closeModal} />
    </>
  );
};

function App() {
  return (
    <Router basename="/NWS-social-network">
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </Router>
  );
}

export default App;
