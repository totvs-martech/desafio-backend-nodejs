const Product = require('../models').Product;

const getAll = async (req, res)=> {
  return Product
    .findAll()
    .then((products) => res.status(200).send(products))
    .catch((error) => { res.status(400).send(error); });
};

const getById = async (req, res)=> {
  return Product
    .findByPk(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: 'Product Não Encontrado',
        });
      }
      return res.status(200).send(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

const create = async (req, res)=> {
  return Product
    .create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image, 
      value: req.body.value,
      factor: req.body.factor,
    })
    .then((product) => res.status(201).send(product))
    .catch((error) => res.status(400).send(error));
};

const update = async (req, res)=>{
  return Product
    .findByPk(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: 'Product Não Encontrado',
        });
      }
      return product
        .update({
          name: req.body.name || product.name,
          description: req.body.description || product.description,
          image: req.body.image || product.image, 
          value: req.body.value || product.value,
          factor: req.body.factor || product.factor,  
        })
        .then(() => res.status(200).send(product))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

const destroy = async (req, res)=> {
  return Product
    .findByPk(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(400).send({
          message: 'Product Não Encontrado',
        });
      }
      return product
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};