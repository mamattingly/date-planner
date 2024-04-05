const User = require("../../models/User");
const router = require("express").Router();
const authMiddleware = require("../../utils/auth");
const validatePassword = require("../../utils/validatePassword");

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res
                .status(404)
                .json({ message: "No user with that username!" });
        }

        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password!" });
        }
        const token = authMiddleware.signToken(user);
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", (req, res) => {
    req.status(200).json({ message: "You are now logged out!" });
});

router.post("/signup", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Creating user with:", email, password);
        if (!email || !password) {
            return res.status(400).json({
                message: "You must provide an email and password!",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.",
            });
        }

        const user = await User.create({ email, password });
        const token = authMiddleware.signToken(user);
        res.json({ token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists!",
            });
        }
        next(error);
    }
});

router.post("/save-date", authMiddleware.checkAuth, async (req, res, next) => {
    try {
        const { name, activity, food } = req.body;
        const user = req.user;

        const updatedToken = authMiddleware.signToken(user.data);
        const updateUser = await User.findByIdAndUpdate(
            user.data._id,
            {
                $push: {
                    savedDates: {
                        name,
                        activity,
                        food,
                    },
                },
            },
            { new: true }
        );
        res.setHeader("Authorization", `Bearer ${updatedToken}`);
        res.json({ savedDates: updateUser.savedDates });
    } catch (error) {
        next(error);
    }
});

router.get("/saved-dates", authMiddleware.checkAuth, async (req, res, next) => {
    try {
        const user = req.user;
        const updatedToken = authMiddleware.signToken(user.data);
        const updatedUser = await User.findById(user.data._id).populate(
            "savedDates"
        );
        res.setHeader("Authorization", `Bearer ${updatedToken}`);
        res.json({ savedDates: updatedUser.savedDates });
    } catch (error) {
        next(error);
    }
});

router.delete(
    "/delete-date",
    authMiddleware.checkAuth,
    async (req, res, next) => {
        try {
            const { _id } = req.body;
            const user = req.user;
            const updatedToken = authMiddleware.signToken(user.data);
            const updatedUser = await User.findByIdAndUpdate(
                user.data._id,
                { $pull: { savedDates: { _id } } },
                { new: true }
            );
            res.setHeader("Authorization", `Bearer ${updatedToken}`);
            res.json({ savedDates: updatedUser.savedDates });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    "/update-history",
    authMiddleware.checkAuth,
    async (req, res, next) => {
        try {
            const userId = req.user.data._id;
            const { eventId } = req.body;
            const user = await User.findById(userId);
            const index = user.history.findIndex(
                (date) => date.eventId === eventId
            );

            if (index === -1) {
                user.history.push({ eventId, count: 1 });
            } else {
                user.history[index].count++;
            }

            const updatedUser = await user.save();
            const updatedToken = authMiddleware.signToken(updatedUser);
            res.setHeader("Authorization", `Bearer ${updatedToken}`);
            res.json({ history: updatedUser.history });
        } catch (error) {
            next(error);
        }
    }
);

router.get("/history", authMiddleware.checkAuth, async (req, res, next) => {
    try {
        const user = req.user;
        const updatedToken = authMiddleware.signToken(user.data);
        const updatedUser = await User.findById(user.data._id).populate(
            "history"
        );
        res.setHeader("Authorization", `Bearer ${updatedToken}`);
        res.json({ history: updatedUser.history });
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
});

module.exports = router;
