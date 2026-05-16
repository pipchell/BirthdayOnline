let card = document.querySelector(".card");

if (card) {
    card.onclick = (e) => {
        // Only open the card if it isn't already active
        if (!card.classList.contains("active")) {
            card.classList.add("active");
        }
    };
}

function celebrate(event) {
    // Stop the click from bubbling up back to the card container
    event.stopPropagation();

    // Generate confetti explosion
    for (let i = 0; i < 120; i++) {
        let p = document.createElement("div");
        p.className = "particle";

        // Spawn particles directly at the mouse click location
        p.style.left = `${event.clientX}px`;
        p.style.top = `${event.clientY}px`;

        // Give random unique colors matching pipchell accents
        const colors = ['#4696e5', '#337ab7', '#6ba5e9', '#adcff7'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(p);

        // Random spread geometry
        let x = (Math.random() - 0.5) * 1000;
        let y = (Math.random() - 0.5) * 800;

        p.animate(
            [
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            }
        );

        setTimeout(() => {
            p.remove();
        }, 1500);
    }
}
