$match = array('$match' => array('$text' => array('$search' => 'Sony'), 'subreddit' => 'phone'));
$group = array('$group' => array('_id' => '0', 'total' => array('$sum' => '1')));
$pipeline = array($match, $group);
$out = $collection -> aggregate($pipeline);