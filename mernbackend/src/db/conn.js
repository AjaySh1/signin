const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moviemaniaregistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.error(`no connection`, e);
});
