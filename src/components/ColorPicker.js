import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPicker({ onColorChange }) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial color

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        onColorChange(color.hex);
    };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);

    };

    const closeColorPicker = () => {
        setShowColorPicker(false);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={toggleColorPicker}
            >Font Color
            </div>
            {showColorPicker && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        backgroundColor: 'gray',
                        border: '1px solid black',
                        borderRadius: '4px',
                        padding: '10px',
                    }}
                >
                    <SketchPicker color={selectedColor} onChange={handleColorChange} />
                    <button onClick={closeColorPicker} style={{cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};