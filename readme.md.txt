#Spis treœci
- [Baza danych](#baza)
- [Agregacja 1](#agregacja-1)
- [Agregacja 2](#agregacja-2)
- [Agregacja 3](#agregacja-3)
- [Agregacja 4](#agregacja-4)

#Baza danych

Baza danych Reddit dostêpny na stronie prowadz¹cego.

Import bazy danych:
```sh
mongoimport -d zad1 -c reddit --type json --file "C:\Users\Tomasz\Desktop\Bzyl\rc\RC_2015-01.json"
```

#Agregacja 1
Sredni score wszystkich niezarchiwizowanych postów<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag1.js)
```js
var match = { $match : { archived : false } };
var group = { $group : { _id : "$archived", avgScore : {$avg : "$score"}}};

var wynik = db.exam.aggregate(
match,
group
);
```

[PHP](https://github.com/mralexx/egzaminNOSQL/blob/master/ag1.php)
```php
$match = array('$match' => array('archived' => false));
$group = array('$group' => array('_id' => '$archived', 'avgScore' => array('$avg' => '$score')));
$pipeline = array($match, $group);

$out = $collection -> aggregate($pipeline);
```

Wynik
```js
{ "_id" : false, "avgScore" : 5.23413589531011 }
```

#Agregacja 2
20 najwiêkszych sum score u¿ytkowników, których posty nie by³y edytowane i mia³y score wiêkszy ni¿ 100<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag2.js)
```js
var match = {$match : { edited : false , score : { $gt: 100}}};
var group = {$group : { _id : "$id", totalscore : {$sum: "$score"}}};
var sort = {$sort : { totalscore : 1 }};
var limit = {$limit : 20};
		
var wynik = db.exam.aggregate(
match,
group,
sort,
limit
);		
```

[PHP](https://github.com/mralexx/egzaminNOSQL/blob/master/ag2.php)
```php
$match = array('$match' => array('archived' => false, 'score' => array('$gt' => 100)));
$group = array('$group' => array('_id' => '$id', 'totalscore' => array('$sum' => '$score')));
$sort = array('$sort' => array('totalscore' => 1));
$limit = array('$limit' => 20);
$pipeline = array($match, $group, $sort, $limit);

$out = $collection -> aggregate($pipeline);		
```

Wynik
```js
{ "_id" : "co74iey", "totalscore" : 101 }
{ "_id" : "co74kd2", "totalscore" : 101 }
{ "_id" : "co6yxwp", "totalscore" : 101 }
{ "_id" : "co779xb", "totalscore" : 101 }
{ "_id" : "co74v3i", "totalscore" : 101 }
{ "_id" : "co6y4w1", "totalscore" : 101 }
{ "_id" : "co73xog", "totalscore" : 101 }
{ "_id" : "co6v2b3", "totalscore" : 101 }
{ "_id" : "co76tkg", "totalscore" : 101 }
{ "_id" : "co6zvdl", "totalscore" : 101 }
{ "_id" : "co6yipc", "totalscore" : 101 }
{ "_id" : "co776w9", "totalscore" : 101 }
{ "_id" : "co6uo8v", "totalscore" : 101 }
{ "_id" : "co72o3i", "totalscore" : 101 }
{ "_id" : "co6t8ip", "totalscore" : 101 }
{ "_id" : "co6vpes", "totalscore" : 101 }
{ "_id" : "co6v57h", "totalscore" : 101 }
{ "_id" : "co722s9", "totalscore" : 101 }
{ "_id" : "co6rwsz", "totalscore" : 101 }
{ "_id" : "co75zog", "totalscore" : 101 }
```

| id                                        	| Popularnoœæ |
|-----------------------------------------------|-------------|
| co74iey  					| 101         |
| co74kd2                                       | 101         |
| co6yxwp                         		| 101         |
| co779xb                                   	| 101         |
| co74v3i                         		| 101         |
| co6y4w1                                	| 101         |
| co73xog                              		| 101         |
| co6v2b3                             		| 101         |
| co76tkg                              		| 101         |
| co6zvdl                             		| 101         |
| co6yipc                              		| 101         |
| co776w9                             		| 101         |
| co6uo8v                              		| 101         |
| co72o3i                             		| 101         |
| co6vpes                              		| 101         |
| co6v57h                             		| 101         |
| co722s9                              		| 101         |
| co6rwsz                             		| 101         |
| co75zog                              		| 101         |


#Agregacja 3


Przed kolejnymi agregacjami nale¿y stworzyæ index do bazy<br>
```js
db.exam.ensureIndex({body:"text"})
```

Iloœæ wyst¹pieñ nazwy studia twórców gry League of Legends w temacie summonerschool<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag3.js)
```js
var match = {$match: { $text: { $search: "riot"}, subreddit: "summonerschool"}};
var group = {$group: {_id: null, total : {$sum: 1}}};

var wynik = db.exam.aggregate(
match,
group
);	
```

[PHP](https://github.com/mralexx/egzaminNOSQL/blob/master/ag3.php)
```php
$match = array('$match' => array('$text' => array('$search' => 'riot'), 'subreddit' => 'summonerschool'));
$group = array('$group' => array('_id' => '0', 'total' => array('$sum' => '1')));
$pipeline = array($match, $group);

$out = $collection -> aggregate($pipeline);
```

Wynik
```js
754
```

#Agregacja 4
Iloœæ wyst¹pieñ s³owa think w postach ze score mniejszym ni¿ 100<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag4.js)
```js
var match = {$match: { $text: { $search: "think"}, score: {$lt: 10}}};
var group = {$group: {_id: null, total : {$sum: 1}}};
		
var wynik = db.exam.aggregate(
match,
group
);		
```

[PHP](https://github.com/mralexx/egzaminNOSQL/blob/master/ag4.php)
```php
$match = array('$match' => array('$text' => array('$search' => 'think'), 'score' => array($lt => 10)));
$group = array('$group' => array('_id' => '0', 'total' => array('$sum' => '1')));
$pipeline = array($match, $group);

$out = $collection -> aggregate($pipeline);
```

Wynik
```js
1134735
```