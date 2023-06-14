const raw = `

201		 											Franck Pajonkowski	 											France
202		 											Pierrick Maia	 											France
203		 											Christophe Ville	 											France
204		 											Serge Poudrier	 											France
205		 											Philippe Bozon	 											France
206		 											Gerald Guennelon	 											France
207		 											Antoine Richer	 											France
208		 											Reto Pavoni	 											Switzerland
209		 											Renato Tosio	 											Switzerland
210		 											Jorg Eberle	 											Switzerland
211		 											Fredy Luthi	 											Switzerland
212		 											Christian Weber	 											Switzerland
213		 											Sandro Bertaggia	 											Switzerland
214		 											Patrick Howald	 											Switzerland
215		 											Gil Montandon	 											Switzerland
216		 											Rick Tschumi	 											Switzerland
217		 											Klaus Merk	 											Germany
218		 											Joseph Heiss	 											Germany
219		 											Rick Amann	 											Germany
220		 											Michael Rumrich	 											Germany
221		 											Thomas Brandl	 											Germany
222		 											Andreas Niederberger	 											Germany
223		 											Leo Stefan	 											Germany
224		 											Stefan Ustorf	 											Germany
225		 											Dieter Hegen	 											Germany
226		 											Michael Rosati	 											Italy
227		 											Bruno Campese	 											Italy
228		 											Roberto Oberrauch	 											Italy
229		 											Anthony Circelli	 											Italy
230		 											Bill Stewart	 											Italy
231		 											Bruno Zarrillo	 											Italy
232		 											Gaetano Orlando	 											Italy
233		 											Stefano Figliuzzi	 											Italy
234		 											Jimmy Camazzola	 											Italy
235		 											Vladislav Tretiak	 											USSR
236		 											Viacheslav Fetisov	 											USSR
237		 											Alexei Kasatonov	 											USSR
238		 											Sergei Makarov	 											USSR
239		 											Igor Larionov	 											USSR
240		 											Vladimir Krutov	 											USSR
241		 											Valeri Kharlamov	 											USSR
242		 											Vladimir Petrov	 											USSR
243		 											Boris Mikhailov	 											USSR
244		 											Olympic Gold	 											Sweden
245		 											Olympic Gold	 											Sweden
246		 											Olympic Gold	 											Sweden
247		 										 World Champions	 											Canada
248		 										 World Champions	 											Canada
249		 											Luc Robitaille	 											Canada
250		 											Manon Rheaume	 											Canada
251		 											Mats Sundin / Roger Andersson	 											Sweden
252		 											Tomas Brolin / Espen Knutsen	 											Norway
253		 											Peter Forsberg	 											Sweden
254		 											Peter Forsberg	 											Sweden
255		 											Peter Forsberg	 											Sweden
256		 											Mats Sundin	 											Sweden
257		 											Mats Sundin	 											Sweden
258		 											Mats Sundin	 											Sweden
259		 											Mikael Renberg	 											Sweden
260		 											Mikael Renberg	 											Sweden
261		 											Mikael Renberg	 											Sweden
262		 											Eric Lindros	 											Canada
263		 											Eric Lindros	 											Canada
264		 											Eric Lindros	 											Canada
265		 											Wayne Gretzky	 											Canada
266		 											Wayne Gretzky	 											Canada
267		 											Wayne Gretzky	 											Canada
268		 											Checklist Card 	 											Sweden
269		 											Checklist Card  											Sweden
270		 											Checklist Card  											Sweden
`

const splitRaw = raw.split(' ')
let trimmedArr = []
splitRaw.forEach(item => {
    trimmedArr.push(item.replace(/\s/g,'').replace('HV71','HV')) // remove whitespace, and "HV71" from raw string.
})
const separated = [] // This will contain strings, which will be either a card number, firstname, lastname, teams firstname, or teams lastname.
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
