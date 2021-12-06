// @ts-check
import { Details as BaseDetails } from '../web-components-cms-template/src/es/components/molecules/Details.js'
import { Mutation } from '../web-components-cms-template/src/es/components/prototypes/Mutation.js'
import Body  from '../organisms/Body.js'

/**
 * Details (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) aka. Bootstrap accordion
 * Example at: /src/es/components/pages/Home.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Details
 * @type {CustomElementConstructor}
 * @css {

 * }
 * @attribute {

 * }
 */
export default class Details extends BaseDetails(Mutation(Body)) {}
