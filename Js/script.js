import { hex_sha256 } from "./sha256-min.mjs";

const target = '23afafe6a7279516d53ecedfae71cf68f8c8d6aff9948f20184d588cfa471f76';
const incremento = 'glorioso';
const mensagem =  document.getElementById('mensagem')

document.getElementById('loginBtn').onclick = () =>{
    const entrada = document.getElementById('senha').value;
    if (hex_sha256(entrada + incremento) === target){
        sessionStorage.setItem('logado', '1');
        window.location.href = 'jogadores.html';
        
    }else{
        mensagem.innerHTML = 'Senha incorreta';
    }
}
