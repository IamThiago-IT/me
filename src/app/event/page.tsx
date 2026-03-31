import React from 'react';

export default function EventPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Events</h1>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Event Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Event Title</h2>
                        <p className="text-gray-600 mb-4">Event description goes here</p>
                        <p className="text-sm text-gray-500">Date: January 15, 2024</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Learn More
                        </button>
                    </div>

                    {/* Event Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Another Event</h2>
                        <p className="text-gray-600 mb-4">Event description goes here</p>
                        <p className="text-sm text-gray-500">Date: January 20, 2024</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}