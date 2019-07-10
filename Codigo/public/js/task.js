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

function showMyTasks(id){
    console.log(id);
}