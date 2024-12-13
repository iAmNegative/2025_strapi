'use strict';

/**
 * liked-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::liked-list.liked-list');
