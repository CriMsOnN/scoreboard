
exports.slug =  function(value) {
	 var s = value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return s ;
};
