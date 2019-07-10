const db = {
    user:{},
    proyects:[]
};

function makeListOfProyects(){
    $('#proyList').empty();
    for(let p of db.proyects){
        $(`<div style="border: 1px solid black;" onclick="viewProyectDetails({creator: ${p.creator}, name: '${p.name}', desc: '${p.desc}', start: '${p.start}', end: '${p.end}', id:${p.id}})">
        <p><strong>Name:</strong> ${p.name}
        <strong>Starts:</strong> ${p.start}
        <strong>Ends:</strong> ${p.end}</p>
        </div></br>`).appendTo('#proyList');
    }
}


async function viewProyectDetails(proyect){
    db['tasks'] = await loadTasks(proyect.id);
    $('#viewProyect').empty();

    back('#contProyect', '#viewProyect');
    
    $('#viewProyect').append(`
    <button onclick="back('#viewProyect','#contProyect');"><img src="../img/reply-arrow.png"></button>
    <p>${proyect.name}</p>
    <p>${proyect.desc}</p>
    <p>${proyect.start}</p>
    <p>${proyect.end}</p>
    <button onclick='deleteProyect(${proyect.id})'>
    <img src="../img/trash.png" style="width:20px; height:20px;">
    </img></button>`);
    for(let t of db.tasks){
        let state;
        if(t.state == 1)
            state = 'Created';
        else if(t.state == 2)
            state = 'Pending';
        else if(t.state == 3)
            state = 'Test';
        $('#viewProyect').append(`<div onclick='viewTaskDetails(${t.id})' style="border: 1px solid black"><p>${t.name} ${t.desc} ${t.hours}hs ${state}</p></div></br>`);
    }

    $('#viewProyect').append(`<button onclick="showFormOfTask(${proyect.id})"><img src="../img/plus-math.png"></button>`);
}

function deleteProyect(n){
    const id = n;
    for(let i = 0; i < db.proyects.length; i++){
        if(db.proyects[i].id == id)
            db.proyects.splice(i, 1);
    }

    console.log('proyect deleted');
    console.log(db.proyects, id);
    
    const options = { 
        method: 'POST', 
        body: JSON.stringify({id:id}), 
        headers:{
            'Content-Type': 'application/json'
        }
    };
    
    fetch('/d', options)
    .catch(error => console.error(error));

    back('#viewProyect', '#contProyect');
    makeListOfProyects();
    
   

}
async function login(){

    let user = {};
    user.name = $("#usr").val();
    user.pwd = $("#pwd").val();
    if(user.name && user.pwd){

        const options = { 
            method: 'POST',
            body: JSON.stringify(user), 
            headers:{
                'Content-Type': 'application/json'
            }
        };
        
        const response = await fetch('/login', options).catch(error => console.error(error));
        const json = await response.json();

        if(json.id){
            db.user.name = user.name;
            db.user.id = json.id;
            back('#formLogin', '#contProyect');
            $('#toolbar').css('display', 'block');
            $('#bUser').append(db.user.name);
            $('#myTasks').attr('onclick', `showMyTasks(${db.user.id})`)
            db.proyects = json.proyects;
            makeListOfProyects();
        }
        
    }

}

function enterKey(event){
    if((event.which || event.keyCode) === 13)
        login();
}

function showFormOfProyect(){
    if($('#proyectAttr').css('display') === 'block')
        $('#proyectAttr').css('display', 'none');
    else
        $('#proyectAttr').css('display', 'block');
    
}   


async function createProyect(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const proyect = {
        creator: db.user.id,
        name: $('#proyectName').val(),
        desc: $('#proyectDesc').val(),
    };

    if($('#startProyect').val() === ''){
        
        proyect.start = today;
    }else
        proyect.start = $('#startProyect').val();

    if($('#endProyect').val() === ''){
        proyect.end = today;
    }else
        proyect.end = $('#endProyect').val();


    const start = new Date(proyect.start);
    const end = new Date(proyect.end);
    const t = new Date(today);

    if(start > end || start < t)
        console.log('Error creating new proyect');
    else{
        const options = { 
            method: 'POST', 
            body: JSON.stringify(proyect), 
            headers:{
                'Content-Type': 'application/json'
            }
        };
        
        const response = await fetch('/proy', options).catch(error => console.error(error));
        const json = await response.json();
        proyect['id'] = json.id;
        db.proyects.push(proyect);
        $('#proyectAttr').css('display', 'none');
        makeListOfProyects();

    }

    
    

}