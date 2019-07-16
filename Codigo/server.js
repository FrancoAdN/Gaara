let db = {
    users:[
        {usr: 'Franco', last:'di Nápoli', email:'francoadinapoli@gmail.com', pwd:'1234', id:1},
        {usr: 'test', last:'prueba', email:'test@gmail.com', pwd:'test', id:2},
        {usr: 'Tomás', last:'Vera', email:'tomas.vera@gmail.com', pwd:'1234', id:3},
        {usr: 'Lautaro', last:'Caputo', email:'lautaro.caputo@gmail.com', pwd:'test', id:4},
        {usr: 'Matías', last:'Valussi', email:'matias.valussi@gmail.com', pwd:'test', id:5},
        {usr: 'Santiago', last:'Latorre', email:'santiago.latorre@gmail.com', pwd:'test', id:6},
        {usr: 'Iván', last:'Leszkiewicz', email:'ivan.leszkiewicz@gmail.com', pwd:'test', id:7},
        {usr: 'Martin', last:'Bruno', email:'martin.bruno@gmail.com', pwd:'test', id:8},
        {usr: 'Iván', last:'Rodriguez', email:'ivan.rodriguez@gmail.com', pwd:'test', id:9},
        {usr: 'Marcos', last:'Ortiz', email:'marcos.ortiz@gmail.com', pwd:'test', id:10},
        {usr: 'Román', last:'Sammarco', email:'roman.sammarco@gmail.com', pwd:'test', id:11},
        {usr: 'Tomás', last:'da Bouza', email:'tomas.dabouza@gmail.com', pwd:'test', id:12},
        {usr: 'Pablo', last:'Gimenez', email:'pablo.gimenez@gmail.com', pwd:'test', id:13},
        {usr: 'Franco', last:'Oliva', email:'franco.oliva@gmail.com', pwd:'test', id:14},
        {usr: 'Luca', last:'Roma', email:'luca.roma@gmail.com', pwd:'test', id:15},
        {usr: 'Axel', last:'Gonzalez', email:'axel.gonzalez@gmail.com', pwd:'test', id:16},
        {usr: 'Rodrigo', last:'Tarqui', email:'rodrigo.tarqui@gmail.com', pwd:'test', id:17}
    ],

    proyects: [
        {creator: 1, name:'proyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-04', id:1},
        {creator: 1, name:'proyect2', desc:'testproyect2', start:'2019-07-05', end: '2019-07-09', id:2},
        {creator: 2, name:'Nproyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-20', id:3},
        {creator: 2, name:'Nproyect2', desc:'testproyect2', start:'2019-07-14', end: '2019-08-03', id:4}
    ],
    tasks:[
        {p_id: 1, name:'Tarea1', desc:'1', hours:4, state:1,id: 1},
        {p_id: 1, name:'Tarea2', desc:'2', hours:5, state:1,id: 2},
        {p_id: 2, name:'Tarea3', desc:'3', hours:7, state:1,id: 3},
        {p_id: 2, name:'Tarea4', desc:'4', hours:1, state:1,id: 4},
        {p_id: 3, name:'Tarea5', desc:'5', hours:20, state:1,id: 5},
        {p_id: 3, name:'Tarea6', desc:'6', hours:23, state:1,id: 6},
        {p_id: 4, name:'Tarea7', desc:'7', hours:6, state:1,id: 7},
        {p_id: 4, name:'Tarea8', desc:'8', hours:8, state:1,id: 8}
    ],
    taskusers:[
        {p_id: 1, t_id:1, u_id:1},
        {p_id: 1, t_id:1, u_id:2},
        {p_id: 1, t_id:2, u_id:3},
        {p_id: 1, t_id:2, u_id:4},
        {p_id: 1, t_id:1, u_id:5},
        {p_id: 2, t_id:3, u_id:6},
        {p_id: 2, t_id:3, u_id:7},
        {p_id: 2, t_id:4, u_id:8},
        {p_id: 2, t_id:4, u_id:9},
        {p_id: 2, t_id:3, u_id:10},
        {p_id: 3, t_id:5, u_id:1},
        {p_id: 3, t_id:5, u_id:2},
        {p_id: 3, t_id:6, u_id:3},
        {p_id: 3, t_id:6, u_id:4},
        {p_id: 3, t_id:5, u_id:5},
        {p_id: 4, t_id:7, u_id:6},
        {p_id: 4, t_id:7, u_id:7},
        {p_id: 4, t_id:8, u_id:8},
        {p_id: 4, t_id:8, u_id:9},
        {p_id: 4, t_id:7, u_id:10},
        {p_id: 1, t_id:2, u_id:1},
        {p_id: 2, t_id:4, u_id:2},
        {p_id: 3, t_id:6, u_id:3},
        {p_id: 4, t_id:8, u_id:4}
    ]
};

