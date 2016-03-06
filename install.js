define(function (require, exports, module) {

	module.exports = function (session, options) {
		session.install({
        "name": "TS Server client",
        "description": "TSServer client using stdio for typescript server side handler",
        "cwd": "~/.c9"
    }, {
        "npm": "tsserver-client@0.0.9"
    });
		// Show the installation screen
		session.start();
	};
	
		
	// version of the installer. Increase this when installer changes and must run again
	module.exports.version = 2;

});