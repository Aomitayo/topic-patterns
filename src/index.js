var patternStyles = {
	amqp: require('./amqp.js')
};

module.exports = function(style, patterns){
	if(style && ! patterns){
		patterns = style;
		style = null;
	}

	style = (style || 'amqp').toLowerCase();
	var constructor = patternStyles[style];
	if(!constructor){
		throw new Error(style + ' is not a valid topic pattern style');
	}

	return new constructor(patterns);
};