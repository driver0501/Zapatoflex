export const registrador = {
    info: (mensaje: string) => console.log(`[INFO] ${new Date().toISOString()}: ${mensaje}`),
    error: (mensaje: string) => console.error(`[ERROR] ${new Date().toISOString()}: ${mensaje}`),
};
