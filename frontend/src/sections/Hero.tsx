import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import cheshmeh from "../assets/logo/publisher/cheshmeh.png";
import hermes from "../assets/logo/Publisher/hermes.png";
import milkan from "../assets/logo/publisher/milkan.png";

const Hero = () => {
  const container = useRef(null);

  const words = ["سریع‌ترین", "نزدیک‌ترین", "به‌روزترین"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-icon", {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={container}
      className="w-full text-black h-[80vh] w-full flex items-center justify-center relative bg-linear-65 from-pink-300 to-purple-300"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-white-800 text-center">
        <span
          className={`text-white transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {words[index]}
        </span>{" "}
        کتابفروشی شهر
      </h1>

      <img
        src={cheshmeh}
        className="hero-icon bg-gray-100 absolute w-20 top-1/3 left-1/8"
        alt="icon1"
      />
      <img
        src={milkan}
        className="hero-icon bg-gray-100 absolute bottom-10 right-1/3"
        alt="icon2"
      />
      <img
        src={hermes}
        className="hero-icon absolute w-20 top-1/3 right-10"
        alt="icon3"
      />
    </section>
  );
};

export default Hero;
