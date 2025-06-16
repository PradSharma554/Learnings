const integrationsData = {
  integrations: [
    {
      id: "wordpress",
      name: "WordPress",
      icon: "https://framerusercontent.com/images/1tMwCNL8nyVYanLeO1YXCmyD8.svg",
      description: "A content management system (CMS) written in PHP",
      category: "Applications",
    },
    {
      id: "jupyter",
      name: "Jupyter",
      icon: "https://framerusercontent.com/images/hgWz13blJI6voMJlnl8LpCs7Cjs.svg",
      description: "JupyterLab Is A Next-Generation Notebook Interface",
      category: "Applications",
    },
    {
      id: "superset",
      name: "Superset",
      icon: "https://framerusercontent.com/images/j2PaA4EyjB3z8Te54CPtEl9G4pg.svg",
      description: "Data Visualization and Data Exploration | Looker, Tableau alternative",
      category: "Applications",
    },
    {
      id: "outline",
      name: "Outline",
      icon: "https://framerusercontent.com/images/me3PE9f0sDhtHyIisE955ABYK3c.svg",
      description: "Beautiful, realtime collaborative, feature packed, and markdown compatible.",
      category: "Applications",
    },
    {
      id: "mysql",
      name: "MySQL",
      icon: "https://framerusercontent.com/images/o9NXlQW93tQQ6v3jTjDOcwxCMaU.svg",
      description: "Deploy a MySQL database service",
      category: "Datastore",
    },
    {
      id: "redis",
      name: "Redis",
      icon: "https://framerusercontent.com/images/8MWCYgdUmGTAMwJBrF8PdkFbfnI.svg",
      description: "Redis key-value data store",
      category: "Datastore",
    },
    {
      id: "cassandra",
      name: "Cassandra",
      icon: "https://framerusercontent.com/images/hyQRAJJoXaCLvlAd8IqafkKPitE.svg",
      description: "Storing and managing large volumes of structured, semi-structured, and unstructured data.",
      category: "Datastore",
    },
    {
      id: "mariadb",
      name: "MariaDB",
      icon: "https://framerusercontent.com/images/MrgrzzqL3aHPeAvXraV4W437EI.svg",
      description: "The open source relational database",
      category: "Datastore",
    },
    {
      id: "postgres",
      name: "Postgres",
      icon: "https://framerusercontent.com/images/AaiB0a2xIUnIemm6V905ML5c.svg",
      description: "PostgreSQL database service",
      category: "Datastore",
    },
    {
      id: "kafka",
      name: "Kafka",
      icon: "https://framerusercontent.com/images/T58vVQTZl0UnFlmzHJLYR7mpd8U.svg",
      description: "A distributed event streaming platform for real-time data pipelines and stream processing.",
      category: "Datastore",
    },
    {
      id: "redis-distributed",
      name: "Redis (Distributed)",
      icon: "https://framerusercontent.com/images/UijaNkqS0HW6UsMqM12w0Pg.png",
      description: "Distributed Redis cluster for high availability and scalability",
      category: "Datastore",
    },
    {
      id: "solr",
      name: "SOLR",
      icon: "https://framerusercontent.com/images/38xBPcJEGig795UQddhD41ra5xM.svg",
      description: "An open-source search platform built on Apache Lucene.",
      category: "Datastore",
    },
    {
      id: "cockroachdb",
      name: "CockroachDB",
      icon: "https://framerusercontent.com/images/yYgMVdoJyroUzIpxfhPZkgzb0OA.svg",
      description: "Source-available distributed SQL database management system",
      category: "Datastore",
    },
    {
      id: "dgraph",
      name: "Dgraph",
      icon: "https://framerusercontent.com/images/PqVSCt2usAAIShQahcf90ovxXqI.svg",
      description: "The high-performance database for modern applications",
      category: "Datastore",
    },
    {
      id: "chromadb",
      name: "ChromaDB",
      icon: "https://framerusercontent.com/images/chCSrOajsbttAYyRnFvhNbRgBEQ.svg",
      description: "The AI-native embedding database",
      category: "Datastore",
    },
    {
      id: "opentsdb",
      name: "OpenTSDB",
      icon: "https://framerusercontent.com/images/HMe9loL8PZLicwfLI1znIttA2g.png",
      description: "A Distributed, Scalable Monitoring System",
      category: "Datastore",
    },
    {
      id: "surrealdb",
      name: "SurrealDB",
      icon: "https://framerusercontent.com/images/bRyFhCW7zQ6XoCJv18CxnK8uE.svg",
      description: "A scalable, distributed, collaborative, document-graph database",
      category: "Datastore",
    },
    {
      id: "solr-cloud",
      name: "Solr Cloud",
      icon: "https://framerusercontent.com/images/TF8qLyaVZCZ0P3IwWEqp9qfNH1A.svg",
      description: "Scalable, fault-tolerant Apache Solr for distributed search and indexing.",
      category: "Datastore",
    },
    {
      id: "scylladb",
      name: "ScyllaDB",
      icon: "https://framerusercontent.com/images/0MeJnJIpldPqz476W6rAWBSO4XE.svg",
      description: "ScyllaDB is a source-available distributed NoSQL wide-column data store.",
      category: "Datastore",
    },
    {
      id: "loki",
      name: "Loki",
      icon: "https://framerusercontent.com/images/6yDZTaSiaEvYgE9LqD2z3GT8h4.svg",
      description: "Loki is a horizontally scalable, log aggregation system",
      category: "Observability",
    },
    {
      id: "mimir",
      name: "Mimir",
      icon: "https://framerusercontent.com/images/K4YF2J6Wb5TkQayiIUqm9gsRLOg.svg",
      description: "A scalable, multi-tenant time-series database for Prometheus metrics.",
      category: "Observability",
    },
    {
      id: "tempo",
      name: "Tempo",
      icon: "https://framerusercontent.com/images/OCA4myxlzNqNgrMyxymX9LrMkJ8.svg",
      description: "Grafana's high-scale distributed tracing backend.",
      category: "Observability",
    },
    {
      id: "graphana",
      name: "Graphana",
      icon: "https://framerusercontent.com/images/R3iRNGrhsULm9v6Lu62r2Mfks.svg",
      description: "Open-source analytics and visualization platform for time-series data.",
      category: "Observability",
    },
    {
      id: "prometheus",
      name: "Prometheus",
      icon: "https://framerusercontent.com/images/OoYwOtYMUMSsFXqqJrSPccxKLBA.svg",
      description: "Open-source monitoring and alerting system for time-series data.",
      category: "Observability",
    },
    {
      id: "splunk",
      name: "Splunk",
      icon: "https://framerusercontent.com/images/xFocUuhbKqUa0hJ5vZGvqngmUg.svg",
      description: "Open-source monitoring and alerting system for time-series data.",
      category: "Observability",
    },
    {
      id: "datadog",
      name: "Datadog",
      icon: "https://framerusercontent.com/images/iKF1768aJWTjWA6gA0HNYeaem7E.svg",
      description: "Monitoring and analytics platform for large-scale applications and infrastructure.",
      category: "Observability",
    },
    {
      id: "newrelic",
      name: "New Relic",
      icon: "https://framerusercontent.com/images/Vjahw0hMgW6HPNpoI5KfCUWZEHQ.svg",
      description: "monitoring and analyzing the performance of digital systems, encompassing applications and infrastructure.",
      category: "Observability",
    },
    {
      id: "slack",
      name: "Slack",
      icon: "https://framerusercontent.com/images/XWqLTLXleHamR90CxjA5PSwvIcM.svg",
      description: "A simple Slack bot programmed in Python.",
      category: "Observability",
    },
  ],
  categories: ["Applications", "Datastore", "Observability"],
}

