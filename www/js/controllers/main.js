app.controller('MainController', ['$scope', 'leafletData', 'distance', function($scope, leafletData, distance) {
    var pricePerKm = 0.8;
    var routeControl;

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
    $scope.distance = distance.get($scope.markers.pickup, $scope.markers.dropoff);
    $scope.price = 2 + ($scope.distance * pricePerKm);

    leafletData.getMap('mymap').then(function(map) {
        routeControl = L.Routing.control({
            waypoints: [
                $scope.markers.pickup,
                $scope.markers.dropoff
            ],
            routeWhileDragging: false,
            show: false,
            createMarker: function() { return null; }
        }).addTo(map);
    })

    $scope.$on('leafletDirectiveMarker.mymap.dragend', function(event, args){
        if(args.model.id === 'pu'){
            $scope.markers.pickup = args.model;
        }else if(args.model.id === 'do'){
            $scope.markers.dropoff = args.model;
        }

        console.log(L.Routing);
        console.log(L.Routing.Control);
        console.log(L.Routing.control);
        console.log(L.Routing.Control.setWaypoints);

        routeControl.getPlan().setWaypoints([
            $scope.markers.pickup,
            $scope.markers.dropoff
        ])
        console.log($scope.markers)

        $scope.distance = distance.get($scope.markers.pickup, $scope.markers.dropoff);
        $scope.price = 2 + ($scope.distance * pricePerKm);
    })

}])
