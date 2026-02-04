import input from "readline-sync";
import { colors } from './src/util/Colors';

export function main() {

    let option: number;

    while (true) {
        
        console.log(colors.bg.black, colors.fg.redstrong, 
                    "****************************************************");
        console.log("                                                     ");
        console.log("                   BRADEZCO COM Z                    ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                    ",
        colors.reset);

        console.log("Entre com a opção desejada: ");
        option = input.questionInt("");

        if (option === 9) {
            console.log(colors.fg.redstrong, "\nBradezco - Você primeiro");
            about();
            console.log(colors.reset,"")
            process.exit(0);
        }

        switch (option) {
            case 1:
                console.log(colors.fg.redstrong, "\n\nCriar Conta\n\n");
                console.log(colors.reset,"")

                break;
            case 2:
                console.log(colors.fg.redstrong, "\n\nListar todas as Contas\n\n");
                console.log(colors.reset,"")

                break;
            case 3:
                console.log(colors.fg.redstrong, "\n\nConsultar dados da Conta - por número\n\n");
                console.log(colors.reset,"")

                break;
            case 4:
                console.log(colors.fg.redstrong, "\n\nAtualizar dados da Conta\n\n");
                console.log(colors.reset,"")
                break;
            case 5:
                console.log(colors.fg.redstrong, "\n\nApagar uma Conta\n\n");
                console.log(colors.reset,"")

                break;
            case 6:
                console.log(colors.fg.redstrong, "\n\nSaque\n\n");
                console.log(colors.reset,"")

                break;
            case 7:
                console.log(colors.fg.redstrong, "\n\nDepósito\n\n");
                console.log(colors.reset,"")

                break;
            case 8:
                console.log(colors.fg.redstrong, "\n\nTransferência entre Contas\n\n");
                console.log(colors.reset,"")

                break;
            default:
                console.log(colors.fg.redstrong, "\nOpção Inválida!\n");
                console.log(colors.reset,"")

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


main();
