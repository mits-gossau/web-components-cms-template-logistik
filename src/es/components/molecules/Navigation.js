// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global customElements */
/* global self */
/* global Wrapper */

/**
 * Navigation hosts uls
 * Example at: /src/es/components/pages/Home.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Navigation
 * @type {CustomElementConstructor}
 */
export default class Navigation extends BaseNavigation {
  constructor (...args) {
    super(...args)

    this.clickListener = event => {
      // the checkMedia is used to hack the click behavior of BaseNavigation to remove on desktop all li.open when  clicked away or in an other menu point. This because we need to indicate the active menu point with a border under the list
      if (this.checkMedia('desktop')) {
        this.setAttribute('focus-lost-close-mobile', '')
      } else {
        this.removeAttribute('focus-lost-close-mobile')
      }
      let section
      if ((section = this.root.querySelector('li.open section'))) {
        if (this.hasAttribute('no-scroll')) document.body.classList.add(this.getAttribute('no-scroll') || 'no-scroll')
        this.style.textContent = /* css */`
          :host > nav > ul > li.open > div.background {
            top: ${section.getBoundingClientRect().bottom}px;
          }
        `
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    self.addEventListener('resize', this.clickListener)
    // the checkMedia is used to hack the click behavior of BaseNavigation to remove on desktop all li.open when  clicked away or in an other menu point. This because we need to indicate the active menu point with a border under the list
    if (this.checkMedia('desktop')) {
      this.setAttribute('focus-lost-close-mobile', '')
    } else {
      this.removeAttribute('focus-lost-close-mobile')
    }
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    self.removeEventListener('resize', this.clickListener)
    this.root.querySelectorAll('a-link').forEach(link => link.removeEventListener('click', this.clickListener))
  }

  /**
   * renders the logistik-m-navigation css
   *
   * @return {void}
   */
  renderCSS () {
    // extend body styles
    super.renderCSS()
    const bodyCss = this.css
      .replace(/:host\s*ul\s*{[^}]*}/g, '')
      .replace(/:host\s*>\s*nav\s*>\s*ul\s*li\s*ul\s*{[^}]*}/g, '')
      .replace(/:host\s*>\s*nav\s*>\s*ul\s*li\s*{[^}]*}/g, '')
    this.css = ''
    this.setCss(bodyCss, undefined, '') // already received its namespace and for that gets set without any ''
    this.css = /* css */`
      :host > nav > ul {
        background-color: var(--background-color);
        margin: 0;
      }
      :host > nav > ul > li {
        margin: var(--margin);
        border-bottom: 1px solid transparent;
        transition: all 0.1s ease;
      }
      :host > nav > ul li.open {
        border-bottom: 1px solid var(--color-secondary);
      }
      :host > nav > ul > li > div.background {
        cursor: auto;
        display: none;
        position: fixed;
        background-color: var(--m-gray-500);
        width: 100vw;
        height: 100vw;
        left: 0;
        top: 0;
        opacity: 0;
      }
      :host > nav > ul > li.open > div.background {
        display: block;
        opacity: 0.54;
      }
      :host > nav > ul li > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section {
        --a-link-content-spacing: 0;
        --a-link-font-size: 1rem;
        --a-link-font-weight: normal;
        background-color: var(--background-color, white);
        cursor: auto;
        display: none;
        position: absolute;
        left: 0;
        margin-top: 2rem;
        padding: 2.5rem 0;
        transition: all 0.2s ease;
        z-index: var(--li-ul-z-index, auto);
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section {
        display: flex;
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li {
        list-style: var(--list-style, none);
        padding-bottom: 0.5rem;
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li:first-child, :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li.bold {
        --a-link-font-weight: bold;
        --a-link-font-size: 1.25rem;
        padding-bottom: 0.875rem;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --a-link-content-spacing-no-scroll: 1.1429rem 1.2143rem;
          --a-link-font-size-mobile: var(--a-link-font-size-no-scroll-mobile);
          --a-link-font-size-no-scroll-mobile: 1.1429rem;
          --a-link-font-weight: normal;
          --a-link-text-align-mobile: left;
          --height: auto;
          --li-padding: 0;
          --margin: 0;
          --min-height-mobile: 0;
        }
        :host > nav > ul > li{
          box-sizing: border-box;
          border-bottom: var(--header-border-bottom);
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        :host > nav > ul > li > div.background {
          display: none !important;
        }
        :host > nav > ul li a-link {
          display: flex;
          align-items: center;
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    super.renderHTML(['left', 'right'], this.arrowClickListener)
    this.loadChildComponents().then(children => Array.from(this.root.querySelectorAll('section')).forEach(section => {
      const wrapper = new children[2][1]({ mode: 'false' })
      Array.from(section.children).forEach(node => {
        if (!node.getAttribute('slot')) wrapper.root.appendChild(node)
      })
      section.parentNode.prepend(this.getBackground())
      section.replaceWith(wrapper)
      this.root.querySelectorAll('a-link').forEach(link => link.addEventListener('click', this.clickListener))
      this.html = this.style
    }))
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let wrapperPromise
    try {
      wrapperPromise = Promise.resolve({ Wrapper: Wrapper })
    } catch (error) {
      wrapperPromise = import('../web-components-cms-template/src/es/components/organisms/Wrapper.js')
    }
    return super.loadChildComponents([
      wrapperPromise.then(
        /** @returns {[string, any]} */
        module => [this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper', module.Wrapper(Shadow())]
      ).then(element => {
        if (!customElements.get(element[0])) customElements.define(element[0], element[1])
        return element
      })
    ])
  }

  getBackground () {
    const background = document.createElement('div')
    background.classList.add('background')
    return background
  }

  /**
   *
   *
   * @param {'mobile' | 'desktop'} [media=this.getAttribute('media')]
   * @returns {boolean}
   * @memberof IntersectionScrollEffect
   */
  checkMedia (media = this.getAttribute('media')) {
    // @ts-ignore ignoring self.Environment error
    const breakpoint = this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'
    const isMobile = self.matchMedia(`(max-width: ${breakpoint}`).matches
    return (isMobile ? 'mobile' : 'desktop') === media
  }

  get style () {
    return this._style || (this._style = (() => {
      const style = document.createElement('style')
      style.setAttribute('protected', 'true')
      return style
    })())
  }
}
