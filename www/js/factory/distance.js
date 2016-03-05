app.factory('distance', function(){
    var radius = 6371;

    var toRadians = function(degrees){
        return ((degrees * Math.PI)/180);
    }

    var distance = function(coords1, coords2){
        //convert all latlngs to radians
        lat1 = toRadians(coords1.lat);
        lng1 = toRadians(coords1.lng);
        lat2 = toRadians(coords2.lat);
        lng2 = toRadians(coords2.lng);

        lngDelta = Math.abs(lng2 - lng1);

        //calculate the angle that corresponds to the great circle distance
        centralAngle = Math.acos((Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lngDelta)));

        //get distance segment along great circle
        distance = radius*centralAngle;

        //reduce to 2 significant figures
        distance = distance.toFixed(2);

        return Number(distance); //kilometers
    }

    return {
        get: distance
    }
})
