const dictionary = {
    'אחד': {
        value: 1,
        type: 1
    },
    'אחת': {
        value: 1,
        type: 1
    },
    'שתים': {
        value: 2,
        type: 1
    },
    'שתיים': {
        value: 2,
        type: 1
    },
    'שניים': {
        value: 2,
        type: 1
    },
    'שתי': {
        value: 2,
        type: 1
    },
    'שני': {
        value: 2,
        type: 1
    },
    'שנים': {
        value: 2,
        type: 1
    },
    'שלש': {
        value: 3,
        type: 1
    },
    'שלוש': {
        value: 3,
        type: 1
    },
    'שלשה': {
        value: 3,
        type: 1
    },
    'שלושת': {
        value: 3,
        type: 1
    },
    'שלשת': {
        value: 3,
        type: 1
    },

    'שלושה': {
        value: 3,
        type: 1
    },
    'ארבע': {
        value: 4,
        type: 1
    },
    'ארבעה': {
        value: 4,
        type: 1
    },
    'ארבעת': {
        value: 4,
        type: 1
    },
    'חמש': {
        value: 5,
        type: 1
    },
    'חמשת': {
        value: 5,
        type: 1
    },

    'חמשה': {
        value: 5,
        type: 1
    },
    'חמישה': {
        value: 5,
        type: 1
    },
    'שש': {
        value: 6,
        type: 1
    },
    'ששת': {
        value: 6,
        type: 1
    },
    'ששה': {
        value: 6,
        type: 1
    },
    'שישה': {
        value: 6,
        type: 1
    },
    'שבע': {
        value: 7,
        type: 1
    },
    'שבעה': {
        value: 7,
        type: 1
    },
    'שבעת': {
        value: 7,
        type: 1
    },
    'שיבעת': {
        value: 7,
        type: 1
    },
    'שיבעה': {
        value: 7,
        type: 1
    },
    'שמונה': {
        value: 8,
        type: 1
    },
    'שמנה': {
        value: 8,
        type: 1
    },
    'שמנת': {
        value: 8,
        type: 1
    },
    'שמונת': {
        value: 8,
        type: 1
    },
    'תשע': {
        value: 9,
        type: 1
    },
    'תשעה': {
        value: 9,
        type: 1
    },
    'תישעה': {
        value: 9,
        type: 1
    },
    'תשעת': {
        value: 9,
        type: 1
    },
    'תישעת': {
        value: 9,
        type: 1
    },
    'עשר': {
        value: 10,
        type: 10
    },
    'עשרת': {
        value: 10,
        type: 10
    },
    'עשרה': {
        value: 10,
        type: 10
    },
    'עשרים': {
        value: 20,
        type: 10
    },
    'שלושים': {
        value: 30,
        type: 10
    },
    'שלשים': {
        value: 30,
        type: 10
    },
    'ארבעים': {
        value: 40,
        type: 10
    },
    'חמישים': {
        value: 50,
        type: 10
    },
    'חמשים': {
        value: 50,
        type: 10
    },
    'ששים': {
        value: 60,
        type: 10
    },
    'שישים': {
        value: 60,
        type: 10
    },
    'שיבעים': {
        value: 70,
        type: 10
    },
    'שבעים': {
        value: 70,
        type: 10
    },
    'שמונים': {
        value: 80,
        type: 10
    },
    'שמנים': {
        value: 80,
        type: 10
    },
    'תשעים': {
        value: 90,
        type: 10
    },
    'תישעים': {
        value: 90,
        type: 10
    },
    'מאה': {
        value: 100,
        type: 100
    },
    'מאות': {
        value: 100,
        type: 100
    },
    'מאתיים': {
        value: 200,
        type: 100
    },
    'מאתים': {
        value: 200,
        type: 100
    },
    'אלף': {
        value: 1000,
        type: 1000
    },
    'אלפים': {
        value: 1000,
        alternateValue: 2000,
        type: 1000
    },
    'מיליון': {
        value: 1000000,
        type: 1000000
    },
    'מיליארד': {
        value: 1000000000,
        type: 1000000000
    },
}

const parseWords = values => {
    let sum = 0;
    for (var i = 0; i < values.length; i++) {
        const curr = values[i];
        const next = values[i + 1];
        if (curr.type < 100 || !next || next.type > curr.type) {
            sum += curr.alternateValue || curr.value;
        } else if (curr.type === 100) {
            sum += curr.value * next.value;
            i++;
        } else {
            let shift = 1;
            while (values[i + shift + 1] && values[i + shift + 1].type < curr.type) {
                shift += 1;
            }
            sum += curr.value * parseWords(values.slice(i + 1, i + 1 + shift));
            i += shift;
        }
    }
    return sum;
}


const parseHebrewNumber = text => {
    const words = text.replace(/[\u0591-\u05C7]/g, '').split(/[- ]/).map(w => w.startsWith('ו') ? w.slice(1) : w);
    const values = words.map(w => dictionary[w]).reverse();
    return parseWords(values);
};
console.log(parseHebrewNumber('תשע מאות שלושים ושבע מיליון ארבע מאות חמישים אלף מאתים עשרים וארבע'));


console.log(parseHebrewNumber('עשרים'));
console.log(parseHebrewNumber('שלושים ושבע'));
console.log(parseHebrewNumber('תשע עשרה'));
console.log(parseHebrewNumber('שלוש'));
console.log(parseHebrewNumber('תשעים ושתים'));
console.log(parseHebrewNumber('מאתים עשרים ושתים'));
console.log(parseHebrewNumber('מאתים ושתים'));
console.log(parseHebrewNumber('מאה תשעים'));
console.log(parseHebrewNumber('תשע מאות עשרים ותשע'));
console.log(parseHebrewNumber('אלף'));
console.log(parseHebrewNumber('אלפים'));
console.log(parseHebrewNumber('אלפים'));
console.log(parseHebrewNumber('תשעת אלפים'));
console.log(parseHebrewNumber('מאה מיליון'));
console.log(parseHebrewNumber('חמשת אלפים ארבעים ושבע'));
console.log(parseHebrewNumber('שְׁלוֹשִׁים וְשֶׁבַע'));
