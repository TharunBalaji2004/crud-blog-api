import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

async function run() {
    const user = await prismaClient.user.upsert({
        where: {
            email: "user@example.com"
        },
        update: {},
        create: {
            email: "user@example.com",
            name: "Tharun"
        }
    })

    console.log({ user });
}

run()
    .catch((err) => {
        console.log('====================================');
        console.log("Error occurred: "+err);
        console.log('====================================');
        process.exit(1);
    })
    .finally(async() => {
        await prismaClient.$disconnect();
    })