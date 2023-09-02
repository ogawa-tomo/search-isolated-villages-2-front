import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

export async function GET(request: Request) {

  // const data = fs.readFileSync('../../../data/villages/2020/villages.csv')
  // const records = parse(data, { columns: true })
  // console.log(records)

  return new Response(

    // JSON.stringify(records),
    JSON.stringify([
      {
        name: '椎葉',
        tokaido: 'sugoi'
      },
      {
        name: '祖谷',
        tokaido: 'sugoi'
      }
    ]),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}