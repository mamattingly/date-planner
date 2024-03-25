const router = require("express").Router();
const Place = require("../../models/Place");

router.get("/new-date", async (req, res) => {
    try {
        const randomActivity = await Place.aggregate([
            { $match: { Category: "Activity" } },
            { $sample: { size: 1 } }
        ]);

        const randomFoodPlace = await Place.aggregate([
            { $match: { Category: { $in: ["Lunch", "Breakfast", "Dinner", "Dessert"] } } },
            { $sample: { size: 1 } }
        ]);

        res.json({ activity: randomActivity[0], foodPlace: randomFoodPlace[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/new-activity", async (req, res) => {
    try {
        const randomActivity = await Place.aggregate([
            { $match: { Category: "Activity" } },
            { $sample: { size: 1 } }
        ]);

        res.json(randomActivity[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/new-food-place", async (req, res) => {
    try {
        const randomFoodPlace = await Place.aggregate([
            { $match: { Category: { $in: ["Lunch", "Breakfast", "Dinner", "Dessert"] } } },
            { $sample: { size: 1 } }
        ]);

        res.json(randomFoodPlace[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;