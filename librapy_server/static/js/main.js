var app = angular.module('librapy', ['ui.router','ui.bootstrap']);

app.constant('API_URL', window.location.origin + '/api/book/');

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/static/templates/home.html',
            controller: 'MainCtrl'
        })
        .state('add-book', {
            url: "/add-book",
            templateUrl: '/static/templates/add_book.html',
            controller: 'MainCtrl'
        });

    $urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', function ($scope, $rootScope, Books, $state, $filter) {
    Books.all().then(function (res) {
        $scope.books = res.data;
    });

    $scope.toggleBorrowed = function (book) {
        Books.update(book);
    };

    $scope.newBook = {};

    $scope.addBook = function () {
        Books.create($scope.newBook).then(function (res) {
            // redirect to homepage once added
            $state.go('home');
        });
    };

    $scope.removeBook = function (book) {
        Books.delete(book).then(function () {
            Books.all().then(function (res) {
                $scope.books = res.data;
            })
        });
    };
});

app.service('Books', function ($http, API_URL) {
    var Books = {};

    Books.all = function () {
        return $http.get(API_URL);
    };

    Books.update = function (updatedBook) {
        updatedBook.is_borrowed = !updatedBook.is_borrowed
        return $http.patch(`${API_URL}${updatedBook.id}/`, updatedBook);
    };

    Books.create = function (newBook) {
        return $http.post(`${API_URL}`, newBook);
    };

    Books.delete = function (delBook) {
        return $http.delete(`${API_URL}${delBook.id}/`)
    };

    return Books
});




