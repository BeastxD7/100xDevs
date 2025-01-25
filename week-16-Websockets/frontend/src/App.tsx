import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { Children, createContext } from "react";
import { SocketProvider } from "./Contexts/SocketProvider";

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;
