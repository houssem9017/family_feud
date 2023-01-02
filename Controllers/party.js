import Party from '../Models/party.js';
import User from '../Models/user.js';
import UserParty from '../Models/user_party.js';
import mongoose from 'mongoose';
import Answer from '../Models/answer.js';
import Question from '../Models/question.js';
import Question_Party from '../Models/question_party.js';
import Answer_Party from '../Models/answer_party.js';
import Game from '../Models/game.js';
import mongo from 'mongodb';

export function getparties(req, res) {
    Party
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
export function getparty(req, res) {
    Party
        .find({_id: req.body.id})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
export function create(req, res) {
    var myId = mongoose.Types.ObjectId();
    Party
        .create({
            _id: myId
})
        .then(doc => {
            res.status(200).json( myId );
        })
        .catch(err => {
            res.status(200).json(error);
        });
}
export function adduser(req, res) {

    Party
        .create({
        })
        .then(doc => {
            res.status(200).json(1);
        })
        .catch(err => {
            res.status(200).json(2);
        });
}
export async function adduserparty(req, res) {
    const old = await UserParty.findOne({
        user: req.body.user,
        party: req.body.party })
    if (old) { res.status(200).json('Already in party') }
    else
    Party.findById(req.body.party)
        .then(doc => {
            if (doc) {
                if (doc.started==0)
                UserParty
                    .create({ user: req.body.user, party: req.body.party })
                .then(doc => { res.status(200).json(1); })
                .catch(err => { { res.status(200).json('Check the party id') } });
            }
            else res.status(200).json('Check the party id')
    })
        .catch(err => {
            { res.status(200).json('Check the party id') }
        });
}
export function getuserparty(req, res) {
    UserParty
        .findOne({
            user: req.body.user
        })
        .then(doc => {
            res.status(200).json(doc.party);
        })
        .catch(err => {
            res.status(500).json({ error: "not in party" });
        });
}
export function deleteuserparty(req, res) {
    UserParty.findOneAndRemove({
        user: req.body.user,
        party: req.body.party
    })
     .then(doc => {
        res.status(200).json("You left the party");
     })
     .catch(err => {
        res.status(500).json({ error: "not in party" });
     });
}
export async function getpartymembers(req, res) {
    var list = [];
    Party.findByIdAndUpdate(req.params.id, { updatedAt: new Date() }, function (err, docs) {})
    UserParty
        .find({ party: req.params.party })
        .then(docs => {
            for (var i = 0; i < docs.length; i++) {
                list.push(docs[i].user)
            }
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(200).json({"error":err});
        });
}
async function updatePartyMembers(party,pts) {
    var list = [];
    UserParty
        .find({ party: party })
        .then(docs => {
            for (var i = 0; i < docs.length; i++) {
                list.push(docs[i].user)
            }
            list.forEach((e) => { updateScore(e, pts); updateRank(e); });
        })
        .catch(err => {
            return [];
        });
}
export async function leaveallparties(req, res) {
    await UserParty.deleteMany({
        user: req.params.user
    })
        .then(doc => {
            res.status(200).json("left all parties");
        })
        .catch(err => {
            res.status(200).json({ error: "not in party" });
        });
}

export async function getquestion(req, res) {
    Question
        .findOne({})
        .then(docs => {
            res.status(200).json(docs.question);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export async function addquestion(req, res) {
    Question
        .create(req.body).then(doc => {
            res.status(200).json("created");
        })
        .catch(err => {
            res.status(200).json({ error: err });
        });
}

export async function getanswers(req, res) {
    var list = [];
    Answer
        .find({ question: req.params.question })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export async function addanswer(req, res) {
    Answer
        .create(req.body).then(doc => {
            res.status(200).json("created");
        })
        .catch(err => {
            res.status(200).json({ error: err });
        });
}
export async function add_question_party(req, res) {
    Question_Party
        .create(req.body).then(doc => {
            res.status(200).json("added");
        })
        .catch(err => {
            res.status(200).json({ error: err });
        });
}
export async function sarbi_question(req, res) {
    const q = await Question_Party.findOne({ party: req.params.party, answered: false })
    if (q) res.status(200).json(q.question);
    else {
        const previous_questions = await Question_Party.find({ party: req.params.party, answered: true })
        var l = [];
        var x = await Question.aggregate([{ $sample: { size: 1 } }])
        if (previous_questions) {
            previous_questions.forEach((q) => {
            l.push(q.question);
            })
            while (l.includes(x[0].question) == true)
                x = await Question.aggregate([{ $sample: { size: 1 } }])
        }
        const answers = await Answer.find({ question: x[0].question })
        answers.forEach((answer) => {
            Answer_Party.create({
                question: x[0].question, answer: answer.text,
                party: req.params.party, points : answer.points
            })
        });
        if(x)
            Question_Party.create({ question: x[0].question, party: req.params.party }).then(doc => {
                res.status(200).json(x[0].question);
        }).catch(err => {
            res.status(200).json({ error: err });
        });
    }
}
export async function answer(req, res) {
    process.stdout.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa    ");
    Question_Party.findOneAndUpdate({ "party": req.params.party, "question": req.params.question, "answered": false},
        { "answered": true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            process.stdout.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa    " + err + "     aaaaaaaaaaaaaaaaaaaaaaaaaa");
});
}
async function answer2(req, res) {
    Question_Party.findOneAndUpdate({ "party": req.params.party, "question": req.params.question, "answered": false },
        { "answered": true })
        .then(doc => {
            return;
        })
        .catch(err => { });
}
export async function submit_answer(req, res) {
    Answer_Party.findOneAndUpdate({ "answer": req.body.answer, "party": req.body.party, "question": req.body.question, "answered": false },
        { "answered": true })
        .then(doc => {
            if (doc) {
                Party.findByIdAndUpdate(req.body.party, { $inc: { total_points: doc.points } }, function (err, docs) {
                    res.status(200).json("Correct Answer!");
                });
            }
            else {
                Party.findByIdAndUpdate(req.body.party, { $inc: { wrong_answers: 1 } }, function (err, docs) {
                    if (docs)
                        res.status(200).json("Wrong Answer " + parseInt(2 - parseInt(docs.wrong_answers)) + " tries left");
                    else
                        res.status(200).json("Wrong Answer");
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
export async function get_submitted_answers(req, res) {
    const party = await Party.findById(req.params.party);
    if (party) {
    if (party.wrong_answers > 2) {
        Party.findByIdAndUpdate(req.params.party, { wrong_answers: 0 }, function (err, docs) {
            answer2(req, res);
        });
        
    }
    const submitted_answers = await Answer_Party.find({ question: req.params.question, party: req.params.party, answered: true });
    const unsubmitted_answers = await Answer_Party.find({ question: req.params.question, party: req.params.party, answered: false });
    if (unsubmitted_answers.length == 0) {
        answer(req, res);
    }
    else if (submitted_answers) {
        res.status(200).json(submitted_answers);
        }
    }
    else res.status(200).json([]);
}
export async function getparty_started(req, res) {
    Party.findByIdAndUpdate(req.params.id, { updatedAt: new Date() }, function (err, docs) { })
    const parties_in_queue = await Party.find({ started:1 });
    if (parties_in_queue.length % 2 === 0 && parties_in_queue.length!=0) {
        Game
            .create({
                blueTeam: parties_in_queue[0]._id,
                redTeam: parties_in_queue[1]._id
            })
            .then(doc => {

                parties_in_queue.forEach((party) => { start_party2(party.id); });
            })
            .catch(err => {
            });
    }
    Party.findById(req.params.id, function (err, docs) {
        if (docs) res.status(200).json(docs.started);
        else res.status(200).json(-1); })
}
export async function start_party(req, res) {
    Party.findByIdAndUpdate(req.params.id, { started: 1 }, function (err, docs) { res.status(200).json(docs.started); })
}
export async function stop_party(req, res) {
    Party.findByIdAndUpdate(req.params.id, { started: 0 }, function (err, docs) {
        if (docs)
        res.status(200).json(docs.started);
    })
}
async function start_party2(id) {
    Party.findByIdAndUpdate(id, { started: 2 }, function (err, docs) {})
}
export function get_points(req, res) {
    Party.findById(req.params.id, function (err, docs) {
        if (docs) res.status(200).json(docs.total_points);
        else res.status(200).json(0); })
}
async function get_game(id) {
    var game = await Game.findOne({ blueTeam: id });
    var color = "blue";
    if (game == null) {
        game = await Game.findOne({ redTeam: id }); color = "red";
    }
    return game;
}
export async function get_color(req, res) {
    var game = await get_game(req.params.id);
    if (game.blueTeam == req.params.id)
        res.status(200).json("Blue");
    else
        res.status(200).json("Red");
}
export async function get_enemy_points(req, res) {
    var game = await get_game(req.params.id);
    if (game) {
    if (game.blueTeam == req.params.id)
        Party.findById(game.redTeam, function (err, docs) {
            if (docs) res.status(200).json(docs.total_points);
            else res.status(200).json(0);})
    else
        Party.findById(game.blueTeam, function (err, docs) {
            if (docs) res.status(200).json(docs.total_points);
            else res.status(200).json(0); })
    }
    else res.status(200).json(0);
}
async function updateScore(id, pts) {
    User.findOneAndUpdate({ "username": id },
        { $inc: { points: pts } }).then(doc => {})
        .catch(err => { return err; });
}
async function updateRank(id) {
    var doc = await User.findOne({username:id});
            if (doc.points < 1000)
                User.findOneAndUpdate({ "username": id },
                    { rank: "bronze" }).then(doc => {}).catch(err => { return err; });
            else if (doc.points < 2000)
                User.findOneAndUpdate({ "username": id },
                    { rank: "silver" }).then(doc => {}).catch(err => { return err; });
            else if (doc.points < 3000)
                User.findOneAndUpdate({ "username": id },
                    { rank: "gold" }).then(doc => {}).catch(err => { return err; });
            else
                User.findOneAndUpdate({ "username": id },
                    { rank: "plat" }).then(doc => {}).catch(err => { return err; });
}
export async function updatee(req, res) {
    updateRank("houssem2");
    res.status(200).json("");
}
export async function get_winner(req, res) {
    var game = await get_game(req.params.id);
    var datetime = new Date();
    if (game) {
        Game.findByIdAndUpdate(game._id, { updatedAt: new Date() }, function (err, docs) { })
        Game.findByIdAndUpdate(game._id, { updatedAt: new Date() }, function (err, docs) { })
        var blue = game.blueTeam;
        var red = game.redTeam;
        const previous_questions1 = await Question_Party.find({ party: blue, answered: true });
        const previous_questions2 = await Question_Party.find({ party: red, answered: true });
        const party1 = await Party.findById(blue);
        const party2 = await Party.findById(red);
        if (game.finished == false) {
            
        if (previous_questions1.length > 3 || previous_questions2.length > 3) {
            Game.findByIdAndUpdate(game._id, { finished: true })
                .then(doc => {
                    if (party1.total_points > party2.total_points) {
                        updatePartyMembers(blue, party1.total_points - party2.total_points)
                        updatePartyMembers(red, party2.total_points - party1.total_points)
                        Party.findOneAndUpdate({ blueTeam: blue }, { winner: blue })
                            .then(doc => { res.status(200).json(doc.winner) })
                            .catch(err => { process.stdout.write("aaaaaaaaaaa"+err+"aaaaaaaaa"); });
                    }
                    else {
                        updatePartyMembers(blue, party1.total_points - party2.total_points)
                        updatePartyMembers(red, party2.total_points - party1.total_points)
                        Game.findOneAndUpdate({ blueTeam: blue }, { winner: red })
                            .then(doc => { res.status(200).json(doc.winner) })
                            .catch(err => { process.stdout.write("bbbbbbbbbbbb" + err + "bbbbbbbbbbbbb"); });
                    }
                }).catch(err => { process.stdout.write("cccccccccc" + err + "cccccccccccccccc"); });
            }
        else res.status(200).json(game.winner)
    }
    else
            res.status(200).json(game.winner)
    }
    else
        res.status(200).json("no game")
}
export async function test(req, res) {
    var datetime = new Date();
    var a = await User.find({})

    a.forEach((e) => { var b = 1; })
    User.findOne({ username: "rayen12" }).then(doc => {
        res.status(200).json((datetime.getTime() - doc.createdAt.getTime()) / 1000)
    })
        .catch(err => {
            process.stdout.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa    " + err + "     aaaaaaaaaaaaaaaaaaaaaaaaaa");
        });
}
export async function delete_afk_parties(req, res) {
    var list = await Party.find({})
    var to_delete = []
    var datetime = new Date();

    list.forEach((l) => {
        var datetime = new Date();
            var party1 = Game.findOne({ blueTeam: l._id }).then(doc => { }).catch(err => { });
        var party2 = Game.findOne({ redTeam: l._id }).then(doc => { }).catch(err => { });
        if (party1.finished == null && party2.finished == null)
        if ((datetime.getTime() - l.updatedAt.getTime()) / 1000 > 30)
                    to_delete.push(l._id)
    })
    to_delete.forEach((l) => {
        Party.findByIdAndDelete(l).then(doc => { }).catch(err => { })
        UserParty.deleteMany({ party: l });
    })
    list = await Game.find({})
    list.forEach((game) => {
        if ((datetime.getTime() - game.updatedAt.getTime()) / 1000 > 30) {
            Game.findByIdAndDelete(game._id).then(doc => { }).catch(err => { });
            }
    })
}