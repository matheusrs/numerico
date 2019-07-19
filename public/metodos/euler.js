const constants = {
    e: math.bignumber(math.e),
    pi: math.bignumber(math.pi),
}
//#########################################################
var btnRationalize = document.querySelector("#btnRationalize")
var rationalize = function () {
    var input_fn = document.querySelector("#function_y")
    var fn = input_fn.value
    if (input_fn.value.length > 0) {
        const funcao = math.rationalize(fn.toString(), {}, true)
        input_fn.value = math.simplify(funcao.expression.toString()).toString()
    }
}
btnRationalize.addEventListener('click', rationalize)
//#########################################################
// var slider = document.querySelector("#margem_erro")
// var updateLabel = function (e) {
//     var labelEps = document.querySelector("#labelEps")
//     const eps = math.bignumber(math.pow(10, -e.target.value))
//     labelEps.value = math.evaluate(eps.toString())
// }
// slider.addEventListener('input', updateLabel)
//#########################################################
var btn = document.querySelector("#btnProcess")
var interval = null;
var evaluate = function (fn, x, y) {
    const scope = { x: math.bignumber(x), y: math.bignumber(y), ...constants }
    return math.evaluate(fn, scope)
}
var submit = function () {
    var dados_y = []
    var dados_x = []

    var input_fn = document.querySelector("#function_y")
    if (!input_fn.value) {
        return alert('Insira uma função válida')
    }


    var input_x0 = document.querySelector("#point_x0")
    if (!input_x0.value) {
        return alert('Insira uma solução inicial x0 válida')
    }

    var input_y0 = document.querySelector("#point_y0")
    if (!input_y0.value) {
        return alert('Insira uma solução inicial y0 válida')
    }

    var input_xn = document.querySelector("#point_xn")
    if (!input_xn.value) {
        return alert('Insira um xn válido')
    }

    var input_n = document.querySelector("#n_times")
    if (!input_n.value) {
        return alert('Insira um n válido')
    }

    // var input_eps = document.querySelector("#labelEps")

    // expressão
    var fn = input_fn.value
    var x0 = math.bignumber(input_x0.value)
    var y0 = math.bignumber(input_y0.value)
    var xn = math.bignumber(input_xn.value)
    // n = numero de partições + 1
    var n_times = math.add(math.bignumber(input_n.value), 1)
    // const eps = math.bignumber(input_eps.value)

    
    var yn = y0.toString()
    var h = math.evaluate('(xn - x0)/n_times', { xn, x0, n_times })
    
    dados_x.push(xn)
    dados_y.push(yn)
    chart.updateOptions({
        series: [{
            name: 'yn',
            data: dados_y
        }],
        xaxis: {
            name: 'xn',
            xn: dados_x
        }
    })

    let n = 1
    while (n < n_times) {
        var x = evaluate(fn, xn, yn)
        yn = math.evaluate('yn + (h * x)', { yn, h, x })
        xn = math.add(xn, h)
        dados_x.push(xn)
        dados_y.push(yn)
        chart.updateOptions({
            series: [{
                name: 'yn',
                data: dados_y
            }],
            xaxis: {
                name: 'xn',
                xn: dados_x
            }
        })
        n += 1
    }
    console.log(yn.toString())
}
btn.addEventListener("click", submit);
