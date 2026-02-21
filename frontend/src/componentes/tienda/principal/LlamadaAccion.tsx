// CTA de Newsletter - estilo minimalista blanco/negro como Tennis.com.co
export default function LlamadaAccion() {
    return (
        <section className="bg-white py-20 border-t border-gray-100">
            <div className="mx-auto max-w-xl px-6 text-center space-y-6">

                <span className="block text-[10px] font-black tracking-[0.35em] uppercase text-gray-400">
                    COMUNIDAD ZAPATOFLEX
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-tight">
                    RECIBE ANTES<br />QUE NADIE.
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Suscríbete y accede a preventa exclusiva, drops limitados y descuentos para miembros.
                </p>

                {/* FORMULARIO */}
                <div className="flex border border-black overflow-hidden">
                    <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="flex-1 px-5 py-4 text-sm text-black placeholder-gray-400 focus:outline-none"
                    />
                    <button className="bg-black px-8 py-4 text-[11px] font-black tracking-widest uppercase text-white hover:bg-gray-800 transition-colors whitespace-nowrap">
                        SUSCRIBIRSE
                    </button>
                </div>

                <p className="text-[10px] text-gray-400 tracking-wide">
                    Sin spam. Solo lo mejor de ZapatoFlex.
                </p>

            </div>
        </section>
    );
}
