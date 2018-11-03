import * as React from "react";
import { toast, ToastContainer } from "react-toastify";

import Main from "./components/Main";

import 'react-toastify/dist/ReactToastify.min.css';
import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Main />
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
        />
      </div>
    );
  }
}

export default App;
