function Validacao(){
    const q_ask = document.getElementById('question-ask').value
    const q_a = document.getElementById('question-a').value 
    const q_b = document.getElementById('question-b').value 
    const q_c = document.getElementById('question-c').value 
    const q_d = document.getElementById('question-d').value
    const q_crt = document.getElementById('question-correct').value

    if(q_ask==''|| q_a==''|| q_b==''|| q_c==''|| q_d==''|| q_crt==''){
        alert('Algum campo está vazio!')
        return false
    }
    return true
}

var Excluir = function(q){
    if(confirm('Deseja mesmo deletar?')){
        window.location.href = '/excluir?question=' + q
    }
}

var Finish = function(q,p){
    if(q == 'Questões Concluidas'){
        alert('Sua pontuação foi: ' + p)
    }
}

function Select(){
    const ans = document.querySelectorAll('.point')
    t = []
    ans.forEach(item=>{
       t.push(item.checked)
    })
    if(t.includes(true)==false){
        alert('Marque uma alternativa')
        return false        
    }
    return true    
}