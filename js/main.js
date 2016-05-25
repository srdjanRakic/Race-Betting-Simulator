/*---------------------------- CONSTANTS ---------------------------------*/

//Maximum and minimum speed of all racing vehicles
var MAX_SPEED = 210;
var MIN_SPEED = 160;

//Maximum and minimum year that the cars are made in
var MIN_CAR_YEAR = 1999;
var MAX_CAR_YEAR = new Date().getFullYear();

//Maximum and minimum turbo values
var MAX_CAR_TURBO = 50;
var MIN_CAR_TURBO = 20;

/*---------------------------- CONSTANTS END ---------------------------------*/

/*--------------------------- GLOBAL FUNCTIONS -------------------------------*/

/*
 *   Generates a random number within a given scope
 *
 *   @param max The absolute maximum value to be returned
 *   @param min The absolute minimum value to be returned
 *
 */
function getRandomNumberInScope(max, min){
    return parseInt(Math.random() * (max - min) + min);
}

/*------------------------- GLOBAL FUNCTIONS END ------------------------------*/

/*
 *
 * The Car method instantiates an object representing the vehicle
 * that a racer will be competing in.
 *
 *
 */
function Car(){

    this.manufacturer = "Default";
    this.model = "Default";
    this.year = 2000;
    this.speed = 250;

    /*
     *   Generates a random car manufacturer for the vehicle
     */
    this.getRandomCarManufacturer = function(){
        var newManufacturerName = "Tocak";
        var newManufacturerValue = parseInt(Math.random() * 6 + 1);
        switch(newManufacturerValue){
            case 1:
                newManufacturerName = "Toyota";
                break;
            case 2:
                newManufacturerName = "BMW";
                break;
            case 3:
                newManufacturerName = "Porsche";
                break;
            case 4:
                newManufacturerName = "Audi";
                break;
            case 5:
                newManufacturerName = "Cadillac";
                break;
            case 6:
                newManufacturerName = "Lotus";
                break;
            case 7:
                newManufacturerName = "Chevrolet";
                break;
        }

        return newManufacturerName;
    };

    /*
     *   Generates a random car model for the vehicle
     */
    this.getRandomCarModel = function(){
        var newModelName = "Tocak";
        var newModelValue = parseInt(Math.random() * 6 + 1);
        switch(newModelValue){
            case 1:
                newModelName = "Adventurer";
                break;
            case 2:
                newModelName = "Highlander";
                break;
            case 3:
                newModelName = "Turbo";
                break;
            case 4:
                newModelName = "Speedster";
                break;
            case 5:
                newModelName = "Lightning";
                break;
            case 6:
                newModelName = "Cheetah";
                break;
            case 7:
                newModelName = "Blaze";
                break;
        }

        return newModelName;
    };

    /*
     *   Generates a random vehicle production year
     *
     *   @param maxYear The absolute maximum year that the vehicle can be made in
     *   @param minYear The absolute minimum year that the vehicle can be made in
     *
     */
    this.getRandomYear = function(maxYear, minYear){
        return getRandomNumberInScope(maxYear, minYear);
    };

    /*
     *   Generates a random top speed for the vehicle
     *
     *   @param maxSpeed The absolute maximum speed that the vehicle can have
     *   @param minSpeed The absolute minimum speed that the vehicle can have
     *
     */
    this.getRandomSpeed = function(maxSpeed, minSpeed){
        return getRandomNumberInScope(maxSpeed, minSpeed);
    };

    this.manufacturer = this.getRandomCarManufacturer();
    this.model = this.getRandomCarModel();
    this.year = this.getRandomYear(MAX_CAR_YEAR, MIN_CAR_YEAR);
    this.speed = this.getRandomSpeed(MAX_SPEED, MIN_SPEED);
}

/*
 *
 * The Racer method instantiates an object representing a racer
 * that will participate in the following event.
 *
 * @param location The location of the HUD for the racer
 * @param car      The car the racer will be competing in
 *
 */
function Racer(location, car){
    this.HUDelementLocation = location;
    this.car = car;
    this.progressBar = new ProgressBar.Circle(this.HUDelementLocation, {
        duration: 200,
        color: "#FF0F0F",
        trailColor: "#F5F5F5",
        text:{
            value: car.model
        }
    });
    this.currentProgress = 0.0;
}

/*
 *
 * The RacingSim method instantiates an object representing the entirety
 * of the game. All main controls are regulated by an instance of this class.
 *
 */
