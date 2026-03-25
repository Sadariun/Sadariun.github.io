document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".wrapper");
    const batyscapheOverlay = document.querySelector(".batyscaphe-overlay");
    const btnUp = document.getElementById("btnUp");
    const btnDown = document.getElementById("btnDown");
    const sections = document.querySelectorAll(".portfolio-section");
    let currentSection = 0;
    const totalSections = sections.length;
    let isAnimating = false;

    // Запрет скролла
    function preventScroll(e) {
        e.preventDefault();
    }
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    function goToSection(index, pause = 5000) {
        if (isAnimating || index >= totalSections) return;

        isAnimating = true;
        currentSection = index;
        const translateY = -currentSection * 200;

        wrapper.style.transform = `translateY(${translateY}vh)`;
        batyscapheOverlay.style.transform = `translateY(${-translateY}vh)`;
        btnUp.classList.toggle("disabled");
        btnDown.classList.toggle("disabled");
        setTimeout(() => {
            !(currentSection === 0) && btnUp.classList.remove("disabled");
            !(currentSection === totalSections - 1) &&
                btnDown.classList.remove("disabled");
            isAnimating = false;
        }, pause);
    }

    // Инициализация позиции
    function initPosition() {
        goToSection(0, 0);
    }

    btnUp.addEventListener("click", () => goToSection(currentSection - 1));
    btnDown.addEventListener("click", () => goToSection(currentSection + 1));

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") goToSection(currentSection - 1);
        if (e.key === "ArrowDown") goToSection(currentSection + 1);
    });

    initPosition();

    wrapper.addEventListener("transitionend", () => {
        isAnimating = false;
    });

    let panel = document.querySelector(".right-wall-panel");
    let isPanelHovered = false;

    panel &&
        panel.addEventListener("mouseenter", () => (isPanelHovered = true));
    panel &&
        panel.addEventListener("mouseleave", () => (isPanelHovered = false));

    window.addEventListener("scroll", () => {
        if (!isPanelHovered && panel) {
            panel.style.transform = `translateY(-50%) translateX(70%)`;
        }
    });
});
