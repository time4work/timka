class Module {
    constructor () {
        console.log('Module constructor');
    }
    get main() {
    	return require('./main');
    }
    get news() {
    	return require('./news');
    }
    get gallery() {
    	return require('./gallery');
    }
}
export default Module;