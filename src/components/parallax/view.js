export function ParallaxView({ id, layers, overlayLayer = '' }) {
  return `
    <div class="parallax-container" id="${id || 'parallax-container'}">
      <div class="parallax-layers">
        ${ layers.map(layer => `
          <div class="parallax-layer" style="background-image: url(${layer})"></div>
        `).join('') }
        ${ !overlayLayer ? '' : `
          <div class="parallax-layer parallax-layer--overlay">
            ${overlayLayer}
          </div>
        ` }
      </div>
    </div>
  `
}