let currentFilter = "all"
let currentSearchTerm = ""

let applicationsContainer
let datastoreContainer
let observabilityContainer
let searchInput

document.addEventListener("DOMContentLoaded", () => {
  initializeElements()
  setupEventListeners()
  renderAllIntegrations()
  setupAccessibility()
})

function initializeElements() {
  applicationsContainer = document.getElementById("applications-cards")
  datastoreContainer = document.getElementById("datastore-cards")
  observabilityContainer = document.getElementById("observability-cards")
  searchInput = document.getElementById("search-integrations")
}

function setupEventListeners() {
  setupSearch()
  setupCategorySidebar()
  setupKeyboardShortcuts()
  setupMobileMenu()
}

function renderAllIntegrations() {
  renderCategoryIntegrations("Applications", applicationsContainer)
  renderCategoryIntegrations("Datastore", datastoreContainer)
  renderCategoryIntegrations("Observability", observabilityContainer)
}

function renderCategoryIntegrations(category, container) {
  if (!container) return

  let categoryIntegrations = integrationsData.integrations.filter((integration) => integration.category === category)

  if (currentSearchTerm) {
    categoryIntegrations = categoryIntegrations.filter(
      (integration) =>
        integration.name.toLowerCase().includes(currentSearchTerm) ||
        integration.description.toLowerCase().includes(currentSearchTerm),
    )
  }

  renderIntegrationCards(container, categoryIntegrations)
}

function renderIntegrationCards(container, integrations) {
  if (!container) return

  container.innerHTML = ""

  if (integrations.length === 0) {
    container.innerHTML = `
      <div class="no-results" role="status">
        <h3>No integrations found</h3>
        <p>Try adjusting your search criteria.</p>
      </div>
    `
    return
  }

  integrations.forEach((integration, index) => {
    const card = createIntegrationCard(integration, index)
    container.appendChild(card)
  })
}

