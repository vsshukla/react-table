// import React from "react";
// import "./App.css";
// import UsersTable from "./features/users/UsersTable";

// function App() {
//   return (
//     <div className="App">
//       <h1>Users Table</h1>
//       <UsersTable />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Table from "./components/Table";
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Table />
      </div>
    </Provider>
  );
};
export default App;
