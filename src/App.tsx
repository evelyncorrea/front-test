import Router from "~/router";
import { Header } from "./components/Header";
import { RegistersProvider } from "./contexts/Registers";
import { Loading } from "./components/Loading";
import { ActionToaster } from "./components/ActionToaster";

function App() {
  return (
    <RegistersProvider>
      <>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Loading />
        <ActionToaster />
        <Router />
      </>
    </RegistersProvider>
  );
}

export default App;
