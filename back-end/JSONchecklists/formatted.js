const raw = `

1		 									Pavel Bure	 									Vancouver Canucks
2		 									Alexandre Daigle	 									Ottawa Senators
3		 									Sergei Fedorov	 									Detroit Red Wings
4		 									Alexei Kovalev	 									New York Rangers
5		 									Brian Leetch	 									New York Rangers
6		 									Eric Lindros	 									Philadelphia Flyers
7		 									Mike Modano	 									Dallas Stars
8		 									Alexander Mogilny	 									Buffalo Sabres
9		 									Jeremy Roenick	 									Chicago Blackhawks
10		 									Alexei Yashin	 									Ottawa Senators			
`
const splitRaw = raw.split(' ')
let triedArr = []
splitRaw.forEach(item => {
    triedArr.push(item.replace(/\s/g,'').replace('HV71','HV')) // remove whitespace, and "HV71" from raw string.
})
const separated = [] // This will contain strings, which will be either a number, firstname, lastname, teams firstname, or teams lastname.
triedArr.forEach(item => {
const splitItem = item.split('')
    let numberTypesInItem = 0
    for (const char of splitItem) { // check if each char in a string can be converted to a number, and if so, increment counter.
        // console.log(char)
        // console.log(Number(char))

        if (!!Number(char) || char === '0') {
            numberTypesInItem += 1
        }
    }
    if (numberTypesInItem === 0 || numberTypesInItem === splitItem.length) { // if string has no numbers, or it has only numbers, it can pass thru.
separated.push(item)
    } else if (numberTypesInItem > 0) { // if not, we have to separate numbers from text from within the items.
        let number = ''
        let text = ''

        splitItem.forEach(char => {
            if (!!Number(char) || char == '0') {
                number += char
            } else {
                text += char
            }
        })
        if (!!Number(splitItem[0]) || splitItem[0] === '0') { //Are the numbers first or last in the string?
    separated.push(number)
    separated.push(text)
        } else {
    separated.push(text)
    separated.push(number)
        }
    }
})
const formatted = []
let newObject = {}
let prev = ''
for (let i = 0; i < separated.length; i++) {
    if (!!Number(separated[i])) {
        if (prev !== '') {
            formatted.push(newObject)
        }
        newObject = {number: separated[i]}
        prev = 'num'
    } else if (prev === 'num') {
        newObject = {...newObject, firstname: separated[i]}
        prev = 'firstname'
    } else if (prev === 'firstname') {
        newObject = {...newObject, lastname: separated[i]}
        prev = 'lastname'
    } else if (prev === 'lastname') {
        newObject = {...newObject, teamname: separated[i]}
        prev = 'teamname'
    } else if (prev === 'teamname') {
        newObject = {...newObject, teamname: newObject.teamname + ' ' + separated[i]}
    }
}
formatted.push(newObject)

module.exports = {formatted}
