'use strict';

function AmqpPattern(patterns){
	if(!patterns){
		throw new Error('A valid pattern or array of patterns is expected');
	}

	patterns = Array.isArray(patterns)? patterns : [patterns];
	this.originalPatterns = patterns;
	this.compiledPatterns = patterns.map(this._compilePattern.bind(this));
}

AmqpPattern.prototype._compilePattern = function(pattern){
	if(typeof pattern  === 'string'){
		return new RegExp(
			'^' + pattern
				.replace(/\.?\*\.?/g, '(\\.?[a-zA-Z0-9]+\\.?)')
				.replace(/\.?\#\.?/g, '(\\.?[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*\\.?)?') + '$'
		);
	}
	else if(typeof pattern === 'object' && pattern.test){
		return pattern;
	}
	else{
		throw new Error('pattern is expected to be a string or regular expression');
	}
};

AmqpPattern.prototype.match = function(topic){
	for(var i=0; i < this.compiledPatterns.length; i++){
		if(this.compiledPatterns[i].test(topic)){return true;}
	}
	return false;
};

module.exports = AmqpPattern;