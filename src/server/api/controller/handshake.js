import mongoose from 'mongoose'

const Handshake = mongoose.model('Handshake')

exports.findAll = (req, res) => {
  Handshake.find({}, (err, handshake) => {
    if (err) {
      res.send(err)
    }
    res.json(handshake)
  })
}

exports.findById = (req, res) => {
  Handshake.findById(req.params.id, (err, handshake) => {
    if (err) {
      res.send(err)
    }
    res.json(handshake)
  })
}

exports.add = (req, res) => {
  const newHandshake = new Handshake(req.body)
  newHandshake.save((err, handshake) => {
    if (err) {
      res.send(err)
    }
    res.json(handshake)
  })
}


exports.update = (req, res) => {
  Handshake.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, handshake) => {
    if (err) {
      res.send(err)
    }
    res.json(handshake)
  })
}


exports.delete = (req, res) => {
  Handshake.remove({
    _id: req.params.id,
  }, (err, handshake) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: `Handshake ${handshake.id} successfully deleted` })
  })
}
