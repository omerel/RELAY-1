import mongoose from 'mongoose'

const Node = mongoose.model('Node')

exports.findAll = (req, res) => {
  Node.find({}, (err, node) => {
    if (err) {
      res.send(err)
    }
    res.json(node)
  })
}

exports.findById = (req, res) => {
  Node.findById(req.params.id, (err, node) => {
    if (err) {
      res.send(err)
    }
    res.json(node)
  })
}

exports.add = (req, res) => {
  const newNode = new Node(req.body)
  newNode.save((err, node) => {
    if (err) {
      res.send(err)
    }
    res.json(node)
  })
}


exports.update = (req, res) => {
  Node.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, node) => {
    if (err) {
      res.send(err)
    }
    res.json(node)
  })
}


exports.delete = (req, res) => {
  Node.remove({
    _id: req.params.id,
  }, (err, node) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: `Node ${node.id} successfully deleted` })
  })
}
