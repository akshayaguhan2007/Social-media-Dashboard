// Theme Switching
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on system preference
if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Theme toggle functionality
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else if (savedTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.checked = false;
}

// Chart Initialization
function initializeCharts() {
    // Followers Growth Chart
    const followersCtx = document.getElementById('followersChart').getContext('2d');
    new Chart(followersCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Followers',
                data: [8500, 9200, 9800, 10500, 11200, 11800, 12800],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Engagement Rate Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    new Chart(engagementCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Engagement Rate (%)',
                data: [7.2, 8.5, 9.1, 7.8, 8.9, 6.5, 7.8],
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Post Performance Chart
    const postsCtx = document.getElementById('postsChart').getContext('2d');
    new Chart(postsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Images', 'Videos', 'Text', 'Stories'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#10b981',
                    '#f59e0b'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Audience Demographics Chart
    const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
    new Chart(demographicsCtx, {
        type: 'polarArea',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            datasets: [{
                data: [25, 35, 20, 12, 8],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });
}

// Animated Counter for Metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('K', '000').replace('.', ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                let displayValue;
                if (target >= 1000) {
                    displayValue = (current / 1000).toFixed(1) + 'K';
                } else if (target >= 100) {
                    displayValue = Math.round(current);
                } else {
                    displayValue = current.toFixed(1);
                }
                counter.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                let finalValue;
                if (target >= 1000) {
                    finalValue = (target / 1000).toFixed(1) + 'K';
                } else if (target >= 100) {
                    finalValue = target;
                } else {
                    finalValue = target.toFixed(1);
                }
                counter.textContent = finalValue;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Interactive Hover Effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.metric-card, .chart-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 12px 30px -8px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Real-time Data Updates (Simulated)
function simulateRealTimeUpdates() {
    setInterval(() => {
        const followersElement = document.querySelector('.metric-card:nth-child(1) .metric-value');
        const currentFollowers = parseFloat(followersElement.textContent.replace('K', ''));
        const randomIncrement = Math.random() * 2 + 1;
        const newFollowers = (currentFollowers + randomIncrement / 100).toFixed(1) + 'K';
        followersElement.textContent = newFollowers;
        
        // Update change indicator
        const changeElement = document.querySelector('.metric-card:nth-child(1) .metric-change');
        changeElement.textContent = `+${Math.round(randomIncrement * 10)}`;
    }, 10000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    animateCounters();
    addHoverEffects();
    simulateRealTimeUpdates();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
    // Reinitialize charts on resize for better responsiveness
    const chartElements = document.querySelectorAll('canvas');
    chartElements.forEach(canvas => {
        const chart = Chart.getChart(canvas);
        if (chart) {
            chart.destroy();
        }
    });
    initializeCharts();
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
