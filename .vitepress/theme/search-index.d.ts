declare module 'virtual:medvic-search-index' {
  const records: Array<{
    category: string
    excerpt: string
    headings: string[]
    path: string
    text: string
    title: string
  }>

  export default records
}
