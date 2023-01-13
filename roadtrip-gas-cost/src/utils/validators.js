// Checks if a state was selected or not
export const stateValidator = (state) => {
    return state !== 'State';
}

// Checks if a fuel type was selected or not
export const fuelTypeValidator = (fuel) => {
    return fuel !== 'Fuel Type';
}

// Checks if the fuel consumption value is reasonable
export const fuelValidator = (fuel) => {
    return (fuel ? fuel >= 1 && fuel <= 8 : true );
}   