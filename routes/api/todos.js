const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todoController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User ),todoController.getAllTodos)
    .post(verifyRoles(ROLES_LIST.User), todoController.createNewTodo)
    .put( verifyRoles(ROLES_LIST.User ),todoController.updateTodo)
    .delete(verifyRoles(ROLES_LIST.User ), todoController.deleteTodo);

router.route('/:_id')
    .get(verifyRoles(ROLES_LIST.User ),todoController.getTodo)
    .delete( verifyRoles(ROLES_LIST.User ), todoController.deleteTodo)
    .put( verifyRoles(ROLES_LIST.User ), todoController.updateTodo);
module.exports = router;
