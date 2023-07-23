function log(re, res, next) {
	console.log("Logger logging");
	next();
}

module.exports = log;
