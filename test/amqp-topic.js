var expect = require('chai').expect;
var pattern = require('../');

describe('Topic Pattern', function(){
	context('AMQP style patterns', function(){
		it('Matches single word wild card (*) patterns', function(){
			var matcher = pattern('stock.*.google');
			expect(matcher.match('stock.nyse.google')).to.be.true;
			expect(matcher.match('stock.tokyo.google')).to.be.true;
			expect(matcher.match('stock.tokyo.')).to.be.false;
		});

		it('Matches multi word wild card (#) patterns', function(){
			var matcher = pattern('#.google');
			expect(matcher.match('nyse.google')).to.be.true;
			expect(matcher.match('stock.nyse.google')).to.be.true;
			expect(matcher.match('stock.tokyo.google')).to.be.true;
			expect(matcher.match('stock.tokyo.microsoft')).to.be.false;
		});

		it('Matches a combinatio of single word(*) and multi word (#) patterns', function(){
			var matcher = pattern('#.nyse.*.price');
			expect(matcher.match('stock.sale.nyse.google.price')).to.be.true;
			expect(matcher.match('stock.trade.nyse.microsoft.price')).to.be.true;
			expect(matcher.match('stock.trade.nyse.micro.soft.price')).to.be.false;
		});
	});
});