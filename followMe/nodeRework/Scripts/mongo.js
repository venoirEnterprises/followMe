
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log("DB exists");
});

exports.giveMeUserWithUsername = function (argUsername) {

    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("followme");
        var query = { username: argUsername };
        dbo.collection("userDefined").find(query).toArray(function (err, result) {
            if (err) throw err;
            return (
                console.log("XP: " + result[0].XP +
                "level: " + result[0].level +
                "world: " + result[0].world +
                "lastActive: " + result[0].lastActive)
            );
        })
    })
}
exports.giveMeText = function()
{return "banana";}

