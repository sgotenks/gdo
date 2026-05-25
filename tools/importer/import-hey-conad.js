/* eslint-disable */
/* global WebImporter */

import heroLandingParser from './parsers/hero-landing.js';
import columnsServiceParser from './parsers/columns-service.js';

import conadCleanupTransformer from './transformers/conad-cleanup.js';
import conadSectionsTransformer from './transformers/conad-sections.js';

const parsers = {
  'hero-landing': heroLandingParser,
  'columns-service': columnsServiceParser,
};

const PAGE_TEMPLATE = {
  name: 'hey-conad',
  description: 'Hey Conad landing page - loyalty program or promotional page',
  urls: ['https://www.conad.it/hey-conad'],
  blocks: [
    {
      name: 'hero-landing',
      instances: ['#rc100-hero-4606449'],
    },
    {
      name: 'columns-service',
      instances: [
        '#rc137-strillo-app-429211653',
        '#rc104-service-banner-140342423',
        '#rc106-lancio-1497915825',
        '#rc106-lancio-299779392',
        '#rc106-lancio-2109453761',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'section.rl1-layout__item:has(#rc100-hero-4606449)',
      style: null,
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'App Download CTA',
      selector: 'section.rl1-layout__item:has(#rc137-strillo-app-429211653)',
      style: 'accent',
      blocks: ['columns-service'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Section Title',
      selector: 'section.rl1-layout__item:has(.rt138-richtext-section)',
      style: null,
      blocks: [],
      defaultContent: ['.rt138-richtext-section__subtitle'],
    },
    {
      id: 'section-4',
      name: 'HeyConad App Feature',
      selector: 'section.rl1-layout__item:has(#rc104-service-banner-140342423)',
      style: null,
      blocks: ['columns-service'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'HeyConad Assicurazioni',
      selector: 'section.rl1-layout__item:has(#rc106-lancio-1497915825)',
      style: null,
      blocks: ['columns-service'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'HeyConad Spesa Online',
      selector: 'section.rl1-layout__item:has(#rc106-lancio-299779392)',
      style: null,
      blocks: ['columns-service'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'HeyConad Viaggi',
      selector: 'section.rl1-layout__item:has(#rc106-lancio-2109453761)',
      style: null,
      blocks: ['columns-service'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'Legal Disclaimers',
      selector: 'section.rl1-layout__item:has(#rc1-richtext-298676983)',
      style: null,
      blocks: [],
      defaultContent: ['#rc1-richtext-298676983'],
    },
  ],
};

const transformers = [
  conadCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [conadSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
