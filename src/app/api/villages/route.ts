import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

export async function GET(request: Request, { params }) {
  // const { query }: { query: unknown } = await request.json()

  const data = fs.readFileSync('src/data/villages/2020/villages.csv')
  const records = parse(data, { columns: true })
  // console.log(query)

  return new Response(

    JSON.stringify(records),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}