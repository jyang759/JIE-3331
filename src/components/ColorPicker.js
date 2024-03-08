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
                    }}
                >
                    <SketchPicker color={selectedColor} onChange={handleColorChange} />
                </div>
            )}
        </div>
    );
};