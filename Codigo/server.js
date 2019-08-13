let db = {
    users:[
        {usr: 'Franco', last:'di Nápoli', email:'francoadinapoli@gmail.com', pwd:'1234', admin: true, id:1},
        {usr: 'test', last:'prueba', email:'test@gmail.com', pwd:'test', admin: true, id:2},
        {usr: 'Tomás', last:'Vera', email:'tomas.vera@gmail.com', pwd:'1234', admin: false, id:3},
        {usr: 'Lautaro', last:'Caputo', email:'lautaro.caputo@gmail.com', pwd:'test', admin: false,id:4},
        {usr: 'Matías', last:'Valussi', email:'matias.valussi@gmail.com', pwd:'test', admin: false, id:5},
        {usr: 'Santiago', last:'Latorre', email:'santiago.latorre@gmail.com', pwd:'test', admin: false, id:6},
        {usr: 'Iván', last:'Leszkiewicz', email:'ivan.leszkiewicz@gmail.com', pwd:'test', admin: false,id:7},
        {usr: 'Martin', last:'Bruno', email:'martin.bruno@gmail.com', pwd:'test', admin: false,id:8},
        {usr: 'Iván', last:'Rodriguez', email:'ivan.rodriguez@gmail.com', pwd:'test', admin: false,id:9},
        {usr: 'Marcos', last:'Ortiz', email:'marcos.ortiz@gmail.com', pwd:'test', admin: false,id:10},
        {usr: 'Román', last:'Sammarco', email:'roman.sammarco@gmail.com', pwd:'test', admin: false,id:11},
        {usr: 'Tomás', last:'da Bouza', email:'tomas.dabouza@gmail.com', pwd:'test', admin: false,id:12},
        {usr: 'Pablo', last:'Gimenez', email:'pablo.gimenez@gmail.com', pwd:'test', admin: false,id:13},
        {usr: 'Franco', last:'Oliva', email:'franco.oliva@gmail.com', pwd:'test', admin: false,id:14},
        {usr: 'Luca', last:'Roma', email:'luca.roma@gmail.com', pwd:'test', admin: false,id:15},
        {usr: 'Axel', last:'Gonzalez', email:'axel.gonzalez@gmail.com', pwd:'test', admin: false,id:16},
        {usr: 'Rodrigo', last:'Tarqui', email:'rodrigo.tarqui@gmail.com', pwd:'test', admin: false,id:17}
    ],
    proyects: [
        {creator: 1, state:1, name:'proyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-04', id:1},
        {creator: 1, state:2, name:'proyect2', desc:'testproyect2', start:'2019-07-05', end: '2019-07-09', id:2},
        {creator: 2, state:3, name:'Nproyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-20', id:3},
        {creator: 2, state:1, name:'Nproyect2', desc:'testproyect2', start:'2019-07-14', end: '2019-08-03', id:4}
    ],
    tasks:[
        {p_id: 1, name:'Tarea1', desc:'1', hours:4, state:1, group: 3, id: 1},
        {p_id: 1, name:'Tarea2', desc:'2', hours:5, state:1, group: 7, id: 2},
        {p_id: 2, name:'Tarea3', desc:'3', hours:7, state:1, group: 5, id: 3},
        {p_id: 2, name:'Tarea4', desc:'4', hours:1, state:1, group: 10, id: 4},
        {p_id: 3, name:'Tarea5', desc:'5', hours:20, state:1, group: 1, id: 5},
        {p_id: 3, name:'Tarea6', desc:'6', hours:23, state:1, group: 2, id: 6},
        {p_id: 4, name:'Tarea7', desc:'7', hours:6, state:1, group: 4, id: 7},
        {p_id: 4, name:'Tarea8', desc:'8', hours:8, state:1, group: 8, id: 8},
        {p_id: 2, name:'Tarea9', desc:'8', hours:8, state:1, group: 6, id: 8},
        {p_id: 3, name:'Tarea10', desc:'8', hours:8, state:1, group: 9, id: 8},
    ],
    groups:[
        {id: 1, name: 'Electrónica', users:[1, 3, 7, 10]},
        {id: 2, name: 'Programación Web', users:[8, 4, 6, 2]},
        {id: 3, name: 'Programación Desktop', users:[1, 9, 7]}, 
        {id: 4, name: 'Mantenimiento Informático', users: [5]},
        {id: 5, name: 'Mantenimiento', users:[5]},
        {id: 6, name: 'Seguridad Informática', users:[1, 2, 3, 4]},
        {id: 7, name: 'Diseño', users:[8, 10]},
        {id: 8, name: 'Ventas', users:[6, 9]},
        {id: 9, name: 'Administración', users:[3, 7, 9]},
        {id: 10, name: 'Redes', users:[4, 7, 10]}
    ],
};

