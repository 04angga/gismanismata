// Tombol untuk masuk ke peta
document.getElementById("enter-button").addEventListener("click", function () {
  // Sembunyikan Landing Page
  document.getElementById("landing-page").style.display = "none";

  // Tampilkan Peta
  document.getElementById("map-container").style.display = "block";

  // Inisialisasi peta
  const map = L.map("map").setView(
    [-2.683354484999938, 111.09968519300008],
    12
  );

  // Tile Layer OpenStreetMap
  const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  // Tile Layer Google Satellite
  const googleSatelliteLayer = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s@164&x={x}&y={y}&z={z}",
    {
      attribution:
        'Map data &copy; <a href="https://www.google.com/maps">Google</a>',
    }
  );

  // Menambahkan layer OpenStreetMap sebagai default
  osmLayer.addTo(map);

  // Layer Control untuk memilih peta
  const baseLayers = {
    OpenStreetMap: osmLayer,
    "Google Satellite": googleSatelliteLayer,
  };

  L.control.layers(baseLayers).addTo(map);

  // Fungsi untuk memuat GeoJSON dari file eksternal
  fetch(
    "https://raw.githubusercontent.com/username/WEB-GIS/main/data/map.geojson"
  );
  fetch("data/map.geojson")
    .then((response) => response.json())
    .then((data) => {
      // Menambahkan GeoJSON ke peta
      L.geoJSON(data, {
        style: function (feature) {
          return {
            color: "#7FFFD4", // Warna garis
            weight: 1, // Tebal garis
            opacity: 1, // Opasitas garis
            fillColor: "#F0F8FF", // Warna fill
            fillOpacity: 0.1, // Opasitas fill
          };
        },

        onEachFeature: function (feature, layer) {
          // Menampilkan informasi di pop-up ketika poligon diklik
          layer.on("click", function () {
            const popupContent = `
                          <div>
                              <h3>${feature.properties.NAMOBJ}</h3>
                              <p><strong>Region Area:</strong> ${feature.properties.LUASWH} ha</p>
                              <p><strong>District:</strong> ${feature.properties.WADMKD}</p>
                              <p><strong>Subdistrict:</strong> ${feature.properties.WADMKC}</p>
                              <p><strong>Source:</strong> ${feature.properties.UUPP}</p>
                          </div>
                      `;
            layer.bindPopup(popupContent).openPopup();
          });
        },
      }).addTo(map);
    })
    .catch((error) => console.error("Error loading GeoJSON:", error));
});
