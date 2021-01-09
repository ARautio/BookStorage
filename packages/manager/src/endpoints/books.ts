import express from 'express'
import { getPath } from './utils'

const PATH = '/books'


export const books = (app: express.Application, bookRepository: any, ePubRepository: any) => {
  const getBookPath = getPath(PATH)

  app.get(getBookPath('/'), async (req, res) => {
    res.send(await bookRepository.getBooks())
  })

  app.get(getBookPath('/import'), async (req, res) => {
    //@TODO: Error handling
    const books = await ePubRepository.getBooks()
    await bookRepository.addBooks(books)
    res.sendStatus(200)
  })
}