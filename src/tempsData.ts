export type Temp = {
  email: string
  job: string
  client: string
  creationDate: Date
}

export const tempsData: Temp[] = [
  {
    email: 'toto.tata@gmail.com',
    job: 'Cariste',
    client: 'Carre SARL',
    creationDate: new Date('2021-06-04T00:00:00.000sZ'),
  },
  {
    email: 'jobi.joba@wanadoo.com',
    job: 'Acheteurs produits',
    client: 'Dupont',
    creationDate: new Date('2021-06-05T00:00:00.000sZ'),
  },
  {
    email: 'buda.pest@gmail.com',
    job: 'Plombier',
    client: 'SAS Lepied',
    creationDate: new Date('2021-06-06T00:00:00.000sZ'),
  },
]
