const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//Database
//authenticate tentara logar no mysql
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
// para arquivos estaticos(que nao serao processado pelo backend like css) na pasta public
app.use(express.static('public'));
// Body parser para pegar informacoes dos forms
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/",(req, res) => {
    // raw true para listar apenas os dados que criei na tabela
    Pergunta.findAll({ raw: true, order:[ //equivalente a SELECT * FROM ...
        ['id','DESC'] // ASC = Crescente || DESC = Decrescente -> para ordernar os dados na view
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta",(req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ //equivalente a INSERT TO ...
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/"); //se insert success, retorn pra home
    });
});

app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080,()=>{console.log("App rodando!");})