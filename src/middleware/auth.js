export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        console.log('redirect')
        res.redirect('/login');
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/profile');
    }
};
