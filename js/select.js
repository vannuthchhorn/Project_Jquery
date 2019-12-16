function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function(){
    requestApi();
    $('#recipe').on('change', function(){
    var recipesId = $('#recipe').val();
    eachRecipes(recipesId);
    });
});
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
}
// each recipes
function eachRecipes(id){
    allData.forEach(item =>{
        if(item.id == id){
            showRecipes(item.name, item.iconUrl);
            showIngrediant(item.ingredients);
            showStep(item.instructions);
        }
    });
}

// show recipes

function showRecipes(name,img,) {
    var result ="";
    result +=`
            <div class="col-2"></div>
            <div class="col-4">
                <h3 class="text-center">${name}</h3>
            </div>
            <div class="col-5" >
                <img src="${img}" width="250"></div>
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
                                <input class="form-control text-center" type="number" id="member" value="0" min="1" max="15" />
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
}

// show ingradiant

function showIngrediant(ing){
    var display ="";
    ing.forEach(item =>{
        display +=`
            <tr>
                <td><img src="${item.iconUrl}" width="80px"></td>
                <td>${parseInt(item.quantity)}</td>
                <td>${item.unit.charAt(0)}</td>
                <td>${item.name}</td>
            </tr>
        `;
    });
    $('#test').html(display);
}
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

// button change value of member

$(document).ready(function() {
    $('#minus').on('click', function() {
        var members = $('#member').val();
        decreaseMember(members);
    });
    $('#add').on('click', function() {
        var members = $('#member').val();
        increaseMember(members);
    });
});

function decreaseMember (minus) {
    var member = parseInt(minus) - 1;
    if(member >= 0) {
      $('#member').val(member);
      compute(member);
    }
}

function increaseMember(add) {
    var members = parseInt(add) + 1;
    if(members <= 15) {
        $('#member').val(members);
        compute(members);
        
    }
}

function compute(number) {
    var result = number * 5;
    if(number == 0) {
        progressBar(result);
    }else {
        progressBar(result + 25);
    }
    $('#show').html(result);
}

function progressBar(pro) {
    $('#progress').width(pro + "%");
    $('#progress').html(pro + "%");
}

// new Quantity = new guest * old quantity / old guest