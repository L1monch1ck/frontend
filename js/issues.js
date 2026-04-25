// ====================== MAP INIT ======================
var map = L.map('map', {
    zoomControl: true,
    attributionControl: false
}).setView([3.1390, 101.6869], 16);

// ====================== TILE ======================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
}).addTo(map);

// ====================== API ======================
const API = "https://backend-5aed.onrender.com";

// ====================== MARKERS ======================
let markers = [];

// ====================== LOAD REPORTS ======================
function loadReports(filter = "all") {
    // удаляем старые маркеры
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    fetch(`${API}/reports`)
        .then(res => res.json())
        .then(data => {
            data.forEach(r => {
                if (filter !== "all" && r.status !== filter) return;

                const color = r.status === "resolved" ? "#22c55e" : "#ef4444";

                const marker = L.circleMarker([r.lat, r.lng], {
                    radius: 9,
                    fillColor: color,
                    color: "#fff",
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 0.9
                }).addTo(map);

                marker.bindPopup(`
                    <b>${r.title}</b><br>
                    ${r.description || ''}<br><br>
                    <strong>Status:</strong> 
                    <span style="color:${color}">${r.status}</span>
                `);

                markers.push(marker);
            });
        })
        .catch(err => console.error("Error loading reports:", err));
}

// ====================== FILTER BUTTONS ======================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        loadReports(filter);
    });
});

// ====================== INIT ======================
loadReports();