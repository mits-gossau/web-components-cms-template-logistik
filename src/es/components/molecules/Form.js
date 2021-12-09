// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/**
 * As a molecule, this component shall hold Atoms
 * Umbraco Forms Styling
 * Example at: http://localhost:4200/src/es/components/pages/Formularbestellung.html
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @return {CustomElementConstructor | *}
 */
export default class Form extends Shadow() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, { mode: 'false' }), ...args)
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      input, textarea {
        caret-color: var(--color-secondary);
      }
      input[type=text], textarea {
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid var(--m-gray-400);
        color: var(--color);
        padding: 10px;
        font-size: var(--font-size);
        outline: none;
        width: 100%;
      }
      input[type=text]::placeholder, textarea::placeholder {
        color: var(--m-gray-600);
        opacity: 1;
      }
      input[type=text]:hover, textarea:hover {
        border-color: var(--m-gray-600);
      }
      input[type=text]:focus, textarea:focus {
        border-color: var(--color-secondary);
      }
      .umbraco-forms-indicator {
        color: var(--color-secondary);
      }
      .umbraco-forms-field {
        padding-bottom: var(--content-spacing);
      }
      .field-validation-error {
        color: var(--m-red-700);
        padding: 0 10px;
        font-size: 0.875rem;
      }
      fieldset {
        border: 0;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: var(--content-width-not-web-component-mobile, var(--content-width-not-web-component, 90%)) !important;
        }
        input[type=text], textarea {
          font-size: var(--font-size-mobile);
        }
      }
    `
  }
}
