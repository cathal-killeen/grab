app.controller('MainController', ['$scope', 'leafletData', function($scope, leafletData) {
    angular.extend($scope, {
        center: {
            lat: 53.3478,
            lng: -6.2597,
            zoom: 13
        },
        defaults: {
            scrollWheelZoom: false
        },
        markers: {
            pickup: {
                lat: 53.34770454302818,
                lng: -6.259830594062805,
                message: "Pickup location. Drag me!",
                focus: true,
                draggable: true
            },
            dropoff: {
                lat: 53.37615414242065,
                lng: -6.270650625228881,
                message: "Dropoff location. Drag me!",
                focus: true,
                draggable: true
            }

        }
    });
}])
