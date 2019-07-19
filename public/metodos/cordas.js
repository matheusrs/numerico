const constants = {
    e: math.bignumber(math.e),
    pi: math.bignumber(math.pi),
}
//#########################################################
var btnDerivate = document.querySelector("#btnDerivate")
var derivate = function () {
    var input_fn = document.querySelector("#function_x")
    var input_dfn = document.querySelector("#function_dx")
    var input_d2fn = document.querySelector("#function_d2x")
    //var inputLoading = document.querySelector("#input_function_x")
    //inputLoading.classList.add('is-loading')
    var fn = input_fn.value
    const derivada = math.derivative(fn.toString(), 'x')
    const derivada2 = math.derivative(derivada.toString(), 'x')
    input_dfn.value = derivada.toString()
    input_d2fn.value = derivada2.toString()
    //inputLoading.classList.remove('is-loading')
}
btnDerivate.addEventListener('click', derivate)
var btnDerivate2 = document.querySelector("#btnDerivate2")
btnDerivate2.addEventListener('click', derivate)
//#########################################################
var btnDerivate2 = document.querySelector("#btnDerivate2")
btnDerivate2.addEventListener('click', derivate)

var derivate = function () {
    var input_dfn = document.querySelector("#function_dx")
    var input_d2fn = document.querySelector("#function_d2x")
    //var inputLoading = document.querySelector("#input_function_d2x")
    //inputLoading.classList.add('is-loading')
    var dfn = input_dfn.value
    const derivada = math.derivative(dfn.toString(), 'x')
    input_d2fn.value = derivada.toString()
    //inputLoading.classList.remove('is-loading')
}
btnDerivate2.addEventListener('click', derivate)
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

    while (Math.abs(evaluate(fn, medio)) > eps && n < n_times) {
        var x = math.bignumber(math.evaluate('((xn*fxn1 - xn1*fxn)/(fxn1 - fxn))', { fxn, fxn1, xn, xn1 }))
        xn = xn1
        xn1 = x
        dados_x.push(n)
        dados_y.push(medio)
        chart.updateOptions({
            series: [{
                name: 'f(x)',
                data: dados_y
            }],
            xaxis: {
                n: dados_x
            }
        })
        if ((evaluate(fn, x) * (evaluate(fn, a))) < 0)
            b = x
        else
            a = x
        n += 1
    }
    console.log(medio)
    btnProcess.classList.remove('is-loading')
}
btn.addEventListener("click", submit);
