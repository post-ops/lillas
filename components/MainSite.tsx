import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Products from "./Products";
import Industries from "./Industries";
import Clients from "./Clients";
import Contact from "./Contact";
import Footer from "./Footer";

export default function MainSite() {
  return (
    <div className="bg-[#0b0e14]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Industries />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
