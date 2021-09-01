// @ts-check
import Body from './Body.js'

/**
 * Defines a Style for content
 * Example at: /src/es/components/pages/Idee.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Style
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [color=n.a.]
 *  {string} [background-color=n.a.]
 * }
 * @css {
 *  Note: all of src/es/components/web-components-cms-template/src/es/components/organisms/Body.js
 * }
 */
export default class Style extends Body {
  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return false
  }

  /**
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    const bodyCss = this.css.replace(/\s>\smain/g, '')
    this.css = ''
    this.css = /* css */`
      ${bodyCss}
      :host {
        display: flow-root;
        ${Array.from(this.attributes).reduce((acc, attribute) => `${acc}${attribute.name}: ${attribute.value};--${attribute.name}: ${attribute.value};`, '')}
        /* the below are taken care of within body's css */
        padding: 0;
        margin: 0 !important;
        width: 100% !important;
      }
    `
  }
}
