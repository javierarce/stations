import { readJSON, readCSV, writeCSV } from 'https://deno.land/x/flat@0.0.11/mod.ts' 

//const json = await readJSON('stations.json')

let data = await readCSV('data.csv')
const filename = Deno.args[0] 
const json = await readJSON(filename)

const magic = (station) => {
  let id = station.id
  let available = station.no_available ? 0 : 1
  let light = station.light
  let bases = station.total_bases
  let bikes = station.dock_bikes
  let free_bases = station.free_bases
  let reservations = station.reservations_count
  let timestamp = json.updated_at
  let now = new Date(timestamp)

  let day = now.getDate()
  let month = now.getMonth() + 1

  let dd = day < 10 ? `0${day}` : day
  let mm = month < 10 ? `0${month}` : month
  let yyyy = now.getFullYear()

  return { timestamp, id, available,bases, bikes, free_bases, reservations, light }
}

Object.values(json.stations).forEach(async (station) => {
  let row = magic(station)
  data.push(row)
  await writeCSV('data.csv', data) 
})

//console.log("Wrote a post process file")
//await removeFile('./btc-price.json') // equivalent to removeFile('btc-price.json')
