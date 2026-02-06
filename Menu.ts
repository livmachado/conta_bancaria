import { Colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";

// Criar um objeto Global da Classe ContaController
const contas = new ContaController();

// Criar um array contendo os tipos de conta

const tipoContas = ["Conta Corrente", "Conta Poupança"];

export function main() {
  let option: number;

  criarContasTeste();

  while (true) {
    console.log(Colors.bg.white, Colors.fg.redstrong, "");
    console.log(" *****************************************************");
    console.log("                                                      ");
    console.log("                    BRADEZCO COM Z                    ");
    console.log("                                                      ");
    console.log(" *****************************************************");
    console.log("                                                      ");
    console.log("             1 - Criar Conta                          ");
    console.log("             2 - Listar todas as Contas               ");
    console.log("             3 - Buscar Conta por Numero              ");
    console.log("             4 - Atualizar Dados da Conta             ");
    console.log("             5 - Apagar Conta                         ");
    console.log("             6 - Sacar                                ");
    console.log("             7 - Depositar                            ");
    console.log("             8 - Transferir valores entre Contas      ");
    console.log("             9 - Sair                                 ");
    console.log("                                                      ");
    console.log(" *****************************************************");
    console.log(
      "                                                     ",
      Colors.reset,
    );

    console.log("Entre com a opção desejada: ");
    option = Input.questionInt("");

    if (option === 9) {
      console.log(Colors.fg.redstrong, "\nBradezco - Você em primeiro");
      about();
      console.log(Colors.reset, "");
      process.exit(0);
    }

    switch (option) {
      case 1:
        console.log(Colors.fg.redstrong, "\n\nCriar Conta\n\n", Colors.reset);
        criarConta();
        keyPress();

        break;
      case 2:
        console.log(
          Colors.fg.redstrong,
          "\n\nListar todas as Contas\n\n",
          Colors.reset,
        );
        contas.listarTodas();
        keyPress();

        break;
      case 3:
        console.log(
          Colors.fg.redstrong,
          "\n\nConsultar dados da Conta - por número\n\n",
          Colors.reset,
        );
        buscarContaPorNumero();
        keyPress();

        break;
      case 4:
        console.log(
          Colors.fg.redstrong,
          "\n\nAtualizar dados da Conta\n\n",
          Colors.reset,
        );
        atualizarConta()
        keyPress();
        break;
      case 5:
        console.log(
          Colors.fg.redstrong,
          "\n\nApagar uma Conta\n\n",
          Colors.reset,
        );
        deletarContaPorNumero();
        keyPress();

        break;
      case 6:
        console.log(Colors.fg.redstrong, "\n\nSaque\n\n");
        console.log(Colors.reset, "");
        keyPress();

        break;
      case 7:
        console.log(Colors.fg.redstrong, "\n\nDepósito\n\n");
        console.log(Colors.reset, "");
        keyPress();

        break;
      case 8:
        console.log(Colors.fg.redstrong, "\n\nTransferência entre Contas\n\n");
        console.log(Colors.reset, "");
        keyPress();

        break;
      default:
        console.log(Colors.fg.redstrong, "\nOpção Inválida!\n");
        console.log(Colors.reset, "");

        break;
    }
  }
}

// Opção 1: Criar uma nova conta

function criarConta() {
  console.log("Digite o número da agência:");
  const agencia = Input.questionInt("");

  console.log("Digite o nome do titular:");
  const titular = Input.question("");

  console.log("Digite o saldo da conta:");
  const saldo = Input.questionFloat("");

  console.log("Selecione o tipo da conta:");
  const tipo = Input.keyInSelect(tipoContas, "", { cancel: false });

  switch (tipo) {
    case 1:
      console.log("Digite o limite da conta: ");
      const limite = Input.questionFloat("");
      contas.cadastrar(
        new ContaCorrente(
          contas.gerarNumero(),
          agencia,
          titular,
          tipo,
          saldo,
          limite,
        ),
      );
      break;

    case 2:
      console.log("Digite o dia do aniversário da conta:");
      const aniversario = Input.questionInt("");
      contas.cadastrar(
        new ContaPoupanca(
          contas.gerarNumero(),
          agencia,
          titular,
          tipo,
          saldo,
          aniversario,
        ),
      );
      break;
  }
}

//Opção 3 : Procurar uma Conta pelo número

function buscarContaPorNumero(): void {
  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  contas.procurarPorNumero(numero);
}

//Opção 4 : Atualizar uma Conta

function atualizarConta(): void {
  console.log("Digite o número da conta ");
  const numero = Input.questionInt("");

  const conta = contas.buscarNoArray(numero);

  if (conta !== null) {
    let agencia: number = conta.agencia;
    let titular: string = conta.titular;
    const tipo: number = conta.tipo;
    let saldo: number = conta.saldo;

    //Atualização da agencia

    console.log(`\nAgência Atual: ${agencia}`);
    console.log(`Digite o número da nova Agência`);
    console.log(`(Pressione ENTER para manter o valor atual)`);
    let entrada = Input.question("");
    agencia = entrada.trim() === "" ? agencia : parseInt(entrada);

    //Atualização da titular

    console.log(`\nNome atual do titular: ${titular}`);
    console.log(`Digite o novo nome do titular`);
    console.log(`(Pressione ENTER para manter o valor atual)`);
    entrada = Input.question("");
    titular = entrada.trim() === "" ? titular : entrada;

    //Atualização do saldo

    console.log(`\nSaldo Atual: ${saldo}`);
    console.log(`Digite o novo saldo`);
    console.log(`(Pressione ENTER para manter o valor atual)`);
    entrada = Input.question("");
    saldo = entrada.trim() === "" ? saldo : parseFloat(entrada.replace(",", "."));

    switch (tipo) {
      case 1: {
        let limite: number = (conta as ContaCorrente).limite;
        console.log(`\nLimite Atual: ${limite}`);
        console.log(`Digite o novo Limite`);
        console.log(`(Pressione ENTER para manter o valor atual)`);
        entrada = Input.question("");
        limite =
          entrada.trim() === ""
            ? limite
            : parseFloat(entrada.replace(",", "."));

        contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));

        break;

      } case 2: {
          let aniversario : number= (conta as ContaPoupanca).aniversario;
          console.log(`\nDia do aniversário Atual: ${aniversario}`);
          console.log(`Digite o novo dia do aniversario`);
          console.log(`(Pressione ENTER para manter o valor atual)`);
          entrada = Input.question("");
          aniversario = entrada.trim() === "" ? aniversario : parseInt(entrada);

          contas.atualizar(new ContaPoupanca (
            numero,agencia, titular, tipo, saldo, aniversario))
          break;
      }
    }

  } else {
    console.log("A conta não existe");
  }
}

