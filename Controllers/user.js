import User from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function testfct(req, res) {
    res.status(200).json({ 'a': 'b' })
}


export async function login(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })

    const token = jwt.sign(
        { username: username },
        "jllgshllWEUJHGHYJkjsfjds90",
        {
            expiresIn: "2h",
        }
    );
    if (user && (await bcrypt.compare(password, user.password))) {
        user.token = token;
        res.status(200).json(1)
    }
    else
        res.status(200).json( 2 )
}

export async function signup(req, res) {
    const usernamee = req.body.username;
    const oldUser = await User.findOne({ "email": req.body.email });
    const oldUser2 = await User.findOne({ "username": req.body.username });
    const token = jwt.sign(
        { user_id: User._id, usernamee },
        "jllgshllWEUJHGHYJkjsfjds90",
        {
            expiresIn: "2h",
        }
    );

    if (oldUser || oldUser2) {
        return res.status(200).json("User Already Exists. Please Login");
    }

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        points: 0,
        token: token
    })
        .then(newUser => {
            res.status(200).json('Registration successful');
        })
        .catch(err => {
            res.status(404).json(err);
        });
}

export function getAll(req, res) {
    User
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function getOnce(req, res) {
    User
        .findOne({ "username": req.params.username })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}


export function changepassword (req, res) {
    const user = User.findOne({username : req.params.username})
    const password = user.password;
            if (req.body.oldpassword == password)
            {
            User.findOneAndUpdate({ "username": req.params.username },
            {"password": req.body.password })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }
}

export function deleteOnce(req, res) {
    User
        .findOneAndRemove({ "username": req.params.username })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

