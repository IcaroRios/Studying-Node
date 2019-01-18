const express = require('express');
const router = express.Router();

router.get('/',(req, res,  next)=>{
    res.status(200).json({
        message:'orders fetched'
    })
})

router.post('/',(req, res,  next)=>{
    res.status(200).json({
        message:'order was created'
    })
})

module.exports = router;