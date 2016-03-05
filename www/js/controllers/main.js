app.controller('MainController', ['$scope', 'leafletData', 'distance', function($scope, leafletData, distance) {
    var radius = 6371;
    var pricePerKm = 1.4;

    var toRadians = function(degrees){
        return ((degrees * Math.PI)/180);
    }

    var getDistance = function(coords1, coords2){
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

    angular.extend($scope, {
        center: {
            lat: 53.3478,
            lng: -6.2597,
            zoom: 13
        },
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            markers: {
                enable: ['drag', 'dragend'],
                logic: 'emit'
            }
        },
        markers: {
            pickup: {
                id: 'pu',
                lat: 53.34770454302818,
                lng: -6.259830594062805,
                message: "Pickup location. Drag me!",
                focus: true,
                draggable: true
            },
            dropoff: {
                id: 'do',
                lat: 53.37615414242065,
                lng: -6.270650625228881,
                message: "Dropoff location. Drag me!",
                focus: true,
                draggable: true
            }
        }
    });
    $scope.distance = getDistance($scope.markers.pickup, $scope.markers.dropoff);
    $scope.price = $scope.distance * pricePerKm;

    $scope.$on('leafletDirectiveMarker.dragend', function(event, args){
        if(args.model.id === 'pu'){
            $scope.markers.pickup = args.model;
        }else if(args.model.id === 'do'){
            $scope.markers.dropoff = args.model;
        }
        console.log($scope.markers)

        $scope.distance = getDistance($scope.markers.pickup, $scope.markers.dropoff);
        $scope.price = $scope.distance * pricePerKm;
    })
}])
