import Head from "next/head";
import Card from "../../src/components/dashboard/card/card";
import Chart from "../../src/components/dashboard/chart/chart";
import Rightbar from "../../src/components/dashboard/rightbar/rightbar";

function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Theatrica</title>
      </Head>
      <div className="mt-14 p-5 bg-gray-400 rounded-lg flex gap-5">
        <div className="basis-3/4 flex flex-col gap-5">
          <div className="flex gap-5 justify-between">
            <Card title="Σύνολο χρηστών" />
            <Card title="Χρήστες απο αλλα Site" />
            <Card title="Χρήστες απο adds" />
          </div>
          {/* Edw prepei na balw add ena akoma component alla den jerw  ti akoma */}
          <Chart />
        </div>
        <div className="basis-1/4">
          <Rightbar />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
