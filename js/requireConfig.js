requirejs.config({
	paths: {
	   jquery:"lib/jquery",
	   template:"lib/template-web",
	   mockMin:"lib/mock-min",
    	   jssorSlider:"lib/jssor.slider-26.8.0.min",
    	   swiper:"lib/swiper.min",
    	   index: 'index'
  },
  shim: {
        'template': {
            exports: 'template'
        }
    }
   
});