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

    var h = math.bignumber(math.evaluate('(b-a)/n_times', { a, b, n_times }))
    var labelH = document.querySelector("#labelH")
    labelH.innerHTML = h.toString()
    let n = 0
    var somaArea = 0
    while (n <= n_times) {
        b = math.add(a, h)
        var m1 = math.evaluate('(2*a)+b', { a, b })
        var m2 = math.evaluate('a+(2*b)', { a, b })
        var fa = evaluate(fn, a)

        var fb = evaluate(fn, b)
        var fm1 = evaluate(fn, m1)
        var fm2 = evaluate(fn, m2)
        var area = math.evaluate('((b-a)/8)*(fa + 3*fm1 + 3*fm2 + fb)', { a, b, fa, fb, fm1, fm2 })
        console.log('a', a.toString(), 'fa', fa.toString());
        somaArea = math.add(somaArea, area)
        dados_x.push(a.toString())
        dados_y.push(fa.toString())
        chart.updateOptions({
            chart: { type: 'area' },
            series: [{
                name: 'f(x)',
                data: dados_y
            }],
            xaxis: {
                x: dados_x
            },
            title: {
                text: "Área:" + somaArea.toString(),
                align: 'center'
            }

        })
        a = b
        n += 1
    }
    console.log(somaArea)
}
btn.addEventListener("click", submit);
