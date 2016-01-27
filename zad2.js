var match = {$match : { edited : false }};
var group = {$group : { _id : "$id", totalscore : {$sum: "$score"}}};
var sort = {$sort : { totalscore : -1 }};
var limit = {$limit : 10};
			
var wynik = db.reddit.aggregate(
match,
group,
sort,
limit
);