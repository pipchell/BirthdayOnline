document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".card");

    card.addEventListener("click", () => {
        if (card.classList.contains("active")) return;

        card.classList.add("active");

        celebrate();

        setTimeout(() => {
            card.classList.add("show-text");
        }, 1000);
    });
});

function celebrate() {
    for (let i = 0; i < 150; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        const colors = ['#4696e5', '#ff6b6b', '#feca57', '#1dd1a1', '#ff9ff3', '#54a0ff'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(p);

        let x = (Math.random() - 0.5) * window.innerWidth * 1.4;
        let y = (Math.random() - 0.5) * window.innerHeight * 1.4;

        p.animate([
            { transform: "translate(-50%,-50%)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
        ], {
            duration: 2200
        });

        setTimeout(() => p.remove(), 2200);
    }
}document.addEventListener("DOMContentLoaded", () => {
    let card = document.querySelector(".card");

    if (card) {
        card.addEventListener("click", () => {
            if (!card.classList.contains("active")) {
                card.classList.add("active");

                celebrate();

                // reveal text after 2 seconds
                setTimeout(() => {
                    card.classList.add("show-text");
                }, 1000);
            }
        });
    }
});

function celebrate() {
    for (let i = 0; i < 150; i++) {
        let p = document.createElement("div");
        p.className = "particle";

        const colors = ['#4696e5', '#ff6b6b', '#feca57', '#1dd1a1', '#ff9ff3', '#54a0ff'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];

        p.style.left = "50%";
        p.style.top = "50%";

        document.body.appendChild(p);

        let x = (Math.random() - 0.5) * window.innerWidth * 1.4;
        let y = (Math.random() - 0.5) * window.innerHeight * 1.4;

        p.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${x}px, ${y}px) scale(0.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 2200,
                easing: "cubic-bezier(0.1, 0.8, 0.25, 1)"
            }
        );

        setTimeout(() => {
            p.remove();
        }, 2200);
    }
}
