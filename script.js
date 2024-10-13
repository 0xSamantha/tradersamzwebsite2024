document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    const desktop = document.querySelector('.desktop');
    let currentEra = 'modern';

    // Start menu toggle
    startButton.addEventListener('click', () => {
        startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close start menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });

    // Open windows from start menu and desktop
    document.querySelectorAll('.icon[data-window], .start-menu a[data-window]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const windowId = item.getAttribute('data-window') + 'Window';
            openWindow(item.getAttribute('data-window'));
            startMenu.style.display = 'none';
        });
    });

    // Close windows
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.window').style.display = 'none';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted:', {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            });
            this.reset();
            alert('Thank you for your message! We will get back to you soon.');
        });
    }

    // Shutdown dialog
    const shutDownOption = document.querySelector('.shut-down-option');
    const shutDownDialog = document.querySelector('.shut-down-dialog');
    
    if (shutDownOption && shutDownDialog) {
        shutDownOption.addEventListener('click', (e) => {
            e.preventDefault();
            shutDownDialog.style.display = 'block';
            startMenu.style.display = 'none';
        });

        shutDownDialog.querySelector('.close-btn').addEventListener('click', () => {
            shutDownDialog.style.display = 'none';
        });

        document.getElementById('shut-down-btn').addEventListener('click', () => {
            alert('Shutting down... (Not really, this is just a simulation!)');
            shutDownDialog.style.display = 'none';
        });

        document.getElementById('time-travel-btn').addEventListener('click', () => {
            timeTravel();
            shutDownDialog.style.display = 'none';
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            shutDownDialog.style.display = 'none';
        });
    }

    function openWindow(windowId) {
        if (windowId === 'social') {
            let ieWindow = document.getElementById('ieWindow');
            if (!ieWindow) {
                ieWindow = document.createElement('div');
                ieWindow.id = 'ieWindow';
                ieWindow.className = 'window ie-window';
                ieWindow.innerHTML = `
                    <div class="window-header">
                        <img src="icons/internetexplorer.png" alt="IE" class="ie-icon">
                        <span>Internet Explorer - Friendster</span>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="ie-toolbar">
                        <button class="ie-btn">Back</button>
                        <button class="ie-btn">Forward</button>
                        <button class="ie-btn">Refresh</button>
                        <button class="ie-btn">Home</button>
                        <input type="text" class="ie-address-bar" value="http://www.friendster.com/samanthac" readonly>
                        <button class="ie-btn">Go</button>
                    </div>
                    <div class="window-content ie-content">
                        <div class="loading-animation">Loading...</div>
                    </div>
                `;
                document.body.appendChild(ieWindow);
    
                const closeBtn = ieWindow.querySelector('.close-btn');
                closeBtn.onclick = () => ieWindow.style.display = 'none';
    
                setTimeout(() => {
                    fetch('friendster.html')
                        .then(response => response.text())
                        .then(html => {
                            ieWindow.querySelector('.ie-content').innerHTML = html;
                        })
                        .catch(error => console.error('Error loading Friendster profile:', error));
                }, 1500);
            }
            ieWindow.style.display = 'block';
        } else {
            let window = document.getElementById(windowId + 'Window');
            if (window) {
                window.style.display = 'block';
            }
        }
    }

    function timeTravel() {
        if (currentEra === 'modern') {
            currentEra = 'windows95';
        } else if (currentEra === 'windows95') {
            currentEra = 'windowsxp';
        } else {
            currentEra = 'modern';
        }
        document.body.className = currentEra;
        console.log('Time traveled to:', currentEra);
    }

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeString = `${hours}:${minutes} ${ampm}`;
        document.getElementById('clock').textContent = timeString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
});