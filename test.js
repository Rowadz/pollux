const data = [
  {
    id: '004f7263-4216-4821-8c30-b35d882893ca',
    email: 'Isabella_Johnston@hotmail.com',
    password: '2mQHdymiETH0YDC',
    name: 'Sigrid Hoeger',
  },
  {
    id: '89fff3fb-59ca-4a00-9814-5ac15911da7a',
    email: 'Nedra_Lehner7@gmail.com',
    password: '_rsUWR5sabnT6eD',
    name: 'Darby Donnelly',
  },
  {
    id: 'db975f17-79f3-40e8-be18-da8e2dda9a7d',
    email: 'Mohammed67@yahoo.com',
    password: 'W595E1fJTokidgm',
    name: 'Richard Bahringer',
  },
  {
    id: 'a13d0c5f-e5be-47de-b53c-b7d46a891953',
    email: 'Lizeth.Douglas@hotmail.com',
    password: 'mzMblLaxvyWN1Q5',
    name: 'Elvie Marks',
  },
  {
    id: '05769754-3b03-42fa-9a38-99fed533ea3f',
    email: 'Hallie.Hayes56@hotmail.com',
    password: 'NpDX1E1dpGQda2c',
    name: 'Cassandre Walsh',
  },
  {
    id: '9f3b8e62-5775-4d20-a3f6-7956a2fc476f',
    email: 'Emile11@yahoo.com',
    password: 'XeWboM14PDgYuvS',
    name: 'Carley Schaden',
  },
  {
    id: '3f4b0aed-8837-473a-b417-d2d0abe51ec5',
    email: 'Quincy30@hotmail.com',
    password: 'enq0ATsfeEZ4koj',
    name: 'Geoffrey Lehner',
  },
  {
    id: 'f2cc912f-9492-492f-96e9-85b168442a59',
    email: 'Rhea87@yahoo.com',
    password: 'UHzbrnq66zGh0VW',
    name: 'Lorna Kutch',
  },
  {
    id: '48b9c05f-d920-4e75-b46e-2e12aeb1422a',
    email: 'Paolo.Schmidt@yahoo.com',
    password: 'f6WdrezADToVfGz',
    name: 'Christine Heller',
  },
  {
    id: '112881bd-b74f-4c20-90d3-b159b8fad2cb',
    email: 'Linwood87@hotmail.com',
    password: 'U4qZGkmlddGw0S7',
    name: 'Brock Rippin',
    d: 1,
  },
]

const getData = () => {
  const values = data.map(Object.values)
  const res = []
  for (const list of values) {
    let str = '( '
    for (const [index, value] of list.entries()) {
      const comma = index === list.length - 1 ? ' ' : ', '
      if (isNaN(value)) {
        str += `"${value}"${comma}`
      } else {
        str += `${value}${comma}`
      }
    }
    str += ')'
    res.push(str)
  }
  console.log(res.join(', '))
}

getData()
