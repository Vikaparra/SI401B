"use strict";


// export class Tabuleiro {Tabuleiro}

//  var tabuleiro = document.createElement('script');
//  tabuleiro.src = '../View/screens/configuracoes/configuracoes.js';
//  document.head.appendChild(tabuleiro); // Importado JS do jogador

//Função para saber quantas bombas há perto da célula
function verificar(tabuleiro, linha, coluna){
    console.log(tabuleiro.matriz);
    var numeroBombasEncontradas = 0;

    if(tabuleiro.matriz[linha][coluna] == "B"){
       return "B";
    }else{
        for(let colunas=coluna-1; colunas <= (coluna+1); colunas++){
            for(let linhas=linha-1; linhas <= (linha+1); linhas++){
                if(colunas >= 0 && linhas >= 0 && colunas < tabuleiro.numeroCelulas && linhas < tabuleiro.numeroCelulas){
                    if(tabuleiro.matriz[linhas][colunas]=="B"){
                        numeroBombasEncontradas++;
                    }
                }  
            }
        }
        return numeroBombasEncontradas;
    }
}

//Função para preencher o tabuleiro com numeros das bombas em volta
function preencherNumeros(tabuleiro){
    for (let coluna = 0; coluna < tabuleiro.numeroCelulas; coluna++) {
        for (let linha = 0; linha < tabuleiro.numeroCelulas; linha++) {
            tabuleiro.matriz[linha][coluna] = verificar(tabuleiro, linha, coluna);        
        }
    }
}

//Função para verificar a celula no momento do clique
function clique(tabuleiro, linha, coluna){

    let celula = tabuleiro.matriz[linha][coluna];

    switch (celula) {
        case 0: //se a célula não tiver bombas (nela e perto)
            //roda função recursiva pra abrir tudo que for 0 em volta
            celulasZero(tabuleiro, linha, coluna);
            if(tabuleiro.celulasAbertas==tabuleiro.celulasSb){
                fimDeJogo("V");
            }
            break;

        case "B": //se a célula tiver bomba (nela)
            fimDeJogo("D"); 
            break;

        default: //se a célula tiver bombas (perto)
            //so mostra normalmente o valor
            //bloqueia no html pra nao poder clicar mais
            tabuleiro.celulasAbertas++;
            if(tabuleiro.celulasAbertas==tabuleiro.celulasSb){
                fimDeJogo("V");
            }
            break;
    }

}

//Função para abrir celulas vizinhas da celula vazia
function celulasZero(tabuleiro, linha, coluna){
    for(let colunas=coluna-1; colunas <= (coluna+1); colunas++){
        for(let linhas=linha-1; linhas <= (linha+1); linhas++){
            if(colunas >= 0 && linhas >= 0 && colunas < tabuleiro.numeroCelulas && linhas < tabuleiro.numeroCelulas){
                if(tabuleiro.matriz[linhas][colunas]===0){
                    // console.log("colunas"+colunas);
                    // console.log("linhas"+linhas);
                    // console.log("-------------------------");
                    tabuleiro.matriz[linhas][colunas]="";
                    //mostra a casa e chama a função novamente
                    //bloqueia no html pra nao clicar mais ---> style.pointerEvents = 'none';
                    tabuleiro.celulasAbertas++;
                    celulasZero(tabuleiro, linhas, colunas); //rodando de novo para abrir todas que são 0 em volta
                }
                else if(tabuleiro.matriz[linhas][colunas]=="B"){
                    tabuleiro.celulasAbertas++;
                    return "B"; //mostra célula fechada
                }
                else {
                    tabuleiro.celulasAbertas++;
                    //mostra o valor e para
                    //bloqueia pra nao clicar mais
                }
            }  
        }
    }
}

function fimDeJogo(resultado){ //parâmetro de vitória ou derrota p/ definir display
    //bloquear tudo pra não clicar
    //tornar display de "vitória" ou "derrota" visível
    if(resultado=="D"){
        console.log("PERDEU OTARIO");
        //display DIV de derrota
    }
    else {
        console.log("GANHOU CREMOSO");
        //display DIV de vitória
    }
}

// Parte do Tabuleiro para testes

var tabuleiro = sessionStorage.getItem("tabuleiro");
tabuleiro = JSON.parse(tabuleiro);


//VIEW   
function buildGridLayout(){

    let matriz = tabuleiro.matriz;

    var divMatriz = document.querySelector("#container-principal");
    var matrizGUI = document.createElement("div");
    matrizGUI.className = "matriz-GUI";

    divMatriz.appendChild(matrizGUI);

    matriz.forEach(linha => {
        var linhaMatrizGUI = document.createElement("div");
        linhaMatrizGUI.className = "linha-matriz-GUI";

        matrizGUI.appendChild(linhaMatrizGUI);
        linha.forEach(celula => {
            var celulaMatrizGUI = document.createElement("div");
            celulaMatrizGUI.className = "celula-matriz-GUI";

            linhaMatrizGUI.appendChild(celulaMatrizGUI);
        })
    });
}