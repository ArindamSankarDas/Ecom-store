import { PrismaClient } from '@prisma/client';

// Initialize a new instance of PrismaClient to interact with the database
export const prisma = new PrismaClient();

// Function call to initialize the database connection
export async function connectDB() {
	try {
		await prisma.$connect();
		console.log('✅ Database connected successfully');
	} catch (error) {
		console.error('❌ Database connection failed:', error);
		process.exit(1);
	}
}
