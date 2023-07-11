const calcularBtn = document.getElementById('btn');
calcularBtn.addEventListener("click", Calcular);

function Calcular() {
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
  let PotInversorMax = EnergiaMediaMensal / 0.5;
  let EficienciaInversor = EnergiaDiaria / 0.9;
  let EnergiaReal = EficienciaInversor / 0.89;
  let CapacidadeBanco = (EnergiaReal * 3) / TensaoSistema;
  let CapacidadeReal = CapacidadeBanco / 0.6;
  let BateriasSerie = TensaoSistema / TensaoBateria;
  let BateriaParalelo = CapacidadeReal / CapacidadeSistema;
  let TotalBaterias = BateriasSerie * BateriaParalelo;
  let CorrentePainel = EnergiaReal / TensaoSistema;
  let CoeficientePMax = Temperatura * (PMAX);
  let RC = (100 - CoeficientePMax) / 100;
  let QuantidadeModulosSerie = TensaoSistema / TensaoModulo;
  let QuantidadeModulosParalelo = CorrentePainel / (RC * IMP * HSP);
  let QuantidadeModulosTotal = QuantidadeModulosParalelo * QuantidadeModulosSerie;
  let ISCTotal = ISC * QuantidadeModulosParalelo;
  let CorrenteControlador = ISCTotal * 1.25;
  let CapacidadeDisjuntor = CorrenteControlador * 1.2;


  // Captura os Dados
  const ModulosTotal = document.getElementById('MT');
  const ModulosSerie = document.getElementById('MS');
  const ModulosParalelo = document.getElementById('MP');
  const Disjuntor = document.getElementById('CA');
  const PotenciaInversor = document.getElementById('Pot-Inversor');
  const CapacidadeBateria = document.getElementById('Ah');
  const NumeroBateriasSerie = document.getElementById('BS');
  const NumeroBateriasParalelo = document.getElementById('BP');
  const NumeroTotalBaterias = document.getElementById('NB');
  const CorrenteTotalPainel = document.getElementById('Corrente-Painel');
  const CorrenteTotalControlador = document.getElementById('Corrente-Controlador');

  // Insere o Texto no HTML
  if (!isNaN(QuantidadeModulosTotal)) {
    ModulosTotal.textContent = "Quantidade de Módulos Total: " + QuantidadeModulosTotal;
  }

  if (!isNaN(QuantidadeModulosSerie)) {
    ModulosSerie.textContent = "Quantidade de Módulos em Série: " + QuantidadeModulosSerie;
  }

  if (!isNaN(QuantidadeModulosParalelo)) {
    ModulosParalelo.textContent = "Quantidade de Módulos em Paralelo: " + QuantidadeModulosParalelo;
  }

  if (!isNaN(CapacidadeDisjuntor)) {
    Disjuntor.textContent = "Disjuntor (A): " + CapacidadeDisjuntor;
  }

  if (!isNaN(PotInversorMin) && !isNaN(PotInversorMax)) {
    PotenciaInversor.textContent = "A Potência do Inversor deve ser entre: " + PotInversorMin + " e " + PotInversorMax;
  }


  if (!isNaN(BateriasSerie)) {
    NumeroBateriasSerie.textContent = "A Quantidade de Baterias em Série é de: " + BateriasSerie;
  }

  if (!isNaN(BateriaParalelo)) {
    NumeroBateriasParalelo.textContent = "A Quantidade de Baterias em Paralelo é de: " + BateriaParalelo;
  }

  if (!isNaN(TotalBaterias)) {
    NumeroTotalBaterias.textContent = "A Quantidade Total de Baterias é de: " + TotalBaterias;
  }

  if (!isNaN(CorrentePainel)) {
    CorrenteTotalPainel.textContent = "A Corrente Total do Painel é de: " + CorrentePainel;
  }

  if (!isNaN(CorrenteControlador)) {
    CorrenteTotalControlador.textContent = "A Corrente do Controlador é: " + CorrenteControlador;
  }
}
