(($) => {
    $.fn.perspective = function(options){
        var settings = $.extend({
            focus: 1,
            maxDegree: 0,
            minDegree: 0,
            maxDistance: 9,
            minDistance: 3,
            reverse: false
        }, options);
        return this.each(() => {
            var container = this;
            var focus = settings.focus - 1;
            var digiReverse = 1;
            if(settings.reverse){
                digiReverse = -1;
            }
            var width = $(window).width();
            var height = $(window).height();
            var centerX = width / 2;
            var centerY = height / 2;
            var initAlpha = 0;
            var initBeta = 0;
            var initGamma = 0;
            var numberOfChildren = $(this).children().length;
            var percentOfChildren = [];
            var distSignOfChildren = [];
            for(let i = 0; i < numberOfChildren; i ++){
                $($(container).children().get(i)).css({
                    "transform-origin": "50vw 50vh"
                });
                percentOfChildren[i] = (i - focus) * digiReverse;
                if(percentOfChildren[i] != 0){
                    distSignOfChildren[i] = percentOfChildren[i] / Math.abs(percentOfChildren[i]) * digiReverse;
                }else{
                    distSignOfChildren[i] = 1;
                }
            };
            var maxPostion = Math.max(Math.abs(percentOfChildren[0]),Math.abs(percentOfChildren[numberOfChildren - 1]));
            for(let i = 0; i < numberOfChildren; i ++){
                percentOfChildren[i] = percentOfChildren[i] / maxPostion;
            };
            $(window).on("resize", function(){
                width = $(window).width();
                height = $(window).height();
                centerX = width / 2;
                centerY = height / 2;
            });
            if(window.DeviceOrientationEvent){
            window.addEventListener('deviceorientation', function(event){
                if(event.alpha || event.beta || event.gamma){
                    var alpha = event.alpha;
                    var beta = event.beta;
                    var gamma = event.gamma;
                    if(initAlpha == 0 && initBeta == 0 && initGamma == 0){
                        initAlpha = alpha;
                        initBeta = beta;
                        initGamma = gamma;
                    };
                    for(let i = 0; i < numberOfChildren; i ++){
                        if(i == focus){
                            $($(container).children().get(i)).css({
                                "transform":
                                    "rotateX(" + Math.min(Math.max((-1) * settings.minDegree, (-1) * (beta - initBeta) * percentOfChildren[i+1] / numberOfChildren), settings.minDegree) + "deg) " + 
                                    "rotateY(" + Math.min(Math.max((-1) * settings.minDegree, (gamma - initGamma) * percentOfChildren[i+1] / numberOfChildren), settings.minDegree) + "deg) " +
                                    "translateX(" + Math.min(Math.max((-1) * settings.minDistance, (gamma - initGamma) * percentOfChildren[i+1] / numberOfChildren), settings.minDistance) + "px) " +
                                    "translateY(" + Math.min(Math.max((-1) * settings.minDistance, (beta - initBeta) * percentOfChildren[i+1] / numberOfChildren), settings.minDistance) +"px) " +
                                    "translateZ(0)" +
                                    "scale(1, 1)"
                            });
                        }else{
                            $($(container).children().get(i)).css({
                                "transform":
                                "rotateX(" + Math.min(Math.max((-1) * Math.abs(percentOfChildren[i]) * settings.maxDegree, (-1) * (beta - initBeta) * percentOfChildren[i]), Math.abs(percentOfChildren[i]) * settings.maxDegree) + "deg) " +
                                "rotateY(" + Math.min(Math.max((-1) * Math.abs(percentOfChildren[i]) * settings.maxDegree, (gamma - initGamma) * percentOfChildren[i]), Math.abs(percentOfChildren[i]) * settings.maxDegree) + "deg) " +
                                "translateX(" + Math.min(Math.max((-1) * Math.abs(percentOfChildren[i]) * settings.maxDistance, (gamma - initGamma) * percentOfChildren[i]), Math.abs(percentOfChildren[i]) * settings.maxDistance) + "px) " +
                                "translateY(" + Math.min(Math.max((-1) * Math.abs(percentOfChildren[i]) * settings.maxDistance, (beta - initBeta) * percentOfChildren[i]), Math.abs(percentOfChildren[i]) * settings.maxDistance) +"px) " +
                                "translateZ(" + percentOfChildren[i] + "px)" + 
                                "scale(1, 1)"
                            });
                        };
                    };
                };
            }, false);
            };
            if(initBeta == 0 && initGamma == 0){
                $("body").on("mousemove", function(event){
                    var offsetX = event.pageX - centerX;
                    var offsetY = event.pageY - centerY;
                    for(let i = 0; i < numberOfChildren; i ++){
                        if(i == focus){
                            $($(container).children().get(i)).css({
                                "transform":
                                "rotateX(" + offsetY / centerY * settings.minDegree  + "deg) " +
                                "rotateY(" + (-1) * offsetX / centerX * settings.minDegree + "deg) " +
                                "translateX(" + offsetX / centerX * settings.minDistance + "px) " +
                                "translateY(" + offsetY / centerY * settings.minDistance + "px) " +
                                "translateZ(0)" +
                                "scale(1, 1)"
                            });
                        }else{
                            $($(container).children().get(i)).css({
                                "transform":
                                "rotateX(" + offsetY / centerY * settings.maxDegree * percentOfChildren[i] + "deg) " +
                                "rotateY(" + (-1) * offsetX / centerX * settings.maxDegree * percentOfChildren[i] + "deg) " +
                                "translateX(" + offsetX / centerX * settings.maxDistance * percentOfChildren[i]  + "px) " +
                                "translateY(" + offsetY / centerY * settings.maxDistance * percentOfChildren[i] + "px) " +
                                "translateZ(" + percentOfChildren[i] + "px)" + 
                                "scale(1, 1)"
                            });
                        };
                    };
                });
            };
        });
    };
})(jQuery);