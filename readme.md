#Spis treœci
- [Baza danych](#baza)
- [Agregacja 1](#agregacja-1)
- [Agregacja 2](#agregacja-2)
- [Agregacja 3](#agregacja-3)


#Baza danych

Baza danych Reddit dostêpny na stronie prowadz¹cego.

Import bazy danych:
```sh
mongoimport -d zad1 -c reddit --type json --file "C:\Users\Tomasz\Desktop\Bzyl\rc\RC_2015-01.json"
```

#Agregacja 1
Sredni iloœæ ³apek w dó³ postów niezarchiwizowanych<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag1.js)
```js
var match = { $match : { archived : false } };
var group = { $group : { _id : "$archived", avgdowns : {$avg : "$downs"}}};

var wynik = db.reddit.aggregate(
match,
group
);
```

[PHP](https://github.com/mralexx/egzaminNOSQL/blob/master/ag1.php)
```php
$match = array('$match' => array('archived' => false));
$group = array('$group' => array('_id' => '$archived', 'avgdowns' => array('$avg' => '$downs')));
$pipeline = array($match, $group);

$out = $collection -> aggregate($pipeline);
```

Wynik
```js
{ "_id" : false, "avgdowns" : 2.354842 }
```

#Agregacja 2
10 najwiêkszych sum score u¿ytkowników, których posty nieby³y zarchwizowane<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag2.js)
```js

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
```

[PHP]()
```php
$match = array('$match' => array('archived' => false)));
$group = array('$group' => array('_id' => '$id', 'totalscore' => array('$sum' => '$score')));
$sort = array('$sort' => array('totalscore' => -1));
$limit = array('$limit' => 0);
$pipeline = array($match, $group, $sort, $limit);

$out = $collection -> aggregate($pipeline);		
```

Wynik
```js
{ "_id" : "co70key", "totalscore" : 1546 }
{ "_id" : "co78dd3", "totalscore" : 1352 }
{ "_id" : "co67xxp", "totalscore" : 989 }
{ "_id" : "co770xb", "totalscore" : 970 }
{ "_id" : "co74q3i", "totalscore" : 852 }
{ "_id" : "co6y1w1", "totalscore" : 794 }
{ "_id" : "co73qog", "totalscore" : 654 }
{ "_id" : "co612b3", "totalscore" : 653 }
{ "_id" : "co73tkg", "totalscore" : 543 }
{ "_id" : "co6x2dl", "totalscore" : 501 }

```

| Id                                        	| Wynik |
|-----------------------------------------------|-------------|
| co70key  					| 1546        |
| co78dd3                                       | 1352        |
| co67xxp                         		| 989         |
| co770xb                                   	| 970         |
| co74q3i                         		| 852         |
| co6y1w1                                	| 794         |
| co73qog                              		| 654         |
| co6v2b3                             		| 653         |
| co73tkg                              		| 543         |
| co6x2dl                             		| 501         |



#Agregacja 3


Przed kolejnymi agregacjami nale¿y stworzyæ index do bazy<br>
```js
db.exam.ensureIndex({body:"text"})
```

Iloœæ wyst¹pieñ nazwy Sony w temacie phone<br>

[JS](https://github.com/mralexx/egzaminNOSQL/blob/master/ag3.js)
```js
var match = {$match: { $text: { $search: "Sony"}, subreddit: "phone"}};
var group = {$group: {_id: null, total : {$sum: 1}}};

var wynik = db.reddit.aggregate(
match,
group);	
```

[PHP]()
```php
$match = array('$match' => array('$text' => array('$search' => 'Sony'), 'subreddit' => 'phone'));
$group = array('$group' => array('_id' => '0', 'total' => array('$sum' => '1')));
$pipeline = array($match, $group);
$out = $collection -> aggregate($pipeline);
```

Wynik
```js 898
```

