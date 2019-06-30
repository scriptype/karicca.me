import { ParallaxView } from '../components/parallax/view.js'

export function InfoView({ parallaxSettings, info }) {
  return ParallaxView({
    layers: parallaxSettings.layers,
    id: parallaxSettings.id,
    overlayLayer: `
      <div class="info">
        <h1 class="info__title">
          <a href="/">${info.title}</a>
        </h1>
        <p class="info__description">${info.description}</p>
        <a class="info__arrow" id="skip-to-works-btn" href="#works">Skip to works</a>
      </div>
    `
  })
}
