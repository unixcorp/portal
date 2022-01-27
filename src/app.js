import React from "react";
import Games from "./layouts/games";

const createScrollStopListener = (element, callback, timeout) => {
  let removed = false;
  let handle = null;
  const onScroll = () => {
      if (handle) {
          clearTimeout(handle);
      }
      handle = setTimeout(callback, timeout || 200); // default 200 ms
  };
  element.addEventListener('scroll', onScroll);
  return () => {
      if (removed) {
          return;
      }
      removed = true;
      if (handle) {
        clearTimeout(handle);
      }
    element.removeEventListener('scroll', onScroll);
  };
};

export function App() {
  // const animationRef = React.useRef(null);
  // React.useEffect(() => {
  //   animationRef.current = anime({
  //     targets: ".el",
  //     translateX: 250,
  //     delay: function(el, i) {
  //       return i * 100;
  //     },
  //     loop: true,
  //     direction: "alternate",
  //     easing: "easeInOutSine"
  //   });
  // }, []);
  
  const [ypos, setypos] = React.useState(window.pageYOffset);
  const [onscrollstop, setOnscrollstop] = React.useState(false);
  React.useEffect(() => {
    const sections = document.querySelectorAll("section");
    const nav = document.querySelectorAll("nav a");
    const onScroll = () => {
      setOnscrollstop(false);
      setypos(window.pageYOffset);
      var current = "";
    
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id"); }
      });
    
      nav.forEach((a) => {
        a.classList.remove("active","text-amber-400","text-white");
        if (a.getAttribute('href')===('#'+current)) {
          a.classList.add("active","text-amber-400");
        }else{
          a.classList.add("text-white");
        }
      });
    };
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    const destroyListener = createScrollStopListener(window, () => {
      setOnscrollstop(true);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      destroyListener();
    }
  }, []);

return(
<>
<div className="fixed w-screen" id="navbar" style={{zIndex:9999}}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="flex justify-between items-center py-6 md:space-x-10">
      <nav className="hidden md:flex space-x-10">
        <a href="#home" className="relative text-base font-medium dash-bot hover:text-amber-400 active text-amber-400">
          Home
        </a>
        <a href="#games" className="relative text-base font-medium dash-bot hover:text-amber-400 text-white">
          Games
        </a>
        <a href="#events" className="relative text-base font-medium dash-bot hover:text-amber-400 text-white">
          Events
        </a>
        <a href="#faq" className="relative text-base font-medium dash-bot hover:text-amber-400 text-white">
          faq
        </a>
      </nav>
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <a href="javascript:void(0)" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
          Sign in
        </a>
        <a href="javascript:void(0)" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Sign up
        </a>
      </div>
    </div>
  </div>
</div>
<section className="relative" id="home">
  <div className="max-w-5xl min-h-screen mx-auto px-4 sm:px-6 table w-full">
    <div className="table-cell align-middle">
      <p className="text-3xl uppercase text-center text-white font-medium my-5">unixcorp</p>
      <div className="block relative">
        <div className="inline-block w-1/2 my-3 pr-10" id="current-event">
          <div className="pt-[56%] bg-white" >
          </div>
          <div className="relative w-full bg-indigo-600 py-3" >
            <p className="text-base text-center text-white font-medium">End in 11:34:23</p>
          </div>
        </div>
        <span className="border-l-2 border-neutral-400 absolute top-0 right-1/2 h-full" id="divider-event"></span>
        <div className="inline-block w-1/2 my-3 pl-10" id="upcoming-event">
          <div className="pt-[56%] bg-white" >
          </div>
          <div className="relative w-full bg-neutral-400 py-3" >
            <p className="text-base text-center text-white font-medium">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<Games ypos={ypos} onscrollstop={onscrollstop} />
<section className="relative" id="events">
  <div className="min-h-screen mx-auto px-4 sm:px-6 table w-full bg-yellow-600">
    
  </div>
</section>
</>
);
}