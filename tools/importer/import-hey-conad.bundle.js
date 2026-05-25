/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-hey-conad.js
  var import_hey_conad_exports = {};
  __export(import_hey_conad_exports, {
    default: () => import_hey_conad_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const image = element.querySelector(".rt100-hero__right img, .rt100-hero__image img, picture img");
    const heading = element.querySelector(".rt100-hero__title h1, .rt100-hero__title h2, .rt100-hero__left h1, .rt100-hero__left h2");
    const description = element.querySelector(".rt100-hero__text, .rt100-hero__left .rt001-richtext:not(.rt100-hero__title)");
    const ctaLinks = Array.from(element.querySelectorAll(".rt100-hero__ctaArea a, .rt100-hero__left a.cta, .rt100-hero__left a.button"));
    const cells = [];
    if (image) {
      const imageFragment = document.createDocumentFragment();
      imageFragment.appendChild(document.createComment(" field:image "));
      imageFragment.appendChild(image);
      cells.push([imageFragment]);
    } else {
      cells.push([""]);
    }
    const textFragment = document.createDocumentFragment();
    textFragment.appendChild(document.createComment(" field:text "));
    if (heading) textFragment.appendChild(heading);
    if (description) textFragment.appendChild(description);
    if (ctaLinks.length > 0) {
      ctaLinks.forEach((link) => textFragment.appendChild(link));
    }
    cells.push([textFragment]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-service.js
  function parse2(element, { document }) {
    const cells = [];
    const isStrilloApp = element.classList.contains("rt137-strillo-app");
    const isServiceBanner = element.classList.contains("rt104-service-banner");
    const isLancio = element.classList.contains("rt106-lancio");
    if (isStrilloApp) {
      const col1 = [];
      const title = element.querySelector(".rt137-strillo-app__title");
      if (title) col1.push(title);
      const text = element.querySelector(".rt137-strillo-app__text");
      if (text) col1.push(text);
      const col2 = [];
      const ctaLinks = element.querySelectorAll("a.rt137-strillo-app__cta");
      ctaLinks.forEach((link) => col2.push(link));
      cells.push([col1, col2]);
    } else if (isServiceBanner) {
      const col1 = [];
      const image = element.querySelector(".rt104-service-banner__left img, .rt104-service-banner__image");
      if (image) col1.push(image);
      const col2 = [];
      const heading = element.querySelector(".rt104-service-banner__title");
      if (heading) col2.push(heading);
      const text = element.querySelector(".rt104-service-banner__text");
      if (text) col2.push(text);
      const cta = element.querySelector("a.rt104-service-banner__cta, a.rt002-cta");
      if (cta) col2.push(cta);
      cells.push([col1, col2]);
    } else if (isLancio) {
      const col1 = [];
      const heading = element.querySelector(".rt106-lancio__titleText, .rt106-lancio__title .rt001-richtext");
      if (heading) col1.push(heading);
      const text = element.querySelector(".rt106-lancio__text");
      if (text) col1.push(text);
      const cta = element.querySelector("a.rt106-lancio__cta, .rt106-lancio__left a.rt002-cta");
      if (cta) col1.push(cta);
      const col2 = [];
      const image = element.querySelector(".rt106-lancio__image img, picture.rt106-lancio__image");
      if (image) col2.push(image);
      cells.push([col1, col2]);
    } else {
      const col1 = [];
      const col2 = [];
      const img = element.querySelector("img, picture");
      if (img) col1.push(img);
      const headingEl = element.querySelector("h1, h2, h3, h4");
      if (headingEl) col2.push(headingEl);
      const paraEl = element.querySelector("p");
      if (paraEl) col2.push(paraEl);
      const linkEl = element.querySelector("a");
      if (linkEl) col2.push(linkEl);
      cells.push([col1, col2]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-service", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/conad-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#onetrust-consent-sdk"]);
      WebImporter.DOMUtils.remove(element, ["access-widget-ui", ".acsb-sr-alert", "a.acsb-sr-only"]);
      WebImporter.DOMUtils.remove(element, [".grecaptcha-badge"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header"]);
      WebImporter.DOMUtils.remove(element, ["footer"]);
      WebImporter.DOMUtils.remove(element, [".rt117-breadcrumb"]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
      const sections = element.querySelectorAll("section.rl1-layout__item");
      sections.forEach((section) => {
        if (section.children.length === 0 || section.children.length === 1 && section.querySelector(".rt117-breadcrumb")) {
          section.remove();
        }
      });
    }
  }

  // tools/importer/transformers/conad-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-hey-conad.js
  var parsers = {
    "hero-landing": parse,
    "columns-service": parse2
  };
  var PAGE_TEMPLATE = {
    name: "hey-conad",
    description: "Hey Conad landing page - loyalty program or promotional page",
    urls: ["https://www.conad.it/hey-conad"],
    blocks: [
      {
        name: "hero-landing",
        instances: ["#rc100-hero-4606449"]
      },
      {
        name: "columns-service",
        instances: [
          "#rc137-strillo-app-429211653",
          "#rc104-service-banner-140342423",
          "#rc106-lancio-1497915825",
          "#rc106-lancio-299779392",
          "#rc106-lancio-2109453761"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "section.rl1-layout__item:has(#rc100-hero-4606449)",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "App Download CTA",
        selector: "section.rl1-layout__item:has(#rc137-strillo-app-429211653)",
        style: "accent",
        blocks: ["columns-service"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Section Title",
        selector: "section.rl1-layout__item:has(.rt138-richtext-section)",
        style: null,
        blocks: [],
        defaultContent: [".rt138-richtext-section__subtitle"]
      },
      {
        id: "section-4",
        name: "HeyConad App Feature",
        selector: "section.rl1-layout__item:has(#rc104-service-banner-140342423)",
        style: null,
        blocks: ["columns-service"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "HeyConad Assicurazioni",
        selector: "section.rl1-layout__item:has(#rc106-lancio-1497915825)",
        style: null,
        blocks: ["columns-service"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "HeyConad Spesa Online",
        selector: "section.rl1-layout__item:has(#rc106-lancio-299779392)",
        style: null,
        blocks: ["columns-service"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "HeyConad Viaggi",
        selector: "section.rl1-layout__item:has(#rc106-lancio-2109453761)",
        style: null,
        blocks: ["columns-service"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Legal Disclaimers",
        selector: "section.rl1-layout__item:has(#rc1-richtext-298676983)",
        style: null,
        blocks: [],
        defaultContent: ["#rc1-richtext-298676983"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_hey_conad_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_hey_conad_exports);
})();
