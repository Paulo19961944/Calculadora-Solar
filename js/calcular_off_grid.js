const calcularBtn = document.getElementById('btn');
const MPPT = document.getElementById("MPPT");
const NOMPPT = document.getElementById('NOMPPT');

calcularBtn.addEventListener("click", Check);

function Check(){

if(MPPT.checked){
  CalcularMPPT()
}

else if (NOMPPT.checked){
  CalcularNOMPPT()
}

else{
  alert("Selecione apenas uma das opções.")
}

}

function CalcularMPPT() {
  // Captura Dados de Entrada
  const EnergiaMediaMensal = parseFloat(document.getElementById('p').value.replace(",", "."));
  const EnergiaDiaria = parseFloat(document.getElementById('ed').value);
  const HSP = parseFloat(document.getElementById('hsp').value.replace(",", "."));
  const TensaoSistema = parseFloat(document.getElementById('v').value.replace(",", "."));
  const TensaoBateria = parseFloat(document.getElementById('bateria').value.replace(",", "."));
  const CapacidadeSistema = parseFloat(document.getElementById('Ah').value.replace(",", "."))
  const TensaoModulo = parseFloat(document.getElementById('vm').value.replace(",", "."));
  const Temperatura = parseFloat(document.getElementById('temp').value.replace(",", "."));
  const IMP = parseFloat(document.getElementById('imp').value.replace(",", "."));
  const ISC = parseFloat(document.getElementById('isc').value.replace(",", "."));
  const PMAX = parseFloat(document.getElementById('pmax').value.replace(",", "."));
  const SemMPPT = document.getElementById('NOMPPT').checked;

  // Faz o Cálculo
  let PotInversorMin = EnergiaMediaMensal / 0.7;
  let ResultadoPotInversorMin = Math.ceil(PotInversorMin)
  let PotInversorMax = EnergiaMediaMensal / 0.5;
  let ResultadoPotInversorMax = Math.floor(PotInversorMax)
  let EficienciaInversor = EnergiaDiaria / 0.9;
  let EnergiaReal = EficienciaInversor / 0.89;
  let CapacidadeBanco = (EnergiaReal * 3) / TensaoSistema;
  let CapacidadeReal = CapacidadeBanco / 0.6;
  let BateriasSerie = TensaoSistema / TensaoBateria;
  let ResultadoBateriasSerie = Math.ceil(BateriasSerie)
  let BateriaParalelo = CapacidadeReal / CapacidadeSistema;
  let ResultadoBateriasParalelo = Math.floor(BateriaParalelo);
  
  // Verifica se o resultado é menor que 1 e atribui 1 caso seja
  if (ResultadoBateriasParalelo < 1) {
    ResultadoBateriasParalelo = 1;
  }
  
  let TotalBaterias = ResultadoBateriasSerie * ResultadoBateriasParalelo;
  let CorrentePainel = EnergiaReal / TensaoSistema;
  let ResultadoPainel = Math.ceil(CorrentePainel)
  let CoeficientePMax = Temperatura * (PMAX);
  let RC = (100 + CoeficientePMax) / 100;
  let QuantidadeModulosSerie = TensaoSistema / TensaoModulo;
  let ResultadoModulosSerie = Math.ceil(QuantidadeModulosSerie);
  let QuantidadeModulosParalelo = CorrentePainel / (RC * IMP * HSP);
  let ResultadoModulosParalelo = Math.floor(QuantidadeModulosParalelo);
  let QuantidadeModulosTotal = QuantidadeModulosParalelo * QuantidadeModulosSerie;
  let ResultadoModulosTotal = Math.floor(QuantidadeModulosTotal);
  let ISCTotal = ISC * QuantidadeModulosParalelo;
  let CorrenteControlador = ISCTotal * 1.25;
  let ResultadoControlador = Math.ceil(CorrenteControlador)
  let CapacidadeDisjuntor = CorrenteControlador * 1.2;
  let ResultadoDisjuntor = Math.floor(CapacidadeDisjuntor);


  // Captura os Dados
  const ModulosTotal = document.getElementById('MT');
  const ModulosSerie = document.getElementById('MS');
  const ModulosParalelo = document.getElementById('MP');
  const Disjuntor = document.getElementById('CA');
  const PotenciaInversor = document.getElementById('Pot-Inversor');
  const NumeroBateriasSerie = document.getElementById('BS');
  const NumeroBateriasParalelo = document.getElementById('BP');
  const NumeroTotalBaterias = document.getElementById('NB');
  const CorrenteTotalPainel = document.getElementById('Corrente-Painel');
  const CorrenteTotalControlador = document.getElementById('Corrente-Controlador');

  // Insere o Texto no HTML
  if (!isNaN(QuantidadeModulosTotal)) {
    ModulosTotal.textContent = "Quantidade de Módulos Total: " + ResultadoModulosTotal;
  }

  if (!isNaN(QuantidadeModulosSerie)) {
    ModulosSerie.textContent = "Quantidade de Módulos em Série: " + ResultadoModulosSerie;
  }

  if (!isNaN(QuantidadeModulosParalelo)) {
    ModulosParalelo.textContent = "Quantidade de Módulos em Paralelo: " + ResultadoModulosParalelo;
  }

  if (!isNaN(CapacidadeDisjuntor)) {
    Disjuntor.textContent = "Disjuntor (A): " + ResultadoDisjuntor;
  }

  if (!isNaN(PotInversorMin) && !isNaN(PotInversorMax)) {
    PotenciaInversor.textContent = "A Potência do Inversor deve ser entre: " + ResultadoPotInversorMin + " e " + ResultadoPotInversorMax;
  }


  if (!isNaN(BateriasSerie)) {
    NumeroBateriasSerie.textContent = "A Quantidade de Baterias em Série é de: " + ResultadoBateriasSerie;
  }

  if (!isNaN(BateriaParalelo)) {
    NumeroBateriasParalelo.textContent = "A Quantidade de Baterias em Paralelo é de: " + ResultadoBateriasParalelo;
  }

  if (!isNaN(TotalBaterias)) {
    NumeroTotalBaterias.textContent = "A Quantidade Total de Baterias é de: " + TotalBaterias;
  }

  if (!isNaN(CorrentePainel)) {
    CorrenteTotalPainel.textContent = "A Corrente Total do Painel é de: " + ResultadoPainel;
  }

  if (!isNaN(CorrenteControlador)) {
    CorrenteTotalControlador.textContent = "A Corrente do Controlador é: " + ResultadoControlador;
  }
}


