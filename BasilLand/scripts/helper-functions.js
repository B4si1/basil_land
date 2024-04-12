let input = [];

export function textParse(conditionText, sourceText){
    let textString = sourceText.slice(sourceText.length - conditionText.length, sourceText.length)
    if(textString.toString().toLowerCase() == conditionText){
        input = [];
        return true;
    }
}

export function show(value){
    return value.classList.remove('hide-class')
}

export function hide(value){
    return value.classList.add('hide-class')
}

export function capsFirstLetter(string) {
    if (string.length === 0) {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
