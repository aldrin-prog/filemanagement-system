const express = require('express');
const { getResources, addRousource, deleteResource, getUSerResources, updateResource } = require('../controller/resourceController');
const router=express.Router();

router.get('/',getResources);
router.post('/',addRousource);
router.put('/:id',updateResource);
router.post('/user/',getUSerResources)
router.delete('/:id',deleteResource);
module.exports=router;