function RacingSim(){

    this.winnerIndex = 0;
    this.shouldSimulate = true;
    this.driverWithBet = 0;

    var instance = this;

    //Cars that are driven
    var cars = [new Car(), new Car(), new Car(), new Car()];

    //Racer HUD locations
    this.HUDlocations = [document.getElementById("racer-0"), document.getElementById("racer-1"),
        document.getElementById("racer-2"), document.getElementById("racer-3")];

    //Racers that participate
    this.racers = [new Racer(this.HUDlocations[0], cars[0]),
        new Racer(this.HUDlocations[1], cars[1]),
        new Racer(this.HUDlocations[2], cars[2]),
        new Racer(this.HUDlocations[3], cars[3])];

    this.init = function(){

        for(var i = 0; i < instance.racers.length; i++){

            //Insert appropriate images under HUD
            var logoImage = document.getElementById("racer-" + i + "-img");
            logoImage.setAttribute("src", "../img/" + instance.racers[i].car.manufacturer + ".png");

        }

        /*-------------------------------- Element Event Listeners -----------------------------------*/

        //Winner found, perform checks, wait for commands
        document.addEventListener("winnerFound", function(event){
            event.stopPropagation();
            document.getElementById("main-button").setAttribute("class", "btn btn-warning btn-block");
            document.getElementById("main-button").innerHTML = "Races closed";
            if (checkForWinningBet()) {
                var winAmount;
                if(localStorage.getItem("winAmount") != null){
                    winAmount = parseInt(localStorage.getItem("winAmount")) + 1;
                    localStorage.setItem("winAmount", winAmount);
                } else {
                    winAmount = 1;
                    localStorage.setItem("winAmount", 1);
                }
                document.getElementById("winAmount").innerHTML = winAmount;
                displayWinnerModal();
            } else displayLostModal();
        });

        //New game buttons listener
        document.getElementsByClassName("newRace")[0].addEventListener("click", function(event){
            location.reload();
        });

        //New game buttons listener
        document.getElementsByClassName("newRace")[1].addEventListener("click", function(event){
            location.reload();
        });

        //New game buttons listener
        document.getElementsByClassName("newRace")[2].addEventListener("click", function(event){
            location.reload();
        });

        //New game buttons listener
        document.getElementsByClassName("garbageCollector")[0].addEventListener("click", function(event){
            localStorage.clear();
            window.location.href = "http://www.google.com";
        });

        //Click on first HUD
        instance.HUDlocations[0].addEventListener("click", function(event){

            enableBetting(0);

            displayRacerData(event, 0);

        });

        //Click on first HUD logo
        document.getElementById("racer-0-img").addEventListener("click", function(event){

            enableBetting(0);

            displayRacerData(event, 0);

        });

        //Click on second HUD
        instance.HUDlocations[1].addEventListener("click", function(event){

            enableBetting(1);

            displayRacerData(event, 1);

        });

        //Click on second HUD logo
        document.getElementById("racer-1-img").addEventListener("click", function(event){

            enableBetting(1);

            displayRacerData(event, 1);

        });

        //Click on third HUD
        instance.HUDlocations[2].addEventListener("click", function(event){

            enableBetting(2);

            displayRacerData(event, 2);

        });

        //Click on third HUD logo
        document.getElementById("racer-2-img").addEventListener("click", function(event){

            enableBetting(2);

            displayRacerData(event, 2);

        });

        //Click on fourth HUD
        instance.HUDlocations[3].addEventListener("click", function(event){

            enableBetting(3);

            displayRacerData(event, 3);

        });

        //Click on fourth HUD logo
        document.getElementById("racer-3-img").addEventListener("click", function(event){

            enableBetting(3);

            displayRacerData(event, 3);

        });

        document.getElementById("main-button").addEventListener("click", function(event){
            if(document.getElementById("main-button").innerHTML.trim() === "Please select a racer"){
                instance.displayWelcomeScreen();
            } else {
                for(var i = 0; i < instance.racers.length; i++){
                    doProgressSimulation(instance.racers[i]);
                }
            }
        });

        /*-------------------------------- Element Event Listeners End -------------------------------*/

    };

    /*
    *
    * Displays a splash modal with a short how-to
    *
    */
    this.displayWelcomeScreen = function(){
        $("#welcomeScreenModal").modal("show");
    };

    /*
     *
     * Displays the victory modal
     *
     */
    function displayWinnerModal(){
        $("#winnerModal").modal("show");
    }

    /*
     *
     * Displays the loss modal
     *
     */
    function displayLostModal(){
        $("#lostModal").modal("show");
    }


    /*
     *
     * Modifies the main button to enable the start of the race after choosing a driver
     *
     * @param index The index of the racer the user is betting on
     *
     */
    function enableBetting(index){

        instance.driverWithBet = index;
        document.getElementById("main-button").setAttribute("class", "btn btn-success btn-block");
        document.getElementById("main-button").innerHTML = "Bet on racer and start race";

    }

    /*
     *
     * Checks if victory is achieved
     *
     */
    function checkForWinningBet(){

        if (instance.driverWithBet === instance.winnerIndex) return true;
        else return false;

    }

    /*
     *   Executes racer progress
     *
     *   @param racer  The racer to simulate progress to
     *
     */
    function doProgressSimulation(racer){

        var location = racer.HUDelementLocation;
        var element = racer.progressBar;
        var speed = racer.car.speed;
        var model = racer.car.model;
        var currentProgress = racer.currentProgress;
        var year = racer.car.year;

        //Turbo speed on older vehicles, optimized ECU in new ones
        if (shouldAddTurbo(year)) {
            speed -= getRandomTurbo(MAX_CAR_TURBO, MIN_CAR_TURBO);
        } else {
            speed -= 30;
        }

        //Model boost added
        speed -= addSpeedByModel(model);

        var sim = setInterval(function() {
            if (!instance.shouldSimulate) {
                element.stop();
                clearInterval(sim);
            } else {
                currentProgress += 0.015;
                if (currentProgress >= 1.0) {
                    currentProgress = 1.0;
                    instance.shouldSimulate = false;
                    instance.winnerIndex = parseInt(location.getAttribute("id").split("-")[1]);
                    var winnerFoundEvent = new CustomEvent("winnerFound", {});
                    document.dispatchEvent(winnerFoundEvent);
                }
                element.animate(currentProgress, function() {
                });
            }
        }, speed);

    }

    /*
     *   Tests if a vehicle should add turbo (if car older that 5 years)
     *
     *   @param year The year the car was manufactured
     *
     */
    function shouldAddTurbo(year){
        if (year <= 2010) return true;
        else return false;
    }

    /*
     *   Tests if a vehicle should add turbo (if car older that 5 years)
     *
     *   @param year The year the car was manufactured
     *
     */
    function addSpeedByModel(model){
        var bonusSpeed = 0;
        switch(model){
            case "Adventurer":
                bonusSpeed = 10;
                break;
            case "Highlander":
                bonusSpeed = 6;
                break;
            case "Turbo":
                bonusSpeed = 15;
                break;
            case "Speedster":
                bonusSpeed = 8;
                break;
            case "Lightning":
                bonusSpeed = 5;
                break;
            case "Cheetah":
                bonusSpeed = 8;
                break;
            case "Blaze":
                bonusSpeed = 7;
                break;
        }

        return bonusSpeed;
    }

    /*
     *   Displays the racer data
     *
     *   @param event The event calling this method
     *   @param index The index of the racer in question
     *
     */
    function displayRacerData(event, index){

        event.stopPropagation();

        var currentRacer = instance.racers[index];

        var racerCarManufacturer = document.getElementById("racer-car-manufacturer");
        racerCarManufacturer.value = currentRacer.car.manufacturer;

        var racerCarModel = document.getElementById("racer-car-model");
        racerCarModel.value = currentRacer.car.model;

        var racerCarSpeed = document.getElementById("racer-car-speed");
        racerCarSpeed.value = (500 - parseInt(currentRacer.car.speed)) + " km/h";

        var racerCarYear = document.getElementById("racer-car-year");
        racerCarYear.value = currentRacer.car.year;
    }

    /*
     *   Generates a random turbo value for the vehicle
     *
     *   @param maxTurbo The absolute maximum turbo that the vehicle can have
     *   @param minTurbo The absolute minimum turbo that the vehicle can have
     *
     */
    function getRandomTurbo(maxTurbo, minTurbo){
        return getRandomNumberInScope(maxTurbo, minTurbo);
    }

}

//Initiate win amount in local storage if not already done
if (localStorage.getItem("winAmount") === null) localStorage.setItem("winAmount", 0);
document.getElementById("winAmount").innerHTML = localStorage.getItem("winAmount");

//Show win amount in navbar
if (localStorage.getItem("shouldDisplayWelcomeScreen") === null) localStorage.setItem("shouldDisplayWelcomeScreen", 1);

//Game instance creation
var game = new RacingSim();

if (parseInt(localStorage.getItem("shouldDisplayWelcomeScreen")) === 1){
    game.displayWelcomeScreen();
    localStorage.setItem("shouldDisplayWelcomeScreen", 0);
}

//Game initialization
game.init();