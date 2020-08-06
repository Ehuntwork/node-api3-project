const express = require('express');
const user = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
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
router.get('/:id', validateUserId, (req, res) => {
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
router.get('/:id/posts', validateUserId,(req, res) => {
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
router.delete('/:id', validateUserId, (req, res) => {
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
  user.getById(req.params.id)
  .then(USER=>{
    if(USER){
        next()
    }else{
        res.status(400).json({ message: "invalid user id" });

    }
}).catch(err=>{res.status(500).json({error: error.message})})
}

function validateUser(req, res, next) {
    if(req.body && req.body.name){
        next()
    }else if(!req.body){
        res.status(400).json({ message: "missing user data" });
    }else if(!req.body.name){
      res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  if(req.body && req.body.name){
    next()
  }else if(!req.body){
      res.status(400).json({ message: "missing post data" });
  }else if(!req.body.text){
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
