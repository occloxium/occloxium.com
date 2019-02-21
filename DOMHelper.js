/**
 * The default transition time for fades
 * This does not actually affect any animation, it is only used
 * for asynchronous triggers to affect element classes
 * @property {number} [__transitionTime=500] transition time
 */
let __transitionTime = 500;

export class DOMHelper {
  constructor() {
  }
  /**
   * @returns {number} the default transition time for fades
   */
  getTransitionTime() {
    return __transitionTime();
  }
  /**
   * Sets the default transition time
   * @param {number} [time=500] time must be less than 1000ms
   */
  setTransitionTime(time) {
    return (typeof time === 'number' && time <= 1000
      ? __transitionTime = time
      : __transitionTime = 500);
  }
  /**
   * This is used to generalize the way the helper functions are used
   * Functions that already have an element can use this as a proxy
   * and such with only (query) strings can query the actual element
   * @see {Facade Pattern}
   * @param {string|Element} el either a query string or an element
   * @return {Element} The first element queried
   */
  static query(el) {
    if (typeof el === 'string') {
      // parameter probably is a query string, query the DOM first
      return document.querySelector(el);
    }
    else if (el instanceof 'Element') {
      // parameter is an element, no further querying to do
      return el;
    }
    else {
      throw new Error(`Incompatible parameter type: ${typeof el}`);
    }
  }
  /**
   * Appends HTML code to an element
   * @param {Element} parent the parent element to insert into
   * @param {string} html the code to insert
   */
  static append(parent, html) {
    document.querySelector(parent).insertAdjacentHTML('beforeend', html);
  }
  /**
   * Shows a previously hidden element by removing the 'is-hidden' class
   * The CSS class HAS TO BE defined in your stylesheets
   */
  static show(el) {
    this.query.classList.remove('is-hidden');
  }
  /**
   * Hides an element by adding the 'is-hidden' class
   * The CSS class HAS TO BE defined in your stylesheets
   */
  static hide(el) {
    this.helpers.query(el).classList.add('is-hidden');
  }
  /**
   * Fades in a previously hidden element with CSS classes
   * @see DOMHelper.hide()
   */
  static fadeIn(el) {
    let element = this.helpers.query(el);
    element.classList.remove('is-hidden');
    element.classList.add('is-fading-in');
    setTimeout(() => {
      element.classList.remove('is-fading-in');
    }, this.transitionTime);
  }
  /**
   * Fades out an element and adds the 'is-hidden' class afterwards
   * @see DOMHelper.hide()
   */
  static fadeOut(el) {
    let element = this.helpers.query(el);
    element.classList.add('is-fading-out');
    setTimeout(() => {
      element.classList.remove('is-fading-out');
      element.classList.add('is-hidden');
    }, this.transitionTime);
  }
  /**
   * Slides down a previously hidden element with CSS classes
   * @see DOMHelper.hide()
   */
  static slideDown(el) {
    let element = this.helpers.query(el);
    element.classList.remove('is-hidden');
    element.classList.add('is-sliding-down');
    setTimeout(() => {
      element.classList.remove('is-sliding-down');
    }, this.transitionTime);
  }
  /**
   * slides up an element and adds the 'is-hidden' class afterwards
   * @see DOMHelper.hide()
   */
  static slideUp(el) {
    let element = this.helpers.query(el);
    element.classList.add('is-sliding-up');
    setTimeout(() => {
      element.classList.remove('is-sliding-up');
      element.classList.add('is-hidden');
    }, this.transitionTime);
  }
}
