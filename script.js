document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    const desktop = document.querySelector('.desktop');

    startButton.addEventListener('click', () => {
        startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // close start menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });

    // open windows from start menu
    startMenu.querySelectorAll('a[data-window]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const windowId = link.getAttribute('data-window') + 'Window';
            document.getElementById(windowId).style.display = 'block';
            startMenu.style.display = 'none';
        });
    });

    // window opening & closing logic
    desktop.querySelectorAll('.icon[data-window]').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const windowId = icon.getAttribute('data-window') + 'Window';
            document.getElementById(windowId).style.display = 'block';
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.window').style.display = 'none';
        });
    });

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // get form values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
        
        // NEED TO STILL ADD EMAIL SERVER *********************
        console.log('Form submitted:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        
        // clear the form
        this.reset();
        
        // show a confirmation message
        alert('Thank you for your message! We will get back to you soon.');
    });

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
                        <input type="text" class="ie-address-bar" value="http://www.friendster.com/samanthadev" readonly>
                        <button class="ie-btn">Go</button>
                    </div>
                    <div class="window-content ie-content">
                        <div class="loading-animation">Loading...</div>
                    </div>
                `;
                document.body.appendChild(ieWindow);
    
                const closeBtn = ieWindow.querySelector('.close-btn');
                closeBtn.onclick = () => closeWindow('ieWindow');
    
                // Simulate page loading
                setTimeout(() => {
                    fetch('friendster.html')
                        .then(response => response.text())
                        .then(html => {
                            ieWindow.querySelector('.ie-content').innerHTML = html;
                        })
                        .catch(error => console.error('Error loading Friendster profile:', error));
                }, 1500); // Simulate a 1.5 second load time
            }
            ieWindow.style.display = 'block';
        } else {
            // Handle other windows as before
            let window = document.getElementById(windowId + 'Window');
            if (window) {
                window.style.display = 'block';
            }
        }
    }
    
    // Function to close windows
    function closeWindow(windowId) {
        let window = document.getElementById(windowId);
        if (window) {
            window.style.display = 'none';
        }
    }
    
    // Function to toggle start menu
    function toggleStartMenu() {
        const startMenu = document.querySelector('.start-menu');
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    }
    
    // Add event listeners to all elements with data-window attribute
    document.querySelectorAll('[data-window]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            openWindow(element.getAttribute('data-window'));
        });
    });
    
    // Close button functionality for all windows
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            let window = this.closest('.window');
            if (window) {
                window.style.display = 'none';
            }
        });
    });
    
    // Update clock
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const timeString = `${hours}:${minutes} ${ampm}`;
        document.getElementById('clock').textContent = timeString;
    }
    
    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

});