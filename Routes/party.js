import express from 'express';
import {
    getparties, create, getparty, adduserparty, getuserparty,
    deleteuserparty, getpartymembers, leaveallparties, getquestion, addquestion, getanswers, addanswer,
    add_question_party, sarbi_question, submit_answer, get_submitted_answers, answer, getparty_started,
    start_party, get_points, get_color, get_enemy_points, get_winner, stop_party, test, delete_afk_parties,
    updatee
}
    from '../Controllers/party.js';
import { sendMessage, getPartyMessages } from '../Controllers/message.js';

const router = express.Router();

router.route('/get').get(getparties)
router.route('/create').post(create)
router.route('/party').get(getparty)
router.route('/adduserparty').post(adduserparty)
router.route('/getuserparty').get(getuserparty)
router.route('/deleteuserparty').delete(deleteuserparty)
router.route('/getpartymembers/:party').get(getpartymembers)
router.route('/leaveallparties/:user').delete(leaveallparties)
router.route('/getquestion').get(getquestion)
router.route('/addquestion').post(addquestion)
router.route('/addanswer').post(addanswer)
router.route('/getanswers/:question').get(getanswers)
router.route('/add_question_party').post(add_question_party)
router.route('/sarbi_question/:party').get(sarbi_question)
router.route('/answer').post(submit_answer)
router.route('/skip').post(answer)
router.route('/get_submitted_answers/:party/:question').get(get_submitted_answers)
router.route('/getparty_started/:id').get(getparty_started)
router.route('/start_party/:id').post(start_party)
router.route('/get_points/:id').get(get_points)
router.route('/get_color/:id').get(get_color)
router.route('/get_enemy_points/:id').get(get_enemy_points)
router.route('/get_winner/:id').get(get_winner)
router.route('/stop_party/:id').post(stop_party)
router.route('/test').get(test)
router.route('/delete_afk_parties').delete(delete_afk_parties)
router.route('/updatee/:id/:pts').post(updatee)
router.route('/sendmessage').post(sendMessage)
router.route('/getPartyMessages/:party').get(getPartyMessages)
export default router;