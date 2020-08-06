const express = require('express');
const user = require('./userDb')
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body)
  user.insert(req.body)
  .then(USER=>{
    res.status(201).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error posting new user"
    })
  })
});

router.post('/:id/posts', (req, res) => {
  user.insert(req.body)
  .then(USER=>{
    res.status(201).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error posting new user"
    })
  })
});

//(SUCCESS)
router.get('/', (req, res) => {
  user.get().then(USER=>{
    res.status(200).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving user data"
    })
  })
});

//(SUCCESS)
router.get('/:id', (req, res) => {
  user.getById(req.params.id)
  .then(USER=>{
    res.status(200).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving user data"
    })
  })
});

//(SUCCESS)
router.get('/:id/posts', (req, res) => {
  user.getUserPosts(req.params.id)
  .then(USER=>{
    res.status(200).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving user data"
    })
  })
});

//(SUCCESS)
router.delete('/:id', (req, res) => {
  user.remove(req.params.id)
  .then(()=>{
    res.status(200).json({ message: 'The user has been deleted' })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error removing"
    })
  })
});


router.put('/:id', (req, res) => {
  user.update(req.params.id, req.body)
  .then(USER=>{
    res.status(200).json(USER)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error updating"
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
