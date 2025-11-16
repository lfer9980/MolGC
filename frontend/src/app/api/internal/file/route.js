import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const filePath = path.join(process.cwd(), 'public', 'data', 'molecules.zip');

		// Verificar que el archivo existe
		if (!fs.existsSync(filePath)) {
			console.error('Archivo no encontrado:', filePath);
			return NextResponse.json({ error: 'File not found' }, { status: 404 });
		}

		// Leer el archivo
		const fileBuffer = fs.readFileSync(filePath);
		const fileSize = fileBuffer.length;

		console.log('Sirviendo archivo:', filePath, 'Tamaño:', fileSize, 'bytes');

		return new NextResponse(fileBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Length': fileSize.toString(),
				'Cache-Control': 'no-store, no-cache, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0',
			},
		});
	} catch (error) {
		console.error('Error al leer archivo:', error);
		return NextResponse.json({
			error: 'Internal server error',
			details: error.message
		}, { status: 500 });
	}
}