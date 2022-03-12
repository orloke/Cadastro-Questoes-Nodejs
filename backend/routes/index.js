var express = require('express');
var fs = require('fs');
var router = express.Router();
questao = []
caminho = './dadosbackend.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile(caminho, function(err,data){
    if(err){
      console.log('Não foi possível encontrar os dados')
    }
    else{
      dados = JSON.parse(data)
    }
    res.render('index', { title: 'Questões', questao: dados });
  })
});

router.post('/cadastrar-questao', function(req, res, next) {

  fs.readFile(caminho, function(err,data){
    if(err){
      console.log('Não foi possível encontrar os dados')
      return
    }

    questao = JSON.parse(data)
    hash = {
      question: req.body.question,
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
      d: req.body.d,
      r: req.body.r,
    }
  
    questao.push(hash)
  
    SalvarTodos(questao)

    res.render('index', { title: 'Adicionar Questão', questao: questao });
       
  })  
});

router.post('/buscar', function(req, res, next) {

  fs.readFile(caminho, function(err,data){
    if(err){
      console.log('Não foi possível encontrar os dados')
    }
    else{
      dadosPes = []
      dados = JSON.parse(data)
      for(i = 0; i<dados.length;i++){
        if(dados[i].question.indexOf(req.body.question) != -1){
          dadosPes.push(dados[i])
        }
      }
    }
    res.render('index', { title: 'Adicionar Questão', questao: dadosPes });
  })  
});

router.get('/alterar', function(req, res){
  fs.readFile(caminho,function(err, data){
    if(err){
      console.log('Não foi possível encontrar os dados')
      return
    }
    dados = JSON.parse(data)
    for(i = 0; i<dados.length; i++){
      if(req.query.question == dados[i].question){
        novosDados = dados[i]
      }
    }
    res.render('alterarQ', { title: 'Alterar Questão', questao: novosDados });
  })
})

router.get('/responder', function(req, res){
  p = 0
  fs.readFile(caminho,function(err, data){
    if(err){
      console.log('Não foi possível encontrar os dados')
      return
    }
    dados = JSON.parse(data)
    i = parseInt(req.query.i)
    res.render('responder', { title: 'Responder', questao:dados[i],l:i, p:p });
  })
})

router.post('/responder', function(req, res){
  fs.readFile(caminho,function(err, data){
    if(err){
      console.log('Não foi possível encontrar os dados')
      return
    }
    dados = JSON.parse(data)
    if(parseInt(req.query.i)<dados.length-1){
      i = parseInt(req.query.i) + 1
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
         p++
      }
      res.render('responder', { title: 'Responder', questao:dados[i], l:i, p:p })
    }
    if((req.query.i)==dados.length-1){
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
        p++
     }
      res.render('fim', { title: 'Fim', p:p })
    }
  })
})

router.post('/alterar-questao', function(req, res, next) {

  fs.readFile(caminho, function(err,data){
    if(err){
      console.log('Não foi possível encontrar os dados')
    }
    else{
      dados = JSON.parse(data)
      for(i = 0; i<dados.length;i++){
        if(req.query.question == dados[i].question){
          dados[i].question = req.body.question
          dados[i].a = req.body.a
          dados[i].b = req.body.b
          dados[i].c = req.body.c
          dados[i].d = req.body.d
          dados[i].r = req.body.r
        }
      }
      SalvarTodos(dados)
    }
    res.render('index', { title: 'Questão', questao: dados });
  })  
});

router.get('/excluir', function(req, res){
  fs.readFile(caminho, function(err,data){
    if(err){
      console.log('Não foi possível encontrar os dados')
      return
    }
    novosDados = []
    dados = JSON.parse(data)
    for(i = 0; i<dados.length; i++){
      if(req.query.question != dados[i].question){
        novosDados.push(dados[i])
      }
    }
    SalvarTodos(novosDados)

    res.render('index', { title: 'Questões', questao: novosDados });
  })

})


var SalvarTodos = function (array){
  fs.writeFile(caminho, JSON.stringify(array), function(err){
    if(err){
      console.log('Não foi possível gravar os dados')
    }
  })
}

module.exports = router;
