import { Chart } from "@/components/ui/chart"
// Global variables
const currentAnalysis = null
const currentUser = null
const currentStep = 0
const stepInterval = null
let currentModule = "landing"
let analysisResult = null
let csvData = null

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  console.log("ðŸš€ DOM Content Loaded - Initializing application...")

  // Login form handler
  const loginForm = document.getElementById("loginForm")
  const togglePassword = document.getElementById("togglePassword")
  const passwordInput = document.getElementById("password")

  if (loginForm) {
    console.log("âœ… Login form found, adding event listener")
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("ðŸ” Login form submitted")
      login()
    })
  } else {
    console.error("âŒ Login form not found")
  }

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      const icon = this.querySelector("i")
      icon.classList.toggle("fa-eye")
      icon.classList.toggle("fa-eye-slash")
    })
  }

  // Navigation handlers
  setupNavigation()

  // File upload handler
  setupFileUpload()

  // Report form handler
  setupReportForm()

  // Initialize charts
  initializeCharts()
})

function login() {
  console.log("ðŸ” Login function called")

  // Simple login - in real app, validate credentials
  const loginScreen = document.getElementById("loginScreen")
  const mainDashboard = document.getElementById("mainDashboard")

  console.log("Login screen element:", loginScreen)
  console.log("Main dashboard element:", mainDashboard)

  if (loginScreen && mainDashboard) {
    console.log("âœ… Both elements found, switching screens...")
    loginScreen.style.display = "none"
    mainDashboard.style.display = "flex"
    showModule("landing")
    console.log("âœ… Login successful - dashboard should be visible")
  } else {
    console.error("âŒ Could not find login screen or main dashboard elements")
  }
}

function logout() {
  console.log("ðŸšª Logout function called")
  const loginScreen = document.getElementById("loginScreen")
  const mainDashboard = document.getElementById("mainDashboard")

  if (loginScreen && mainDashboard) {
    loginScreen.style.display = "flex"
    mainDashboard.style.display = "none"
    currentModule = "landing"
    console.log("âœ… Logged out successfully")
  }
}

// Navigation System
function setupNavigation() {
  console.log("ðŸ§­ Setting up navigation...")
  const navItems = document.querySelectorAll(".nav-item")
  console.log("Found navigation items:", navItems.length)

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const module = this.getAttribute("data-module")
      console.log("ðŸ“± Navigation clicked:", module)
      showModule(module)

      // Update active state
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

function showModule(moduleName) {
  console.log("ðŸ“„ Showing module:", moduleName)

  // Hide all modules
  const modules = document.querySelectorAll(".module")
  modules.forEach((module) => module.classList.remove("active"))

  // Show selected module
  const targetModule = document.getElementById(moduleName + "Module")
  if (targetModule) {
    targetModule.classList.add("active")
    currentModule = moduleName
    console.log("âœ… Module activated:", moduleName)
  } else {
    console.error("âŒ Module not found:", moduleName + "Module")
  }
}

// File Upload System
function setupFileUpload() {
  console.log("ðŸ“ Setting up file upload...")
  const fileInput = document.getElementById("csvFileInput")
  const fileInfo = document.getElementById("fileInfo")
  const analyzeBtn = document.getElementById("analyzeBtn")

  if (fileInput && fileInfo) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file && file.type === "text/csv") {
        const fileNameEl = document.querySelector(".file-name")
        if (fileNameEl) {
          fileNameEl.textContent = file.name
        }
        fileInfo.style.display = "flex"
        csvData = file
        console.log("ðŸ“„ CSV file selected:", file.name)
      }
    })
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      if (csvData) {
        console.log("ðŸ” Starting CSV analysis...")
        analyzeCSV()
      }
    })
  }
}

