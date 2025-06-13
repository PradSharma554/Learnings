function setupSearch() {
    const searchInput = document.getElementById('search-integrations');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredIntegrations = integrationsData.integrations.filter(integration => 
            integration.name.toLowerCase().includes(searchTerm) || 
            integration.description.toLowerCase().includes(searchTerm)
        );
        
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
}