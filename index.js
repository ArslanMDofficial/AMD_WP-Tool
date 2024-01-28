const opn = require("opn")
const gerator = require('./src/menugenerate')

const malito=require('./src/malito')
const ownner = { user: "+55 21984191603" }
const ascii= require('./src/ascii')
const readline=require('readline-sync')

 async function main() {
    console.log(ascii.logo())  
    console.log(ascii.menu())
        let comand = readline.question('comando: ')
        switch (comand) {
            case '1':
                let number = readline.question("numero: ")
                await opn(`https://wa.me/${number}`)
                console.clear()
                main()
            case '2':
              
                let title = readline.question("titulo: ")
                let rules = []
                let key = 1
                while (key == 1) {
                    console.log("☢ adicionar nova regra? ☢\n[1]-sim\n[0]-não")
                    key = readline.question("comando: ")
                    if (key == 1) {
                        let rule = readline.question("escreva a regra: ")
                        rules.push(rule)
                        console.log(' \u001b[32m regra adicionada \u001b[0m')
                    } else {
                        key = 0
                        console.clear()
                    }
                }
                console.clear()
                 const rulex= await gerator.genemenu(title, rules)
                let alvin=readline.question('numero para enviar: ')
                await opn(`https://api.whatsapp.com/send?phone=${alvin}&text=${rulex}`)
               
                rules.splice(0, rules.length)
                await main()
                break;
            case '3':
                let aviso=readline.question("digite o aviso: ")
                let alvintwo=readline.question('numero para enviar: ')
                let avisopronto=gerator.aviso(aviso)
                await opn(`https://api.whatsapp.com/send?phone=${alvintwo}&text=${avisopronto}`)
    
                await main()
            break
            case '4':
            console.clear()
            console.log(ascii.aviso('recurso criado para desativar/denúnciar numeros fakes. Não me responsabilizo por uso indevido.'))
             let numb=readline.question("numero: ")
              await  malito.desativar(numb)
              main()
            break
            case '5':
                console.clear()
              console.log(ascii.aviso('texto padrão base criado pelo \033[41;1;37m Negritodroid \033[0m  \u001b[31m'))
                let numbtwo=readline.question("numero: ")
                  await  malito.desbanir(numbtwo)
                  main()
                break
    
            case '9':
                let me = ownner.user
                let strig = 'gostei do seu bot man! retaliação domina!'
                await opn(`https://api.whatsapp.com/send?phone=${me}&text=${strig}`)
                console.clear()
                main()
                break;
            case '0':
                console.log("bye")
            break
            default:
                console.clear()
                console.log("\n comando inválido!\n")
               await main()
            break
        }
    }

main()