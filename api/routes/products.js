const express = require('express');
const router = express.Router();

router.get('/',(req, res,  next)=>{
    res.status(200).json({
        message:'get request para produtos'
    })
})

router.post('/',(req, res,  next)=>{
    const product = {
        name:  req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message:'post request para produtos',
        createdProduct: product
    })
})

router.get('/:productId',(req, res,  next)=>{
    const id = req.params.productId
    if(id === 'especial' ) 
        res.status(200).json({
            message:' id especial',
            id: id
        })
    else
        res.status(200).json({
            message:'voce passou uma id',
        })
})

router.patch('/:productId',(req, res,  next)=>{
    res.status(200).json({
        message:'produto atualizado'
    })
})

router.delete('/:productId',(req, res,  next)=>{
    res.status(200).json({
        message:'produto delete'
    })
})

module.exports = router;