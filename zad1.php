$match = array('$match' => array('archived' => false));
$group = array('$group' => array('_id' => '$archived', 'avgdowns' => array('$avg' => '$downs')));
$pipeline = array($match, $group);

$out = $collection -> aggregate($pipeline);