class Module {
    constructor () {
        console.log('Module constructor');
    }
    test() {
        console.log('t');
        // const main = require('./main');
        // import main from './main'; 
        return require('./main');
    }
    main() {
        const main = require('./main');
        return main;
    }
    news() {
    	return require('./news');
    }
    gallery() {
    	return require('./gallery');
    }
}
export default Module;