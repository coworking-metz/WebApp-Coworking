import HTTP from '../http';

/**
 * Unlock main steel gate from the outside.
 *
 * @returns Promise<{ triggered: string; locked: string; timeout: string; }>
 */
export const unlockSteelGate = () => {
    return HTTP.post('/interphone').then(({ data }) => data);
};

/**
 * Open parking gate.
 *
 * @returns Promise<{ triggered: string; closed: string; timeout: string; }>
 */
export const openParkingGate = () => {
    return HTTP.post('/parking').then(({ data }) => data);
};
