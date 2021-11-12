// @ts-check
import BaseNavigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

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
        margin: 0;
      }
      :host > nav > ul > li {
        margin: var(--margin);
      }
      :host > nav > ul li > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section {
        --navigation-a-link-content-spacing: 0;
        --navigation-a-link-font-size: 1rem;
        --navigation-a-link-font-weight: normal;
        background-color: var(--background-color, white);
        border-bottom: 1px solid transparent;
        display: none;
        position: absolute;
        left: 0;
        margin-top: 2rem;
        padding: 2.5rem 0;
        transition: all 0.2s ease;
        z-index: var(--li-ul-z-index, auto);
      }
      :host > nav > ul li.open {
        border-bottom: 1px solid var(--color-secondary);
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section {
        display: flex;
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li {
        list-style: var(--list-style, none);
        padding-bottom: 0.5rem;
      }
      :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li:first-child, :host > nav > ul li.open > ${this.getAttribute('o-nav-wrapper') || 'o-nav-wrapper'} > section > ul > li.bold {
        --navigation-a-link-font-weight: bold;
        --navigation-a-link-font-size: 1.25rem;
        padding-bottom: 0.875rem;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    super.renderHTML()
    this.loadChildComponents().then(children => Array.from(this.root.querySelectorAll('section')).forEach(section => {
      const wrapper = new children[2][1]({ mode: 'false' })
      Array.from(section.children).forEach(node => {
        if (!node.getAttribute('slot')) wrapper.root.appendChild(node)
      })
      section.replaceWith(wrapper)
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
}
