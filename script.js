require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  /***************************************
         * Set up popup template of image layer
         **************************************/

const imagePopupTemplate = {
    title: "Landsat 8 NDVI Insights",
    content: `
        <p>This NDVI data, derived from Landsat 8's OLI sensor, offers insights into vegetation health and density.</p>
        <ul>
            <li><strong>Near-Infrared (NIR) Band 5:</strong> Essential for capturing vegetation health.</li>
            <li><strong>Red Band 4:</strong> Reflects chlorophyll absorption.</li>
        </ul>
        <p>NDVI is calculated with <strong>(NIR - Red) / (NIR + Red)</strong>. Higher values indicate denser, healthier vegetation.</p>
        <p>This index is crucial for environmental monitoring and agricultural assessment.</p>
    `
};

  /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

  const serviceRFT = new RasterFunction({
    functionName: "NDVI Colorized",
    variableName: "Raster"
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: serviceRFT,
    popupTemplate: imagePopupTemplate
  });

  /*************************
         * Add image layer to map
         ************************/

  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      // Ames, Iowa coordinates
      x: -93.6250,
      y: 42.0308,
      spatialReference: 4326 // WGS 84
    },
    zoom: 8, // Adjusted zoom level for a state-wide view
    popup: {
      actions: []
    }
  });
});
