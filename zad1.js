var match = { $match : { archived : false } };
var group = { $group : { _id : "$archived", avgdowns : {$avg : "$downs"}}};

var wynik = db.reddit.aggregate(
match,
group
);
