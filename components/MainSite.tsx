import Navbar from "./Navbar.new";
import Hero from "./Hero.new";
import About from "./About.new";
import Products from "./Products.new";
import Industries from "./Industries.new";
import Clients from "./Clients.new";
import Contact from "./Contact.new";
import Footer from "./Footer.new";

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
