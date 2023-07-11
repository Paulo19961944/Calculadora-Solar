document.addEventListener("DOMContentLoaded", function() {
    let calcularBtn = document.querySelector("#btn");
    calcularBtn.addEventListener("click", calcular);
});

// Função para calcular os valores
function calcular() {

    // Captura os valores dos campos de entrada e substitui vírgula por ponto
    let num1 = Number(document.getElementById('EA').value.replace(',', '.'));
    let num2 = Number(document.getElementById('HSP').value.replace(',', '.'));
    let num3 = Number(document.getElementById('TM').value.replace(',', '.'));
    let num4 = Number(document.getElementById('P').value.replace(',', '.'));
    let num5 = Number(document.getElementById('V').value.replace(',', '.'));
    let num6 = Number(document.getElementById('VM').value.replace(',', '.'));
    let num7 = Number(document.getElementById('IM').value.replace(',', '.'));
    let vmp = Number(document.getElementById('VMP').value.replace(',', '.'));
    let voc = Number(document.getElementById('VOC').value.replace(',', '.'));
    let isc = Number(document.getElementById('ISC').value.replace(',', '.'));

    // Captura os Dados do HTML
    let ModulosTotal = document.querySelector('#MT');
    let ModulosSerieMax = document.querySelector('#MSMax');
    let ModulosSerieMin = document.querySelector('#MSMin');
    let ModulosParalelo = document.querySelector('#MP');
    let Fusivel = document.querySelector('#Fuse');
    let Disjuntor = document.querySelector('#CA');

    // Realiza o cálculo
    let EMM = num1 / 12;
    let EMD = EMM / 30;
    let Sujeira = num2 * 0.95;
    let PotenciaPico = EMD / num2;
    let PotenciaPicoReal = PotenciaPico / 0.967;
    let CTPmax = num3 * 0.8934;
    let CTVoc = voc * 0.9194;
    let CTISC = isc * 1.0138;
    let PmaxCorrigida = (num4 * 0.8934) / 1000;
    let QM = PotenciaPicoReal / PmaxCorrigida;
    let resultadoQM = Math.ceil(QM);
    let QSmin = num5 / vmp;
    let resultadoQSmin = Math.ceil(QSmin);
    let QSmax = num6 / CTVoc;
    let resultadoQSmax = Math.floor(QSmax);
    let QP = num7 / CTISC;
    let resultadoQP = Math.floor(QP);
    let DJ = num7 * 1.2;
    let resultadoDJ = Math.floor(DJ);
    let CC = num7 * 0.9;
    let resultadoCC = Math.floor(CC);

    // Verifica se os elementos foram encontrados antes de definir o 'textContent'
    if (!isNaN(resultadoQM)) {
        ModulosTotal.textContent = "Quantidade de Módulos em Série: " + resultadoQM + ' ' + 'Módulo(s)';
    }
    if (!isNaN(resultadoQSmax)) {
        ModulosSerieMax.textContent = "Quantidade Máxima de Módulos em Série: " + resultadoQSmax + ' ' + 'Módulo(s)';
    }
    if (!isNaN(resultadoQSmin)) {
        ModulosSerieMin.textContent = "Quantidade Mínima de Módulos em Série: " + resultadoQSmin + ' ' + 'Módulo(s)';
    }
    if (!isNaN(resultadoQP)) {
        ModulosParalelo.textContent = "Quantidade de Módulos em Paralelo: " + resultadoQP + ' ' + 'Módulo(s)';
    }
    if (!isNaN(resultadoCC)) {
        Fusivel.textContent = "Fusível (CC): " + resultadoCC + ' ' + '(A)';
    }
    if (!isNaN(resultadoDJ)) {
        Disjuntor.textContent = "Disjuntor (CA): " + resultadoDJ + ' ' + '(A)';
    } 

    if (isNaN(resultadoQM) || isNaN(resultadoQSmax) || isNaN(resultadoQSmin) || isNaN(resultadoQP) || isNaN(resultadoCC) || isNaN(resultadoDJ)) {
        alert("Preencha todos os campos corretamente");
    }
   
}
