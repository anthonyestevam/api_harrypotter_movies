const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect(
        'mongodb+srv://thxny:rgScQwaPa4tWutn4@harrypotter.uglkt.mongodb.net/?retryWrites=true&w=majority&appName=harrypotter'
    );
    console.log('database connected');
}
main().catch((err) => console.log(err))

module.exports = mongoose