//THING REQUIRED
const express = require('express');
const bodyParser = require('body-parser');
const expbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//SERVER SETTINGS
const app = express();
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir:'views/layouts',
    helpers: {
        state: (a) =>{
            if(a == 1)
                return '<div class="tm-status-circle moving"></div>Created';
            else if(a == 2)
                return '<div class="tm-status-circle pending"></div>In progress';
            else if(a == 3)
                return '<div class="tm-status-circle cancelled"></div>Test';
        },
        nameGroup: (id) => {
            for(let g of db.groups){
                if(g.id == id){
                    return g.name;
                    break;
                }
            }
        }
    }
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(bodyParser.json({limit:'50mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(cookieParser());
app.use(session({resave: true, secret: '12345', saveUninitialized: true}));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/jquery-ui-datepicker', express.static(__dirname + '/jquery-ui-datepicker'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/webfonts', express.static(__dirname + '/webfonts'));


app.get('/', (req, resp) => {
    // resp.clearCookie('session');
    // resp.clearCookie('user');
    if(req.cookies.session){
        resp.redirect('/home');
    }else
        resp.render('login', {layout: false});
});

app.get('/login', (req, resp) => {
    resp.redirect('/');
});

app.get('/home', (req, resp) => {
    resp.render('index', {name: req.cookies.session.name, proyects: getProyects(req.cookies.session.id), admin: req.cookies.session.admin});
});

app.get('/add-task', (req, resp) => {
    resp.render('add-task');
});

app.get('/add-project', (req, resp) => {
    resp.render('add-project', {name: req.cookies.session.name, id: req.cookies.session.id, group: db.groups});
});

app.get('/accounts', (req, resp) => {
    resp.render('accounts');
});

app.get('/project/:id', (req, resp) => {
    const id = req.params.id;
    let p = [];
    let t = [];
    let admin;
    for(let pj of db.proyects){
        if(pj.id == id){
            admin = ((pj.creator == req.cookies.session.id) ? true : false);
            p.push(pj);
            break;
        }
    }
    const tasks = getTaskOfProyect(id);
    resp.render('projects', {dou: true, name: req.cookies.session.name, project:p, tasks: tasks, admin: admin});

});

app.get('/project/del/:id', (req, resp) => {
    const id = req.params.id;

    for(let i = 0; i < db.tasks.length; i++){
        if(db.tasks[i].id == id){
            const p = db.tasks[i].p_id;
            db.tasks.splice(i, 1);
            resp.redirect(`/project/${p}`);
            break;     
        }
    }
});

app.get('/groups' , (req, resp) => {
    resp.render('admin', {groups: db.groups});
});




/*const readline = require('readline');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://dina:dina2019@ds141434.mlab.com:41434/participemos-arg";

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


});*/

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.on('line', (input) => {
//     if(input == 'users'){
//         console.log(db.users);
//     }else if(input == 'proyects'){
//         console.log(db.proyects);
//     }else if(input == 'tasks'){
//         console.log(db.tasks);
//     }else if(input == 'taskuser')
//         console.log(db.taskuser);
// });
function getGroups(id){
    let groups = [];
    for(let gr of db.groups){
        for(let us of gr.users){
            if(us == id)
                groups.push(gr.id);
        }
    }
    return groups;
}


function getProyects(id){
    let pyc = [];
    let proy = [];
    for(let p of db.proyects){
        if(p.creator == id)
            proy.push(p.id);
    }

    for(let g of getGroups(id)){
        for(tsk of db.tasks){
            if(tsk.group == g)
                proy.push(tsk.p_id);
        }
    }

    //repeticiones 
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
    return pyc;
}

function getTaskOfProyect(id){
    let tasks = [];
    for(let t of db.tasks){
        if(t.p_id == id){
            //t['usrInTask'] = isInTask(t.group, id);
            tasks.push(t);
        }
    }
    return tasks;
}

function isInTask(group, id){
    for(let g of db.groups){
        if(g.id == group){
            for(let us of g.users){
                if(us == id){
                    return true;   
                }
            }
        }
    }
    return false;
}


//RECIEVING LOGIN DATA FROM CLIENT
app.post('/login', (req, resp) => {
    
    let id = undefined;
    const verify = req.body;
    for(let u of db.users){
        if(u.email === verify.username && u.pwd === verify.password){
            console.log(`User logged on ${u.usr}`);
            id = u.id;
            name = u.usr;
            admin = u.admin;
            break;
        }
    }

    if(id){
        const pyc = getProyects(id);
        const sid = req.cookies['connect.sid'];
        resp.cookie('session', {sid: sid, id: id, name: name, admin: admin});
        resp.redirect('/home');
    }else{
        resp.redirect('/');
    }
});


app.post('/logout', (req, resp) => {
    resp.clearCookie('session');
    resp.redirect('/'); 
});

app.post('/add-project', (req, resp) => {
    const data = {creator: parseInt(req.body.creator), state:1, name: req.body.name, desc: req.body.desc, start: req.body.start, end: req.body.end, car: req.body.img, group: req.body.category ,id:db.proyects.length+1};
    db.proyects.push(data);
    resp.redirect('/home');
});
/*


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
*/











app.listen(3000, () => console.log('Server running'));