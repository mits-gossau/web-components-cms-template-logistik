// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */
/* global Link */
/* global customElements */

/**
 * Footer is sticky and hosts uls
 * Example at: /src/es/components/organisms/Playlist.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [logo-load="logo-load"]
 *  {boolean} [homepage] for classics homepage styles (only one logo at right side)
 * }
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1rem]
 *  --p-margin [0]
 * }
 */
export default class Footer extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.wrapper
  }

  /**
   * renders the o-footer css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        border-top: var(--border-top, 0);
      }
      :host > footer > * {
        margin: var(--content-spacing, 40px) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > footer > a.logo {
        display: block;
      }
      :host > footer > ul.end {
        --color: var(--background-color);
        --color-hover: var(--m-orange-300);
        --padding: 1.1429rem 1.2143rem;
        background-color: var(--color-secondary);
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0;
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 0;
        width: 100%;
      }
      :host > footer > ul.end:not(:first-child) {
        margin-top: 1px;
      }
      :host > footer > ul.end > li {
        border: 0;
        list-style: var(--list-style, none);
        width: auto;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --font-size: var(--font-size-mobile);
        }
        :host > footer > * {
          margin: var(--content-spacing-mobile, 0) auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-not-web-component-mobile, 90%);
        }
      }
    `
    this.wrapperStyle.textContent = /* css */`
      :host > section > ul > li {
        list-style: var(--list-style, none);
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.loadChildComponents().then(children => {
      Array.from(this.root.querySelectorAll('li a')).forEach(a => {
        const li = a.parentElement
        const aLink = new children[0][1](a, { namespace: this.getAttribute('namespace') || '', namespaceFallback: this.hasAttribute('namespace-fallback') })
        if (a.classList.contains('active')) aLink.classList.add('active')
        a.replaceWith(aLink)
        li.prepend(aLink)
      })
      const wrapper = new children[1][1]()
      wrapper.root.appendChild(this.wrapperStyle)
      Array.from(this.root.children).forEach(node => {
        if (node.tagName === 'UL' && !node.classList.contains('end')) wrapper.root.appendChild(node)
      })
      this.footer.appendChild(this.logo)
      this.footer.appendChild(wrapper)
      this.ends.forEach(end => this.footer.appendChild(end))
      this.html = this.footer
    })
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let linkPromise
    try {
      linkPromise = Promise.resolve({ default: Link })
    } catch (error) {
      linkPromise = import('../web-components-cms-template/src/es/components/atoms/Link.js')
    }
    let wrapperPromise
    try {
      wrapperPromise = Promise.resolve({ Wrapper: Wrapper })
    } catch (error) {
      wrapperPromise = import('../web-components-cms-template/src/es/components/organisms/Wrapper.js')
    }
    return (this.childComponentsPromise = Promise.all([
      linkPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-link', module.default]
      ),
      wrapperPromise.then(
        /** @returns {[string, any]} */
        module => [this.getAttribute('o-footer-wrapper') || 'o-footer-wrapper', module.Wrapper(Shadow())]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }

  get footer () {
    return this._footer || (this._footer = document.createElement('footer'))
  }

  get wrapper () {
    return this.root.querySelector('o-footer-wrapper')
  }

  get wrapperStyle () {
    return this._style || (this._style = (() => {
      const style = document.createElement('style')
      style.setAttribute('protected', 'true')
      return style
    })())
  }

  get ends () {
    return this.root.querySelectorAll('.end')
  }

  get logo () {
    return this.root.querySelector('.logo')
  }
}