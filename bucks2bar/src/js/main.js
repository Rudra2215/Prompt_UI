document.addEventListener('DOMContentLoaded', function () {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    function getInputValues(type) {
        return months.map(month => {
            const input = document.querySelector(`input[name="${month}-${type}"]`);
            return input ? Number(input.value) || 0 : 0;
        });
    }

    const ctx = document.getElementById('barChart');
    let chart;
    if (ctx) {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
                datasets: [
                    {
                        label: 'Income',
                        data: getInputValues('income'),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Expenses',
                        data: getInputValues('expenses'),
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#000' }
                    },
                    x: {
                        ticks: { color: '#000' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#000' }
                    }
                }
            }
        });
    }

    // Update chart when any input changes
    months.forEach(month => {
        ['income', 'expenses'].forEach(type => {
            const input = document.querySelector(`input[name="${month}-${type}"]`);
            if (input) {
                input.addEventListener('input', () => {
                    chart.data.datasets[0].data = getInputValues('income');
                    chart.data.datasets[1].data = getInputValues('expenses');
                    chart.update();
                });
            }
        });
    });

    document.getElementById('downloadBtn')?.addEventListener('click', function () {
        const canvas = document.getElementById('barChart');
        if (canvas) {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'chart.png';
            link.click();
        }
    });

    // Dark mode toggle functionality
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    const updateChartColors = (isDark) => {
        if (!chart) return;

        chart.data.datasets[0].backgroundColor = isDark
            ? 'rgba(54, 162, 235, 0.9)'
            : 'rgba(54, 162, 235, 0.7)';
        chart.data.datasets[1].backgroundColor = isDark
            ? 'rgba(255, 99, 132, 0.9)'
            : 'rgba(255, 99, 132, 0.7)';

        chart.options.scales.y.ticks.color = isDark ? '#e0e0e0' : '#000';
        chart.options.scales.x.ticks.color = isDark ? '#e0e0e0' : '#000';

        chart.options.plugins.legend.labels.color = isDark ? '#e0e0e0' : '#000';

        chart.update();
    };

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = 'Light Mode';
        updateChartColors(true);
    }

    toggleBtn?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        const isDark = body.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';

        if (isDark) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }

        updateChartColors(isDark);
    });

    document.getElementById('shoppingBtn')?.addEventListener('click', () => {
        window.open('shop/index.html', '_blank');
    });

    // ==============================
    // SHOP PAGE: Load products.json
    // ==============================
    const productList = document.getElementById("productList");
    if (productList) {
        fetch("products.json")
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = "";
                products.forEach(product => {
                    const card = document.createElement("div");
                    card.className = "col-md-4 mb-4";
                    card.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="fw-bold text-success">$${product.price}</p>
                                <button class="btn btn-primary mt-auto">Add to Cart</button>
                            </div>
                        </div>
                    `;
                    productList.appendChild(card);
                });
            })
            .catch(err => console.error("Error loading products.json:", err));
    }
});
