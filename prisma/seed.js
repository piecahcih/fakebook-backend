import { prisma } from '../src/libs/prisma.js'
import bcrypt from 'bcrypt'

const hashedPassword = bcrypt.hashSync('123456', 8)

const userData = [
 { firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg' }, 
 { firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'},
 { firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, mobile: '1111111111',
     profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'},
 { firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, mobile: '2222222222',
     profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'},
]

async function main() {
    console.log('Clean table...')
    await prisma.$transaction([
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Like`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Comment`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Post`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Relationship`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `User`;'),
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;'),
    ]);
    console.log(`Start seeding...`)
    const createdUsers = await prisma.user.createMany({
        data: userData,
        skipDuplicates: true
    })
    console.log(`Created : ${createdUsers.count} users`)
}

main().then( async ()=>{
    await prisma.$disconnect()
}).catch( async (err)=>{
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})