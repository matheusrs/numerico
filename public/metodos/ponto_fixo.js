const constants = {
    e: math.bignumber(math.e),
    pi: math.bignumber(math.pi),
}
//#########################################################
var btnRationalize = document.querySelector("#btnRationalize")
var rationalize = function () {
    var input_fn = document.querySelector("#function_x")
    var fn = input_fn.value
    if (input_fn.value.length > 0) {
        const funcao = math.rationalize(fn.toString(), constants, true)
        input_fn.value = math.simplify(funcao.expression.toString()).toString()
    }
}
btnRationalize.addEventListener('click', rationalize)
// var btnCancel = document.querySelector("#btnCancel")
// btnCancel.addEventListener('click', function () { })
//#########################################################
var slider = document.querySelector("#margem_erro")
var updateLabel = function (e) {
    var labelEps = document.querySelector("#labelEps")
    const eps = math.bignumber(math.pow(10, -e.target.value))
    labelEps.value = math.evaluate(eps.toString())
}
slider.addEventListener('input', updateLabel)
//#########################################################
// var btnClear = document.querySelector("#btnClear")
// var clear = function () {
//     chart.updateOptions({
//         series: [{
//             name: 'f(x)',
//             data: []
//         }],
//         xaxis: {
//             categories: []
//         }
//     })
// }
// btnClear.addEventListener('click', clear)
//#########################################################
var btn = document.querySelector("#btnProcess")
var interval = null;
var evaluate = function (fn, x) {
    const scope = { x: math.bignumber(x), ...constants }
    return math.bignumber(math.evaluate(fn, scope))
}
var submit = function () {
    var dados_y = []
    var dados_x = []

    var input_fn = document.querySelector("#function_x")
    if (!input_fn.value) {
        return alert('Insira uma função válida')
    }
    var fn = input_fn.value

    var input_pf = document.querySelector("#function_pf")
    if (!input_pf.value) {
        return alert('Insira uma função válida')
    }
    var pontoFixo = input_pf.value

    var input_a = document.querySelector("#point_a")
    if (!input_a.value) {
        return alert('Selecione o período inicial')
    }
    var a = math.bignumber(input_a.value)

    var input_b = document.querySelector("#point_b")
    if (!input_b.value) {
        return alert('Selecione o período final')
    }
    var b = math.bignumber(input_b.value)

    var nTimes = document.querySelector("#n_times")
    if (!nTimes.value) {
        return alert('n inválido')
    }
    var n_times = nTimes.value

    var input_eps = document.querySelector("#labelEps")
    const eps = math.bignumber(input_eps.value)

    var x = math.bignumber(math.evaluate('(a+b)/2', { a, b }))
    let n = 0
    
    while (Math.abs(evaluate(fn, x)) > eps && n < n_times) {
        x = evaluate(pontoFixo, x)
        dados_x.push(n)
        dados_y.push(x)
        chart.updateOptions({
            series: [{
                name: 'f(x)',
                data: dados_y
            }],
            xaxis: {
                n: dados_x
            }
        })
        n += 1
    }
    console.log(x.toString())
}
btn.addEventListener("click", submit);
