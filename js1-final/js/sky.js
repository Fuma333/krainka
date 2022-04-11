
// volam funkciu enerateEnviroment nastavi farbu pozadia a polohu slnka podla hodnoty v inpute s id id="hours"
generateEnviroment();

// globalna premenna s nazvom hours je mozne jo volat odkial kolvek aj tak ze ju proste napisem do konzoli

// funkcia 
function generateEnviroment(){

    // do premenej elemnt ulozi div s id sky 2
    var element = document.getElementById("sky2");

    // do premenej hours ulozi hodnotu inputu s id hours
    const hours = document.getElementById("hours").value;
    // do premenej limit ulozi 23 tyma padom ju mozem vsade pouzivat nemusime prepisovat v if na riadku 18 a 20
    const limit = 23;

    if(hours > limit || hours === '') {
        // alert spusti kontextove okno a napise hlasku a prida premnu limit ---- validacia inputu 
        alert("Cislo musi byt vyplnene a nesmie byt viac ako "+limit);
        // ak je hodnota viac ako limit nastavi input na 0
        document.getElementById("hours").value = 0;
        // ak bude podmienka na riadku 18 splnena zastavy vykonavanie celej funkcie generateEnviroment()
        return;
    }

    // podmienka ak je hodnota hours vacsia alebo rovna 5 a zaroven menej ako 9
    if (hours >= 5 && hours < 9) {
        // zavola funkciu setSky a posle do nej string 'morning'
        setSky('morning');
    }
    // podmienka ak je hodnota hours vacsia ako 9 a zaroven menej ako 16
    else if(hours > 9 && hours < 16) {
        // zavola funkciu setSky a posle do nej string 'day'
        setSky('day');
    }
     // podmienka ak je hodnota hours vacsia ako 16 a zaroven menej ako 22
    else if(hours > 16 && hours < 22) {
        // zavola funkciu setSky a posle do nej string 'evening'
        setSky('evening');
    }
    // nastane ak nie je splnena ani jedna s podmienok hore
    else {
        setSky('night');
    }

    // funkcia set sky posilam do nej premennu dayPart a pouzivam vo vnutry
    function setSky(dayPart){
        // premenej element co je v tomto pripade div sky2 deklarovanej na riadku 11 vymaze atribut class  
        // dovod aby tam bola vzdy len jedna class aby sa nekumulovali
        element.removeAttribute('class');
        // div sky2 kotry je ulozeny ako premenna element nastavy class ktory je poslany ako parameter funkcie v tomto pripade dayPart
        element.classList.add(dayPart);
        // na tomto radku vlozi do div s id sky 2 obrazok a nastavy hodnitu top alebo bottom topOrBottom(), nastavy velkotst top countTopPosition() nastavi velkost countLeftPosition(),
        document.getElementById("sky2").innerHTML = '<img class="sun" src="images/sun.png" style="'+topOrBottom()+':'+countTopPosition()+'%;left:'+countLeftPosition()+'%;"/>'; 
    }
  
    // tato funkcia prerata hodiny na percenta a vratj hodnitu v percentach ------skuste sa pohrat s funkciami countTopPosition()countLeftPosition()topOrBottom() aby malo slnku spravnu polohu
    function countTopPosition(){
        //var topPostion = 0;
        let onePercent = 23 / 100;
        let percent = (hours / onePercent) + 10;
        console.log('top hodnota'+ percent);
        return percent;
    }

    // tato funkcia prerata hodiny na percenta a vratj hodnitu v percentach
    function countLeftPosition(){
        //var topPostion = 0;
        let onePercent = 23 / 100;
        let percent = hours / onePercent;
        console.log('left hodnota'+ percent);
        return percent;
    }


    // tato funkcia zisti v akej casti dna sme aby sme vedeli ci v img sun.png byt top alebo botttom
    function topOrBottom() {
        if(hours > 6 && hours < 16) {
            return 'bottom';
        }
        else if (hours > 16 && hours < 22){
            return 'top';
        }
        else {
            return 'top';
        }
    }

}

// globalne premenna testovali sme tu pole nez sme to neskor dali do user objects
var poleObjektov = ['cloud1', 'airplane', 'ballon', 'airplane', 'airplane', 'ballon'];

/*
nahodne objekty
function generateSkyObjects() {
    var image = '';
    const skyObjets = document.getElementById("sky-objets").value;

    for (let i = 0; i < poleObjektov.length; i++) {
        var topPosition = Math.floor(Math.random() * 40) + -10; // do premenej topPostion ulozi nahodne cislo od 40 do -10
        var leftPosition = Math.floor(Math.random() * 80) + 0;  // do premenej leftPosition ulozi nahodne cislo od 80 do 0
        // tu pristupujem k polozke pola poleObjektov[i]
        image += '<img class="cloud" src="images/'+poleObjektov[i]+'.png" style="top: '+leftPosition+'%; left:'+topPosition+'%"/>';
    }
    document.getElementById("sky").innerHTML = image;
}
*/



