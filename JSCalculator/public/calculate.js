$(document).ready(function () {
    var $button = $("button");
    var $answer = $("#answer");
    var $history = $("#history");

    var btnValue; //获取当前button所传入的值
    var history; //设置历史记录
    var answer = 0; //设置结果
    var tempArr = [];
    var re = /(\+|\-|\*|\/|\=)+/g;
    var resultStr = "";


    function parse(content) {
        var index = content.indexOf("+");
        if (index !== -1) {
            return parse(content.slice(0, index)) + parse(content.slice(index + 1));
        }

        index = content.indexOf("-");
        if (index !== -1) {
            return parse(content.slice(0, index)) - parse(content.slice(index + 1));
        }

        index = content.indexOf("*");
        if (index !== -1) {
            return parse(content.slice(0, index)) * parse(content.slice(index + 1));
        }

        index = content.indexOf("/");
        if (index !== -1) {
            return parse(content.slice(0, index)) / parse(content.slice(index + 1));
        }

        return Number(content);
    }

    function calculate(calStr) {
        let result;
        result = parse(calStr);
        return result;
        // let temp;
        // var i = 0;
        // calStr = calStr.replace(re, function(match, str1) {
        //     return " " + str1 + " ";
        // });
        // tempArr = calStr.split(" ");
        // while (i < tempArr.length) {
        //     switch (tempArr[i + 1]) {
        //         case "*":
        //             if (i === 0) {
        //                 temp = tempArr[i] * tempArr[i + 2];
        //                 break;
        //             }
        //             temp = temp * tempArr[i + 2];
        //             break;
        //         case "+":
        //             if (i === 0) {
        //                 temp = tempArr[i] + tempArr[i + 2];
        //                 break;
        //             }
        //             temp = temp + tempArr[i + 2];
        //             break;
        //         case "-":
        //             if (i === 0) {
        //                 temp = tempArr[i] - tempArr[i + 2];
        //                 break;
        //             }
        //             temp = temp - tempArr[i + 2];
        //             break;
        //         case "/":
        //             if (i === 0) {
        //                 temp = tempArr[i] / tempArr[i + 2];
        //                 break;
        //             }
        //             temp = temp / tempArr[i + 2];
        //             break;
        //         default:
        //             break;
        //     }
        //     i = i + 2;
        // }
        // return temp;
    }

    $button.bind("click", function () {
        btnValue = $(this).attr("value");
        if ($answer.html() === "0" && $history.html() === "0") {
            if (btnValue !== "ac" && btnValue !== "ce") {
                $answer.html(btnValue);
                $history.html(btnValue);
                return;
            }
            if (btnValue === ".") {
                history = $history.html().concat(btnValue);
                answer = $answer.html().concat(btnValue);
                $answer.html(answer);
                $history.html(history);
                return;
            }

            return;
        }

        if ($answer.html() !== "0" || $history !== "0") {
            switch (btnValue) {
                case "ac":
                    $history.html("0");
                    $answer.html("0");
                    break;
                case "ce":
                    history = $history.html();
                    if (history.indexOf("=") > -1) {
                        $history.html("0");
                        $answer.html("0");
                        history = "";
                        answer = "";
                        break;
                    }
                    history = history.replace(re, function (match, str1) {
                        return " " + str1 + " ";
                    });
                    tempArr = history.split(" ");
                    console.log(tempArr);
                    if (tempArr.length === 1) {
                        $answer.html("0");
                        $history.html("0");
                        break;
                    }
                    if (isNaN(tempArr.pop())) {
                        tempArr.pop();
                        tempArr.pop();
                        history = tempArr.join("");
                        $history.html(history);
                        break;
                    }
                    tempArr.pop();
                    history = tempArr.join("");
                    $history.html(history);
                    break;
                case "=":
                    history = $history.html();
                    answer = calculate(history);
                    $answer.html(answer);
                    resultStr = history + "=" + answer;
                    $history.html(resultStr);
                    break;
                case ".":
                    history = $history.html();
                    tempArr = history.split("");
                    console.log(tempArr);
                    if (!isNaN(tempArr.pop())) {
                        $answer.html(btnValue);
                        history = $history.html().concat(btnValue);
                        $history.html(history);
                        break;
                    }
                    break;
                case "+":
                    history = $history.html();
                    tempArr = history.split("");
                    if (!isNaN(tempArr.pop())) {
                        $answer.html(btnValue);
                        history = $history.html().concat(btnValue);
                        $history.html(history);
                        break;
                    }
                    break;
                case "-":
                    history = $history.html();
                    tempArr = history.split("");
                    if (!isNaN(tempArr.pop())) {
                        $answer.html(btnValue);
                        history = $history.html().concat(btnValue);
                        $history.html(history);
                        break;
                    }
                    break;
                case "*":
                    history = $history.html();
                    tempArr = history.split("");
                    if (!isNaN(tempArr.pop())) {
                        $answer.html(btnValue);
                        history = $history.html().concat(btnValue);
                        $history.html(history);
                        break;
                    }
                    break;
                case "/":
                    history = $history.html();
                    tempArr = history.split("");
                    if (!isNaN(tempArr.pop())) {
                        $answer.html(btnValue);
                        history = $history.html().concat(btnValue);
                        $history.html(history);
                        break;
                    }
                    break;
                default:
                    $answer.html(btnValue);
                    history = $history.html().concat(btnValue);
                    $history.html(history);
                    break;
            }
        }

    });
});