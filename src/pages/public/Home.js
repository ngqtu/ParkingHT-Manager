import "assets/css/home.css"
import { CircleChart, LineChartStatistical, Loader, StatsCard } from "components";
import { useSelector } from "react-redux";

const Home = () => {
  const { loading } = useSelector((state) => state.dashboard);
  return (
    <>
      {loading && <Loader />}
      <div className="home">
        <header>
          <h1 className="homeTitle">Bảng điều khiển</h1>
        </header>
        <hr className="homeHr" />
        <div className="homeContainer">
          <main className="homeMain">
            <StatsCard />
            <LineChartStatistical />
          </main>
          <aside className="homeAside">
            <CircleChart />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;
