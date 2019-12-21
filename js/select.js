// get url
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// function of catch with html

$(document).ready(function(){
    requestApi();
    $('#recipe').on('change', function(){
    var recipesId = $('#recipe').val();
    eachRecipes(recipesId);

        // button change value of member

        $('#minus').on('click', function() {
            var members = $('#member').val();
            decreaseMember(members);
        });
        $('#add').on('click', function() {
            var members = $('#member').val();
            increaseMember(members);
        });
    });
});

// minus member

function decreaseMember (minus) {
    var member = parseInt(minus) - 1;
    if(member >= 0) {
      $('#member').val(member);
      culculateMember($('#member').val());
    }
}


// sum member

function increaseMember(add) {
    var members = parseInt(add) + 1;
    if(members <= 15) {
        $('#member').val(members);
        culculateMember($('#member').val());
    }
}



function culculateMember(people) {
    var quantities;
    var newQuanlity;
    var result = "";
    gQuantity.forEach(item => {
        const{name, quantity, unit,iconUrl} = item;
        quantities = quantity/oldGuest;
        newQuanlity = quantities*people;
        result += `
            <tr>
                <td><img src="${iconUrl}" style="width:50px"></td>
                <td id='quantity'>${newQuanlity}</td>
                <td>${unit[0]}</td>
                <td>${name}</td>
            </tr>
        `;
    });
    $("#test").html(result);
}

// get ajax 

function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: ()=> console.log("Cannot get data"),
    });
}

//// take api from recipes

var allData =[]; 
function chooseRecipe(recipes){
    allData = recipes;
    var option ="";
    recipes.forEach(item =>{
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#recipe').append(option);
    $('#nuth').hide();
}
// each recipes
var gQuantity = [];
var oldGuest = 0;


function eachRecipes(id){
    allData.forEach(item =>{
        if(item.id == id){
            showRecipes(item.name, item.iconUrl,item.nbGuests);
            showIngrediant(item.ingredients);
            showStep(item.instructions);
            gQuantity=item.ingredients;
            oldGuest=item.nbGuests;

        }
    });
}

// show recipes

function showRecipes(name,img,nbGuests) {
    var result ="";
    result +=`
        <div class="col-2"></div>
        <div class="col-4">
            <h3 class="text-center">${name}</h3>
        </div>
        <div class="col-5" >
            <img src="${img}" width="255" class="img-thumbnail"></div>
        <div class="col-1"></div>


        <div class="container mt-5">
            <div class="row" id="increase">
                <div class="col-2"></div>
                <div class="col-4">
                    <h5>Number of persons </h5>
                </div>

                <div class="col-3">
                    <form>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button type="button" id="minus" class="btn btn-primary">&minus;</button>
                            </div>
                                <input class="form-control text-center" type="number" id="member" value="${nbGuests}" min="1" max="15" />
                            <div class="input-group-append">
                                <button type="button" id="add" class="btn btn-danger">&plus;</button>
                            </div>
                        </div>
                    </form>
                </div> 
            <div class="col-3"></div>
        </div>
    `;
    $('#recipe-result').html(result);
    $('#nuth').show();
}

// show ingradiant

function showIngrediant(ing){
    var display ="";
    ing.forEach(item =>{
        display +=`
            <tr>
                <td><img src="${item.iconUrl}" style="width:50px"></td>
                <td>${parseInt(item.quantity)}</td>
                <td>${item.unit.charAt(0)}</td>
                <td>${item.name}</td>
            </tr>
        `;
    });
    $('#test').html(display);
}

// show step

function showStep(step){
    var instr ="";
    var stepOfMethod = step.split('<step>');
    for(var i =1;i<stepOfMethod.length;i++){
        instr +=`
            <h5 class="text-primary">Step: ${i}</h5>
            <p>${stepOfMethod[i]}</p>
        `;
    }
    $('#ing').html(instr);
}