//Opção 5 : Deletar uma Conta

function deletarContaPorNumero(): void {
  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  contas.deletar(numero);
}

// /* Função com os dados da pessoa desenvolvedora */
function about(): void {
  console.log("\n*****************************************************");
  console.log("Projeto Desenvolvido por: ");
  console.log("Lívia Machado Campos - liviamcampos98@gmail.com");
  console.log("github.com/livmachado");
  console.log("*****************************************************");
}

/* Função de pausa entre as opções do menu */
function keyPress(): void {
  console.log(Colors.reset, "\nPressione enter para continuar...");
  Input.prompt();
}

function criarContasTeste(): void {
  // Instâncias da Classe ContaCorrente
  contas.cadastrar(
    new ContaCorrente(
      contas.gerarNumero(),
      1234,
      "Amanda Magro",
      1,
      1000000.0,
      100000.0,
    ),
  );
  contas.cadastrar(
    new ContaCorrente(
      contas.gerarNumero(),
      4578,
      "João da Silva",
      1,
      1000.0,
      100.0,
    ),
  );

  // Instâncias da Classe ContaPoupança
  contas.cadastrar(
    new ContaPoupanca(
      contas.gerarNumero(),
      5789,
      "Geana Almeida",
      2,
      10000,
      10,
    ),
  );
  contas.cadastrar(
    new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15),
  );
}

main();