function createIntegrationCard(integration, index) {
  const card = document.createElement("article")
  card.className = "integration-card"
  card.setAttribute("tabindex", "0")
  card.setAttribute("role", "button")
  card.setAttribute("aria-label", `${integration.name} integration. ${integration.description}`)
  card.setAttribute("data-integration-id", integration.id)
  card.setAttribute("data-card-index", index)

  card.innerHTML = `
    <div class="integration-card-header">
      <img 
        src="${integration.icon}" 
        alt="" 
        class="integration-card-icon"
        aria-hidden="true"
      >
      <h3 class="integration-card-title">${escapeHtml(integration.name)}</h3>
    </div>
    <p class="integration-card-description">${escapeHtml(integration.description)}</p>
    <span class="integration-card-category" aria-label="Category: ${integration.category}">
      ${escapeHtml(integration.category)}
    </span>
  `

  card.addEventListener("click", () => handleCardInteraction(integration))
  card.addEventListener("keydown", (e) => handleCardKeydown(e, integration, index))

  return card
}

function handleCardInteraction(integration) {
  console.log("Integration selected:", integration)
}

function handleCardKeydown(e, integration, index) {
  switch (e.key) {
    case "Enter":
    case " ":
      e.preventDefault()
      handleCardInteraction(integration)
      break
    case "ArrowRight":
    case "ArrowDown":
      e.preventDefault()
      focusNextCard(index)
      break
    case "ArrowLeft":
    case "ArrowUp":
      e.preventDefault()
      focusPreviousCard(index)
      break
    case "Home":
      e.preventDefault()
      focusFirstCard()
      break
    case "End":
      e.preventDefault()
      focusLastCard()
      break
  }
}

function focusNextCard(currentIndex) {
  const cards = document.querySelectorAll(".integration-card")
  const nextIndex = (currentIndex + 1) % cards.length
  cards[nextIndex]?.focus()
}

function focusPreviousCard(currentIndex) {
  const cards = document.querySelectorAll(".integration-card")
  const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1
  cards[prevIndex]?.focus()
}

function focusFirstCard() {
  const firstCard = document.querySelector(".integration-card")
  firstCard?.focus()
}

function focusLastCard() {
  const cards = document.querySelectorAll(".integration-card")
  const lastCard = cards[cards.length - 1]
  lastCard?.focus()
}

function setupSearch() {
  if (!searchInput) return

  searchInput.addEventListener("input", handleSearch)
  searchInput.addEventListener("keydown", handleSearchKeydown)
}

function handleSearch(e) {
  currentSearchTerm = e.target.value.toLowerCase()
  applyFilters()
}

function handleSearchKeydown(e) {
  if (e.key === "Escape") {
    e.target.value = ""
    currentSearchTerm = ""
    applyFilters()
  }
}

function setupCategorySidebar() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
      handleCategoryClick(e.target)
    }
  })
}

function handleCategoryClick(button) {
  const categoryButtons = document.querySelectorAll(".category-btn")
  const category = button.getAttribute("data-category")

  categoryButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", "false")
    btn.classList.remove("active")
  })

  button.setAttribute("aria-pressed", "true")
  button.classList.add("active")

  currentFilter = category

  if (category === "all") {
    document.querySelectorAll(".category-section").forEach((section) => {
      section.style.display = "block"
    })
  } else {
    document.querySelectorAll(".category-section").forEach((section) => {
      section.style.display = "none"
    })

    const targetSection = document.getElementById(`${category.toLowerCase()}-section`)
    if (targetSection) {
      targetSection.style.display = "block"
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  applyFilters()
}

function applyFilters() {
  renderCategoryIntegrations("Applications", applicationsContainer)
  renderCategoryIntegrations("Datastore", datastoreContainer)
  renderCategoryIntegrations("Observability", observabilityContainer)
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !isInputFocused()) {
      e.preventDefault()
      searchInput?.focus()
    }

    if (e.key === "Escape") {
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur()
      }
    }
  })
}

function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.getElementById("main-nav")

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true"
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded)

      if (!isExpanded) {
        nav.classList.add("mobile-nav-open")
      } else {
        nav.classList.remove("mobile-nav-open")
      }
    })
  }
}

function setupAccessibility() {
  if (!document.getElementById("sr-announcements")) {
    const announcements = document.createElement("div")
    announcements.id = "sr-announcements"
    announcements.setAttribute("aria-live", "polite")
    announcements.setAttribute("aria-atomic", "true")
    announcements.className = "sr-only"
    document.body.appendChild(announcements)
  }
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

function isInputFocused() {
  const activeElement = document.activeElement
  return (
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.tagName === "SELECT" ||
      activeElement.isContentEditable)
  )
}