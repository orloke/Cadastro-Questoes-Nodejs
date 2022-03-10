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