async function analyzeCSV() {
  const progressSection = document.getElementById("progressSection")
  const currentStageEl = document.getElementById("currentStage")
  const progressFill = document.getElementById("progressFill")
  const progressPercent = document.getElementById("progressPercent")
  const analyzeBtn = document.getElementById("analyzeBtn")

  // Show progress
  if (progressSection) progressSection.style.display = "block"
  if (analyzeBtn) {
    analyzeBtn.disabled = true
    analyzeBtn.textContent = "PROCESSING..."
  }

  const stages = [
    "Reading CSV file structure...",
    "Validating data format...",
    "Initializing your ML models...",
    "Running feature engineering...",
    "Processing through neural networks...",
    "Detecting anomalies...",
    "Classifying behaviors...",
    "Generating predictions...",
    "Finalizing analysis...",
  ]

  // Simulate processing stages
  for (let i = 0; i < stages.length; i++) {
    if (currentStageEl) currentStageEl.textContent = stages[i]
    const progress = ((i + 1) / stages.length) * 100
    if (progressFill) progressFill.style.width = progress + "%"
    if (progressPercent) progressPercent.textContent = Math.round(progress)

    await new Promise((resolve) => setTimeout(resolve, 600))
  }

  try {
    // Read CSV file
    const csvText = await csvData.text()

    // Validate and process CSV
    validateCSV(csvText)

    // Process with ML algorithms
    const result = await processCSVWithYourMLAlgorithms(csvText)

    // Display results
    displayAnalysisResults(result)
  } catch (error) {
    console.error("Analysis failed:", error)
    alert("Analysis failed. Please check your CSV file format.")
  } finally {
    // Hide progress
    if (progressSection) progressSection.style.display = "none"
    if (analyzeBtn) {
      analyzeBtn.disabled = false
      analyzeBtn.textContent = "RUN ML ANALYSIS"
    }
    if (currentStageEl) currentStageEl.textContent = "ML analysis complete!"
  }
}

function validateCSV(csvText) {
  const lines = csvText.split("\n").filter((line) => line.trim())
  const headers = lines[0].split(",").map((h) => h.trim())

  // Show validation card
  const validationCard = document.getElementById("validationCard")
  if (validationCard) validationCard.style.display = "block"

  // Update validation stats
  const totalRowsEl = document.getElementById("totalRows")
  const totalColumnsEl = document.getElementById("totalColumns")
  const hasNumericDataEl = document.getElementById("hasNumericData")

  if (totalRowsEl) totalRowsEl.textContent = lines.length - 1
  if (totalColumnsEl) totalColumnsEl.textContent = headers.length

  // Check for numeric data
  const hasNumeric = headers.some((header) =>
    lines.slice(1).some((line) => {
      const values = line.split(",")
      const headerIndex = headers.indexOf(header)
      return !isNaN(Number.parseFloat(values[headerIndex]))
    }),
  )

  if (hasNumericDataEl) hasNumericDataEl.textContent = hasNumeric ? "YES" : "NO"

  // Display headers
  const headersList = document.getElementById("headersList")
  if (headersList) {
    headersList.innerHTML = ""
    headers.forEach((header) => {
      const tag = document.createElement("span")
      tag.className = "header-tag"
      tag.textContent = header
      headersList.appendChild(tag)
    })
  }
}

