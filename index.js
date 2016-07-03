let rce = React.createElement.bind()
let rcc = React.createClass.bind()

let items = ['AC', 'CE', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', 'Ans', '=']

let total = rcc({
    getInitialState: function () {
        return {
            input: '',
            output: '',
            display: 'input'
        }
    },
    handleClick: function (e) {
        let patt = new RegExp('[-|0-9|/|*|+|.|%|]')
        let value = e.target.innerHTML
        let input = this.state.input
        if (patt.test(value)) {
            input += value
            this.setState({input: input, display: 'input'})
        }
        else if (value === '=') {
            let input = this.state.input
            if (input.length > 1) {
                let output = this.state.output
                output = eval(input)
                this.setState({
                    input: '',
                    output: output,
                    display: 'output'
                })    
            }
            
        }
        else if (value === 'AC') {
            this.setState({
                input: '',
                output: '',
                display: 'input'
            })
        }
        else if (value === 'CE') {
            let input = this.state.input
            if (input.length > 0) {
                input = input.slice(0, -1)
                this.setState({
                    input: input,
                    display: 'input'
                })
            }
        }
        else { // Ans
            let input = this.state.input
            let ans = this.state.output
            input += ans
            this.setState({
                input: input, 
                display: 'input'
            })
        }
        
    },
    render: function () {
        let list = items.map((value, index) => {
            return rce('div', {'key': 'items' + index, 'className': 'pure-u-1-4 buttonPanel'}, 
                       rce('div', {'className': 'myButton', 'onClick': this.handleClick}, value)
                   )
        })
        return rce('div', {'className': 'container'},
            rce('div', {'className': 'fcc'}, 'FreeCodeCamp Calculator'),
            rce('div', {'className': 'myScreen'}, this.state.display === 'input' ? this.state.input : this.state.output),
            rce('div', {'className': 'myPanel pure-g'}, 
                list
            )
            
        )
    }
})


ReactDOM.render(rce(total, null), document.getElementById('content'))