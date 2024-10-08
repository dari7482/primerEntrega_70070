import { Router } from 'express';

import passport from 'passport'


import jwt from 'jsonwebtoken';


const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    // res.send({ status: "success", message: "usuario registrado" })
    res.redirect('/login');
});

router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    //res.send({ error: "Failed" })
    res.redirect('/error')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    const { email, password } = req.body;
    if (!req.user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" })



    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        rol: req.user.rol,
        email: req.user.email,
        cart: req.user.cart

    }

    console.log(req.session.user)
    let token = jwt.sign({ email, password, role: "user" }, "coderSecret", { expiresIn: "60s" })
    console.log(token)
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
    });



    //res.send({ status: "success", payload: req.user })
    res.redirect('/api/products');
});

router.get('/faillogin', (req, res) => {
    res.redirect('/error')
    //res.send("Login fallido")
})
router.get('/:ruta/current', (req, res) => {
    const token = req.cookies.token;
    console.log(token)
    const ruta = req.params.ruta;
    console.log(`Role: ${ruta}`);
    res.send(req.user);

})



router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.clearCookie('token');
        res.redirect('/login');
    });
});


export default router;
