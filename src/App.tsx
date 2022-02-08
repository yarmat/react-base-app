import React, {Suspense} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Spinner from "./components/Spinner";

function App() {
  return (
      <Suspense fallback={<Spinner />}>
          <AppRouter />
      </Suspense>
  );
}

export default App;