// ML Processing Function - Implement Your Algorithms Here
async function processCSVWithYourMLAlgorithms(csvData) {
  console.log("ðŸ” CSV Data received for ML processing:")
  console.log("Data length:", csvData.length)
  console.log("First 200 characters:", csvData.substring(0, 200))

  // Parse CSV structure for you to work with
  const lines = csvData.split("\n").filter((line) => line.trim())
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
  const records = lines.slice(1).map((line, index) => {
    const values = line.split(",").map((v) => v.trim())
    const record = { id: index + 1, rawData: {} }
    headers.forEach((header, i) => {
      record.rawData[header] = values[i] || ""
      record[header] = values[i] || ""
    })
    return record
  })

  console.log("ðŸ“Š Parsed data structure:")
  console.log("Headers:", headers)
  console.log("Records count:", records.length)
  console.log("Sample record:", records[0])

  // ========================================
  // TODO: IMPLEMENT YOUR ML ALGORITHMS HERE
  // ========================================

  /*
    PLACEHOLDER FOR YOUR ML IMPLEMENTATION:
    
    1. Feature Engineering:
       - Extract features from 'records' array
       - Normalize data
       - Handle missing values
    
    2. Threat Detection Model:
       - Train/load your neural network
       - Process features through model
       - Generate threat scores
    
    3. Anomaly Detection:
       - Implement autoencoder or isolation forest
       - Calculate reconstruction errors
       - Identify outliers
    
    4. Behavior Classification:
       - Classify behavior patterns
       - Use clustering or classification algorithms
    
    5. Risk Prediction:
       - Time series analysis
       - LSTM or other sequential models
    */

  // TEMPORARY PLACEHOLDER - REPLACE WITH YOUR ML CODE
  const suspiciousPersons = records.map((record, index) => ({
    id: index + 1,
    name: record.name || `Person ${index + 1}`,
    threatScore: 0, // YOUR ML MODEL OUTPUT HERE
    riskLevel: "LOW", // YOUR CLASSIFICATION HERE
    location: record.location || `Location ${index + 1}`,
    lastSeen: record.lastSeen || new Date().toISOString().split("T")[0],
    phone: record.phone || "+1-555-0000",
    activities: ["Awaiting ML analysis..."],
    mlConfidence: 0, // YOUR MODEL CONFIDENCE HERE
    behaviorPattern: "Unknown", // YOUR BEHAVIOR CLASSIFICATION HERE
    networkConnections: 0,
    financialRisk: 0,
    travelRisk: 0,
    // Add your custom ML features here
    neuralNetworkScore: 0,
    anomalyScore: 0,
    behaviorScore: 0,
  }))

  const threatDistribution = [
    { name: "CRITICAL", value: 0, color: "#ef4444", count: 0 },
    { name: "HIGH", value: 0, color: "#f97316", count: 0 },
    { name: "MEDIUM", value: 0, color: "#eab308", count: 0 },
    { name: "LOW", value: records.length, color: "#22c55e", count: records.length },
  ]

  const anomalies = [] // YOUR ANOMALY DETECTION RESULTS HERE

  return {
    suspiciousPersons,
    threatDistribution,
    overallThreatLevel: 0, // YOUR OVERALL ASSESSMENT HERE
    anomalies,
    predictions: [
      {
        timeframe: "Next 24 Hours",
        predictedThreats: 0, // YOUR PREDICTION HERE
        confidence: 0, // YOUR CONFIDENCE HERE
        riskAreas: ["Awaiting ML analysis"],
        methodology: "Your ML Model",
      },
    ],
    riskFactors: [
      { factor: "Your ML Feature 1", weight: 0.25, impact: "Implement your analysis" },
      { factor: "Your ML Feature 2", weight: 0.25, impact: "Implement your analysis" },
      { factor: "Your ML Feature 3", weight: 0.25, impact: "Implement your analysis" },
      { factor: "Your ML Feature 4", weight: 0.25, impact: "Implement your analysis" },
    ],
    mlMetadata: {
      modelsUsed: ["YourModel1", "YourModel2", "YourModel3"],
      processedAt: new Date().toISOString(),
      recordCount: records.length,
      averageConfidence: 0,
      processingTime: "Implement timing",
      csvHeaders: headers,
      dataQuality: "Implement quality assessment",
    },
  }
}

// Results Display System
function displayAnalysisResults(result) {
  analysisResult = result

  // Show results section
  const resultsSection = document.getElementById("resultsSection")
  if (resultsSection) resultsSection.style.display = "block"

  // Update threat level
  const threatScoreEl = document.getElementById("threatScore")
  const threatProgressEl = document.getElementById("threatProgress")
  const recordCountEl = document.getElementById("recordCount")

  if (threatScoreEl) threatScoreEl.textContent = result.overallThreatLevel.toFixed(1) + "%"
  if (threatProgressEl) threatProgressEl.style.width = result.overallThreatLevel + "%"
  if (recordCountEl) recordCountEl.textContent = result.mlMetadata.recordCount

  // Update threat badge
  const threatBadge = document.getElementById("threatBadge")
  if (threatBadge) {
    if (result.overallThreatLevel > 70) {
      threatBadge.textContent = "CRITICAL"
      threatBadge.style.background = "#fee2e2"
      threatBadge.style.color = "#991b1b"
    } else if (result.overallThreatLevel > 50) {
      threatBadge.textContent = "HIGH"
      threatBadge.style.background = "#fef3c7"
      threatBadge.style.color = "#92400e"
    } else {
      threatBadge.textContent = "MODERATE"
      threatBadge.style.background = "#f3f4f6"
      threatBadge.style.color = "#374151"
    }
  }

  // Update ML status
  const modelsUsedEl = document.getElementById("modelsUsed")
  const dataQualityEl = document.getElementById("dataQuality")

  if (modelsUsedEl) modelsUsedEl.textContent = result.mlMetadata.modelsUsed.length
  if (dataQualityEl) dataQualityEl.textContent = result.mlMetadata.dataQuality

  // Update implementation status
  const availableRecordsEl = document.getElementById("availableRecords")
  const availableColumnsEl = document.getElementById("availableColumns")

  if (availableRecordsEl) availableRecordsEl.textContent = result.mlMetadata.recordCount
  if (availableColumnsEl) availableColumnsEl.textContent = result.mlMetadata.csvHeaders.length

  // Create threat distribution chart
  createThreatChart(result.threatDistribution)

  // Update threat stats
  updateThreatStats(result.threatDistribution)

  // Display data preview
  displayDataPreview(result.suspiciousPersons)
}

