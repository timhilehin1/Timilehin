import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbWorld } from "react-icons/tb";
import { trackResumeDownload } from "../utils/ga4";

function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNameExpanded, setIsNameExpanded] = useState(false);
  useEffect(() => {
    //loader
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    //for persistence
    const storedTheme = localStorage.getItem("theme") || "";
    setTheme(storedTheme);

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const sections = document.querySelectorAll("section");
  //       const scrollPosition = window.scrollY;

  //       sections.forEach((section) => {
  //         const sectionTop = section.offsetTop - 100;
  //         const sectionBottom = sectionTop + section.offsetHeight;

  //         if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
  //           setActiveSection(section.id);
  //         }
  //       });
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of viewport

      let currentSection = "";

      sections.forEach((section: any) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100;
      const offset =
        sectionId === "intro" ? 0 : section.offsetTop - headerOffset;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  //   const toggleTheme = () => {
  //     // for switching
  //     const newTheme = theme === "dark" ? "" : "dark";
  //     setTheme(newTheme);
  //     localStorage.setItem("theme", newTheme);

  //     if (newTheme === "dark") {
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       document.documentElement.classList.remove("dark");
  //     }
  //   };

  const handleLogoClick = () => {
    // Toggle name expansion on mobile instead of refreshing the page
    if (window.innerWidth < 768) {
      setIsNameExpanded(!isNameExpanded);
    } else {
      window.location.reload();
    }
  };

  const remainingFirstName = "ladapo".split("");
  const remainingLastName = "imilehin".split("");

  const sections = [
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "experience", title: "Experience" },
  ];

  const workProjects = [
    {
      title: "Luscious Chow",
      description: "A website for a food delivery business",
      tags: ["HTML", "CSS", "Typecript", "Sanity", "NextJs", "Tailwind"],
      link: "https://www.lusciouschow.com/",
      platforms: [{ icon: TbWorld, color: "#4285F4" }],
    },
    {
      title: "Author's Portfolio",
      description: "Custom made Portfolio for award winning Author",
      tags: ["HTML", "Typecript", "Sanity", "NextJs", "Tailwind"],
      link: "https://www.stephanieodili.com/",
      platforms: [{ icon: TbWorld, color: "#4285F4" }],
    },
    {
      title: "Church Website",
      description:
        "Updated the church website to make it easier for members and visitors to find service details, upcoming events, and media content",
      tags: ["HTML", "Typecript", "Sanity", "NextJs", "Tailwind"],
      link: "https://www.siglomlife.com/",
      platforms: [{ icon: TbWorld, color: "#4285F4" }],
    },
  ];

  const handleClick = () => {
    trackResumeDownload();
  };

  return (
    <section
      className={`layout ${theme} relative h-full  min-h-screen bg-black text-white`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="h-screen w-screen flex items-center justify-center "
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                className="text-[12vw] md:text-[8vw] font-medium leading-none"
                animate={{
                  opacity: [1, 0],
                  y: [0, -20],
                  transition: { duration: 0.5, delay: 1.5 },
                }}
              >
                OT
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            {/* Logo */}
            <motion.div
              className="fixed top-8 left-4 md:left-8 z-50 cursor-pointer"
              onHoverStart={() => setIsNameExpanded(true)}
              onHoverEnd={() => setIsNameExpanded(false)}
              onClick={handleLogoClick}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative text-3xl font-medium flex">
                <span>
                  O
                  <AnimatePresence>
                    {isNameExpanded && (
                      <div className="inline-flex">
                        {remainingFirstName.map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{
                              duration: 0.1,
                              delay: index * 0.02,
                              ease: "easeOut",
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </span>

                <span>
                  T
                  <AnimatePresence>
                    {isNameExpanded && (
                      <div className="inline-flex">
                        {remainingLastName.map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{
                              duration: 0.1,
                              delay: index * 0.02,
                              ease: "easeOut",
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="fixed top-8 right-4 z-50 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-2">
                <span
                  className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-[#fefeff] transition-opacity ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed inset-0 bg-black z-40 md:hidden pt-24 px-8"
                >
                  {sections.map(({ id, title }) => (
                    <div key={id} className="mb-6">
                      <button
                        onClick={() => scrollToSection(id)}
                        className="text-2xl font-medium"
                      >
                        <span
                          className={`${
                            activeSection === id
                              ? "text-[#fefeff]"
                              : "text-[#969696]"
                          }`}
                        >
                          {title}
                        </span>
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            {/* <header className="p-4 md:p-8 pt-24 md:pt-8">
              <div className="relative md:static mb-8">
                <div
                  className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"
                  style={{
                    opacity: scrollPosition > 0 ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                ></div>
                <div className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 md:gap-8 justify-start md:justify-center text-sm overflow-x-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  {(
                    [
                      "anyone",
                      "recruiters",
                      "engineers",
                      "product-managers",
                    ] as AudienceType[]
                  ).map((audience) => (
                    <button
                      key={audience}
                      onClick={() => setSelectedAudience(audience)}
                      className={`transition-colors whitespace-nowrap flex-shrink-0 ${
                        selectedAudience === audience
                          ? "text-[#fefeff] font-medium"
                          : "text-[#969696] hover:text-[#fefeff]"
                      }`}
                    >
                      {audienceContent[audience].title}
                    </button>
                  ))}
                </div>
              </div>
            </header> */}

            {/* Desktop Navigation */}
            <aside className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
              {sections.map(({ id, title }) => (
                <div key={id} className="mb-4 text-left">
                  <button
                    onClick={() => scrollToSection(id)}
                    className="group flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <span
                      className={`transition-all duration-300 ${
                        activeSection === id
                          ? "text-[#fefeff]"
                          : "text-[#969696]"
                      }`}
                    >
                      {title}
                    </span>
                  </button>
                </div>
              ))}
            </aside>

            {/* //main content */}
            <main className="flex-grow pt-24 md:pt-8">
              <section id="about" className=" h-full md:h-screen px-4 md:px-24">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center max-w-7xl mx-auto"
                >
                  <p className="text-3xl md:text-6xl text-[#fefeff] leading-tight mb-12 max-w-3xl mx-auto">
                    No problem, no tech. I build web solutions that solve real
                    issues because technology is only as useful as the problem
                    it solves.
                  </p>
                  <a
                    onClick={handleClick}
                    href="/OLADAPO_TIMILEHIN_FRONTEND_CV.pdf"
                    download="OLADAPO_TIMILEHIN_FRONTEND_CV.pdf"
                    className="hover:text-[#fefeff] transition-colors text-sm text-[#969696]"
                  >
                    Download Resume
                  </a>
                </motion.div>
              </section>
              <section
                id="projects"
                className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20"
              >
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">
                    Projects
                  </h2>
                  <div className="grid gap-8 md:gap-16 max-w-2xl mx-auto">
                    {workProjects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="group"
                        whileHover={{ y: -10 }}
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 md:p-8 border border-[#969696] rounded-lg hover:border-[#969696] transition-colors relative"
                        >
                          <h3 className="text-xl md:text-2xl font-medium mb-4">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[#fefeff] mb-6">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            {project.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-sm text-[#969696]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="absolute top-4 right-4 flex gap-2">
                            {project.platforms.map((Platform, i) => (
                              <Platform.icon
                                key={i}
                                className="text-xl group-hover:animate-spin"
                                style={
                                  Platform.color
                                    ? { color: Platform.color }
                                    : {}
                                }
                              />
                            ))}
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
              <section
                id="experience"
                className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20"
              >
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">
                    Experience
                  </h2>
                  <div className="max-w-2xl mx-auto">
                    <div className="relative w-32 h-full mb-8">
                      <img
                        src="/princeps-logo.png"
                        className="object-contain w-full h-full"
                        alt="Princeps Logo"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="font-mono text-sm text-[#969696]">
                        PRINCEPS CREDIT SYSTEMS LIMITED
                      </p>
                      <h3 className="text-3xl font-medium text-[#fefeff]">
                        FRONTEND DEVELOPER
                      </h3>
                      <p className="text-sm text-[#fefeff]">Present</p>
                      <p className="text-sm text-[#969696]">
                        I Collaborate with the engineering team to build
                        features and maintain frontend interfaces for a loan
                        application portal. last year, organization's
                        disbursement amount increased from 1Billion naira to 9
                        Billion naira.
                      </p>
                    </div>
                    <br />
                    <br />
                    <div className="mt-16">
                      <div className="relative w-32 flex-shrink-0 mb-8 ">
                        <img
                          src="/neptune-logo.png"
                          className="object-contain w-full h-full"
                          alt="Neptune Logo"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="font-mono text-sm text-[#969696]">
                          NEPTUNE SOFTWARE GROUP
                        </p>
                        <h3 className="text-4xl font-medium text-[#fefeff]">
                          Software Developer
                        </h3>
                        <p className="text-sm text-[#fefeff]">2022 - 2024</p>
                        <p className="text-sm text-[#969696]">
                          I contributed to the Neptune Software Group by
                          building web applications that support the
                          organization's core banking application, I also
                          developed applications that financial organization
                          used to log millions of naira
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="px-4 md:px-24 py-8 text-[#969696]">
              <div className="flex items-center gap-2 justify-center mt-4">
                <div className="relative">
                  <div className="w-2 h-2 bg-[#fefeff] rounded-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#fefeff] rounded-full animate-[ping_1.5s_ease-in-out_infinite] opacity-90"></div>
                </div>
                <p className="text-l text-[#969696]">
                  Looking for new opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8 pt-8 justify-center">
                <a
                  href="https://www.linkedin.com/in/timilehinoladapo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                >
                  LinkedIn
                </a>
                <a
                  href="http://www.github.com/timhilehin1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                >
                  GitHub
                </a>
                <a
                  href="mailto:timilehinoladapo0@gmail.com"
                  className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                >
                  Email Me
                </a>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Home;
