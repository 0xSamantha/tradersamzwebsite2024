document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    const desktop = document.querySelector('.desktop');
    let currentEra = 'windows95';

    if (!document.querySelector('.menu-bar')) {
        const menuBar = document.createElement('div');
        menuBar.className = 'menu-bar';
        menuBar.style.display = 'none'; // Initially hidden
        menuBar.innerHTML = `
            <span class="apple-logo">🍎</span>
            <span class="menu-item">File</span>
            <span class="menu-item">Edit</span>
            <span class="menu-item">View</span>
            <span class="menu-item">Window</span>
            <span class="menu-item">Help</span>
        `;
        document.body.insertBefore(menuBar, document.body.firstChild);
    }

    // Create Apple menu
    let appleMenu;
    if (!document.querySelector('.apple-menu')) {
        appleMenu = document.createElement('div');
        appleMenu.className = 'apple-menu';
        appleMenu.style.display = 'none'; // Initially hidden
        appleMenu.innerHTML = `
            <a href="#" data-window="about">About This Mac</a>
            <a href="#" data-window="systemPreferences">System Preferences</a>
            <a href="#" class="apple-menu-shutdown">Shut Down</a>
        `;
        document.body.appendChild(appleMenu);
    } else {
        appleMenu = document.querySelector('.apple-menu');
    }

    // Apple logo click event
   const appleLogo = document.querySelector('.apple-logo');
    appleLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        appleMenu.style.display = appleMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close Apple menu when clicking outside
    document.addEventListener('click', () => {
        appleMenu.style.display = 'none';
    });

    // Handle Apple menu item clicks
    appleMenu.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('apple-menu-shutdown')) {
            document.querySelector('.shut-down-dialog').style.display = 'block';
        } else if (target.dataset.window) {
            openWindow(target.dataset.window);
        }
        appleMenu.style.display = 'none';
    });

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
            const windowId = item.getAttribute('data-window');
            openWindow(windowId);
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
                ieWindow.className = `window ie-window ${currentEra}`;
                let socialPlatform, socialUrl;
                if (currentEra === 'windows95') {
                    socialPlatform = 'Friendster';
                    socialUrl = 'http://www.friendster.com/samanthac';
                } else if (currentEra === 'windowsxp') {
                    socialPlatform = 'MySpace';
                    socialUrl = 'http://www.myspace.com/samanthac';
                } else {
                    socialPlatform = 'Facebook';
                    socialUrl = 'http://www.facebook.com/samanthac';
                }
                ieWindow.innerHTML = `
                    <div class="window-header">
                        <img src="icons/internetexplorer.png" alt="IE" class="ie-icon">
                        <span>Internet Explorer - ${socialPlatform}</span>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="ie-toolbar">
                        <button class="ie-btn">Back</button>
                        <button class="ie-btn">Forward</button>
                        <button class="ie-btn">Refresh</button>
                        <button class="ie-btn">Home</button>
                        <input type="text" class="ie-address-bar" value="${socialUrl}" readonly>
                        <button class="ie-btn">Go</button>
                    </div>
                    <div class="window-content ie-content">
                        <div class="loading-animation">Loading ${socialPlatform}...</div>
                    </div>
                `;
                document.body.appendChild(ieWindow);

                const closeBtn = ieWindow.querySelector('.close-btn');
                closeBtn.onclick = () => ieWindow.style.display = 'none';

                setTimeout(() => {
                    fetch(`${socialPlatform.toLowerCase()}.html`)
                        .then(response => response.text())
                        .then(html => {
                            ieWindow.querySelector('.ie-content').innerHTML = html;
                        })
                        .catch(error => console.error(`Error loading ${socialPlatform} profile:`, error));
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
        const shutDownDialog = document.querySelector('.shut-down-dialog');
        const takeMeBackBtn = document.getElementById('take-me-back-btn');

        if (currentEra === 'windows95') {
            currentEra = 'windowsxp';
            document.body.className = 'windowsxp';
            if (!takeMeBackBtn) {
                addTakeMeBackButton();
            }
        } else if (currentEra === 'windowsxp') {
            currentEra = 'macos';
            document.body.className = 'macos';
        } else {
            currentEra = 'windows95';
            document.body.className = '';
            if (takeMeBackBtn) {
                takeMeBackBtn.remove();
            }
        }

        updateLayoutForEra();
        shutDownDialog.style.display = 'none';
    }

    function addTakeMeBackButton() {
        const buttonGroup = document.querySelector('.shut-down-dialog .button-group');
        const takeMeBackBtn = document.createElement('button');
        takeMeBackBtn.id = 'take-me-back-btn';
        takeMeBackBtn.textContent = 'Take me back';
        takeMeBackBtn.addEventListener('click', () => {
            currentEra = 'windows95';
            document.body.className = '';
            updateLayoutForEra();
            takeMeBackBtn.remove();
            document.querySelector('.shut-down-dialog').style.display = 'none';
        });
        buttonGroup.appendChild(takeMeBackBtn);
    }

    

    function updateLayoutForEra() {
        const startButton = document.querySelector('.start-button');
        const taskbar = document.querySelector('.taskbar');
        const desktop = document.querySelector('.desktop');
        const menuBar = document.querySelector('.menu-bar');
        const dock = document.querySelector('.dock');
        const appleLogo = document.querySelector('.apple-logo');
        const appleMenu = document.querySelector('.apple-menu');
    
        // Hide all era-specific elements initially
        startButton.style.display = 'none';
        if (menuBar) menuBar.style.display = 'none';
        if (dock) dock.innerHTML = '';
        if (appleLogo) appleLogo.style.display = 'none';
        if (appleMenu) appleMenu.style.display = 'none';
    
        if (currentEra === 'windowsxp') {
            startButton.style.display = 'block';
            startButton.textContent = 'Start';
            startButton.className = 'start-button windowsxp';
            taskbar.className = 'taskbar windowsxp';
            desktop.className = 'desktop windowsxp';
        } else if (currentEra === 'macos') {
            taskbar.className = 'taskbar macos';
            desktop.className = 'desktop macos';
            if (menuBar) {
                menuBar.style.display = 'flex';
                if (appleLogo) appleLogo.style.display = 'block';
            }
            populateDock();
        } else { // windows95
            startButton.style.display = 'block';
            startButton.textContent = 'Start';
            startButton.className = 'start-button';
            taskbar.className = 'taskbar';
            desktop.className = 'desktop';
        }
    
        updateSocialPlatform();
    }
    
    function populateDock() {
        const dock = document.querySelector('.dock');
        const icons = document.querySelectorAll('.desktop .icon');
        
        dock.innerHTML = '';
        icons.forEach(icon => {
            const dockIcon = icon.cloneNode(true);
            dockIcon.removeAttribute('data-window');
            dock.appendChild(dockIcon);
        });
    
        // Add click event listeners to dock icons
        dock.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const windowId = icon.querySelector('span').textContent.toLowerCase().replace(' ', '');
                openWindow(windowId);
            });
        });
    }

    function updateSocialPlatform() {
        const socialIcon = document.querySelector('.icon[data-window="social"] img');
        const socialText = document.querySelector('.icon[data-window="social"] span');
        
        if (socialIcon && socialText) {
            if (currentEra === 'windows95') {
                socialIcon.src = 'icons/friendster.png';
                socialText.textContent = 'Friendster';
            } else if (currentEra === 'windowsxp') {
                socialIcon.src = 'icons/myspace.png';
                socialText.textContent = 'MySpace';
            } else {
                socialIcon.src = 'icons/facebook.png';
                socialText.textContent = 'Facebook';
            }
        }
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

    // Call updateLayoutForEra when the page loads
    updateLayoutForEra();
});