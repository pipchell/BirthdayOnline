let card = document.querySelector(".card");

if (card) {
    card.onclick = () => {
        // Only trigger if the card isn't opened yet
        if (!card.classList.contains("active")) {
            card.classList.add("active");
            celebrate(); // Instantly burst background particles on open action
        }
    };
}

function celebrate() {
    // Generate an explosive burst of confetti pieces
    for (let i = 0; i < 150; i++) {
        let p = document.createElement("div");
        p.className = "particle";

        // Randomize festive pastel/bright colored items
        const colors = ['#4696e5', '#ff6b6b', '#feca57', '#1dd1a1', '#ff9ff3', '#54a0ff'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Start particles from center viewport positioning
        p.style.left = "50%";
        p.style.top = "50%";

        document.body.appendChild(p);

        // Generate dynamic expansion dispersion scatter points
        let x = (Math.random() - 0.5) * window.innerWidth * 1.2;
        let y = (Math.random() - 0.5) * window.innerHeight * 1.2;

        p.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${x}px, ${y}px) scale(0.4)`,
                    opacity: 0
                }
            ],
            {
                duration: 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.25, 1)'
            }
        );

        setTimeout(() => {
            p.remove();
        }, 2000);
    }
}
