import { useState } from "react";
import LogIn from "./components/login";
import Notes from "./components/Notes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      {isLoggedIn ? (
        <Notes setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LogIn setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
