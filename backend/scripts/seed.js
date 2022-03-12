const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const sampleSize = require('lodash.samplesize');
const { exit } = require('process');

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);

(async () => {
    const user = (await User.aggregate([{ $sample: { size: 1 } }]))[0];

    if (!user) { throw "Add at least one user to DB before running this script"; }

    const optionalComments = [
        new Comment({ body: "Very cool!"}),
        new Comment({ body: "Seen better" }),
        new Comment({ body: "+1" }),
        new Comment({ body: ":)" }),
        new Comment({ body: ":(" })
    ];

    for (let step = 1; step <= 50; step++) {
        // Generate some random metadata
        const tagNumber = Math.floor(Math.random() * 10);
        const favCount = Math.floor(Math.random() * 5);
        const comments = sampleSize(optionalComments, 2);
        
        const item = new Item({
            "title": `item${step}`,
            "description": `Some item #${step}`,
            "image": "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "favoritesCount": favCount,
            "comments": comments,
            "tagList": [
                `tag${tagNumber}`
            ],
            "seller": user
        });
        
        for (const comment in comments) {
            comments[comment].item = item;
            comments[comment].seller = user;
            await comments[comment].save();
        }

        await item.save();
    }

    exit();
})();