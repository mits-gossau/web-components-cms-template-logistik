// @ts-check
import BaseBody from '../web-components-cms-template/src/es/components/organisms/Body.js'

/* global self */

/**
 * Defines a body body for content and maps variables to global tags
 * Example at: /src/es/components/pages/General.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Body
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: body;
 *  --content-spacing [40px]
 *  --content-width [80%]
 *  --h1-color [--color, black]
 *  --font-family-secondary
 * }
 */
export default class Body extends BaseBody {
  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host > main > *:not(style) {
        display: block;
      }
      :host > main > h1 {
        --h1-margin: 1rem auto 1.143em;
      }
      :host > main > h2 {
        --h2-margin: 1rem auto 1.143em;
      }
      :host > main > h3 {
        --h3-margin: 1rem auto 1.143em;
      }
      :host > main > h4 {
        --h4-margin: 1rem auto 1.143em;
      }
      :host > main > a-picture {
        --picture-img-max-height: 75vh;
        --picture-img-object-fit: contain;
      }
      :host > main ul {
        list-style: disc;
      }
      :host > main img {
        max-width: 100%;
      }
      :host([home]) .spacer {
        height: var(--home-spacer-height, 15vw);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host([home]) .spacer {
          height: var(--home-spacer-height-mobile, var(--home-spacer-height, 15vw));
        }
        :host([home]) o-wrapper {
          margin: 0;
          --picture-text-wrapper-content-spacing-mobile: 0;
          --teaser-wrapper-content-spacing-mobile: 0;
        }
      }
    `
  }
}
