'use client';

import { useState } from 'react';

type FAQ = {
    q: string;
    a: string;
};

export default function FAQItem({ faq }: { faq: FAQ }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border rounded-xl p-4 bg-white shadow-sm">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center font-semibold text-left"
            >
                <span>{faq.q}</span>
                <span>{open ? '-' : '+'}</span>
            </button>

            {open && (
                <p className="mt-3 text-gray-600">
                    {faq.a}
                </p>
            )}
        </div>
    );
}