import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Columns />
    </S.Container>
  );
};
export default DashboardPage;
