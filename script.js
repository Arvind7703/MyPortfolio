let tl = gsap.timeline();
let body = document.querySelector("body");
let cursorScale = document.querySelector(".nav-opt");

let smoothScrolling = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

let navAnimation = () => {
  tl.from("nav", {
    y: -130,
    duration: 0.8,
    delay: 0.5,
  });

  gsap.from("#brand-logo", {
    x: -150,
    opacity: 0,
    duration: 1.6,
    ease: "bounce.out",
  });

  let logoImg = document.querySelector("#brand-logo");
  logoImg.addEventListener("mouseenter", () => {
    gsap.to("#brand-logo", {
      rotate: 180,
      duration: 0.3,
    });
  });
  logoImg.addEventListener("mouseleave", () => {
    gsap.to("#brand-logo", {
      rotate: 0,
      duration: 0.3,
    });
  });

  tl.from("#brand-name", {
    x: 80,
    opacity: 0,
    duration: 0.3,
    ease: "bounce.out",
  });

  tl.from(".nav-opt", {
    y: -60,
    duration: 0.8,
    stagger: 0.1,
    ease: "bounce.out",
  });
};

let mouseFollowerAnimation = () => {
  body.addEventListener("mousemove", (e) => {
    gsap.to("#mousefollower img", {
      x: e.x - 8,
      y: e.y - 9,
      display: "block",
    });
  });
};

let introAnimation = () => {
  gsap.from(".intro2", {
    y: 180,
    opacity: 0,
    duration: 2,
    stagger: 1.5,
  });

  let typerWritter = () => {
    let name = document.querySelector(".intro2");
    let nameString = name.textContent;
    let arrName = nameString.split("");
    let blank = "";
    arrName.forEach((elem) => {
      blank += `<span>${elem}</span>`;
    });
    name.innerHTML = blank;
  };
  typerWritter();

  // intor animation interval after completeion

  let isAnimating = false;

  setInterval(() => {
    const elem = document.querySelectorAll(".intro2 span");
    if (elem.length > 0 && !isAnimating) {
      isAnimating = true;
      gsap.killTweensOf(elem);
      gsap.from(elem, {
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  }, 5000);
};

let imgAndLineAnimation = () => {
  gsap.from(".hero-img img, .resume-btn", {
    transform: "scale(0)",
    rotate: 45,
    duration: 1.7,
    ease: "back.out(2)",
    onComplete: () => {
      document.querySelector(".hero-img img").classList.add("animate");
    },
  });

  let path = "M 50 30 Q 95 30 1200 30";
  let finalPath = "M 50 30 Q 95 30 1200 30";
  let line = document.querySelector(".straight-line");
  let guitarEffect = () => {
    line.addEventListener("mousemove", (e) => {
      path = `M 50 30 Q ${e.x - 380} ${e.y - 380} 1200 30`;
      gsap.to("svg path", {
        attr: { d: path },
      });
    });
  };

  guitarEffect();

  line.addEventListener("mouseleave", () => {
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 0.9,
      ease: "elastic.out(0.5)",
    });
  });
};

let aboutPageAnimation = () => {
  if (window.innerWidth > 800) {
    gsap.from(".intro-part1", {
      scrollTrigger: {
        trigger: ".aboutMe",
        duration:0.5,
        scrub: true,
        pin: true,
      },
      x: -200,
      opacity: 0,
    });
    gsap.from(".intro-part2", {
      scrollTrigger: {
        trigger: ".aboutMe",
        duration:0.5,
        scrub: true,
        pin: true,
      },
      x: 200,
      opacity: 0,
    });
  } else {
    gsap.from(".intro-part1", {
      scrollTrigger: {
        trigger: ".aboutMe",
        duration:0.5,
        scrub: true,

        pin: true,
      },
      x: -200,
      opacity: 0,
    });
    gsap.from(".intro-part2", {
      scrollTrigger: {
        trigger: ".aboutMe",
        duration:0.5,

        pin: true,
        scrub: true,
      },
      x: 200,
      opacity: 0,
    });
  }
};

let skillAnimation = () => {
  const mediaQuery = window.matchMedia("(max-width: 699px)");

  gsap.utils.toArray('.skill-category').forEach(category => {
    if (mediaQuery.matches) {
      // Animation for screens narrower than 700px
      gsap.from(category.querySelector('h2'), {
        scrollTrigger: {
          trigger: category,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
        opacity: 0,
        x: 20,
      });

      gsap.from(category.querySelectorAll('.skill-logo'), {
        scrollTrigger: {
          trigger: category,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.1
      });
    } else {
      // Animation for screens wider than 700px
      gsap.from(category.querySelector('h2'), {
        scrollTrigger: {
          trigger: category,
          start: 'top center',
          end: 'top',
          scrub: true,
        },
        opacity: 0,
        x: 20,
      });

      gsap.from(category.querySelectorAll('.skill-logo'), {
        scrollTrigger: {
          trigger: category,
          start: 'top center',
          end: 'top',
          scrub: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.1
      });
    }
  });
};

let hamburgerMenu = () =>{
  document.getElementById('menu-icon').addEventListener('click', function() {
    this.classList.toggle('active');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  navAnimation();
  mouseFollowerAnimation();
  introAnimation();
  imgAndLineAnimation();
  aboutPageAnimation();
  skillAnimation();
  hamburgerMenu();
});

