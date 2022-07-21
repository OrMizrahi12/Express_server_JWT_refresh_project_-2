const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),postController.getAllPosts)
    .post(verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin), postController.createNewPost)
    .put( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),postController.updatePost)
    .delete(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), postController.deletePost);

router.route('/:_id')
    .get(verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin),postController.getPost)
    .delete( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), postController.deletePost)
    .put( verifyRoles(ROLES_LIST.User ,ROLES_LIST.Admin), postController.updatePost);
module.exports = router;