"use strict";

let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"

const getParam_1 = include(agacraft+"/functions/getParam.js")
const getClass_1 = include(agacraft+"/functions/getClass.js")
const toValue_1 = include(agacraft+"/functions/toValue.js")
const prompt_1 = include(agacraft+"/functions/prompt.js")
const colors_1 = include(agacraft+"/functions/colors.js")
const ascii_1 = include(agacraft+"/functions/ascii.js")
const input_1 = include(agacraft+"/functions/input.js")
const uuid_1 = include(agacraft+"/functions/uuid.js")
const load_1 = include(agacraft+"/functions/load.js")
const min_1 = include(agacraft+"/functions/min.js")
module.exports = {
    getParam: getParam_1,
    getClass: getClass_1,
    toValue: toValue_1,
    prompt: prompt_1,
    colors: { ...colors_1 },
    ascii: { ...ascii_1 },
    input: input_1,
    uuid: uuid_1,
    load: load_1,
    min: min_1
};
