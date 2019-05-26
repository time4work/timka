class Module {
    constructor () {
        console.log('Module constructor');
    }
    main(args) {
        return require('./main')(args);
    }
    news(args) {
    	return require('./news')(args);
    }
    gallery(args) {
    	return require('./gallery')(args);
    }
}
export default Module;