document.addEventListener('DOMContentLoaded', function() {
    // ==================== BACKGROUND EFFECTS ====================
    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 120, 
                    density: { 
                        enable: true, 
                        value_area: 1000 
                    } 
                },
                color: { 
                    value: ["#00e1ff", "#ff00f7"] 
                },
                shape: { 
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 180,
                    color: "#00e1ff",
                    opacity: 0.4,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ==================== SOUND TOGGLE ====================
    const soundToggle = document.getElementById('soundToggle');
    let soundEnabled = false;
    const bgMusic = new Audio('assets/sound/background.mp3'); // Ganti dengan path file audio Anda
    bgMusic.loop = true;
    
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        
        if (soundEnabled) {
            bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
            bgMusic.pause();
        }
    });

    // ==================== WALLET CONNECTION ====================
    const connectWallet = document.getElementById('connectWallet');
    
    if (connectWallet) {
        connectWallet.addEventListener('click', async () => {
            // Animation feedback
            connectWallet.disabled = true;
            connectWallet.textContent = 'Connecting...';
            
            try {
                if (window.solana && window.solana.isPhantom) {
                    const response = await window.solana.connect();
                    const publicKey = response.publicKey.toString();
                    
                    console.log('Connected to:', publicKey);
                    connectWallet.textContent = 'Connected!';
                    
                    // Simpan wallet address di localStorage
                    localStorage.setItem('walletAddress', publicKey);
                    
                    // Tambahkan efek visual setelah connect
                    connectWallet.classList.add('connected');
                    
                    // Update UI atau lakukan action setelah connect
                    updateUIAfterConnect(publicKey);
                    
                } else {
                    // Jika Phantom Wallet tidak terdeteksi
                    window.open('https://phantom.app/', '_blank');
                    connectWallet.textContent = 'Install Phantom';
                    setTimeout(() => {
                        connectWallet.textContent = 'CONNECT WALLET';
                        connectWallet.disabled = false;
                    }, 3000);
                }
            } catch (err) {
                console.error('Connection error:', err);
                connectWallet.textContent = 'Error!';
                setTimeout(() => {
                    connectWallet.textContent = 'CONNECT WALLET';
                    connectWallet.disabled = false;
                }, 2000);
            }
        });
    }

    // ==================== POST-CONNECT FUNCTION ====================
    function updateUIAfterConnect(walletAddress) {
        // Contoh: Tampilkan wallet address yang dipersingkat
        const shortAddress = `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`;
        
        // Anda bisa menambahkan logika update UI disini
        console.log(`Wallet connected: ${shortAddress}`);
        
        // Contoh: Enable buy button
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    }

    // ==================== ANIMATION HELPERS ====================
    // Pulse animation untuk elemen tertentu
    function setupPulseAnimation() {
        const elements = document.querySelectorAll('.pulse');
        elements.forEach(el => {
            el.style.animation = 'pulse 2s infinite alternate';
        });
    }
    
    // Inisialisasi animasi
    setupPulseAnimation();

    // ==================== RESPONSIVE ADJUSTMENTS ====================
    function handleResize() {
        // Adjust particle density on mobile
        if (window.innerWidth < 768) {
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.number.value = 60;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
    }
    
    // Event listener untuk resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Jalankan sekali saat load
});

// ==================== GLOBAL FUNCTIONS ====================
// Helper untuk format angka
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Helper untuk copy text ke clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => console.error('Copy failed:', err));
}