import * as fs from 'fs'
import { parse } from 'csv-parse/sync'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // const { query }: { query: unknown } = await request.json()

  const villagesRawData = fs.readFileSync('src/data/villages/2020/villages.csv')
  const villagesParsedData = parse(villagesRawData, { columns: true })
  console.log(villagesParsedData)
  const fileteredData = villagesParsedData.filter((data) => {
    data.pref === request.nextUrl.searchParams.get('region')
  })
  // console.log(request.nextUrl.searchParams.get('region'))

  return new Response(

    JSON.stringify(fileteredData),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}