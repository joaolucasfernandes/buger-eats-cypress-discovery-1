import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {  

    it('User should be a deliver', function () {

        var deliver = signupFactory.deliver()

        SignupPage.go()
        //signup.fillForm(this.deliver.signup)
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)
       
    })

    it('Invalid document', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '123456789GG'

        SignupPage.go()        
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')

    })
 
    it('Invalid email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'edi.andrian.com.br'

        SignupPage.go()        
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })
        
        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)  
            })

        })

    })
})

