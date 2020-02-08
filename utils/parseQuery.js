/** CONCEPT:
 * Take the produced query, and turn in into a object.
 * This will make the process of building queries to the API easier.
 */

/** EXAMPLE QUERY:
  {
    'source_app' => 'nmbrs',
		'user' => $username,
		'pass' => $apikey,
		'group' => 1234,
		'controller' => 'importDaysoff',
	}
  */

/** PARSED EXAMPLE:
  {
    source_app: "nmbrs",
		user: $username,
		pass: $apikey,
		group: 1234,
		controller: "importDaysoff",
	}
  */

module.exports = query => {
  return query
    .split(`'`)
    .join(`"`)
    .split(" =>")
    .join(":");
};
