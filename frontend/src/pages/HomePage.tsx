import "../App.css";
import Hero from "../sections/Hero";
import LogoShowcase from "../sections/LogoShowcase";
import AppShowcase from "../sections/ShowcaseSection";
import ShowCategoryBooks from "../sections/ShowCategoryBooks";

function HomePage() {
  return (
    <>
      <Hero />
      <ShowCategoryBooks selectedCategory="0" selectedContentType="0" />

      <ShowCategoryBooks selectedCategory="0" selectedContentType="1" />

      <LogoShowcase />

      <ShowCategoryBooks selectedCategory="1" selectedContentType="2" />

      <AppShowcase />

      <ShowCategoryBooks selectedCategory="2" selectedContentType="2" />
    </>
  );
}

export default HomePage;
