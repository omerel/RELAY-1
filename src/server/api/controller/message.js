import Message from '../model/message'

exports.findAll = (req, res) => {
  Message.find({}, (err, message) => {
    if (err) {
      res.send(err)
    }
    res.json(message)
  })
}

exports.findById = (req, res) => {
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      res.send(err)
    }
    res.json(message)
  })
}

exports.add = (req, res) => {
  const newMessage = new Message(req.body)
  newMessage.save((err, message) => {
    if (err) {
      res.send(err)
    }
    res.json(message)
  })
}

exports.update = (req, res) => {
  Message.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, message) => {
    if (err) {
      res.send(err)
    }
    res.json(message)
  })
}

exports.delete = (req, res) => {
  Message.remove({
    _id: req.params.id,
  }, (err, message) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: `Message ${message.id} successfully deleted` })
  })
}
