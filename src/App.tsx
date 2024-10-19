import Router from "~/router";
import { Header } from "./components/Header";
import { RegistersProvider } from "./contexts/Registers";

function App() {
  return (
    <RegistersProvider>
      <>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </>
    </RegistersProvider>
  );
}

export default App;
