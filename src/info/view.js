import { ParallaxView } from '../components/parallax/view.js'
import { NavigationView } from '../components/navigation/view.js'

export function InfoView({ parallaxSettings, navigationLinks, info }) {
  return `
    ${NavigationView(navigationLinks)}
    ${
      ParallaxView({
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
  `
}