function CalcularNOMPPT() {
  // Captura Dados de Entrada
  const EnergiaMediaMensal = parseFloat(document.getElementById('p').value.replace(",", "."));
  const EnergiaDiaria = parseFloat(document.getElementById('ed').value);
  const HSP = parseFloat(document.getElementById('hsp').value.replace(",", "."));
  const TensaoSistema = parseFloat(document.getElementById('v').value.replace(",", "."));
  const TensaoBateria = parseFloat(document.getElementById('bateria').value.replace(",", "."));
  const CapacidadeSistema = parseFloat(document.getElementById('Ah').value.replace(",", "."))
  const TensaoModulo = parseFloat(document.getElementById('vm').value.replace(",", "."));
  const Temperatura = parseFloat(document.getElementById('temp').value.replace(",", "."));
  const IMP = parseFloat(document.getElementById('imp').value.replace(",", "."));
  const ISC = parseFloat(document.getElementById('isc').value.replace(",", "."));
  const PMAX = parseFloat(document.getElementById('pmax').value.replace(",", "."));

  // Faz o Cálculo
  let PotInversorMin = EnergiaMediaMensal / 0.7;
  let ResultadoPotInversorMin = Math.ceil(PotInversorMin)
  let PotInversorMax = EnergiaMediaMensal / 0.5;
  let ResultadoPotInversorMax = Math.floor(PotInversorMax)
  let EficienciaInversor = EnergiaDiaria / 0.9;
  let EnergiaReal = (EficienciaInversor / 0.89) / 0.9;
  let CapacidadeBanco = (EnergiaReal * 3) / TensaoSistema;
  let CapacidadeReal = CapacidadeBanco / 0.6;
  let BateriasSerie = TensaoSistema / TensaoBateria;
  let ResultadoBateriasSerie = Math.ceil(BateriasSerie)
  let BateriaParalelo = CapacidadeReal / CapacidadeSistema;
  let ResultadoBateriasParalelo = Math.floor(BateriaParalelo);
  
  // Verifica se o resultado é menor que 1 e atribui 1 caso seja
  if (ResultadoBateriasParalelo < 1) {
    ResultadoBateriasParalelo = 1;
  }
  
  let TotalBaterias = ResultadoBateriasSerie * ResultadoBateriasParalelo;
  let CorrentePainel = EnergiaReal / TensaoSistema;
  let ResultadoPainel = Math.ceil(CorrentePainel)
  let CoeficientePMax = Temperatura * (PMAX);
  let RC = (100 + CoeficientePMax) / 100;
  let QuantidadeModulosSerie = TensaoSistema / TensaoModulo;
  let ResultadoModulosSerie = Math.ceil(QuantidadeModulosSerie);
  let QuantidadeModulosParalelo = CorrentePainel / (RC * IMP * HSP);
  let ResultadoModulosParalelo = Math.floor(QuantidadeModulosParalelo);
  let QuantidadeModulosTotal = QuantidadeModulosParalelo * QuantidadeModulosSerie;
  let ResultadoModulosTotal = Math.floor(QuantidadeModulosTotal);
  let ISCTotal = ISC * ResultadoModulosParalelo;
  let CorrenteControlador = ISCTotal * 1.25;
  let ResultadoControlador = Math.ceil(CorrenteControlador)
  let CapacidadeDisjuntor = CorrenteControlador * 1.2;
  let ResultadoDisjuntor = Math.floor(CapacidadeDisjuntor);


  // Captura os Dados
  const ModulosTotal = document.getElementById('MT');
  const ModulosSerie = document.getElementById('MS');
  const ModulosParalelo = document.getElementById('MP');
  const Disjuntor = document.getElementById('CA');
  const PotenciaInversor = document.getElementById('Pot-Inversor');
  const NumeroBateriasSerie = document.getElementById('BS');
  const NumeroBateriasParalelo = document.getElementById('BP');
  const NumeroTotalBaterias = document.getElementById('NB');
  const CorrenteTotalPainel = document.getElementById('Corrente-Painel');
  const CorrenteTotalControlador = document.getElementById('Corrente-Controlador');

  // Insere o Texto no HTML
  if (!isNaN(QuantidadeModulosTotal)) {
    ModulosTotal.textContent = "Quantidade de Módulos Total: " + ResultadoModulosTotal;
  }

  if (!isNaN(QuantidadeModulosSerie)) {
    ModulosSerie.textContent = "Quantidade de Módulos em Série: " + ResultadoModulosSerie;
  }

  if (!isNaN(QuantidadeModulosParalelo)) {
    ModulosParalelo.textContent = "Quantidade de Módulos em Paralelo: " + ResultadoModulosParalelo;
  }

  if (!isNaN(CapacidadeDisjuntor)) {
    Disjuntor.textContent = "Disjuntor (A): " + ResultadoDisjuntor;
  }

  if (!isNaN(PotInversorMin) && !isNaN(PotInversorMax)) {
    PotenciaInversor.textContent = "A Potência do Inversor deve ser entre: " + ResultadoPotInversorMin + " e " + ResultadoPotInversorMax;
  }


  if (!isNaN(BateriasSerie)) {
    NumeroBateriasSerie.textContent = "A Quantidade de Baterias em Série é de: " + ResultadoBateriasSerie;
  }

  if (!isNaN(BateriaParalelo)) {
    NumeroBateriasParalelo.textContent = "A Quantidade de Baterias em Paralelo é de: " + ResultadoBateriasParalelo;
  }

  if (!isNaN(TotalBaterias)) {
    NumeroTotalBaterias.textContent = "A Quantidade Total de Baterias é de: " + TotalBaterias;
  }

  if (!isNaN(CorrentePainel)) {
    CorrenteTotalPainel.textContent = "A Corrente Total do Painel é de: " + ResultadoPainel;
  }

  if (!isNaN(CorrenteControlador)) {
    CorrenteTotalControlador.textContent = "A Corrente do Controlador é: " + ResultadoControlador;
  }
}
