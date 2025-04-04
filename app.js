// Initialize Particles.js Background
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00e1ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#00e1ff", opacity: 0.3, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Sound Toggle
    const soundToggle = document.getElementById('soundToggle');
    let soundEnabled = false;
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        // Implement sound logic here
    });

    // Copy Contract Address
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
        const contractAddress = document.getElementById('contractAddress').textContent;
        navigator.clipboard.writeText(contractAddress);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'COPY';
        }, 2000);
    });

    // Wallet Connection
    const connectWallet = document.getElementById('connectWallet');
    connectWallet.addEventListener('click', async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                console.log('Connected to:', response.publicKey.toString());
                connectWallet.textContent = 'Connected!';
            } catch (err) {
                console.error('Connection error:', err);
                connectWallet.textContent = 'Error!';
            }
        } else {
            window.open('https://phantom.app/', '_blank');
        }
    });
});