import { prisma } from "../libs/prisma.js";

export default async function (signal) {
    console.log(`\nReceived ${signal}, shutting down...`);
    try {
        await prisma.$disconnect()
        console.log('Prisma disconnected')
    } catch (error) {
        console.error('Error when disconnect', error)
    } finally {
        process.exit(0)
    }
}