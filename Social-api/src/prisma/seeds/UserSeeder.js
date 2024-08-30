const { faker } = require("@faker-js/faker");
const { PrismaClient } =  require("@prisma/client");
const bcryptjs =  require('bcryptjs')

const prisma = new PrismaClient();

async function UserSeeder ()
{
    const password = await bcryptjs.hash("password", 10);
    console.log('User seeding started...');

    for (let i = 0; i < 10; i++) {
        const fisrtName= faker.person.firstName();
        const lastName= faker.person.lastName();

        const name= `${fisrtName} ${lastName}`;
        const username= `${fisrtName}${lastName[0]}`.toLocaleLowerCase();
        const bio= faker.person.bio();

        await prisma.user.upsert({
            where: {username},
            update: {},
            create: {name, username, bio, password}
        });
    }
    
    console.log("User seeding done.")

}

module.exports = {UserSeeder};