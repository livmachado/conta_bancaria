import { Colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { formatarMoeda } from "./src/util/Currency";

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
    console.log("             9 - Buscar Conta por Nome do Titular     ");
    console.log("             0 - Sair                                 ");
    console.log("                                                      ");
    console.log(" *****************************************************");
    console.log(
      "                                                     ",
      Colors.reset,
    );

    console.log("Entre com a opção desejada: ");
    option = Input.questionInt("");

    if (option === 0) {
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
        listarTodasContas()
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
        sacar();
        keyPress();

        break;
      case 7:
        console.log(Colors.fg.redstrong, "\n\nDepósito\n\n");
        console.log(Colors.reset, "");
        depositar();
        keyPress();

        break;
      case 8:
        console.log(Colors.fg.redstrong, "\n\nTransferência entre Contas\n\n");
        console.log(Colors.reset, "");
        transferir();
        keyPress();

        break;
      case 9: 
        console.log(Colors.fg.whitestrong, "\n\nProcurar Conta por Nome do Titular\n\n", Colors.reset);

        procurarPorTitular();

        keyPress()
        break;
      default:
        console.log(Colors.fg.redstrong, "\nOpção Inválida!\n");
        console.log(Colors.reset, "");

        break;
    }
  }
}

// Opção 1: Criar uma nova conta

function criarConta(){

    console.log("Digite o número da agência: ")
    const agencia = Input.questionInt("");

    console.log("Digite o nome do titular: ")
    const titular = Input.question("");

    console.log("Selecione o tipo da conta: ")
    const tipo = Input.keyInSelect(tipoContas, "", { cancel: false}) + 1;

    console.log("Digite o saldo da conta: ")
    const saldo = Input.questionFloat("");

    switch(tipo){
        case 1: // Cria um objeto da classe Conta Corrente
            console.log("Digite o limite da conta: ");
            const limite = Input.questionFloat("");
            contas.cadastrar(new ContaCorrente(
                contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
        break;

        case 2: // Cria um objeto da classe Conta Poupança
            console.log("Digite o dia do aniversário da conta: ");
            const aniversario = Input.questionInt("");
            contas.cadastrar(new ContaPoupanca(
                contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));
        break;

    }

}

function listarTodasContas(): void{
    contas.listarTodas();
}

//Opção 3 : Procurar uma Conta pelo número

function buscarContaPorNumero(): void {
  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  contas.procurarPorNumero(numero);
}

//Opção 4 : Atualizar uma Conta

function atualizarConta(): void{

    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");


    const conta = contas.buscarNoArray(numero);

    if (conta !== null) {

        let agencia: number = conta.agencia;
        let titular: string = conta.titular;
        const tipo: number = conta.tipo;
        let saldo: number = conta.saldo;

        console.log(`\nAgência atual: ${agencia}`);
        console.log("Digite o novo número da agência: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        agencia = Input.questionInt("", { defaultInput: agencia });

        // Atualização da Titular
        console.log(`\nTitular atual: ${titular}`);
        console.log("Digite o novo nome do titular: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        titular = Input.question("", { defaultInput: titular });

        // Atualização do Saldo
        console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);
        console.log("Digite o valor do novo saldo: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        saldo = Input.questionFloat("", { defaultInput: saldo });

        // Atualização do Tipo
        switch(tipo){
            case 1: 
                let limite: number = (conta as ContaCorrente).limite;

                // Atualização do Limite
                console.log(`\nLimite atual: ${formatarMoeda(limite)}`);
                console.log("Digite o valor do novo limite: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                limite = Input.questionFloat("", { defaultInput: limite });

                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
            break;

            case 2: // Conta Poupança
                    
                let aniversario: number = (conta as ContaPoupanca).aniversario;

                // Atualização do Aniversário
                console.log(`\nAniversário Atual: ${aniversario}`);
                console.log("Digite o novo dia do aniversário: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                aniversario = Input.questionInt("", { defaultInput: aniversario });

                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, aniversario));

            break;
        }

    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }
}

//Opção 5 : Deletar uma Conta

function deletarContaPorNumero(): void{

    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    

    const conta = contas.buscarNoArray(numero);


    if(conta !== null){
        
        console.log(Colors.fg.whitestrong, 
            `\nTem certeza que deseja deletar a conta número ${numero} [y/n]?`, Colors.reset);
        const confirma = Input.keyInYNStrict("");


        if (confirma)
            contas.deletar(numero);
        else
            console.log(Colors.fg.red,"\nOperação cancelada!", Colors.reset);
    

    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }

}

function sacar(): void{

    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    
    const conta = contas.buscarNoArray(numero);

    if(conta !== null){
        console.log("Digite o valor do saque: ");
        const valor = Input.questionFloat("");

        contas.sacar(numero, valor);
    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }
}

function depositar(): void{

    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    
    const conta = contas.buscarNoArray(numero);

    if(conta !== null){
        console.log("Digite o valor do depósito: ");
        const valor = Input.questionFloat("");

        contas.depositar(numero, valor);
    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }
}

function transferir(): void{

    console.log("Digite o número da Conta de Origem: ");
    const numeroOrigem = Input.questionInt("");
    
    console.log("Digite o número da Conta de Destino: ");
    const numeroDestino = Input.questionInt("");

    const contaOrigem = contas.buscarNoArray(numeroOrigem);
    const contaDestino = contas.buscarNoArray(numeroDestino);

    if(contaOrigem === null){

        console.log(Colors.fg.red, `A Conta de Origem número ${numeroOrigem} não foi encontrada!`, Colors.reset);

    }else if(contaDestino === null)    {

        console.log(Colors.fg.red, `A Conta de Destino número ${numeroDestino} não foi encontrada!`, Colors.reset);

    }else{
        console.log("Digite o valor da Transferência: ");
        const valor = Input.questionFloat("");

        contas.transferir(numeroOrigem, numeroDestino, valor);
    }
}

function procurarPorTitular(): void{

    // Solicita o nome do titular
    console.log("Digite o Nome do Titular: ");
    const titular = Input.question("");

    // Localiza a conta a partir do nome do titular
    contas.procurarPorTitular(titular);
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

function criarContasTeste(): void{
    
    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1,  1000.00, 100.00));

    // Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));

}

main();
