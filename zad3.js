var match = {$match: { $text: { $search: "Sony"}, subreddit: "phone"}};
var group = {$group: {_id: null, total : {$sum: 1}}};

var wynik = db.reddit.aggregate(
match,
group);	