import prisma from "config/database";

export async function createAGame() {
    await prisma.game.create({
        data: {
            title: "Dead Redption",
            consoleId: 1
        }
    });
}