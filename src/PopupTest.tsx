import React, { useState } from 'react';
import { AlurkerjaInputType } from './alurkerjaType';

interface PopupTestProps {
    props: AlurkerjaInputType;
}

export default function PopupTest({ props }: PopupTestProps) {
    const { register, setValue, getValues } = props.form;
    const [isOpen, setIsOpen] = useState(false);
    const [popupType, setPopupType] = useState<'success' | 'warning' | 'info' | 'confirm'>('info');

    const openModal = (type: 'success' | 'warning' | 'info' | 'confirm') => {
        setPopupType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        setValue('popupResult', 'confirmed at ' + new Date().toLocaleTimeString());
        closeModal();
    };

    const handleCancel = () => {
        setValue('popupResult', 'cancelled at ' + new Date().toLocaleTimeString());
        closeModal();
    };

    const getPopupConfig = () => {
        switch (popupType) {
            case 'success':
                return {
                    icon: '✅',
                    title: 'Success!',
                    message: 'Your action was completed successfully.',
                    color: 'bg-green-500'
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    title: 'Warning',
                    message: 'Please be careful with this action.',
                    color: 'bg-yellow-500'
                };
            case 'confirm':
                return {
                    icon: '❓',
                    title: 'Confirm Action',
                    message: 'Are you sure you want to proceed?',
                    color: 'bg-blue-500'
                };
            default:
                return {
                    icon: 'ℹ️',
                    title: 'Information',
                    message: 'This is an informational popup.',
                    color: 'bg-blue-500'
                };
        }
    };

    const config = getPopupConfig();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Popup/Modal Test Component</h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => openModal('success')}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md"
                    type="button"
                >
                    ✅ Success Popup
                </button>
                
                <button
                    onClick={() => openModal('warning')}
                    className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow-md"
                    type="button"
                >
                    ⚠️ Warning Popup
                </button>
                
                <button
                    onClick={() => openModal('info')}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
                    type="button"
                >
                    ℹ️ Info Popup
                </button>
                
                <button
                    onClick={() => openModal('confirm')}
                    className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold shadow-md"
                    type="button"
                >
                    ❓ Confirm Popup
                </button>
            </div>

            {/* Display result */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-sm font-semibold mb-2">Popup Result:</p>
                <input
                    readOnly
                    value={getValues('popupResult') || 'No action yet'}
                    className="w-full border rounded-md px-3 py-2 bg-white"
                />
            </div>

            {/* Custom Modal Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 flex items-center justify-center"
                    onClick={closeModal}
                    style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 9999
                    }}
                >
                    <div 
                        className="bg-white rounded-xl shadow-2xl max-w-lg w-11/12 max-h-screen overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            {/* Header with colored bar */}
                            <div className={`${config.color} text-white px-6 py-4 rounded-t-xl`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{config.icon}</span>
                                        <h2 className="text-xl font-bold">{config.title}</h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-white hover:text-gray-200 text-2xl leading-none"
                                        type="button"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6">
                                <p className="text-gray-700 text-lg mb-4">{config.message}</p>
                                
                                {/* Additional content for testing */}
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <p className="text-sm text-gray-600">
                                        This is a test popup component using <strong>custom CSS</strong>.
                                        You can customize the styles, add forms, or any content you need.
                                    </p>
                                </div>

                                {/* Input field example */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-2">
                                        Test Input (optional):
                                    </label>
                                    <input
                                        {...(register ? register('popupInput') : {})}
                                        placeholder="Enter something..."
                                        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Footer with buttons */}
                            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                                {popupType === 'confirm' ? (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                                            type="button"
                                        >
                                            Confirm
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={closeModal}
                                        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                                        type="button"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
