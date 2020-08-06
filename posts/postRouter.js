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
router.get('/:id', validatePostId, (req, res) => {
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
router.delete('/:id', validatePostId, (req, res) => {
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

router.put('/:id', validatePostId, (req, res) => {
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

//(SUCCESS)
function validatePostId(req, res, next) {
  post.getById(req.params.id)
  .then(POST=>{
    if(POST){
        next()
    }else{
        res.status(404).json({ message: 'The post could not be found' });

    }
}).catch(err=>{res.status(500).json({error: error.message})})
}

module.exports = router;
