const constants = {
    e: math.bignumber(math.e),
    pi: math.bignumber(math.pi),
}
//#########################################################
var btnDerivate = document.querySelector("#btnDerivate")
var derivate = function () {
    var input_fn = document.querySelector("#function_x")
    var input_dfn = document.querySelector("#function_dx")
    //var inputLoading = document.querySelector("#input_function_dx")
    //inputLoading.classList.add('is-loading')
    var fn = input_fn.value
    const derivada = math.derivative(fn.toString(), 'x')
    input_dfn.value = derivada.toString()
    //inputLoading.classList.remove('is-loading')
}
btnDerivate.addEventListener('click', derivate)
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

    var input_fdn = document.querySelector("#function_dx")
    if (!input_fdn.value) {
        return alert('Insira uma função derivada válida')
    }
    var fdn = input_fdn.value

    var input_x0 = document.querySelector("#point_x0")
    if (!input_x0.value) {
        return alert('Insira uma solução inicial válida')
    }
    var x0 = math.bignumber(input_x0.value)

    var nTimes = document.querySelector("#n_times")
    if (!nTimes.value) {
        return alert('N inválido')
    }
    var n_times = nTimes.value

    var input_eps = document.querySelector("#labelEps")
    const eps = math.bignumber(input_eps.value)

    // valor da função
    var fx = evaluate(fn, x0)
    // valor da derivada
    var dfx = evaluate(fdn, x0)
    let n = 0
    var xn = math.evaluate('x0 - (fx/dfx)', { x0, fx, dfx })
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

    while (Math.abs(evaluate(fn, xn)) > eps && n < n_times) {
        // valor da função
        fx = evaluate(fn, xn)
        // valor da derivada
        dfx = evaluate(fdn, xn)
        xn = math.evaluate('xn - (fx/dfx)', { xn, fx, dfx })

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
        n += 1
    }
    console.log(xn.toString())
    btnProcess.classList.remove('is-loading')
}
btn.addEventListener("click", submit);