function createThreatChart(threatDistribution) {
  const ctx = document.getElementById("threatChart")
  if (!ctx || !window.Chart) return

  const chartCtx = ctx.getContext("2d")

  new Chart(chartCtx, {
    type: "doughnut",
    data: {
      labels: threatDistribution.map((item) => item.name),
      datasets: [
        {
          data: threatDistribution.map((item) => item.count),
          backgroundColor: threatDistribution.map((item) => item.color),
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
          },
        },
      },
    },
  })
}

function updateThreatStats(threatDistribution) {
  const threatStats = document.getElementById("threatStats")
  if (!threatStats) return

  threatStats.innerHTML = ""

  threatDistribution.forEach((item) => {
    const statDiv = document.createElement("div")
    statDiv.style.display = "flex"
    statDiv.style.justifyContent = "space-between"
    statDiv.style.fontSize = "0.75rem"
    statDiv.style.marginBottom = "0.25rem"

    statDiv.innerHTML = `
            <span style="color: #6b7280;">${item.name}:</span>
            <span style="color: #1f2937; font-weight: 600;">${item.count} people</span>
        `

    threatStats.appendChild(statDiv)
  })
}

function displayDataPreview(suspiciousPersons) {
  const dataPreview = document.getElementById("dataPreview")
  if (!dataPreview) return

  dataPreview.innerHTML = ""

  suspiciousPersons.slice(0, 5).forEach((person, index) => {
    const itemDiv = document.createElement("div")
    itemDiv.className = "data-item"

    itemDiv.innerHTML = `
            <div class="data-item-left">
                <div class="data-item-number">${index + 1}</div>
                <div class="data-item-info">
                    <h3>${person.name}</h3>
                    <div class="data-item-details">
                        <span>${person.location}</span>
                        <span>Ready for ML analysis</span>
                    </div>
                </div>
            </div>
            <div class="data-item-right">
                <div class="data-item-score">${person.threatScore}%</div>
                <div class="data-item-badge">${person.riskLevel}</div>
            </div>
        `

    dataPreview.appendChild(itemDiv)
  })
}

// Report Form System
function setupReportForm() {
  const reportForm = document.getElementById("reportForm")

  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault()
      submitReport()
    })
  }
}

function submitReport() {
  // Get form data
  const reportForm = document.getElementById("reportForm")
  if (!reportForm) return

  const formData = new FormData(reportForm)
  const reportData = Object.fromEntries(formData)

  console.log("Report submitted:", reportData)

  // Show success message
  alert("Report submitted successfully! Our security team will review it immediately.")

  // Reset form
  reportForm.reset()
}

// Charts Initialization System
function initializeCharts() {
  // Initialize dashboard charts when dashboard module is shown
  setTimeout(() => {
    if (currentModule === "dashboard") {
      createDashboardCharts()
    }
  }, 100)
}

function createDashboardCharts() {
  if (!window.Chart) return

  // Trends Chart
  const trendsCtx = document.getElementById("trendsChart")
  if (trendsCtx) {
    const trendsChart = trendsCtx.getContext("2d")

    new Chart(trendsChart, {
      type: "line",
      data: {
        labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"],
        datasets: [
          {
            label: "Threats",
            data: [23, 31, 18, 42, 28, 35, 19],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Resolved",
            data: [18, 25, 15, 35, 22, 30, 16],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Critical",
            data: [3, 5, 2, 8, 4, 6, 2],
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  // Region Chart
  const regionCtx = document.getElementById("regionChart")
  if (regionCtx) {
    const regionChart = regionCtx.getContext("2d")

    new Chart(regionChart, {
      type: "bar",
      data: {
        labels: ["North", "South", "East", "West", "Central"],
        datasets: [
          {
            label: "Threats",
            data: [145, 98, 167, 123, 89],
            backgroundColor: "#ef4444",
          },
          {
            label: "Resolved",
            data: [120, 85, 140, 105, 78],
            backgroundColor: "#22c55e",
          },
          {
            label: "Pending",
            data: [25, 13, 27, 18, 11],
            backgroundColor: "#f97316",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  }

  notification.style.background = colors[type] || colors.info
  notification.textContent = message

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

function formatNumber(number) {
  return number.toLocaleString()
}

// Initialize charts when switching to dashboard
document.addEventListener("click", (e) => {
  if (e.target.matches('[data-module="dashboard"]')) {
    setTimeout(createDashboardCharts, 100)
  }
})

console.log("ðŸš€ Strike Net Security Portal Initialized")
console.log("ðŸ“Š Ready for CSV upload and ML processing")
console.log("ðŸ”§ Implement your ML algorithms in processCSVWithYourMLAlgorithms function")