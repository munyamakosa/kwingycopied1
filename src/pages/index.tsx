import Section13 from "@component/home-1/Section13";
import Section1 from "../components/home-1/Section1";
import Section10 from "../components/home-1/Section10";
import Section11 from "../components/home-1/Section11";
import Section2 from "../components/home-1/Section2";
import AppLayout from "../components/layout/AppLayout";

const IndexPage = () => {
  return (
    <main>
      <Section1 />
      <Section2 />
      <Section13 />
      <Section10 />
      <Section11 />
    </main>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;
