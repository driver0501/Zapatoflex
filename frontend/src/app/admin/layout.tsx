import React from 'react';

// Layout minimalista para admin (sin el navbar de la tienda)
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {children}
        </div>
    );
}
