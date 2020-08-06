const express = require('express');
const post = require('./postDb')
const router = express.Router();

//(SUCCESS)
router.get('/', (req, res) => {
  post.get().then(POST=>{
    res.status(200).json(POST)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving post data"
    })
  })
});

//(SUCCESS)
router.get('/:id', (req, res) => {
  post.getById(req.params.id)
  .then(POST=>{
    res.status(200).json(POST)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error retrieving post data"
    })
  })
});

//(SUCCESS)
router.delete('/:id', (req, res) => {
  post.remove(req.params.id)
  .then(()=>{
    res.status(200).json({ message: 'The post has been deleted' })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error removing"
    })
  })
});

router.put('/:id', (req, res) => {
  post.update(req.params.id, req.body)
  .then(POST=>{
    res.status(200).json(POST)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error updating"
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
