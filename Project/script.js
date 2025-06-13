const integrationsData = {
    "integrations": [
        {
            "id": "wordpress",
            "name": "Wordpress",
            "icon": "photos/wordpress-icon.png",
            "description": "A content management system (CMS) written in PHP",
            "category": "Applications"
        },
    ],
    "categories": [
        "Applications",
        "Datastore",
        "Observability"
    ]
};

function renderIntegrationCards() {
    const cardsContainer = document.getElementById('integration-cards');
    cardsContainer.innerHTML = '';

    integrationsData.integrations.forEach(integration => {
        const card = document.createElement('div');
        card.className = 'integration-card';
        card.innerHTML = `
            <div class="integration-card-header">
                <img src="${integration.icon}" alt="${integration.name} icon" class="integration-card-icon">
                <h3 class="integration-card-title">${integration.name}</h3>
            </div>
            <p class="integration-card-description">${integration.description}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

function setupCategorySidebar() {
    const categoryItems = document.querySelectorAll('.categories-sidebar li');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            
            item.classList.add('active');
            
            const category = item.textContent;
            const filteredIntegrations = category === 'Applications' 
                ? integrationsData.integrations 
                : integrationsData.integrations.filter(integration => integration.category === category);
            
            const cardsContainer = document.getElementById('integration-cards');
            cardsContainer.innerHTML = '';
            
            filteredIntegrations.forEach(integration => {
                const card = document.createElement('div');
                card.className = 'integration-card';
                card.innerHTML = `
                    <div class="integration-card-header">
                        <img src="${integration.icon}" alt="${integration.name} icon" class="integration-card-icon">
                        <h3 class="integration-card-title">${integration.name}</h3>
                    </div>
                    <p class="integration-card-description">${integration.description}</p>
                `;
                cardsContainer.appendChild(card);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderIntegrationCards();
    setupTabs();
    setupSearch();
    setupCategorySidebar();
});