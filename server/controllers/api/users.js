const { User } = require("../../models");
const router = require("express").Router();

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "No user with that username!" });
        }

        const validPassword = await user.checkPassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password!" });
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ user: user, message: "You are now logged in!" });
        });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ user: user, message: "You are now logged in!" });
        });
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

module.exports = router;
