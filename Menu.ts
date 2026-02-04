import { Colors } from './src/util/Colors';
import { Input } from "./src/util/Input";
import { Conta } from "./src/model/Conta";

export function main() {

    let option: number;

    //Instanciar Objetos da Classe Conta

    const c1 = new Conta(1, 1234, "Sofia", 1, 100000.00)
    // Testes do Método Sacar
    console.log("Sacar 100,00: ", c1.sacar(100.00));
    console.log("Sacar 200000.00: ", c1.sacar(200000.00));
    console.log("Sacar 0.00: ", c1.sacar(0.00));

    // Testes do Método Depositar
    console.log("Depositar -10.00: ");
    c1.depositar(-10.00);

    console.log("Depositar 500.00: ");
    c1.depositar(500.00);

    c1.visualizar();
    

    while (true) {
        
        console.log(Colors.bg.white, Colors.fg.redstrong, 
                    "");
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
        console.log("                                                     ",
        Colors.reset);

        console.log("Entre com a opção desejada: ");
        option = Input.questionInt("");

        if (option === 9) {
            console.log(Colors.fg.redstrong, "\nBradezco - Você em primeiro");
            about();
            console.log(Colors.reset,"")
            process.exit(0);
        }

        switch (option) {
            case 1:
                console.log(Colors.fg.redstrong, "\n\nCriar Conta\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 2:
                console.log(Colors.fg.redstrong, "\n\nListar todas as Contas\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 3:
                console.log(Colors.fg.redstrong, "\n\nConsultar dados da Conta - por número\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 4:
                console.log(Colors.fg.redstrong, "\n\nAtualizar dados da Conta\n\n");
                console.log(Colors.reset,"")
                keyPress()
                break;
            case 5:
                console.log(Colors.fg.redstrong, "\n\nApagar uma Conta\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 6:
                console.log(Colors.fg.redstrong, "\n\nSaque\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 7:
                console.log(Colors.fg.redstrong, "\n\nDepósito\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            case 8:
                console.log(Colors.fg.redstrong, "\n\nTransferência entre Contas\n\n");
                console.log(Colors.reset,"")
                keyPress()

                break;
            default:
                console.log(Colors.fg.redstrong, "\nOpção Inválida!\n");
                console.log(Colors.reset,"")

                break;
        }
    }

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
    console.log(Colors.reset,"\nPressione enter para continuar...");
    Input.prompt();
}
 

main();
