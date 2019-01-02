import { Router } from 'express';
import db from '../db';

let router = Router();

router.get('/:id?', async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let results = await db.one(id);
            res.json(results);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        try {
            let results = await db.all();
            res.json(results);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
});

router.post('/', (req, res) => {
    let user = req.body.user;
    let text = req.body.text;
    let email = req.body.email;
    let password = req.body.password;

    if (email === '') {
        db.newUser(text, user, email, password, 'web');
        res.sendStatus(200);
    } else {
        db.post(user, text);
        res.sendStatus(200);
    }
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    db.put(id, req.body.text);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.del(id);
    res.sendStatus(200);
})

export default router;