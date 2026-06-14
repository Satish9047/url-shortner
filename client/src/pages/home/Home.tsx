import Shortern from "../../components/Shortern";

const Home = () => {
  return (
    <section className="flex flex-col items-center w-full justify-center min-h-screen bg-black">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <Shortern />
      </div>
    </section>
  );
};

export default Home;
