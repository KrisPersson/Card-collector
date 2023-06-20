const raw = `
1		 					Robin Kovacs	 					AIK IF Stockholm
2		 					Michael Haga	 					Almtuna IS
3		 					Tuomas Salmela	 					Asploven HC
4		 					Joel Gistedt	 					BIK Karlskoga
5		 					Henrik Björklund	 					BIK Karlskoga
6		 					Marcus Eriksson	 					HC Vita Hasten
7		 					Kevin Lindskoug	 					IF Bjorkloven
8		 					Joakim Hagelin	 					IK Oskarshamn
9		 					Viktor Andrén	 					IK Pantern
10		 					Martin Grönberg	 					Leksands IF
11		 					Henrik Haukeland	 					Leksands IF
12		 					Daniel Hermansson	 					Mora IK
13		 					Magnus Åkerlund	 					IF Sundsvall Hockey
14		 					Jeremy Boyce	 					Timra IK
15		 					Jonathan Dahlén	 					Timra IK
16		 					Eric Castonguay	 					Tingsryds AIF
17		 					Kevin Ekman-Larsson	 					Tingsryds AIF
18		 					Cody Murphy	 					VIK Västerås HK
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
