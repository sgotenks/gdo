/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Conad site-wide cleanup.
 * Removes non-authorable content from the DOM before and after block parsing.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove OneTrust cookie consent banner (blocks content interaction)
    // Found: <div id="onetrust-consent-sdk"> at line 1883
    WebImporter.DOMUtils.remove(element, ['#onetrust-consent-sdk']);

    // Remove accessiBe accessibility widget overlays
    // Found: <access-widget-ui class="notranslate"> at lines 3-11
    // Found: <span class="acsb-sr-alert acsb-sr-only"> at line 2
    // Found: <a class="acsb-sr-only"> at line 5
    WebImporter.DOMUtils.remove(element, ['access-widget-ui', '.acsb-sr-alert', 'a.acsb-sr-only']);

    // Remove reCAPTCHA widget
    // Found: <div class="grecaptcha-badge"> at line 1866
    WebImporter.DOMUtils.remove(element, ['.grecaptcha-badge']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header (site navigation, not authorable)
    // Found: <header id="rs51-header-180226046" class="rt051-header ..."> at line 14
    WebImporter.DOMUtils.remove(element, ['header']);

    // Remove footer (site footer, not authorable)
    // Found: <footer id="rs50-footer-1970627023" class="rt050-footer"> at line 1723
    WebImporter.DOMUtils.remove(element, ['footer']);

    // Remove breadcrumb (auto-generated navigation, not authorable)
    // Found: <div id="rc117-breadcrumb-1404427284" class="rt117-breadcrumb"> at line 1401
    WebImporter.DOMUtils.remove(element, ['.rt117-breadcrumb']);

    // Remove iframes (reCAPTCHA, tracking, etc.)
    // Found: <iframe> at lines 1868, 1876, 1881
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove noscript and link elements
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);

    // Remove the breadcrumb section container if now empty
    // The breadcrumb section is section.rl1-layout__item containing only the breadcrumb
    const sections = element.querySelectorAll('section.rl1-layout__item');
    sections.forEach((section) => {
      if (section.children.length === 0 || (section.children.length === 1 && section.querySelector('.rt117-breadcrumb'))) {
        section.remove();
      }
    });
  }
}
