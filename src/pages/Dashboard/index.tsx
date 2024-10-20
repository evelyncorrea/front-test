import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { ActionToaster } from "~/components/ActionToaster";

const DashboardPage = () => {
  return (
    <S.Container>
      <ActionToaster />
      <SearchBar />
      <Columns />
    </S.Container>
  );
};
export default DashboardPage;
