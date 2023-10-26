# FakeTinderProject

Este projeto é feito com Prisma ORM e NextJS e é sobre avaliar linguagens de programação a partir de suas Imagens.

Criadores: Felipe Estevo Gomes

Comandos para iniciar o Backend:
npm init -y
npm i typescript
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite

Modelos:

model User{
  id Int @id @default(autoincrement())
  email String @unique
  username String
  password String @unique
  is_Admin Boolean
  items User_Item[]
}

model Item{
  id Int @id @default(autoincrement())
  title String @unique
  image String
  users User_Item[]
}

model User_Item{
  user User @relation(fields: [userID], references: [id])
  userID Int
  item Item @relation(fields: [itemID], references: [id])
  itemID Int
  likeQuantity Int
  dislikeQuantity Int
  @@id([userID,itemID])
}

npx prisma migrate dev --name init