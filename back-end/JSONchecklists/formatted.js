const raw = `
1		 						Markus Korhonen	 						Brynäs IF
2		 						Björn Bjurling	 						Djurgårdens IF
3		 						Henrik Lundqvist	 						Frölunda HC
4		 						Sinuhe Wallinheimo	 						Färjestad BK
5		 						Stefan Liv	 						HV71 Jonkoping
6		 						Fredrik Norrena	 						Linköping
7		 						Daniel Henriksson	 						Färjestad BK
8		 						Andreas Hadelöv	 						Malmö IF Redhawks
9		 						Rolf Wanhainen	 						Djurgårdens IF
10		 						Kimmo Kapanen Timrå IK
`

const splitRaw = raw.split(' ')
let trimmedArr = []
splitRaw.forEach(item => {
    trimmedArr.push(item.replace(/\s/g,'').replace('HV71','HV')) // remove whitespace, and "HV71" from raw string.
})
const sePärated = [] // This will contain strings, which will be either a card number, firstname, lastname, teams firstname, or teams lastname.
trimmedArr.forEach(item => {
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
        sePärated.push(item)
    } else if (numberTypesInItem > 0) { // if not, we have to sePärate numbers from text from within the items.
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
            sePärated.push(number)
            sePärated.push(text)
        } else {
            sePärated.push(text)
            sePärated.push(number)
        }
    }
})
const formatted = []
let newObject = {}
let prev = ''
for (let i = 0; i < sePärated.length; i++) {
    if (!!Number(sePärated[i])) {
        if (prev !== '') {
            formatted.push(newObject)
        }
        newObject = {number: sePärated[i]}
        prev = 'num'
    } else if (prev === 'num') {
        newObject = {...newObject, firstname: sePärated[i]}
        prev = 'firstname'
    } else if (prev === 'firstname') {
        newObject = {...newObject, lastname: sePärated[i]}
        prev = 'lastname'
    } else if (prev === 'lastname') {
        newObject = {...newObject, teamname: sePärated[i]}
        prev = 'teamname'
    } else if (prev === 'teamname') {
        newObject = {...newObject, teamname: newObject.teamname + ' ' + sePärated[i]}
    }
}
formatted.push(newObject)

module.exports = {formatted}
