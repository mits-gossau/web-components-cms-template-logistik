// @ts-check
import BaseHeader from '../web-components-cms-template/src/es/components/organisms/Header.js'

/**
 * Header can be sticky and hosts as a flex mostly a logo and a navigation
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 * @css {
 * }
 * @attribute {
 * }
 */
export default class Header extends BaseHeader {
  constructor (...args) {
    super(...args)

    this.clickAnimationListener = event => {
      if (this.header.classList.contains('open')) {
        this.mNavigation.classList.add('open')
      } else if(event && event.animationName === 'close') {
        this.mNavigation.classList.remove('open')
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this.clickAnimationListener)
    this.mNavigation.addEventListener('animationend', this.clickAnimationListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this.clickAnimationListener)
    this.mNavigation.removeEventListener('animationend', this.clickAnimationListener)
  }

  /**
   * renders the o-header css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > header {
          flex-wrap: nowrap;
        }
        :host > header > ${this.getAttribute('m-navigation') || 'm-navigation'} {
          animation: close .4s ease-in;
          left: -100vw;
        }
        :host > header > ${this.getAttribute('m-navigation') || 'm-navigation'}.open {
          display: block;
        }
        :host > header.open > ${this.getAttribute('m-navigation') || 'm-navigation'} {
          animation: open .3s ease-out;
          left: 0;
        }
      }
      @keyframes open {
        0% {left: -100vw}
        100% {left: 0}
      }
      @keyframes close {
        0% {left: 0}
        100% {left: -100vw}
      }
    `
  }
}
