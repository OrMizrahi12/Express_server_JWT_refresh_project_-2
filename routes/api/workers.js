// #21 the user want to do some request
const express = require('express');
const router = express.Router();
const workerController = require('../../controllers/workerController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
// for get, the user need pass the middle ware.
// #21 we send to verifyRoles the arr of relse_list
// #22 - verifyRoles.js --> 
    .get(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),workerController.getAllWorker)
    .post(verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin), workerController.createNewWorker)
    .put( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),workerController.updateWorker)
    .delete(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), workerController.deleteWorker);

router.route('/:_id')
    .get(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),workerController.getWorker)
    .delete( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), workerController.deleteWorker)
    .put( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), workerController.updateWorker);
module.exports = router;