//THING REQUIRED
const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://dina:dina2019@ds141434.mlab.com:41434/participemos-arg";

MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);

  let dbo = db.db("participemos-arg");

  try{
    dbo.collection("usuarios").find({ nro : {$gt:25 , $lt:50 } } ).toArray(function(err, result) {
        if (err) console.error(err);
        console.log(result);
        db.close();
      });
    
  } catch(err){
      console.log(err);
  }


});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    if(input == 'users'){
        console.log(db.users);
    }else if(input == 'proyects'){
        console.log(db.proyects);
    }else if(input == 'tasks'){
        console.log(db.tasks);
    }else if(input == 'taskuser')
        console.log(db.taskuser);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, () => console.log('Server running'));

app.use(express.static('public'));


//RECIEVING LOGIN DATA FROM CLIENT
app.post('/login', (req, response) => {
    let id = undefined;
    let pyc = [];
    const verify = req.body;
    for(let u of db.users){
        if(u.email === verify.name && u.pwd === verify.pwd){
            console.log(`User logged on ${u.usr}`);
            id = u.id;
            break;
        }
    }

    if(id){
        pyc = [];
        let proy = [];
        for(let tu of db.taskusers){
            if(tu.u_id == id)
                proy.push(tu.p_id);
        }
        for(let p of db.proyects){
            if(p.creator == id)
                proy.push(p.id);
        }
        for(let i = 0; i < proy.length; i++){
            for(let j = i +1 ; j < proy.length; j++){
                if(proy[i] == proy[j])
                    proy.splice(i, 1);
            }
        }
        for(let p of db.proyects){
            for(let n of proy){
                if(n == p.id)
                    pyc.push(p);
            }
        }
    }
    response.json({
        status: 'Success',
        id: id,
        proyects: pyc
    });
});

//adding a proyect to db

app.post('/proy', (req, response) => {
    const proy = req.body;
    proy.id = db.proyects.length + 1;
    db.proyects.push(proy)
    console.log(`New proyect added`, proy);

    response.json({
        status: 'Success',
        id: proy.id
    });
    
});

//delete proyect
app.post('/d', (req, response) => {
    const id = req.body.id;
    for(let i = 0; i < db.proyects.length; i++){
        if(db.proyects[i].id == id)
            db.proyects.splice(i, 1);
    }
    console.log(`Proyect deleted, id: ${id}`);

    response.json({
        status: 'Success'
    });
    
});



//send task to client
app.post('/tasks', (req, response) => {
    const proy = req.body;
    console.log(req.body);
    let tasks = [];
    for(let t of db.tasks){
        if(t.p_id == proy.id)
            tasks.push(t);
    }

    response.json({
        status: 'Success',
        tasks: tasks
    });
});

app.post('/addTask',(req, response) => {
    const task = req.body;
    task.id = db.tasks.length+1;
    db.tasks.push(task);
    console.log(`Proyect added ${task.id}`, task.p_id);
    response.json({
        status: 'Success'
    });
});

app.post('/showtask', (req, resp) => {
    const id = req.body.id;
    let show = [];
    for(let tu of db.taskusers){
        if(tu.u_id == id){
            for(let task of db.tasks){
                if(task.id == tu.t_id){
                    for(let p of db.proyects){
                        if(p.id == tu.p_id){
                            show.push({proyect: p.name, task:task});
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    resp.json({tasks:show});
});