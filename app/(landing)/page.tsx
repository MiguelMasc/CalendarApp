
import Footer from "./_components/footer";
import { Heading } from "./_components/heading";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
