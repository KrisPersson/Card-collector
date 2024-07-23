const raw = `

1		 			Paul Kariya	 			Anaheim Mighty Ducks
2		 			Peter Forsberg	 			Quebec Nordiques
3		 			Viktor Kozlov	 			San Jose Sharks
4		 			Todd Marchant	 			Edmonton Oilers
5		 			Oleg Tverdovsky	 			Anaheim Mighty Ducks
6		 			Todd Harvey	 			Dallas Stars
7		 			Kenny Jonsson	 			Toronto Maple Leafs
8		 			Blaine Lacher	 			Boston Bruins
9		 			Radek Bonk	 			Ottawa Senators
10		 			Brett Lindros	 			New York Islanders
11		 			Valeri Bure	 			Montreal Canadiens
12		 			Brian Rolston	 			New Jersey Devils
13		 			David Oliver	 			Edmonton Oilers
14		 			Ian Laperriere	 			St. Louis Blues
15		 			Adam Deadmarsh	 			Quebec Nordiques
16		 			Pavel Bure	 			Vancouver Canucks
17		 			Wayne Gretzky	 			Los Angeles Kings
18		 			Jeremy Roenick	 			Chicago Blackhawks
19		 			Dominik Hasek	 			Buffalo Sabres
20		 			Ray Bourque	 			Boston Bruins
21		 			Doug Gilmour	 			Toronto Maple Leafs
22		 			Teemu Selanne	 			Winnipeg Jets
23		 			Cam Neely	 			Boston Bruins
24		 			Sergei Fedorov	 			Detroit Red Wings
25		 			Bernie Nicholls	 			Chicago Blackhawks
26		 			Jaromir Jagr	 			Pittsburgh Penguins
27		 			Joe Sakic	 			Quebec Nordiques
28		 			Mark Messier	 			New York Rangers
29		 			Brett Hull	 			St. Louis Blues
30		 			Eric Lindros	 			Philadelphia Flyers
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
