let db = {
    users:[
        {
            usr: 'Franco', pwd:'1234', id:1
        },
        {
            usr: 'test', pwd:'test', id:2
        }
    ],

    proyects: [
        {creator: 1, name:'proyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-04', id:1},
        {creator: 1, name:'proyect2', desc:'testproyect2', start:'2019-07-05', end: '2019-07-09', id:2},
        {creator: 2, name:'Nproyect1', desc:'testproyect1', start:'2019-07-01', end: '2019-07-20', id:3},
        {creator: 2, name:'Nproyect2', desc:'testproyect2', start:'2019-07-14', end: '2019-08-03', id:4}
    ]
};

//THING REQUIRED
const express = require('express');
const bodyParser = require('body-parser');

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
        if(u.usr === verify.name && u.pwd === verify.pwd){
            console.log(`User logged on ${u.usr}`);
            id = u.id;
            break;
        }
    }

    if(id){
        pyc = [];
        for(let p of db.proyects){
            if(p.creator == id)
                pyc.push(p);
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
    console.log(db.proyects);

    response.json({
        status: 'Success'
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