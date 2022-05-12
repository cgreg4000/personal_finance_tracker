const mongoose = require('mongoose');

const db_name = "finance_tracker_db"

mongoose.connect(`mongodb+srv://root:root@coding-dojo-mongo-db-cl.lrl3t.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));