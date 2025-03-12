document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    const themeText = themeToggleBtn.querySelector('span');
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    });
    
    // Main tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            // Show the corresponding content section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Faction tab functionality
    const factionButtons = document.querySelectorAll('.faction-btn');
    
    factionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentSection = this.closest('.content-section');
            
            // Remove active class from all faction buttons in this section
            parentSection.querySelectorAll('.faction-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all faction content in this section
            parentSection.querySelectorAll('.faction-content').forEach(content => content.classList.remove('active'));
            // Show the corresponding faction content
            const factionId = this.getAttribute('data-faction');
            parentSection.querySelector(`#${factionId}`).classList.add('active');
        });
    });
    
    // Copy functionality for spawn commands
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const spawnId = this.getAttribute('data-spawn');
            const codeElement = document.getElementById(spawnId);
            const textToCopy = codeElement.textContent;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Temporary visual feedback
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
});
