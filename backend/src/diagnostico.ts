import { supabase } from './lib/supabase';

async function testStorage() {
    console.log('--- DIAGNÓSTICO DE SUPABASE STORAGE ---');
    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        if (error) {
            console.error('❌ Error al listar buckets:', error.message);
            return;
        }

        const bucketExiste = buckets.find(b => b.name === 'productos');

        if (!bucketExiste) {
            console.error('❌ EL BUCKET "productos" NO EXISTE.');
            console.log('Por favor, créalo en el panel de Supabase o ejecuta el script SQL.');
        } else {
            console.log('✅ Bucket "productos" encontrado.');
            console.log('Estado:', bucketExiste.public ? 'Público' : 'Privado (Debe ser PÚBLICO)');
        }

        // Intentar una subida pequeña de prueba
        const testFile = Buffer.from('test');
        const { error: uploadError } = await supabase.storage
            .from('productos')
            .upload('test-connection.txt', testFile, { upsert: true });

        if (uploadError) {
            console.error('❌ Error en subida de prueba:', uploadError.message);
        } else {
            console.log('✅ Subida de prueba exitosa.');
        }

    } catch (err: any) {
        console.error('❌ Error inesperado:', err.message);
    }
}

testStorage();
