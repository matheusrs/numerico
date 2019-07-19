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
        const funcao = math.rationalize(fn.toString(), {}, true)
        input_fn.value = math.simplify(funcao.expression.toString()).toString()
    }    
}
btnRationalize.addEventListener('click', rationalize)
//#########################################################
var slider = document.querySelector("#margem_erro")
var updateLabel = function (e) {
    var labelEps = document.querySelector("#labelEps")
    const eps = math.bignumber(math.pow(10, -e.target.value))
    labelEps.value = math.evaluate(eps.toString())
}
slider.addEventListener('input', updateLabel)
//#########################################################
var btn = document.querySelector("#btnProcess")
var interval = null;
var evaluate = function (fn, x) {
    const scope = { x: math.bignumber(x), ...constants }
    return math.bignumber(math.evaluate(fn, scope))
}
var submit = function () {
    btnProcess.classList.add('is-loading')
    var dados_y = []
    var dados_x = []

    var input_fn = document.querySelector("#function_x")
    if (!input_fn.value) {
        return alert('Insira uma função válida')
    }
    var fn = input_fn.value

    var input_x0 = document.querySelector("#point_x0")
    if (!input_x0.value) {
        return alert('Insira um valor válido para x0')
    }
    var xn = math.bignumber(input_x0.value)

    var input_x1 = document.querySelector("#point_x1")
    if (!input_x1.value) {
        return alert('Insira um valor válido para x1')
    }
    var xn1 = math.bignumber(input_x1.value)

    var nTimes = document.querySelector("#n_times")
    if (!nTimes.value) {
        return alert('N inválido')
    }
    var n_times = nTimes.value

    var input_eps = document.querySelector("#labelEps")
    const eps = math.bignumber(input_eps.value)

    // valor da função
    // f(x(n))
    var fxn = evaluate(fn, xn)
    // f(x(n+1))
    var fxn1 = evaluate(fn, xn1)
    let n = 0
    while (Math.abs(evaluate(fn, fxn1)) > eps && n < n_times) {
        var x = math.bignumber(math.evaluate('xn - fxn*((xn1 - xn)/(fxn1 - fxn))', { fxn, fxn1, xn, xn1 }))
        xn = xn1
        xn1 = x
        dados_x.push(n)
        dados_y.push(xn)
        chart.updateOptions({
            series: [{
                name: 'f(x)',
                data: dados_y
            }],
            xaxis: {
                n: dados_x
            }
        })
        fxn = evaluate(fn, xn)
        fxn1 = evaluate(fn, xn1)
        n += 1
    }
    console.log(xn.toString())
    btnProcess.classList.remove('is-loading')
}
btn.addEventListener("click", submit);