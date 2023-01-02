import Message from '../Models/message.js';
import mongo from 'mongodb';

export function sendMessage(req, res) {
    Message
        .create(req.body)
        .then(doc => {res.status(200).json("");})
        .catch(err => {res.status(200).json("");});
}

export function getPartyMessages(req, res) {
    Message
        .find({ party: req.params.party }).sort([['createdAt', -1]])
        .then(docs => {res.status(200).json(docs);})
        .catch(err => {res.status(500).json({ error: err });});
}