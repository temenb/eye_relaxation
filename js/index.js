jQuery('Document').ready(function(){
    var $circles = new Array;
    var $tmp_circle = jQuery('.tmp_container img.circle');
    var $container = jQuery(".main_container");
    var $sizeContainer = jQuery(".size_container");
    var $distanceContainer = jQuery(".distance_container");
    var setDistance = function (displacement) {
        var distance = displacement;
        var s_width = jQuery(document).width();
        setDistance = function (displacement,calculate_top) {
            distance += displacement;
            if (calculate_top) {
                $circles[0].css('top', (jQuery(document).height() - $tmp_circle.height())/2);
                $circles[1].css('top', (jQuery(document).height() - $tmp_circle.height())/2);
                s_width = jQuery(document).width();
                $circles[0].css('left', s_width/2 - distance - $tmp_circle.width());
                $circles[1].css('left', s_width/2 + distance);
            }
            else {
                $circles[0].css('left', parseInt($circles[0].css('left')) - displacement);
                $circles[1].css('left', parseInt($circles[1].css('left')) + displacement);
            }
            $distanceContainer.text('Distance is ' + distance + 'px');
        }
        return setDistance(0,true);
    }

    var setSize = function (displacement,calculate_position) {
        var size = 0;

        setSize = function (displacement,calculate_position) {
            size += displacement;
            jQuery('img.circle').css('height', size);
            jQuery('img.circle').css('width', size);
            if (calculate_position) {
                setDistance(0,true);
            }
            else {
                for(var i=0;i<$circles.length;i++) {
                    $circles[i].css('left', parseInt($circles[i].css('left')) - displacement/2);
                    $circles[i].css('top', parseInt($circles[i].css('top')) - displacement/2);
                }
            }
            $sizeContainer.text('Size is ' + size + 'px');
        }
        return setSize(displacement,calculate_position);
    }
    var addCircle = function () {
        var i=$circles.length;
        $circles[i] = $tmp_circle.clone();
        $container.append($circles[i]);
    }
    var rmCircle = function () {
        var i=$circles.length-1;
        $circles[i].remove();
        $circles.splice(i,1);
    }

    addCircle();
    addCircle();
    setDistance(100);
    setSize(100);

    jQuery(this).keydown(function(e){
        var step = 2;
        var sizeStep = 2;
        if (e.keyCode == 37 || e.keyCode == 38)
            if (e.ctrlKey)
                setSize(sizeStep)
            else
                setDistance(step)
        if (e.keyCode == 39 || e.keyCode == 40)
            if (e.ctrlKey)
                setSize(-sizeStep)
            else
                setDistance(-step)
    });
});