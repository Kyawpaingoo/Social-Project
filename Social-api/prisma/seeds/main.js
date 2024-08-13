const { PrismaClient } = require("@prisma/client");
const {UserSeeder} = require("./UserSeeder");
const {PostSeeder} = require("./PostSeeder");
const {CommentSeeder} = require("./CommentSeeder");

const prisma = new PrismaClient();

const main = async()=>{
    try{
        await UserSeeder();
        await PostSeeder();
        await CommentSeeder();
    }
    catch(e)
    {
        console.error(e);
    }
    finally {
        await prisma.$disconnect();
    }
}

main();