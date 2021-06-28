#!/usr/bin/env node
const { Router } = require('express');
const Test = require('../services/service-test');

/**
 * Routing:
 *
 * <server>:<port>/api/v1
 *
 */

module.exports = class APIRouter extends Router {
    constructor(opts = APIRouter.defaultOptions()) {
        super(opts);

        /**
         *  General response
         */
        this.get(
            '/',
            Test.getTestReq

            /**
             *  @swagger
             *  paths:
             *  /api/v1:
             *   get:
             *     tags:
             *       - SCOUT24
             *     name: test
             *     summary: TEST API
             *     responses:
             *       200:
             *         description: success
             *         content:
             *              application/json:
             *                schema:
             *                  $ref: '#/components/schemas/Success_Jobs'
             */
        );


    }

    static defaultOptions() {
        return {
            caseSensitive: true,
            strict: true
        };
    }
};
