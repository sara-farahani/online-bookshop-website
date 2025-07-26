import InstagramIcon from "../assets/logo/social/instagram.svg";
import Linkedin from "../assets/logo/social/linkedin.svg";
import X from "../assets/logo/social/x.svg";
import Cheshmeh from "../assets/logo/publisher/cheshmeh.png";
import Sokhan from "../assets/logo/publisher/sokhan.png";
import Hermes from "../assets/logo/publisher/hermes.png";
import Jangal from "../assets/logo/publisher/jangal.svg";
import Milkan from "../assets/logo/publisher/milkan.png";
import Amirkabir from "../assets/logo/publisher/amirkabir.png";

const words = [
  { text: "سریع‌ترین", imgPath: "/images/ideas.svg" },
  { text: "نزدیک‌ترین", imgPath: "/images/concepts.svg" },
  { text: "به روز ترین", imgPath: "/images/designs.svg" },
  { text: "سریع‌ترین", imgPath: "/images/ideas.svg" },
  { text: "نزدیک‌ترین", imgPath: "/images/concepts.svg" },
  { text: "به روز ترین", imgPath: "/images/designs.svg" },
];

const navLinks = [
  {
    name: "خانه",
    link: "/",
  },
  {
    name: "کتاب الکترونیک",
    link: "/e-books",
  },
  {
    name: "کتاب صوتی",
    link: "audio-books",
  },
  {
    name: "درسی و دانشگاهی",
    link: "/school-university-books",
  },
];

const logoIconsList = [
  {
    name: "نشرچشمه",
    imgPath: Cheshmeh,
  },
  {
    name: "میلکان",
    imgPath: Milkan,
  },
  {
    name: "سخن",
    imgPath: Sokhan,
  },
  {
    name: "امیرکبیر",
    imgPath: Amirkabir,
  },
  {
    name: "جنگل",
    imgPath: Jangal,
  },
  {
    name: "هرمس",
    imgPath: Hermes,
  },
];

const categories = [
  { category: "0", name: "همه" },
  { category: "1", name: "رمان" },
  { category: "2", name: "روانشناسی" },
  { category: "3", name: "زندگی و سفرنامه" },
  { category: "4", name: "تاریخی" },
];

const contentTypes = [
  { contentType: "0", type: "ebook", name: "کتاب‌های متنی" },
  { contentType: "1", type: "audiobook", name: "کتاب‌های صوتی" },
  { contentType: "2", type: " all", name: "همه" },
];

const socialIcons = [
  {
    name: "insta",
    imgPath: InstagramIcon,
    link: "https://instagram.com/yourprofile",
  },
  {
    name: "x",
    imgPath: X,
    link: "https://instagram.com/yourprofile",
  },
  {
    name: "linkedin",
    imgPath: Linkedin,
    link: "https://linkedin.com/in/yourprofile",
  },
];

const itemsTitles = [
  "کتاب‌جو",
  "پرمخاطب‌ترین کتاب‌های صوتی",
  "پیشنهادات هنرمندان",
  "ارتباط با دیگر کتابخوانان",
];
const itemsSubtitles = [
  "ابزار هوش مصنوعی برای یافتن کتاب مورد نظرتان",
  "پرمطالعه‌ترین کتاب‌های کتابینو",
  "برترین کتاب‌ها از دیدگاه هنرمندان",
  "با عضویت در گروه کتابخوانان اپلیکیشن کتابینو با دیگران درباره کتاب‌ها صحبت کنید",
];

export {
  words,
  categories,
  contentTypes,
  logoIconsList,
  socialIcons,
  navLinks,
  itemsTitles,
  itemsSubtitles,
};
