import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-center marquee-item">
      <h2>{icon.name}</h2>
      <img className="m-1 w-15" src={icon.imgPath} alt="" />
    </div>
  );
};

const LogoShowcase = () => (
  <section className="py-12 px-14 bg-purple-300">
    <div>
      <h3 className="text-2xl ">همکاری با بهترین ناشران</h3>
    </div>
    <div className="overflow-hidden relative h-32">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <>
            <LogoIcon key={index} icon={icon} />
          </>
        ))}

        {logoIconsList.map((icon, index) => (
          <>
            <LogoIcon key={index} icon={icon} />
          </>
        ))}
      </div>
    </div>
  </section>
);

export default LogoShowcase;