// globalne premenna user objets je na zaciatku len prazdne pole neskor do nej vkladame objekty v metode addObject()
var userObjects = [];



/*
iba string v poli
function generateSkyObjects() {
    var image = '';

    for (let i = 0; i < userObjects.length; i++) {
        var topPosition = Math.floor(Math.random() * 40) + -10;
        var leftPosition = Math.floor(Math.random() * 80) + 0;
        image += '<img class="cloud" src="images/'+userObjects[i]+'.png" style="top: '+leftPosition+'%; left:'+topPosition+'%"/>';
    }
    document.getElementById("sky").innerHTML = image;
}
*/

// vygeneruje objekty v dive sky
function generateSkyObjects() {
    // nadefinujeme si prazdnu premenu aby sme v kazdom cykle mohli k nej pridat resp zlucit novy <img src=""> pre kazdy cyklus  
    var image = '';
    // cyklus sa opakuje tolko krat kolko pozloziek ma userObjects
    for (let i = 0; i < userObjects.length; i++) {
        // sem vyzdy prida novy <img> do premenej image <img aj s parametrami>+<img aj s parametrami>+<img aj s parametrami> tolko krat plus kolko je poloziek v userObjets
        image += '<img class="cloud" src="images/'+userObjects[i].type+'.png" style="top: '+userObjects[i].topPosition+'%; left:'+userObjects[i].leftPosition+'%"/>';
    }
    // celu premnnu image nahra do divu so vsetky elementami img kotre obsahuje obsahuje ich tolko kolko krat sa for vykonal
    document.getElementById("sky").innerHTML = image;
}


// volame cez button vloz objekt 
function addObject() {
    // najskor na vytovry samostatny obejkt do neho type, topPosition, leftPosition s inputov s id sky-objets, top-objets, left-objets
    let skyObject = {
        type: document.getElementById("sky-objets").value, // nahra hodnutu s inputu 
        topPosition: document.getElementById("top-objets").value, // nahra hodnutu s inputu 
        leftPosition: document.getElementById("left-objets").value, // nahra hodnutu s inputu 
    }
    // do pola userObjects resp na jeho koniec vlozi cely objekt aj s hodnotamui s inputov  kotry zacina na riadku 150 
    userObjects.push(skyObject);
    // dali sme si na kontrolu aby sme vedeli ci sa nam pole plni. console log sluzi ako pomocka ci sa vobec program dostal na dany radok uvidime v browseri v karte console
    console.log(userObjects);

    // defunujeme premenu input podla to ze ma class add-object
    var inputs = document.getElementsByClassName('add-object');
    // mame cyklus ktory pre vsetky input co maju class add-object nastavia hodnutu na prazdny string teda ''
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value='';
    }
    // funkcia kotra vlozi pozloku do zoznamu resp. do div s id list-objects
    addObjectToList();
}

    // vymaze pole userObjects a znova zavola funkciu generateSkyObjects aby sa nam pregenerovala obloha ale uz s prazdnym
function removeObjects() {
    userObjects = [];
    generateSkyObjects();
    addObjectToList();
}

// prida do divu s id list-objects v podstate sa deje to iste co generateSkyObjects() ale nepridava obrazky ale div
function addObjectToList() {
    var item = '';
    for (let i = 0; i < userObjects.length; i++) {

        // ----------- kuste zobrazt v div zobrazit aj left position aj top postion popripade pekne nastylovat ak viete :}
        item += '<div>'+userObjects[i].type+'</div>';
    }
    document.getElementById("list-objects").innerHTML = item;
}


// hranie sa s poliami

// v for moze spravit podmienku ze ked narazime na polozku pola s nejakou konkretnou hodnoutu nieco sa vykona 
/*
// nove pradzne pole 
var novePole = [];
var pocetlietadiel = 0;

for (let i = 0; i < poleObjektov.length; i++) {

    // aj narazim na polozku pola kotrej hodnota je airplane vlozim ju do noveho pola 
    if (poleObjektov[i] === 'airplane') {
        // vlozim do noveho pola polozku aj je splnena podmienka hore
        novePole.push(poleObjektov[i]);
        // toto je iterator v kazdom cykle prirata jednicku
        pocetlietadiel++;
    }
    if (pocetlietadiel === 2) {
        // ak bude pocet vyskytov stringu v poli rovny 2 napise console log ukonci cely cyklus uz dalsie string airplane nehlada
        console.log(' nasiel som dve lietadla');
        break;
    }
}
*/