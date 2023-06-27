const raw = `

1		 									Christoffer From-Björk	 									Almtuna IS
2		 									Niklas Andersson	 									Almtuna IS
3		 									Petter Sandberg	 									Almtuna IS
4		 									Andreas Dahlberg	 									IFK Arboga IK
5		 									Andreas Nordfeldt	 									IFK Arboga IK
6		 									Jesse Pehu	 									IFK Arboga IK
7		 									Jens Jakobs	 									Nykoping
8		 									Olof Svensson	 									Nykoping
9		 									Robert Andberg	 									Nykoping
10		 									Andreas Valdix	 									IK Oskarshamn
11		 									Fredrik Håkansson	 									IK Oskarshamn
12		 									Patrik Rönnqvist	 									IK Oskarshamn
13		 									Calle Steen	 									Södertälje SK
14		 									Carter Trevisani	 									Södertälje SK
15		 									Fredrik Sonntag	 									Södertälje SK
16		 									Henric Björkman	 									VIK Västerås HK
17		 									Marcus Söderkvist	 									VIK Västerås HK
18		 									Robin Persson	 									VIK Västerås HK
19		 									Brandon Nolan	 									Vaxjo Lakers
20		 									David Holmqvist	 									Vaxjo Lakers
21		 									Eric Yngve	 									Vaxjo Lakers
22		 									Elias Granath	 									Leksands IF
23		 									Mikael Karlberg	 									Leksands IF
24		 									Niclas Andersén	 									Leksands IF
`
const splitRaw = raw.split(' ')
let trimmedArr = []
splitRaw.forEach(item => {
    trimmedArr.push(item.replace(/\s/g,'').replace('HV71','HV')) // remove whitespace, and "HV71" from raw string.
})
const separated = [] // This will contain strings, which will be either a number, firstname, lastname, teams firstname, or teams lastname.
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
