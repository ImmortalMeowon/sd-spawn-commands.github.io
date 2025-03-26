document.addEventListener('DOMContentLoaded', function() {
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
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    const factionButtons = document.querySelectorAll('.faction-btn');
    
    factionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentSection = this.closest('.content-section');
            
            parentSection.querySelectorAll('.faction-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            parentSection.querySelectorAll('.faction-content').forEach(content => content.classList.remove('active'));
            const factionId = this.getAttribute('data-faction');
            parentSection.querySelector(`#${factionId}`).classList.add('active');
        });
    });
    
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
    
    const skinButtons = document.querySelectorAll('.skin-btn');

    skinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipmentCard = this.closest('.equipment-card');
            
            equipmentCard.querySelectorAll('.skin-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            equipmentCard.querySelectorAll('.variant-content').forEach(content => content.classList.remove('active'));
            const variantType = this.getAttribute('data-variant');
            equipmentCard.querySelector(`.variant-content.${variantType}`).classList.add('active');
        });
    });
    // КОНЕЦ НОВОГО КОДА
});
