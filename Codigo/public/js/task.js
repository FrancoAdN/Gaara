async function loadTasks(n){
    const id = n;

    const options = { 
        method: 'POST',
        body: JSON.stringify({id: id}), 
        headers:{
            'Content-Type': 'application/json'
        }
    };
    const response =  await fetch('/tasks', options).catch(err => console.error(err));
    const json = await response.json();
    return json.tasks;

}

function back(from, to){
    $(from).css('display', 'none');
    $(to).css('display', 'block');
}

function showFormOfTask(id){
    back('#viewProyect', '#tForm');
    $('#addTask').attr('onclick', `addNewTask(${id})`);
}


async function addNewTask(id){
    const task = {
        p_id: id,
        name: $('#tName').val(),
        desc: $('#tDesc').val(),
        hours: $('#tHours').val(),
        state: 1
    }
    
    if(!task.hours)
        task.hours = 1
    if(!task.name)
        task.name = 'NEW TASK'


    const options = { 
        method: 'POST',
        body: JSON.stringify(task), 
        headers:{
            'Content-Type': 'application/json'
        }
    };
    const response =  await fetch('/addTask', options).catch(err => console.error(err));
    const json = await response.json();
    if(json){
        let index;
        for(let i = 0; i < db.proyects.length; i++){
            if(db.proyects[i].id == id){
                index = i;
                break;
            }
        }
        viewProyectDetails(db.proyects[index]);
        back('#tForm', '#viewProyect');
    }
}

function viewTaskDetails(id){
    console.log(id);
}

async function showMyTasks(id){
    const options = { 
        method: 'POST',
        body: JSON.stringify({id: id}), 
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const response =  await fetch('/showtask', options).catch(err => console.error(err));
    const json = await response.json();
    if(json){
        back('#contProyect', '#showtask');
        $('#showtask').append(`<button onclick="back('#showtask','#contProyect');"><img src="../img/reply-arrow.png"></button>`);
        for(let t of json.tasks){
            let state;
            if(t.task.state == 1) 
                state = "Created";
            else if(t.task.state == 2)
                state = "Pending";
            else if(t.task.state == 3)
                state = "Test";
            $('#showtask').append(`<p style="border: 1px solid black;">Proyecto: ${t.proyect} Tarea: ${t.task.name} Cantidad de horas: ${t.task.hours} Estado: ${state}</p></br>`);
        }
    }
}