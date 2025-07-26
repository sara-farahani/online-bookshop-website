import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { itemsTitles, itemsSubtitles } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const bgColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-yellow-600",
    "bg-gray-400",
  ];

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  useGSAP(() => {
    itemRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8 * index,
            scrollTrigger: {
              trigger: el,
              start: "top 0%",
              once: false,
            },
          }
        );
      }
    });
  }, []);

  return (
    <>
      <section ref={sectionRef} className="p-6 bg-gray-100">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`${bgColors[i]} p-6 rounded shadow`}
            >
              <h2 className="text-xl font-bold p-2">{itemsTitles[i]}</h2>
              <h3 className="text-lg font-medium p-2">{itemsSubtitles[i]}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AppShowcase;
